🚀 HackathonForums Documentation

A real-time discussion platform for hackathon participants

Tech Stack Badges:
[Node.js 18+] [MongoDB] [Real-time Chat] [Vite + React] [Tailwind CSS]

📋 Prerequisites

✅ Node.js (v18+ recommended)
✅ npm package manager
✅ MongoDB (local or via Docker)

🎯 Quick Start

Backend:

cd backend
npm install
npm run dev


Frontend:

cd frontend
npm install
npm run dev

📁 Project Structure

HackathonForums/
├── backend/
│ ├── server.js 🚀
│ ├── config/database.js ⚙️
│ ├── controllers/postController.js 🎮
│ ├── models/Post.js 🗃️
│ ├── models/Reply.js 🗃️
│ ├── routes/posts.js 🛣️
│ ├── utils/socket.js 🔌
│ ├── utils/seedData.js 🌱
│ └── services/aiService.js 🤖
└── frontend/
├── src/main.jsx ⚡
├── src/index.css 🎨
├── postcss.config.js 📦
├── tailwind.config.js 🎯
└── src/components/PostCard.jsx 🃏

⚙️ Backend Setup

1️⃣ Install Dependencies

cd backend
npm install


2️⃣ Environment Configuration
Create a .env file (or copy from .env.example):

MONGO_URI=mongodb://localhost:27017/hackathon_forums
PORT=5000


3️⃣ Database Seeding (Optional)

node utils/seedData.js


4️⃣ Start Development Server

npm run dev   # or node server.js


💡 Tip:
If Socket.io import fails:

import { Server as SocketServer } from 'socket.io'

🎨 Frontend Setup (Vite + Tailwind)

1️⃣ Install Dependencies

cd frontend
npm install


2️⃣ Tailwind CSS Configuration

Ensure postcss.config.js contains:

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}


Ensure src/index.css has:

@tailwind base;
@tailwind components;
@tailwind utilities;


3️⃣ Start Development Server

npm run dev

🐳 Docker Setup (Optional)

Build backend and frontend Docker images:

docker build -t hackathon-forums-backend ./backend
docker build -t hackathon-forums-frontend ./frontend

🔧 Troubleshooting

Socket.io Import Error

import { Server as SocketServer } from 'socket.io'


PostCSS Plugin Error
Change plugin key in postcss.config.js to tailwindcss

Tailwind @apply Not Working
Ensure directives in frontend/src/index.css and run:

rm -rf node_modules/.vite
npm install
npm run dev


MongoDB Connection Issues
Check backend/config/database.js and .env MONGO_URI

🔍 Key Files to Explore

📄 backend/controllers/postController.js – API logic (posts, replies, AI helpers)
📄 frontend/src/App.jsx – Authentication & routing entry point
📄 frontend/src/components/PostCard.jsx – Sample UI component

🎯 Running Together

Backend: Port 5000

Frontend: Vite default port 5173

Frontend communicates with backend APIs via backend/routes/posts.js.

🚀 Ready to Hack!

Your HackathonForums platform is now ready! Start building amazing communities!

💻 🚀 🎉