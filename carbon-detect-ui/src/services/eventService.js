import { authFetch } from "./authFetch";

const BASE_URL = "/api/events";

// Get all events with optional filters
export const getAllEvents = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();

    if (filters.status) queryParams.append("status", filters.status);
    if (filters.location) queryParams.append("location", filters.location);
    if (filters.category) queryParams.append("category", filters.category);

    const response = await authFetch(`${BASE_URL}?${queryParams.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch events");
    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Get single event by ID
export const getEventById = async (eventId) => {
  const response = await authFetch(`${BASE_URL}/${eventId}`);
  if (!response.ok) throw new Error("Failed to fetch event");
  return await response.json();
};

// Create new event
export const createEvent = async (eventData) => {
  const response = await authFetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) throw new Error("Failed to create event");
  return await response.json();
};

// Update event
export const updateEvent = async (eventId, eventData) => {
  const response = await authFetch(`${BASE_URL}/${eventId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) throw new Error("Failed to update event");
  return await response.json();
};

// Delete event
export const deleteEvent = async (eventId) => {
  const response = await authFetch(`${BASE_URL}/${eventId}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete event");
  return await response.json();
};

// Join event
export const joinEvent = async (eventId) => {
  const response = await authFetch(`${BASE_URL}/${eventId}/join`, {
    method: "POST",
  });

  if (!response.ok) throw new Error("Failed to join event");
  return await response.json();
};

// Leave event
export const leaveEvent = async (eventId) => {
  const response = await authFetch(`${BASE_URL}/${eventId}/leave`, {
    method: "POST",
  });

  if (!response.ok) throw new Error("Failed to leave event");
  return await response.json();
};

// Get user's organized events
export const getOrganizedEvents = async () => {
  const response = await authFetch(`${BASE_URL}/user/organized`);
  if (!response.ok) throw new Error("Failed to fetch organized events");
  return await response.json();
};

// Get user's joined events
export const getJoinedEvents = async () => {
  const response = await authFetch(`${BASE_URL}/user/joined`);
  if (!response.ok) throw new Error("Failed to fetch joined events");
  return await response.json();
};

// Mark attendance
export const markAttendance = async (eventId, participantId, attended) => {
  const response = await authFetch(`${BASE_URL}/${eventId}/mark-attendance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ participantId, attended }),
  });

  if (!response.ok) throw new Error("Failed to mark attendance");
  return await response.json();
};
