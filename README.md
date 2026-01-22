## Features

### Currently Implemented

1. **User Authentication** - JWT-based login/register with OAuth support
2. **Dashboard** - User overview with statistics
3. **Maps/Location** - Interactive location features
4. **Events Module** ⭐ NEW - Environmental event management system

---

## Events Module 🌱

A complete environmental events management system for organizing and participating in nature-helping activities.

### Quick Links

- **[Events Documentation](EVENTS_FEATURE_DOCUMENTATION.md)** - Complete feature guide
- **[Quick Start Guide](EVENTS_QUICK_START.md)** - Setup & deployment
- **[Implementation Details](EVENTS_IMPLEMENTATION_DETAILS.md)** - Technical deep dive
- **[Implementation Summary](EVENTS_IMPLEMENTATION_SUMMARY.md)** - Overview
- **[Code Snippets](EVENTS_CODE_SNIPPETS.md)** - Copy-paste examples

### Key Features

- ✅ Create/Edit/Delete events
- ✅ Join/Leave events
- ✅ Automatic event status lifecycle (Upcoming → Active → Archived)
- ✅ Filter by status, location, category
- ✅ Participant tracking
- ✅ Three-tab interface (Browse/My Events/Joined)
- ✅ Secure JWT authentication
- ✅ Professional UI with Tailwind CSS

### Files Created/Updated

**Backend:**

- `backend/models/Event.js` - Event schema with auto-status
- `backend/controllers/eventController.js` - Business logic
- `backend/routes/eventRoutes.js` - API endpoints
- `backend/server.js` - Updated with event routes

**Frontend:**

- `carbon-detect-ui/src/pages/EventsPage.jsx` - Main page
- `carbon-detect-ui/src/components/EventCard.jsx` - Event display
- `carbon-detect-ui/src/components/EventFilters.jsx` - Filters
- `carbon-detect-ui/src/components/EventModal.jsx` - Create/Edit form
- `carbon-detect-ui/src/services/eventService.js` - API integration
- `carbon-detect-ui/src/components/TopNav.jsx` - Updated navbar
- `carbon-detect-ui/src/App.jsx` - Updated routes

### API Endpoints

```
GET    /api/events                        List all events (public)
POST   /api/events                        Create event (auth required)
GET    /api/events/:id                    Get event details (public)
PUT    /api/events/:id                    Update event (organizer only)
DELETE /api/events/:id                    Delete event (organizer only)
POST   /api/events/:id/join               Join event (auth required)
POST   /api/events/:id/leave              Leave event (auth required)
GET    /api/events/user/organized         User's organized events
GET    /api/events/user/joined            User's joined events
POST   /api/events/:id/mark-attendance    Mark attendance (organizer)
```

### Getting Started with Events

1. Start backend: `npm start` (from backend/)
2. Start frontend: `npm run dev` (from carbon-detect-ui/)
3. Login to application
4. Click "Events" in navbar
5. Create your first environmental event!

---

## Authentication & Security

The application uses JWT-based authentication.

### Current Implementation

- Access tokens issued on login
- Tokens verified via middleware on protected routes
- OAuth users must complete profile before access
- Token tampering handled via silent logout
- Events module secured with JWT authentication

### Security Considerations

- Short-lived JWTs
- Protected backend routes
- Role-based access support
- Authorization checks for event operations
- Input validation on client and server

### Future Improvements

- Migrate JWT storage to httpOnly cookies
- Add refresh token rotation
- Integrate Amazon SES for email delivery
- Event notification system
