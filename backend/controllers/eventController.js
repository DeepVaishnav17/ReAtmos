

const Event = require("../models/Event");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");
const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");

// ================= CREATE EVENT =================
const createEvent = async (req, res) => {
  try {
    const { name, description, location, eventDate, eventTime, eventCategory, maxParticipants } = req.body;

    const event = await Event.create({
      name,
      description,
      location,
      eventDate: new Date(eventDate),
      eventTime,
      eventCategory,
      maxParticipants: maxParticipants ? Number(maxParticipants) : null,
      organizer: req.user._id,
      participants: [],
    });

    await event.populate("organizer", "name email");

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET EVENTS =================
const getEvents = async (req, res) => {
  try {
    const { status, location, category } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (location) filter.location = { $regex: location, $options: "i" };
    if (category) filter.eventCategory = category;

    const events = await Event.find(filter)
      .populate("organizer", "name email")
      .populate("participants.user", "name email")
      .sort({ eventDate: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET BY ID =================
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "name email")
      .populate("participants.user", "name email");

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE =================
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(event, req.body);
    await event.save();

    await event.populate("organizer", "name email");
    await event.populate("participants.user", "name email");

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE =================
const deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// ================= JOIN (QR GENERATED HERE) =================
const joinEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const alreadyJoined = event.participants.some(
      (p) => p.user.toString() === req.user._id.toString()
    );

    if (alreadyJoined) {
      return res.status(400).json({ message: "Already joined" });
    }

    const token = uuidv4();

    event.participants.push({
      user: req.user._id,
      qrToken: token,
      attended: false,
    });

    await event.save();

    // ✅ QR MUST contain URL
   const qrUrl = `http://10.107.48.34:5173/scan?token=${token}`;

    const qrImage = await QRCode.toDataURL(qrUrl);

    const user = await User.findById(req.user._id);

    await sendEmail({
      to: user.email,
      subject: `QR for ${event.name} 🎫`,
      html: `
        <h2>You joined ${event.name}</h2>
        <p>Show this QR at the event for attendance:</p>
        <img src="cid:qrcode" />
      `,
      attachments: [
        {
          filename: "qrcode.png",
          content: qrImage.split("base64,")[1],
          encoding: "base64",
          cid: "qrcode",
        },
      ],
    });

    const populated = await Event.findById(event._id)
      .populate("organizer", "name email")
      .populate("participants.user", "name email");

    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= LEAVE =================
const leaveEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.participants = event.participants.filter(
      (p) => p.user.toString() !== req.user._id.toString()
    );

    await event.save();

    const populated = await Event.findById(event._id)
      .populate("organizer", "name email")
      .populate("participants.user", "name email");

    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= USER EVENTS =================
const getOrganizedEvents = async (req, res) => {
  const events = await Event.find({ organizer: req.user._id })
    .populate("organizer", "name email")
    .populate("participants.user", "name email");

  res.json(events);
};

const getJoinedEvents = async (req, res) => {
  const events = await Event.find({
    "participants.user": req.user._id,
  })
    .populate("organizer", "name email")
    .populate("participants.user", "name email");

  res.json(events);
};

const getUserAllEvents = async (req, res) => {
  const events = await Event.find({
    $or: [
      { organizer: req.user._id },
      { "participants.user": req.user._id },
    ],
  })
    .populate("organizer", "name email")
    .populate("participants.user", "name email");

  res.json(events);
};

// ================= QR VERIFY (ORGANIZER SCANS) =================
const verifyAttendance = async (req, res) => {
  try {
    const { token } = req.params;

    const event = await Event.findOne({
      "participants.qrToken": token,
    }).populate("organizer");

    if (!event) return res.send("❌ Invalid QR");

    if (!req.user || event.organizer._id.toString() !== req.user._id.toString()) {
      return res.send("❌ Only organizer can mark attendance");
    }

    const participant = event.participants.find(
      (p) => p.qrToken === token
    );

    if (participant.attended) {
      return res.send("⚠️ Already marked");
    }

    participant.attended = true;
    await event.save();

    res.send("✅ Attendance marked");
  } catch (err) {
    res.send("Error");
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
  getOrganizedEvents,
  getJoinedEvents,
  getUserAllEvents,
  verifyAttendance,
};
