
// const mongoose = require("mongoose");

// const eventSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Event name is required"],
//       trim: true,
//       maxlength: [100, "Event name cannot exceed 100 characters"],
//     },

//     description: {
//       type: String,
//       required: [true, "Event description is required"],
//       trim: true,
//       maxlength: [1000, "Description cannot exceed 1000 characters"],
//     },

//     location: {
//       type: String,
//       required: [true, "Event location is required"],
//       trim: true,
//     },

//     eventDate: {
//       type: Date,
//       required: [true, "Event date is required"],
//     },

//     eventTime: {
//       type: String,
//       required: [true, "Event time is required"],
//     },

//     eventCategory: {
//       type: String,
//       enum: [
//         "Tree Plantation",
//         "Water Cleaning",
//         "Awareness Campaign",
//         "Seminar",
//         "Other",
//       ],
//       default: "Other",
//     },

//     maxParticipants: {
//       type: Number,
//       default: null,
//     },

//     organizer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//    participants: [
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     qrToken: String,
//     attended: {
//       type: Boolean,
//       default: false,
//     },
//   },
// ],


//     // ✅ THIS IS THE IMPORTANT PART (INSIDE SCHEMA)
//     attendanceMarked: [
//       {
//         userId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "User",
//         },
//         markedAt: Date,
//       },
//     ],

//     status: {
//       type: String,
//       enum: ["Upcoming", "Active", "Archived"],
//       default: "Upcoming",
//     },
//   },
//   { timestamps: true }
// );

// // Safe status updater
// eventSchema.statics.updateEventStatuses = async function () {
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     await this.updateMany(
//       { eventDate: { $lt: today }, status: { $ne: "Archived" } },
//       { $set: { status: "Archived" } }
//     );

//     await this.updateMany(
//       { eventDate: { $gte: today }, status: "Archived" },
//       { $set: { status: "Upcoming" } }
//     );
//   } catch (e) {
//     console.log("Status updater error:", e.message);
//   }
// };

// eventSchema.pre(/^find/, async function () {
//   try {
//     await this.model.updateEventStatuses();
//   } catch (e) {
//     console.log("Status update skipped:", e.message);
//   }
// });

// module.exports = mongoose.model("Event", eventSchema);





const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Event name is required"],
      trim: true,
      maxlength: [100, "Event name cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
    },

    eventDate: {
      type: Date,
      required: [true, "Event date is required"],
    },

    eventTime: {
      type: String,
      required: [true, "Event time is required"],
    },

    eventCategory: {
      type: String,
      enum: [
        "Tree Plantation",
        "Water Cleaning",
        "Awareness Campaign",
        "Seminar",
        "Other",
      ],
      default: "Other",
    },

    maxParticipants: {
      type: Number,
      default: null,
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ✅ QR Attendance System
    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        qrToken: {
          type: String,
          required: true, // no unique here
        },
        attended: {
          type: Boolean,
          default: false,
        },
      },
    ],

    status: {
      type: String,
      enum: ["Upcoming", "Active", "Archived"],
      default: "Upcoming",
    },
  },
  { timestamps: true }
);

// Auto status updater
eventSchema.statics.updateEventStatuses = async function () {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await this.updateMany(
      { eventDate: { $lt: today }, status: { $ne: "Archived" } },
      { $set: { status: "Archived" } }
    );

    await this.updateMany(
      { eventDate: { $gte: today }, status: "Archived" },
      { $set: { status: "Upcoming" } }
    );
  } catch (e) {
    console.log("Status updater error:", e.message);
  }
};

eventSchema.pre(/^find/, async function () {
  try {
    await this.model.updateEventStatuses();
  } catch (e) {
    console.log("Status update skipped:", e.message);
  }
});

module.exports = mongoose.model("Event", eventSchema);
