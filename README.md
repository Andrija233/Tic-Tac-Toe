🎮 Tic Tac Toe Project – Full Stack Implementation
A full-stack Tic Tac Toe game application with real-time multiplayer functionality, developed with modern web technologies.

📋 Overview:
This project implements a complete Tic Tac Toe gaming platform with:

User authentication and authorization

Real-time gameplay using WebSockets

Game history tracking

Both REST and GraphQL API endpoints

Responsive UI with Material Design

🏗️ Architecture:
Frontend (React + TypeScript + Vite)
React with TypeScript for type safety

Vite for fast development and building

Material UI for consistent UI components

React Router for navigation

Axios for API communication

Socket.IO client for real-time updates

Context API for state management

Backend (Node.js + Express + TypeScript)
Express.js server with TypeScript

PostgreSQL database with proper relational schema

Socket.IO for real-time multiplayer functionality

JWT for authentication

Apollo Server for GraphQL support (feature/graphql branch)

Database Schema:
sql
users:
- id SERIAL PRIMARY KEY
- username VARCHAR UNIQUE
- password VARCHAR

games:
- id SERIAL PRIMARY KEY
- player_x INT REFERENCES users(id)
- player_o INT REFERENCES users(id)
- type VARCHAR(20) (single | multi)
- current_turn VARCHAR(1) (X | O)
- status VARCHAR(20) (ongoing | finished)
- winner VARCHAR(10) (X | O | draw)
- moves JSONB (move history)

🚀 Quick Start
Using Docker (Recommended)
bash
# Build and start all services
docker-compose up --build

# Access points:
# Frontend: http://localhost:5173
# Backend API: http://localhost:4000
# PostgreSQL: localhost:5432
Manual Installation
Clone and install dependencies:

bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
Set up PostgreSQL database:

sql
CREATE DATABASE tictactoe;
Run the application:

bash
# Backend (runs on port 4000)
cd backend
npm run dev

# Frontend (runs on port 5173)
cd frontend
npm run dev

🔌 API Endpoints
REST API
Auth

POST /auth/register - Register new user

POST /auth/login - Login user

Game

POST /game/create - Create a game (single/multiplayer)

POST /game/join/:id - Join a multiplayer game

POST /game/move/:id - Make a move

GET /game/:id - Get game details

GET /game/history/me - Get user's game history

GET /game/history/all - Get all active games

GraphQL API (feature/graphql branch)
Available at /graphql endpoint

Supports queries and mutations for all game operations

🎮 Features:
✅ User registration and authentication

✅ Single player vs AI mode

✅ Real-time multiplayer mode

✅ Game history tracking

✅ Responsive design with Material UI

✅ WebSocket real-time updates

✅ JWT authentication

✅ TypeScript throughout the codebase

✅ Docker containerization

📁 Project Structure
text
backend/
├── controllers/    # Route handlers
├── services/       # Business logic
├── models/         # Database models
├── routes/         # Express routes
├── middleware/     # Auth and other middleware
├── socket.ts       # Socket.IO configuration
└── index.ts        # Entry point

frontend/
├── src/
│   ├── components/ # React components
│   ├── contexts/   # React contexts
│   ├── pages/      # Page components
│   ├── services/   # API services
│   └── types/      # TypeScript definitions

👨‍💻 Author
Andrija Musić