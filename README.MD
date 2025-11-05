# HackathonForums — Setup & Run

This README explains how to set up and run the project locally (backend + frontend).

Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB (local or via Docker)

Quick file references
- Backend entry: [backend/server.js](backend/server.js)  
- Backend config: [backend/config/database.js](backend/config/database.js)  
- API controllers: [`getAllPosts`](backend/controllers/postController.js), [`getPostById`](backend/controllers/postController.js), [`createPost`](backend/controllers/postController.js), [`addReply`](backend/controllers/postController.js), [`upvotePost`](backend/controllers/postController.js), [`markAsAnswered`](backend/controllers/postController.js), [`getSimilarQuestions`](backend/controllers/postController.js), [`getDiscussionSummary`](backend/controllers/postController.js) — see [backend/controllers/postController.js](backend/controllers/postController.js)  
- Models: [backend/models/Post.js](backend/models/Post.js), [backend/models/Reply.js](backend/models/Reply.js)  
- Routes: [backend/routes/posts.js](backend/routes/posts.js)  
- Socket util: [backend/utils/socket.js](backend/utils/socket.js)  
- Seed helper: [backend/utils/seedData.js](backend/utils/seedData.js)  
- AI service: [backend/services/aiService.js](backend/services/aiService.js) — see [`AIService.findSimilarQuestions`](backend/services/aiService.js) and [`AIService.generateSummary`](backend/services/aiService.js)  
- Frontend entry: [frontend/src/main.jsx](frontend/src/main.jsx)  
- Tailwind / PostCSS: [frontend/postcss.config.js](frontend/postcss.config.js), [frontend/tailwind.config.js](frontend/tailwind.config.js), [frontend/src/index.css](frontend/src/index.css)  
- Example UI component: [frontend/src/components/PostCard.jsx](frontend/src/components/PostCard.jsx)  
- Package manifests: [backend/package.json](backend/package.json), [frontend/package.json](frontend/package.json)

Backend — local
1. Open terminal, navigate to backend:
```sh
cd backend
npm install