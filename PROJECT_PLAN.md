# Days Since - Project Plan

## Overview
A modern web application for tracking days since specific events, organized by teams/groups. The application will be deployed as a single Docker container with both frontend and backend components.

## Architecture

### Technology Stack
- **Backend**: Node.js with Express.js
- **Frontend**: React with modern UI components
- **Database**: MongoDB (using existing TheClusterFlux infrastructure)
- **Deployment**: Single Docker container
- **Styling**: Modern CSS with clean, friendly design

### Project Structure
```
DaysSince/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── server.js
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   ├── public/
│   ├── package.json
│   └── build/
├── docker-compose.yml (for local development)
├── Dockerfile (production)
└── deployment.yaml
```

## Database Schema

### Collections
1. **`events`** - Individual event records
2. **`teams`** - Team/group configurations

### Event Document Structure
```javascript
{
  _id: ObjectId,
  team: "dxl" | "umoja" | "custom-team-name",
  name: "Last deployment",
  category: "deployment" | "meeting" | "release" | "custom",
  timestamps: [
    "2024-01-15T10:30:00Z",
    "2024-01-20T14:15:00Z",
    "2024-01-25T09:45:00Z"
  ],
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-25T09:45:00Z"
}
```

### Team Document Structure
```javascript
{
  _id: ObjectId,
  name: "dxl",
  displayName: "DXL Team",
  description: "Days since tracking for DXL team",
  categories: ["deployment", "meeting", "release"],
  createdAt: "2024-01-15T10:30:00Z"
}
```

## API Endpoints

### Team-based Routes
- `GET /api/teams/:teamName/events` - Get all events for a team
- `POST /api/teams/:teamName/events` - Create new event
- `PUT /api/teams/:teamName/events/:eventId` - Update event (add timestamp)
- `DELETE /api/teams/:teamName/events/:eventId` - Delete event
- `GET /api/teams/:teamName` - Get team configuration
- `POST /api/teams/:teamName` - Create/update team configuration

### General Routes
- `GET /api/teams` - List all teams
- `GET /api/health` - Health check

## Frontend Features

### Main Dashboard
- **Team Selection**: Dropdown or navigation for different teams
- **Event List**: Cards showing each event with:
  - Event name and category
  - Days since last occurrence
  - Last occurrence date
  - Frequency analysis (average days between events)
  - Quick "Mark as happened" button

### Event Management
- **Add Event**: Form to create new events
- **Edit Event**: Modify event details
- **Delete Event**: Remove events with confirmation
- **Mark Occurrence**: Quick button to add current timestamp

### UI Design Principles
- **Modern**: Clean, minimalist design with subtle shadows and rounded corners
- **Friendly**: Warm colors, friendly icons, encouraging messaging
- **Responsive**: Works on desktop, tablet, and mobile
- **Accessible**: Good contrast, keyboard navigation, screen reader friendly

### Color Scheme
- Primary: Modern blue (#3B82F6)
- Secondary: Warm orange (#F59E0B)
- Success: Green (#10B981)
- Background: Light gray (#F9FAFB)
- Text: Dark gray (#1F2937)

## Routing Strategy

### Frontend Routes
- `/` - Default team (dxl) or team selection
- `/:teamName` - Specific team dashboard
- `/:teamName/add-event` - Add new event
- `/:teamName/edit/:eventId` - Edit event

### Backend Proxy
- All `/api/*` requests go to backend
- All other requests serve the React app
- React Router handles client-side routing

## Deployment

### Docker Configuration
- **Multi-stage build**: Build React app, then serve with Node.js
- **Port**: 8080 (as per TheClusterFlux standard)
- **Environment**: Production and local development support

### Environment Variables
```bash
# MongoDB Configuration
MONGO_PASSWORD=<password_from_secret>
IS_LOCAL=true  # for local development

# Application Configuration
NODE_ENV=production
PORT=8080
```

### Local Development
- Docker Compose for easy local setup
- Hot reload for both frontend and backend
- MongoDB connection to localhost:27016

## Security Considerations

### API Security
- Input validation on all endpoints
- Rate limiting for API calls
- CORS configuration for frontend
- No authentication required (internal tool)

### Data Validation
- Validate team names (alphanumeric + hyphens)
- Validate event names and categories
- Sanitize all user inputs
- Prevent duplicate timestamps

## Features to Implement

### Phase 1 (Core Features)
1. ✅ Team-based routing and navigation
2. ✅ Event listing with days since calculation
3. ✅ Add new events
4. ✅ Mark events as happened (add timestamp)
5. ✅ Basic team configuration

### Phase 2 (Enhanced Features)
1. Event categories and filtering
2. Frequency analysis and trends
3. Export functionality
4. Event history and timeline
5. Bulk operations


## Development Workflow

### Local Development
1. Run `docker-compose up` for local development
2. Frontend available at `http://localhost:3000`
3. Backend API at `http://localhost:3001`
4. MongoDB at `localhost:27016`

### Production Deployment
1. Build Docker image
2. Deploy to Kubernetes using existing pipeline
3. Access via `days-since.theclusterflux.com`
4. Team-specific URLs: `days-since.theclusterflux.com/dxl`

## File Organization

### Backend Structure
```
backend/
├── src/
│   ├── routes/
│   │   ├── teams.js
│   │   ├── events.js
│   │   └── health.js
│   ├── models/
│   │   ├── Event.js
│   │   └── Team.js
│   ├── middleware/
│   │   ├── validation.js
│   │   ├── cors.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   ├── database.js
│   │   └── dateUtils.js
│   └── server.js
├── package.json
└── Dockerfile
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── EventCard.js
│   │   ├── EventForm.js
│   │   ├── TeamSelector.js
│   │   ├── Header.js
│   │   └── Layout.js
│   ├── pages/
│   │   ├── Dashboard.js
│   │   ├── AddEvent.js
│   │   └── EditEvent.js
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── dateUtils.js
│   ├── styles/
│   │   └── globals.css
│   └── App.js
├── public/
│   ├── index.html
│   └── favicon.ico
└── package.json
```

## Success Metrics

### Functional Requirements
- ✅ Track days since events for multiple teams
- ✅ Add and manage events easily
- ✅ Modern, responsive UI
- ✅ Single container deployment
- ✅ MongoDB integration

### Performance Requirements
- Page load time < 2 seconds
- API response time < 500ms
- Support for 100+ events per team
- Mobile-responsive design

### User Experience Requirements
- Intuitive navigation between teams
- Clear visual indication of days since
- Easy event management
- Clean, professional appearance

## Next Steps

1. **Review and Approve Plan** - Get feedback on architecture and features
2. **Set up Project Structure** - Create directories and basic files
3. **Implement Backend** - Build API endpoints and database models
4. **Create Frontend** - Build React components and pages
5. **Docker Configuration** - Set up containerization
6. **Testing** - Local development and deployment testing
7. **Deployment** - Push to production via existing pipeline

---

This plan provides a comprehensive foundation for building the Days Since application. The architecture is scalable, the UI will be modern and user-friendly, and the deployment strategy aligns with your existing infrastructure.
