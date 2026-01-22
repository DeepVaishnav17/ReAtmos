// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/authMiddleware");
// const eventController = require("../controllers/eventController");


// // Public routes
// router.get("/", eventController.getEvents);

// // ⭐ USER routes FIRST
// router.get("/user/organized", authMiddleware, eventController.getOrganizedEvents);
// router.get("/user/joined", authMiddleware, eventController.getJoinedEvents);
// router.get("/user/all", authMiddleware, eventController.getUserAllEvents);

// // Then ID route
// router.get("/:id", eventController.getEventById);

// // Protected routes
// router.post("/", authMiddleware, eventController.createEvent);
// router.put("/:id", authMiddleware, eventController.updateEvent);
// router.delete("/:id", authMiddleware, eventController.deleteEvent);

// // Event participation
// router.post("/:id/join", authMiddleware, eventController.joinEvent);
// router.post("/:id/leave", authMiddleware, eventController.leaveEvent);

// // Attendance
// router.post("/:id/mark-attendance", authMiddleware, eventController.markAttendance);


// router.get("/:id/qr", authMiddleware, eventController.generateUserQR);

// router.post("/scan-attendance", authMiddleware, eventController.scanAttendance);


// module.exports = router;

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const eventController = require("../controllers/eventController");

// ================= QR VERIFY (MUST BE FIRST) =================
//router.get("/verify/:token", authMiddleware, eventController.verifyAttendance);
router.get("/verify/:token", eventController.verifyAttendance);
// ================= PUBLIC =================
router.get("/", eventController.getEvents);

// ================= USER ROUTES =================
router.get("/user/organized", authMiddleware, eventController.getOrganizedEvents);
router.get("/user/joined", authMiddleware, eventController.getJoinedEvents);
router.get("/user/all", authMiddleware, eventController.getUserAllEvents);

// ================= CRUD =================
router.post("/", authMiddleware, eventController.createEvent);
router.put("/:id", authMiddleware, eventController.updateEvent);
router.delete("/:id", authMiddleware, eventController.deleteEvent);

// ================= JOIN / LEAVE =================
router.post("/:id/join", authMiddleware, eventController.joinEvent);
router.post("/:id/leave", authMiddleware, eventController.leaveEvent);

// ================= EVENT BY ID (MUST BE LAST) =================
router.get("/:id", eventController.getEventById);

module.exports = router;
