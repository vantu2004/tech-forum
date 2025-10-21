# Tech Forum - MERN Stack Application

A professional networking platform for tech enthusiasts built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- **Authentication & Authorization**

  - Email/Password registration and login
  - Google OAuth integration
  - Email verification
  - Password reset functionality
  - JWT-based authentication

- **User Profile Management**

  - Professional profile creation and editing
  - Skills management
  - Work experience tracking
  - Resume building

- **Social Networking**

  - Connect with other professionals
  - Friend request system
  - Real-time messaging
  - Post creation and sharing
  - Comments and interactions
  - Media sharing (images/files)

- **Activity Feed**
  - Personalized feed
  - Post engagement
  - Network activity tracking

## Technology Stack

### Backend

- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary (Media storage)
- SMTP Email Integration
- Socket.IO for real-time features

### Frontend

- React.js with Vite
- Zustand for state management
- Axios for API requests
- Real-time updates with Socket.IO client

## Project Structure

```
Tech_Forum/
├── backend/                # Backend server code
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── lib/          # Third-party integrations
│   │   ├── smtp/         # Email functionality
│   │   └── utils/        # Utility functions
│
└── frontend/              # Frontend React application
    ├── src/
    │   ├── components/    # Reusable React components
    │   ├── pages/         # Page components
    │   ├── stores/        # Zustand store definitions
    │   ├── hooks/         # Custom React hooks
    │   ├── utils/         # Utility functions
    │   └── lib/          # Third-party integrations
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone [repository-url]
cd Tech_Forum
```

2. Install backend dependencies

```bash
cd backend
npm install
```

3. Install frontend dependencies

```bash
cd frontend
npm install
```

4. Set up environment variables
   Create `.env` files in both backend and frontend directories with necessary configurations.

### Running the Application

1. Start the backend server

```bash
cd backend
npm run dev
```

2. Start the frontend application

```bash
cd frontend
npm run dev
```

## Environment Variables

### Backend (.env)

```
MONGODB_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

### Frontend (.env)

```
VITE_API_URL=
VITE_GOOGLE_CLIENT_ID=
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License

## Acknowledgments

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Socket.IO](https://socket.io/)
