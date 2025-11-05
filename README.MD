<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>HackathonForums — Setup & Run</title>
  <style>
    body { font-family: Arial, sans-serif; line-height:1.6; margin:24px; color:#111 }
    pre { background:#f6f8fa; padding:12px; border-radius:6px; overflow:auto }
    code { font-family: Consolas, "Courier New", monospace; }
    h1,h2 { color:#0b5; }
    a { color:#0366d6; text-decoration:none; }
    .muted { color:#555; font-size:0.95em; }
  </style>
</head>
<body>
  <h1>HackathonForums — Setup & Run</h1>

  <h2>Prerequisites</h2>
  <ul>
    <li>Node.js (v18+ recommended)</li>
    <li>npm</li>
    <li>MongoDB (local or via Docker)</li>
  </ul>

  <h2>Quick file references</h2>
  <ul>
    <li>Backend entry: backend/server.js</li>
    <li>Backend config: backend/config/database.js</li>
    <li>API controllers: backend/controllers/postController.js</li>
    <li>Models: backend/models/Post.js, backend/models/Reply.js</li>
    <li>Routes: backend/routes/posts.js</li>
    <li>Socket util: backend/utils/socket.js</li>
    <li>Seed helper: backend/utils/seedData.js</li>
    <li>AI service: backend/services/aiService.js</li>
    <li>Frontend entry: frontend/src/main.jsx</li>
    <li>Tailwind / PostCSS: frontend/postcss.config.js, frontend/tailwind.config.js, frontend/src/index.css</li>
    <li>Example UI component: frontend/src/components/PostCard.jsx</li>
    <li>Package manifests: backend/package.json, frontend/package.json</li>
  </ul>

  <h2>Backend — local</h2>
  <ol>
    <li>Open terminal, navigate to backend:
      <pre><code>cd backend
npm install</code></pre>
    </li>
    <li>Create <code>.env</code> (or copy <code>.env.example</code>) with at least:
      <ul class="muted">
        <li><code>MONGO_URI</code> (e.g. <code>mongodb://localhost:27017/hackathon_forums</code>)</li>
        <li><code>PORT</code> (optional)</li>
      </ul>
    </li>
    <li>(Optional) seed DB:
      <pre><code>node utils/seedData.js</code></pre>
    </li>
    <li>Start dev server:
      <pre><code>npm run dev
# or
node server.js</code></pre>
    </li>
    <li class="muted">If you see the socket.io import error: ensure server uses the named Server import:
      <pre><code>import { Server as SocketServer } from 'socket.io'</code></pre>
    </li>
  </ol>

  <h2>Frontend — local (Vite + Tailwind)</h2>
  <ol>
    <li>Open terminal, navigate to frontend:
      <pre><code>cd frontend
npm install</code></pre>
    </li>
    <li>PostCSS / Tailwind:
      <ul>
        <li>Ensure <code>frontend/postcss.config.js</code> uses:
          <pre><code>export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}</code></pre>
        </li>
        <li>Ensure <code>frontend/src/index.css</code> contains Tailwind directives (do NOT use <code>@import "tailwindcss"</code>):
          <pre><code>@tailwind base;
@tailwind components;
@tailwind utilities;</code></pre>
          Put any <code>@layer base</code> or <code>@layer components</code> after these directives.
        </li>
      </ul>
    </li>
    <li>Start frontend:
      <pre><code>npm run dev</code></pre>
    </li>
    <li class="muted">If <code>@apply</code> rules fail: restart dev server, clear Vite cache (remove <code>node_modules/.vite</code>) and reinstall. Ensure <code>tailwindcss</code>, <code>postcss</code>, <code>autoprefixer</code> are installed.</li>
  </ol>

  <h2>Run together</h2>
  <p>Run backend (e.g. port 5000) and frontend (Vite default 5173) concurrently. Frontend should call backend API endpoints declared in <code>backend/routes/posts.js</code>.</p>

  <h2>Docker (optional)</h2>
  <p>Backend and frontend Dockerfiles exist (backend/Dockerfile, frontend/DockerFile). Build images with <code>docker build</code> or create a <code>docker-compose.yml</code> to run Mongo + backend + frontend.</p>

  <h2>Troubleshooting</h2>
  <ul>
    <li><strong>socket.io import error:</strong> use <code>import { Server as SocketServer } from 'socket.io'</code> in backend/server.js.</li>
    <li><strong>PostCSS plugin error:</strong> change plugin key from <code>'tailwindcss/postcss'</code> to <code>'tailwindcss'</code> in <code>frontend/postcss.config.js</code>.</li>
    <li><strong>Tailwind <code>@apply</code> not working:</strong> ensure directives are in <code>frontend/src/index.css</code>, then restart Vite and clear cache.</li>
    <li><strong>MongoDB connection:</strong> verify backend/config/database.js and <code>MONGO_URI</code>.</li>
  </ul>

  <h2>Useful files to inspect</h2>
  <ul>
    <li><code>backend/controllers/postController.js</code> — API logic (posts, replies, AI helpers)</li>
    <li><code>frontend/src/App.jsx</code> — auth + routing entry</li>
    <li><code>frontend/src/components/PostCard.jsx</code> — sample UI card</li>
  </ul>

  <h2>Extras</h2>
  <p>If you want, I can generate a HTML README file in the workspace, add a sample <code>.env.example</code>, or add npm scripts to run both servers concurrently.</p>
</body>
</html>
```// filepath: c:\Users\ADITYA KUMAR\OneDrive\Desktop\HackathonForums\README.html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>HackathonForums — Setup & Run</title>
  <style>
    body { font-family: Arial, sans-serif; line-height:1.6; margin:24px; color:#111 }
    pre { background:#f6f8fa; padding:12px; border-radius:6px; overflow:auto }
    code { font-family: Consolas, "Courier New", monospace; }
    h1,h2 { color:#0b5; }
    a { color:#0366d6; text-decoration:none; }
    .muted { color:#555; font-size:0.95em; }
  </style>
</head>
<body>
  <h1>HackathonForums — Setup & Run</h1>

  <h2>Prerequisites</h2>
  <ul>
    <li>Node.js (v18+ recommended)</li>
    <li>npm</li>
    <li>MongoDB (local or via Docker)</li>
  </ul>

  <h2>Quick file references</h2>
  <ul>
    <li>Backend entry: backend/server.js</li>
    <li>Backend config: backend/config/database.js</li>
    <li>API controllers: backend/controllers/postController.js</li>
    <li>Models: backend/models/Post.js, backend/models/Reply.js</li>
    <li>Routes: backend/routes/posts.js</li>
    <li>Socket util: backend/utils/socket.js</li>
    <li>Seed helper: backend/utils/seedData.js</li>
    <li>AI service: backend/services/aiService.js</li>
    <li>Frontend entry: frontend/src/main.jsx</li>
    <li>Tailwind / PostCSS: frontend/postcss.config.js, frontend/tailwind.config.js, frontend/src/index.css</li>
    <li>Example UI component: frontend/src/components/PostCard.jsx</li>
    <li>Package manifests: backend/package.json, frontend/package.json</li>
  </ul>

  <h2>Backend — local</h2>
  <ol>
    <li>Open terminal, navigate to backend:
      <pre><code>cd backend
npm install</code></pre>
    </li>
    <li>Create <code>.env</code> (or copy <code>.env.example</code>) with at least:
      <ul class="muted">
        <li><code>MONGO_URI</code> (e.g. <code>mongodb://localhost:27017/hackathon_forums</code>)</li>
        <li><code>PORT</code> (optional)</li>
      </ul>
    </li>
    <li>(Optional) seed DB:
      <pre><code>node utils/seedData.js</code></pre>
    </li>
    <li>Start dev server:
      <pre><code>npm run dev
# or
node server.js</code></pre>
    </li>
    <li class="muted">If you see the socket.io import error: ensure server uses the named Server import:
      <pre><code>import { Server as SocketServer } from 'socket.io'</code></pre>
    </li>
  </ol>

  <h2>Frontend — local (Vite + Tailwind)</h2>
  <ol>
    <li>Open terminal, navigate to frontend:
      <pre><code>cd frontend
npm install</code></pre>
    </li>
    <li>PostCSS / Tailwind:
      <ul>
        <li>Ensure <code>frontend/postcss.config.js</code> uses:
          <pre><code>export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}</code></pre>
        </li>
        <li>Ensure <code>frontend/src/index.css</code> contains Tailwind directives (do NOT use <code>@import "tailwindcss"</code>):
          <pre><code>@tailwind base;
@tailwind components;
@tailwind utilities;</code></pre>
          Put any <code>@layer base</code> or <code>@layer components</code> after these directives.
        </li>
      </ul>
    </li>
    <li>Start frontend:
      <pre><code>npm run dev</code></pre>
    </li>
    <li class="muted">If <code>@apply</code> rules fail: restart dev server, clear Vite cache (remove <code>node_modules/.vite</code>) and reinstall. Ensure <code>tailwindcss</code>, <code>postcss</code>, <code>autoprefixer</code> are installed.</li>
  </ol>

  <h2>Run together</h2>
  <p>Run backend (e.g. port 5000) and frontend (Vite default 5173) concurrently. Frontend should call backend API endpoints declared in <code>backend/routes/posts.js</code>.</p>

  <h2>Docker (optional)</h2>
  <p>Backend and frontend Dockerfiles exist (backend/Dockerfile, frontend/DockerFile). Build images with <code>docker build</code> or create a <code>docker-compose.yml</code> to run Mongo + backend + frontend.</p>

  <h2>Troubleshooting</h2>
  <ul>
    <li><strong>socket.io import error:</strong> use <code>import { Server as SocketServer } from 'socket.io'</code> in backend/server.js.</li>
    <li><strong>PostCSS plugin error:</strong> change plugin key from <code>'tailwindcss/postcss'</code> to <code>'tailwindcss'</code> in <code>frontend/postcss.config.js</code>.</li>
    <li><strong>Tailwind <code>@apply</code> not working:</strong> ensure directives are in <code>frontend/src/index.css</code>, then restart Vite and clear cache.</li>
    <li><strong>MongoDB connection:</strong> verify backend/config/database.js and <code>MONGO_URI</code>.</li>
  </ul>

  <h2>Useful files to inspect</h2>
  <ul>
    <li><code>backend/controllers/postController.js</code> — API logic (posts, replies, AI helpers)</li>
    <li><code>frontend/src/App.jsx</code> — auth + routing entry</li>
    <li><code>frontend/src/components/PostCard.jsx</code> — sample UI card</li>
  </ul>

  <h2>Extras</h2>
  <p>If you want, I can generate a HTML README file in the workspace, add a sample <code>.env.example</code>, or add npm scripts to run both servers concurrently.</p>
</body>
</html>