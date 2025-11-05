<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HackathonForums - Documentation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: white;
            border-radius: 15px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            margin-bottom: 30px;
            border: 3px solid #0b5;
        }

        .header h1 {
            color: #0b5;
            font-size: 3em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        .badges {
            margin: 20px 0;
        }

        .badge {
            display: inline-block;
            background: #0b5;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            margin: 5px;
            font-size: 0.9em;
            font-weight: bold;
        }

        .content-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
        }

        .card {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        }

        .card h2 {
            color: #0b5;
            border-bottom: 3px solid #0b5;
            padding-bottom: 10px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .card h2::before {
            content: "▶";
            font-size: 0.8em;
        }

        .prerequisites {
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            color: white;
        }

        .prerequisites h2 {
            color: white;
            border-bottom-color: white;
        }

        .file-structure {
            grid-column: 1 / -1;
        }

        .file-tree {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 20px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            margin: 15px 0;
        }

        .file-item {
            margin: 5px 0;
            padding-left: 20px;
        }

        .folder {
            color: #569cd6;
            font-weight: bold;
        }

        .file {
            color: #9cdcfe;
        }

        .setup-steps {
            grid-column: 1 / -1;
        }

        .step {
            background: #f8f9fa;
            border-left: 4px solid #0b5;
            padding: 20px;
            margin: 15px 0;
            border-radius: 0 8px 8px 0;
        }

        .step h3 {
            color: #0b5;
            margin-bottom: 10px;
        }

        pre {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 15px 0;
            border: 1px solid #333;
        }

        code {
            background: #f1f3f4;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            color: #d32f2f;
        }

        .troubleshooting {
            background: #fff3cd;
            border: 2px solid #ffc107;
        }

        .troubleshooting h2 {
            color: #856404;
            border-bottom-color: #ffc107;
        }

        .tip {
            background: #d1ecf1;
            border: 2px solid #0dcaf0;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
        }

        @media (max-width: 768px) {
            .content-grid {
                grid-template-columns: 1fr;
            }
            
            .header h1 {
                font-size: 2em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 HackathonForums</h1>
            <p style="font-size: 1.2em; color: #666; margin-bottom: 20px;">
                A real-time discussion platform for hackathon participants
            </p>
            <div class="badges">
                <span class="badge">Node.js 18+</span>
                <span class="badge">MongoDB</span>
                <span class="badge">Real-time Chat</span>
                <span class="badge">Vite + React</span>
                <span class="badge">Tailwind CSS</span>
            </div>
        </div>

        <div class="content-grid">
            <div class="card prerequisites">
                <h2>📋 Prerequisites</h2>
                <ul style="list-style: none; font-size: 1.1em;">
                    <li style="margin: 15px 0; padding-left: 25px; position: relative;">
                        <span style="position: absolute; left: 0;">✅</span>
                        <strong>Node.js</strong> (v18+ recommended)
                    </li>
                    <li style="margin: 15px 0; padding-left: 25px; position: relative;">
                        <span style="position: absolute; left: 0;">✅</span>
                        <strong>npm</strong> package manager
                    </li>
                    <li style="margin: 15px 0; padding-left: 25px; position: relative;">
                        <span style="position: absolute; left: 0;">✅</span>
                        <strong>MongoDB</strong> (local or via Docker)
                    </li>
                </ul>
            </div>

            <div class="card">
                <h2>🎯 Quick Start</h2>
                <p>Get up and running in 5 minutes:</p>
                <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <strong>Backend:</strong> <code>cd backend && npm install && npm run dev</code><br>
                    <strong>Frontend:</strong> <code>cd frontend && npm install && npm run dev</code>
                </div>
            </div>

            <div class="card file-structure">
                <h2>📁 Project Structure</h2>
                <div class="file-tree">
                    <div class="file-item folder">HackathonForums/</div>
                    <div class="file-item folder" style="padding-left: 20px;">📂 backend/</div>
                    <div class="file-item file" style="padding-left: 40px;">🚀 server.js</div>
                    <div class="file-item file" style="padding-left: 40px;">⚙️ config/database.js</div>
                    <div class="file-item file" style="padding-left: 40px;">🎮 controllers/postController.js</div>
                    <div class="file-item file" style="padding-left: 40px;">🗃️ models/Post.js</div>
                    <div class="file-item file" style="padding-left: 40px;">🗃️ models/Reply.js</div>
                    <div class="file-item file" style="padding-left: 40px;">🛣️ routes/posts.js</div>
                    <div class="file-item file" style="padding-left: 40px;">🔌 utils/socket.js</div>
                    <div class="file-item file" style="padding-left: 40px;">🌱 utils/seedData.js</div>
                    <div class="file-item file" style="padding-left: 40px;">🤖 services/aiService.js</div>
                    
                    <div class="file-item folder" style="padding-left: 20px;">📂 frontend/</div>
                    <div class="file-item file" style="padding-left: 40px;">⚡ src/main.jsx</div>
                    <div class="file-item file" style="padding-left: 40px;">🎨 src/index.css</div>
                    <div class="file-item file" style="padding-left: 40px;">📦 postcss.config.js</div>
                    <div class="file-item file" style="padding-left: 40px;">🎯 tailwind.config.js</div>
                    <div class="file-item file" style="padding-left: 40px;">🃏 src/components/PostCard.jsx</div>
                </div>
            </div>

            <div class="card setup-steps">
                <h2>⚙️ Backend Setup</h2>
                
                <div class="step">
                    <h3>1. Install Dependencies</h3>
                    <pre><code>cd backend
npm install</code></pre>
                </div>

                <div class="step">
                    <h3>2. Environment Configuration</h3>
                    <p>Create <code>.env</code> file (copy from <code>.env.example</code> if available):</p>
                    <pre><code>MONGO_URI=mongodb://localhost:27017/hackathon_forums
PORT=5000</code></pre>
                </div>

                <div class="step">
                    <h3>3. Database Seeding (Optional)</h3>
                    <pre><code>node utils/seedData.js</code></pre>
                </div>

                <div class="step">
                    <h3>4. Start Development Server</h3>
                    <pre><code>npm run dev
# or
node server.js</code></pre>
                </div>

                <div class="tip">
                    <strong>💡 Socket.io Tip:</strong> If you encounter import errors, ensure your server uses:<br>
                    <code>import { Server as SocketServer } from 'socket.io'</code>
                </div>
            </div>

            <div class="card setup-steps">
                <h2>🎨 Frontend Setup (Vite + Tailwind)</h2>
                
                <div class="step">
                    <h3>1. Install Dependencies</h3>
                    <pre><code>cd frontend
npm install</code></pre>
                </div>

                <div class="step">
                    <h3>2. Tailwind CSS Configuration</h3>
                    <p>Ensure <code>postcss.config.js</code> contains:</p>
                    <pre><code>export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}</code></pre>
                    
                    <p>Ensure <code>src/index.css</code> has Tailwind directives:</p>
                    <pre><code>@tailwind base;
@tailwind components;
@tailwind utilities;</code></pre>
                </div>

                <div class="step">
                    <h3>3. Start Development Server</h3>
                    <pre><code>npm run dev</code></pre>
                </div>
            </div>

            <div class="card">
                <h2>🐳 Docker Setup (Optional)</h2>
                <p>Backend and frontend Dockerfiles are available:</p>
                <ul style="margin: 15px 0; padding-left: 20px;">
                    <li><code>backend/Dockerfile</code></li>
                    <li><code>frontend/Dockerfile</code></li>
                </ul>
                <p>Build and run using:</p>
                <pre><code>docker build -t hackathon-forums-backend ./backend
docker build -t hackathon-forums-frontend ./frontend</code></pre>
            </div>

            <div class="card troubleshooting">
                <h2>🔧 Troubleshooting</h2>
                
                <div class="step">
                    <h3>Socket.io Import Error</h3>
                    <p>Use named import in <code>backend/server.js</code>:</p>
                    <pre><code>import { Server as SocketServer } from 'socket.io'</code></pre>
                </div>

                <div class="step">
                    <h3>PostCSS Plugin Error</h3>
                    <p>Change plugin key in <code>frontend/postcss.config.js</code>:</p>
                    <pre><code>// Change from:
'tailwindcss/postcss'

// To:
'tailwindcss'</code></pre>
                </div>

                <div class="step">
                    <h3>Tailwind @apply Not Working</h3>
                    <p>Ensure directives are in <code>frontend/src/index.css</code>, then:</p>
                    <pre><code># Clear Vite cache
rm -rf node_modules/.vite
npm install
npm run dev</code></pre>
                </div>

                <div class="step">
                    <h3>MongoDB Connection Issues</h3>
                    <p>Verify <code>backend/config/database.js</code> and <code>MONGO_URI</code> in your <code>.env</code> file.</p>
                </div>
            </div>

            <div class="card">
                <h2>🔍 Key Files to Explore</h2>
                <ul style="list-style: none;">
                    <li style="margin: 10px 0; padding-left: 25px; position: relative;">
                        <span style="position: absolute; left: 0;">📄</span>
                        <code>backend/controllers/postController.js</code> - API logic (posts, replies, AI helpers)
                    </li>
                    <li style="margin: 10px 0; padding-left: 25px; position: relative;">
                        <span style="position: absolute; left: 0;">📄</span>
                        <code>frontend/src/App.jsx</code> - Authentication & routing entry point
                    </li>
                    <li style="margin: 10px 0; padding-left: 25px; position: relative;">
                        <span style="position: absolute; left: 0;">📄</span>
                        <code>frontend/src/components/PostCard.jsx</code> - Sample UI component
                    </li>
                </ul>
            </div>

            <div class="card">
                <h2>🎯 Running Together</h2>
                <p>Run both servers concurrently:</p>
                <ul style="margin: 15px 0; padding-left: 20px;">
                    <li><strong>Backend:</strong> Typically runs on port 5000</li>
                    <li><strong>Frontend:</strong> Vite default port 5173</li>
                </ul>
                <p>The frontend will call API endpoints defined in <code>backend/routes/posts.js</code></p>
            </div>
        </div>

        <div class="card" style="text-align: center; background: linear-gradient(135deg, #0b5, #08c); color: white;">
            <h2 style="color: white; border-bottom-color: white;">🚀 Ready to Hack!</h2>
            <p style="font-size: 1.2em; margin: 20px 0;">
                Your HackathonForums platform is now ready! Start building amazing communities!
            </p>
            <div style="font-size: 2em; margin: 20px 0;">
                💻 🚀 🎉
            </div>
        </div>
    </div>
</body>
</html>