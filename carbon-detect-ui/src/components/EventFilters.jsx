
// import React from "react";
// import { Plus } from "lucide-react";

// export default function EventFilters({
//   filters,
//   onFilterChange,
//   onCreateClick,
//   isAuthenticated,
// }) {
//   const inputClass =
//     "w-full px-4 py-2.5 border border-white/10 rounded-xl bg-white/5 text-white text-sm font-medium focus:ring-2 focus:ring-emerald-400 outline-none transition placeholder-emerald-200/50";

//   return (
//     <div className="bg-white/8 backdrop-blur-xl rounded-3xl shadow-xl p-7 mb-10 border border-white/10">
//       <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
//         <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
//           <div className="flex-1">
//             <label className="block text-xs font-semibold text-emerald-200 mb-2 tracking-wide">
//               Status
//             </label>
//             <select
//               value={filters.status || ""}
//               onChange={(e) => onFilterChange("status", e.target.value)}
//               className={inputClass}
//             >
//               <option value="">All Status</option>
//               <option value="Upcoming">Upcoming</option>
//               <option value="Active">Active</option>
//               <option value="Archived">Archived</option>
//             </select>
//           </div>

//           <div className="flex-1">
//             <label className="block text-xs font-semibold text-emerald-200 mb-2 tracking-wide">
//               Location
//             </label>
//             <input
//               type="text"
//               placeholder="Search by location..."
//               value={filters.location || ""}
//               onChange={(e) => onFilterChange("location", e.target.value)}
//               className={inputClass}
//             />
//           </div>

//           <div className="flex-1">
//             <label className="block text-xs font-semibold text-emerald-200 mb-2 tracking-wide">
//               Category
//             </label>
//             <select
//               value={filters.category || ""}
//               onChange={(e) => onFilterChange("category", e.target.value)}
//               className={inputClass}
//             >
//               <option value="">All Categories</option>
//               <option value="Tree Plantation">Tree Plantation</option>
//               <option value="Water Cleaning">Water Cleaning</option>
//               <option value="Awareness Campaign">Awareness Campaign</option>
//               <option value="Seminar">Seminar</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//         </div>

//         {isAuthenticated && (
//           <button
//             onClick={onCreateClick}
//             className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-3 rounded-2xl font-semibold flex items-center gap-2 transition-all hover:shadow-2xl hover:-translate-y-1 whitespace-nowrap"
//           >
//             <Plus size={20} />
//             Create Event
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

import React from "react";
import "../styles/event.css";
import { Plus } from "lucide-react";

export default function EventFilters({
  filters,
  onFilterChange,
  onCreateClick,
  isAuthenticated,
}) {
  return (
    <div className="filters-bar">
      <div className="filters-row">
        <div className="filter-group">
          <label>Status</label>
          <select
            className="filter-input"
            value={filters.status || ""}
            onChange={(e) => onFilterChange("status", e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Active">Active</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Location</label>
          <input
            className="filter-input"
            type="text"
            placeholder="Search by location..."
            value={filters.location || ""}
            onChange={(e) => onFilterChange("location", e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Category</label>
          <select
            className="filter-input"
            value={filters.category || ""}
            onChange={(e) => onFilterChange("category", e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Tree Plantation">Tree Plantation</option>
            <option value="Water Cleaning">Water Cleaning</option>
            <option value="Awareness Campaign">Awareness Campaign</option>
            <option value="Seminar">Seminar</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {isAuthenticated && (
          <button className="create-btn" onClick={onCreateClick}>
            <Plus size={18} />
            Create Event
          </button>
        )}
      </div>
    </div>
  );
}
