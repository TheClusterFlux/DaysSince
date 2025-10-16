# Days Since 📅

A modern web application for tracking days since specific events, organized by teams/groups. Built with React frontend and Node.js backend, deployed as a single Docker container.

## Features

- **Team-based Organization**: Each team gets their own URL (e.g., `/dxl`, `/umoja`)
- **Event Tracking**: Track important events with timestamps
- **Days Since Calculation**: Automatic calculation of days since last occurrence
- **Frequency Analysis**: Show patterns and average days between events
- **Modern UI**: Clean, responsive design with friendly interface
- **MongoDB Integration**: Uses existing TheClusterFlux MongoDB infrastructure

## Quick Start

### Local Development

1. **Set up environment variables**:
   ```bash
   export MONGO_PASSWORD="your_mongodb_password"
   ```

2. **Start with Docker Compose**:
   ```bash
   docker-compose up
   ```

3. **Access the application**:
   - Frontend: http://localhost:8080
   - API: http://localhost:8080/api

### Production Deployment

The application is deployed to Kubernetes using the existing TheClusterFlux pipeline:

- **URL**: https://days-since.theclusterflux.com
- **Team URLs**: https://days-since.theclusterflux.com/dxl

## Architecture

### Technology Stack
- **Frontend**: React with Vite
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Deployment**: Single Docker container
- **Styling**: Modern CSS with clean design

### Project Structure
```
DaysSince/
├── backend/           # Node.js API server
├── frontend/          # React application
├── Dockerfile         # Production container
├── docker-compose.yml # Local development
└── deployment.yaml    # Kubernetes deployment
```

## API Endpoints

### Teams
- `GET /api/teams` - List all teams
- `GET /api/teams/:teamName` - Get team configuration
- `POST /api/teams/:teamName` - Create/update team

### Events
- `GET /api/teams/:teamName/events` - Get team events
- `POST /api/teams/:teamName/events` - Create event
- `PUT /api/teams/:teamName/events/:eventId` - Mark event as happened
- `DELETE /api/teams/:teamName/events/:eventId` - Delete event

### Health
- `GET /api/health` - Health check

## Database Schema

### Events Collection
```javascript
{
  _id: ObjectId,
  team: "dxl",
  name: "Last deployment",
  category: "deployment",
  timestamps: ["2024-01-15T10:30:00Z", "2024-01-20T14:15:00Z"],
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-20T14:15:00Z"
}
```

### Teams Collection
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

## Development

### Backend Development
```bash
cd backend
npm install
npm run dev
```

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Building for Production
```bash
docker build -t days-since .
```

## Environment Variables

- `MONGO_PASSWORD`: MongoDB root password
- `IS_LOCAL`: Set to `true` for local development
- `NODE_ENV`: `production` or `development`
- `PORT`: Server port (default: 8080)

## Usage

1. **Create a Team**: Visit the homepage and create your first team
2. **Add Events**: Add events you want to track (deployments, meetings, etc.)
3. **Mark Occurrences**: Click "Mark as happened" when events occur
4. **Track Progress**: View days since last occurrence and frequency patterns

## Team URLs

- **DXL Team**: `/dxl`
- **Umoja Team**: `/umoja`
- **Custom Teams**: `/your-team-name`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with Docker Compose
5. Submit a pull request

## License

This project is part of TheClusterFlux infrastructure.