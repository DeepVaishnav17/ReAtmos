import React from "react";
import "../styles/event.css";
import { Calendar, MapPin, Users, Zap } from "lucide-react";

export default function EventCard({
  event,
  onJoin,
  onLeave,
  isParticipant,
  isOrganic,
  onEdit,
  onDelete,
}) {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const isFull =
    event.maxParticipants &&
    event.participants.length >= event.maxParticipants;

  return (
    <div className="event-card">
      <div className="event-content">
        <div className="event-title">{event.name}</div>

        <div className="event-badges">
          <span className="badge badge-status">{event.status}</span>
          <span className="badge badge-category">
            {event.eventCategory}
          </span>
        </div>

        <div className="event-desc">{event.description}</div>

        <div className="event-info">
          <Calendar size={16} />
          {formatDate(event.eventDate)} at {event.eventTime}
        </div>

        <div className="event-info">
          <MapPin size={16} />
          {event.location}
        </div>

        <div className="event-info">
          <Zap size={16} />
          By {event.organizer?.name}
        </div>

        <div className="event-info">
          <Users size={16} />
          {event.participants.length}
          {event.maxParticipants && ` / ${event.maxParticipants}`} participants
        </div>
      </div>

      <div className="event-actions">
        {isOrganic ? (
          <>
            <button className="btn btn-edit" onClick={onEdit}>
              Edit
            </button>

            <button className="btn btn-delete" onClick={onDelete}>
              Delete
            </button>

            {/* ✅ Scan QR Button for Organizer */}
            <button
              className="btn btn-join"
              onClick={() => (window.location.href = "/scan")}
            >
              Scan QR
            </button>
          </>
        ) : isParticipant ? (
          <button className="btn btn-leave" onClick={onLeave}>
            Leave Event
          </button>
        ) : (
          <button
            className="btn btn-join"
            onClick={onJoin}
            disabled={isFull}
          >
            {isFull ? "Event Full" : "Join Event"}
          </button>
        )}
      </div>
    </div>
  );
}
