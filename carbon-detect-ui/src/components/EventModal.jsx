
// import React, { useState, useEffect } from "react";
// import { X } from "lucide-react";

// export default function EventModal({
//   isOpen,
//   onClose,
//   onSubmit,
//   event = null,
//   isLoading = false,
// }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     location: "",
//     eventDate: "",
//     eventTime: "14:00",
//     eventCategory: "Other",
//     maxParticipants: "",
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (event) {
//       const eventDate = new Date(event.eventDate);
//       setFormData({
//         name: event.name,
//         description: event.description,
//         location: event.location,
//         eventDate: eventDate.toISOString().split("T")[0],
//         eventTime: event.eventTime,
//         eventCategory: event.eventCategory,
//         maxParticipants: event.maxParticipants || "",
//       });
//     } else {
//       setFormData({
//         name: "",
//         description: "",
//         location: "",
//         eventDate: "",
//         eventTime: "14:00",
//         eventCategory: "Other",
//         maxParticipants: "",
//       });
//     }
//     setErrors({});
//   }, [event, isOpen]);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Event name is required";
//     if (!formData.description.trim())
//       newErrors.description = "Description is required";
//     if (!formData.location.trim())
//       newErrors.location = "Location is required";
//     if (!formData.eventDate) newErrors.eventDate = "Event date is required";
//     if (!formData.eventTime) newErrors.eventTime = "Event time is required";

//     if (!event && formData.eventDate) {
//       const selectedDate = new Date(formData.eventDate);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
//       if (selectedDate < today) {
//         newErrors.eventDate = "Event date must be in the future";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     onSubmit(formData);
//   };

//   if (!isOpen) return null;

//   const inputClass =
//     "w-full px-4 py-3 border rounded-xl outline-none bg-white/5 text-white placeholder-white/40 focus:ring-2 focus:ring-emerald-400 transition";

//   return (
//     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-[#0f172a]/95 backdrop-blur-2xl rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.6)] max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
//         {/* Header */}
//         <div className="flex justify-between items-center p-6 border-b border-white/10">
//           <h2 className="text-3xl font-extrabold tracking-tight text-emerald-400">
//             {event ? "Edit Event" : "Create New Event"}
//           </h2>
//           <button
//             onClick={onClose}
//             disabled={isLoading}
//             className="text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-xl transition"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-5">
//           {/* Name */}
//           <div>
//             <label className="text-sm text-white/80 mb-2 block">Event Name</label>
//             <input
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               disabled={isLoading}
//               className={`${inputClass} ${
//                 errors.name ? "border-red-500" : "border-white/10"
//               }`}
//             />
//             {errors.name && (
//               <p className="text-red-400 text-sm mt-1">{errors.name}</p>
//             )}
//           </div>

//           {/* Description */}
//           <div>
//             <label className="text-sm text-white/80 mb-2 block">
//               Description
//             </label>
//             <textarea
//               name="description"
//               rows="4"
//               value={formData.description}
//               onChange={handleChange}
//               disabled={isLoading}
//               className={`${inputClass} resize-none ${
//                 errors.description ? "border-red-500" : "border-white/10"
//               }`}
//             />
//             {errors.description && (
//               <p className="text-red-400 text-sm mt-1">
//                 {errors.description}
//               </p>
//             )}
//           </div>

//           {/* Location */}
//           <div>
//             <label className="text-sm text-white/80 mb-2 block">Location</label>
//             <input
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               disabled={isLoading}
//               className={`${inputClass} ${
//                 errors.location ? "border-red-500" : "border-white/10"
//               }`}
//             />
//             {errors.location && (
//               <p className="text-red-400 text-sm mt-1">{errors.location}</p>
//             )}
//           </div>

//           {/* Date & Time */}
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="date"
//               name="eventDate"
//               value={formData.eventDate}
//               onChange={handleChange}
//               className={`${inputClass} ${
//                 errors.eventDate ? "border-red-500" : "border-white/10"
//               }`}
//             />
//             <input
//               type="time"
//               name="eventTime"
//               value={formData.eventTime}
//               onChange={handleChange}
//               className={`${inputClass} ${
//                 errors.eventTime ? "border-red-500" : "border-white/10"
//               }`}
//             />
//           </div>

//           {/* Category & Max */}
//           <div className="grid grid-cols-2 gap-4">
//             <select
//               name="eventCategory"
//               value={formData.eventCategory}
//               onChange={handleChange}
//               className={`${inputClass} border-white/10`}
//             >
//               <option>Tree Plantation</option>
//               <option>Water Cleaning</option>
//               <option>Awareness Campaign</option>
//               <option>Seminar</option>
//               <option>Other</option>
//             </select>

//             <input
//               type="number"
//               name="maxParticipants"
//               value={formData.maxParticipants}
//               onChange={handleChange}
//               placeholder="Max participants"
//               className={`${inputClass} border-white/10`}
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl shadow-xl transition"
//             >
//               {isLoading ? "Saving..." : event ? "Update Event" : "Create Event"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import "../styles/event.css";

export default function EventModal({
  isOpen,
  onClose,
  onSubmit,
  event = null,
  isLoading = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    eventDate: "",
    eventTime: "14:00",
    eventCategory: "Other",
    maxParticipants: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      const d = new Date(event.eventDate);
      setFormData({
        name: event.name,
        description: event.description,
        location: event.location,
        eventDate: d.toISOString().split("T")[0],
        eventTime: event.eventTime,
        eventCategory: event.eventCategory,
        maxParticipants: event.maxParticipants || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        location: "",
        eventDate: "",
        eventTime: "14:00",
        eventCategory: "Other",
        maxParticipants: "",
      });
    }
    setErrors({});
  }, [event, isOpen]);

  const validateForm = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Event name required";
    if (!formData.description.trim()) e.description = "Description required";
    if (!formData.location.trim()) e.location = "Location required";
    if (!formData.eventDate) e.eventDate = "Date required";
    if (!formData.eventTime) e.eventTime = "Time required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (ev) =>
    setFormData((p) => ({ ...p, [ev.target.name]: ev.target.value }));

const handleSubmit = async (ev) => {
  ev.preventDefault();
  if (!validateForm()) return;

 // await onSubmit(formData);  // parent will close modal
    onSubmit({
  ...formData,
  maxParticipants: Number(formData.maxParticipants),
  dateTime: new Date(`${formData.eventDate}T${formData.eventTime}`),
});

};


  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <div className="modal-title">
            {event ? "Edit Event" : "Create Event"}
          </div>
          <button className="close-btn" onClick={onClose}>
            <X />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div>
            <label>Event Name</label>
            <input
              className="modal-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="modal-error">{errors.name}</div>}
          </div>

          <div>
            <label>Description</label>
            <textarea
              className="modal-textarea"
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <div className="modal-error">{errors.description}</div>
            )}
          </div>

          <div>
            <label>Location</label>
            <input
              className="modal-input"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && (
              <div className="modal-error">{errors.location}</div>
            )}
          </div>

          <div className="modal-row">
            <input
              type="date"
              name="eventDate"
              className="modal-input"
              value={formData.eventDate}
              onChange={handleChange}
            />
            <input
              type="time"
              name="eventTime"
              className="modal-input"
              value={formData.eventTime}
              onChange={handleChange}
            />
          </div>

          <div className="modal-row">
            <select
              name="eventCategory"
              className="modal-select"
              value={formData.eventCategory}
              onChange={handleChange}
            >
              <option>Tree Plantation</option>
              <option>Water Cleaning</option>
              <option>Awareness Campaign</option>
              <option>Seminar</option>
              <option>Other</option>
            </select>

            <input
              type="number"
              name="maxParticipants"
              placeholder="Max participants"
              className="modal-input"
              value={formData.maxParticipants}
              onChange={handleChange}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {isLoading ? "Saving..." : "Save Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
