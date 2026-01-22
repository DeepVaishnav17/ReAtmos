
// import React, { useState, useEffect, useCallback } from "react";
// import EventCard from "../components/EventCard";
// import EventFilters from "../components/EventFilters";
// import EventModal from "../components/EventModal";
// import * as eventService from "../services/eventService";
// import "../styles/event.css";

// const getUserFromToken = () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return null;
//     const base64Url = token.split(".")[1];
//     const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split("")
//         .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
//         .join("")
//     );
//     return JSON.parse(jsonPayload);
//   } catch {
//     return null;
//   }
// };

// export default function EventsPage() {
//   const [user, setUser] = useState(null);
//   const [events, setEvents] = useState([]);
//   const [pageLoading, setPageLoading] = useState(false);
//   const [modalLoading, setModalLoading] = useState(false);

//   const [activeTab, setActiveTab] = useState("browse");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingEvent, setEditingEvent] = useState(null);

//   const [filters, setFilters] = useState({
//     status: "Upcoming",
//     location: "",
//     category: "",
//   });

//   useEffect(() => {
//     setUser(getUserFromToken());
//   }, []);

//   const fetchEvents = useCallback(async () => {
//     setPageLoading(true);

//     let response;
//     if (activeTab === "browse")
//       response = await eventService.getAllEvents(filters);
//     else if (activeTab === "organized")
//       response = await eventService.getOrganizedEvents();
//     else response = await eventService.getJoinedEvents();

//     setEvents(response || []);
//     setPageLoading(false);
//   }, [activeTab, filters]);

//   useEffect(() => {
//     fetchEvents();
//   }, [fetchEvents]);

//   const isEventOrganic = (e) =>
//     user && e.organizer._id === user._id;

//  const isParticipant = (e) =>
//   user && e.participants.some((p) => p._id === user._id);

//   const handleSaveEvent = async (data) => {
//     try {
//       setModalLoading(true);

//       if (editingEvent) {
//         await eventService.updateEvent(editingEvent._id, data);
//       } else {
//         await eventService.createEvent(data);
//       }

//       await fetchEvents();
//       setIsModalOpen(false);
//       setEditingEvent(null);
//     } catch (err) {
//       console.error("EVENT SAVE ERROR:", err.message);
//     } finally {
//       setModalLoading(false);
//     }
//   };

//   return (
//     <div className="events-page">
//       <div className="events-header">
//         <h1>🌱 Environmental Events</h1>
//         <p>Discover, join and organize activities that help the planet</p>
//       </div>

//       {user && (
//         <div className="tabs-bar">
//           {["browse", "organized", "joined"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`tab-btn ${activeTab === tab ? "active" : ""}`}
//             >
//               {tab === "browse"
//                 ? "Browse Events"
//                 : tab === "organized"
//                 ? "My Events"
//                 : "Joined Events"}
//             </button>
//           ))}
//         </div>
//       )}

//       {activeTab === "browse" && (
//         <EventFilters
//           filters={filters}
//           onFilterChange={(k, v) =>
//             setFilters((p) => ({ ...p, [k]: v }))
//           }
//           onCreateClick={() => {
//             setEditingEvent(null);
//             setIsModalOpen(true);
//           }}
//           isAuthenticated={!!user}
//         />
//       )}

//       {pageLoading ? (
//         <div className="center-box">Loading events...</div>
//       ) : events.length === 0 ? (
//         <div className="center-box">No events found</div>
//       ) : (
//         <div className="events-grid">
//           {events.map((e) => (
//             <EventCard
//               key={e._id}
//               event={e}
//               isOrganic={isEventOrganic(e)}
//               isParticipant={isParticipant(e)}
//               onJoin={async () => {
//                 const updatedEvent = await eventService.joinEvent(e._id);
//                 setEvents((prev) =>
//                   prev.map((ev) =>
//                     ev._id === e._id ? updatedEvent : ev
//                   )
//                 );
//               }}
//               onLeave={async () => {
//                 const updatedEvent = await eventService.leaveEvent(e._id);
//                 setEvents((prev) =>
//                   prev.map((ev) =>
//                     ev._id === e._id ? updatedEvent : ev
//                   )
//                 );
//               }}
//             />
//           ))}
//         </div>
//       )}

//       <EventModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={handleSaveEvent}
//         event={editingEvent}
//         isLoading={modalLoading}
//       />
//     </div>
//   );
// }


import React, { useState, useEffect, useCallback } from "react";
import EventCard from "../components/EventCard";
import EventFilters from "../components/EventFilters";
import EventModal from "../components/EventModal";
import * as eventService from "../services/eventService";
import "../styles/event.css";

const getUserFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export default function EventsPage() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("browse");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [filters, setFilters] = useState({
    status: "Upcoming",
    location: "",
    category: "",
  });

  useEffect(() => {
    setUser(getUserFromToken());
  }, []);

  const fetchEvents = useCallback(async () => {
    setPageLoading(true);

    let response;
    if (activeTab === "browse")
      response = await eventService.getAllEvents(filters);
    else if (activeTab === "organized")
      response = await eventService.getOrganizedEvents();
    else response = await eventService.getJoinedEvents();

    setEvents(response || []);
    setPageLoading(false);
  }, [activeTab, filters]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // ✅ ORGANIZER CHECK
  const isEventOrganic = (e) =>
    user && e.organizer?._id === user._id;

  // ✅ PARTICIPANT CHECK (FIXED FOR NEW STRUCTURE)
  const isParticipant = (e) =>
    user &&
    e.participants?.some(
      (p) => p.user?._id === user._id
    );

  const handleSaveEvent = async (data) => {
    try {
      setModalLoading(true);

      if (editingEvent) {
        await eventService.updateEvent(editingEvent._id, data);
      } else {
        await eventService.createEvent(data);
      }

      await fetchEvents();
      setIsModalOpen(false);
      setEditingEvent(null);
    } catch (err) {
      console.error("EVENT SAVE ERROR:", err.message);
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>🌱 Environmental Events</h1>
        <p>Discover, join and organize activities that help the planet</p>
      </div>

      {user && (
        <div className="tabs-bar">
          {["browse", "organized", "joined"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            >
              {tab === "browse"
                ? "Browse Events"
                : tab === "organized"
                ? "My Events"
                : "Joined Events"}
            </button>
          ))}
        </div>
      )}

      {activeTab === "browse" && (
        <EventFilters
          filters={filters}
          onFilterChange={(k, v) =>
            setFilters((p) => ({ ...p, [k]: v }))
          }
          onCreateClick={() => {
            setEditingEvent(null);
            setIsModalOpen(true);
          }}
          isAuthenticated={!!user}
        />
      )}

      {pageLoading ? (
        <div className="center-box">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="center-box">No events found</div>
      ) : (
        <div className="events-grid">
          {events.map((e) => (
            <EventCard
              key={e._id}
              event={e}
              isOrganic={isEventOrganic(e)}
              isParticipant={isParticipant(e)}
              onJoin={async () => {
                const updatedEvent = await eventService.joinEvent(e._id);
                setEvents((prev) =>
                  prev.map((ev) =>
                    ev._id === e._id ? updatedEvent : ev
                  )
                );
              }}
              onLeave={async () => {
                const updatedEvent = await eventService.leaveEvent(e._id);
                setEvents((prev) =>
                  prev.map((ev) =>
                    ev._id === e._id ? updatedEvent : ev
                  )
                );
              }}
            />
          ))}
        </div>
      )}

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveEvent}
        event={editingEvent}
        isLoading={modalLoading}
      />
    </div>
  );
}
