# TeamSync — Team Task Management Platform

TeamSync is a full-stack team collaboration and task management platform built using the MERN stack.  
It supports project management, task assignment, role-based access control, dashboard analytics, and secure authentication.

---

# Live Demo

🔗 Live Application: https://team-sync-six-chi.vercel.app/login

💻 GitHub Repository:  
https://github.com/vaibhav1-prog/TeamSync

---

# Features

- JWT Authentication
- Role-Based Access Control (Admin / Member)
- Project & Team Management
- Task Assignment & Tracking
- Dashboard Analytics
- Overdue Task Monitoring
- RESTful APIs
- Secure Backend Architecture
- MongoDB Database
- Deployment Ready

---

# Tech Stack

## Frontend
- React 18
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js

## Database
- MongoDB Atlas
- Mongoose ODM

## Deployment
- Railway (Backend/server)
- Vercel (Frontend/client)

---

# Frontend Architecture

## Frontend Flow

```text
User Action
   ↓
React Components
   ↓
Axios / Context API
   ↓
Backend REST APIs
   ↓
Express Server
   ↓
Mongoose ODM
   ↓
MongoDB Database
```

## Frontend Folder Structure

```text
client/
│
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

---

# Backend Architecture

## Backend Flow

```text
Client Request
      ↓
Express Routes
      ↓
Controllers
      ↓
Middleware
      ↓
Mongoose ODM
      ↓
MongoDB Database
```

## Backend Folder Structure

```text
server/
│
├── config/
│   └── db.js
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
│   └── generateToken.js
│
├── .env
├── package.json
└── server.js
```

---

# Database Design

```text
User
 ├── Projects
 ├── Assigned Tasks
 └── Role (Admin/Member)

Project
 ├── Members
 └── Tasks

Task
 ├── Assigned User
 ├── Project
 └── Status/Priority
```

---

# API Routes

```text
/api/auth
/api/projects
/api/tasks
/api/dashboard
/api/users
```

---

# Environment Variables

## Backend `.env` (in `/server`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

## Frontend `.env` (in `/client`)
```env
VITE_API_URL=your_vite_url
```

---

# Local Setup

## Clone Repository

```bash
git clone https://github.com/vaibhav1-prog/TeamSync.git

cd TeamSync
```

---

# Backend Setup

```bash
cd server

npm install

npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

# Frontend Setup

```bash
cd client

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Deployment

The application is configured to be deployed using Railway and Vercel.

## Deployment Stack

- Frontend → Vercel
- Backend → Railway
- Database → MongoDB Atlas

---

# Learning Outcomes

- Full-stack MERN architecture design
- NoSQL database design with MongoDB
- Mongoose ODM integration
- Deployment workflows
- JWT authentication
- REST API development
- Role-based access control (RBAC)
- Environment variable management

---

# Author

## Vaibhav

GitHub:  
https://github.com/vaibhav1-prog

---

# Future Improvements

- Real-time notifications
- Team chat system
- Activity logs
- Drag & Drop Kanban Board
- WebSocket integration
- Email notifications

---

# License

This project is built for educational and technical assessment purposes. (MIT License)
