# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rule# Discussion Forum Microservice

A real-time discussion forum microservice built with Node.js, React.js, and Tailwind CSS, designed for the Learnato ecosystem.

## Features

### Core Features
- ✅ Create posts with titles and content
- ✅ List all posts sorted by votes or date
- ✅ View post details with replies
- ✅ Add replies to posts
- ✅ Upvote posts
- ✅ Responsive UI for desktop and mobile

### Stretch Goals
- ✅ Real-time updates using WebSocket
- ✅ Search functionality
- ✅ Mark posts as answered
- ✅ Clean, modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Real-time**: Socket.io
- **Database**: In-memory storage (easily replaceable)
- **Deployment**: Docker, Docker Compose

## Quick Start

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd discussion-forums.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
