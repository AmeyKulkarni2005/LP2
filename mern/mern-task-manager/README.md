# ✅ Enterprise Task Management System

A productivity-focused task orchestration platform. This application demonstrates a modern MERN stack architecture with a focus on task prioritization and state synchronization.

## 🚀 Key Features

- **State Management:** Real-time task status toggling and priority filtering.
- **RESTful Orchestration:** Decoupled API architecture for high-performance task management.
- **Data Sovereignty:** Local MongoDB integration for secure, isolated data storage.
- **Cloud Optimized:** Lightweight design suitable for 1vCPU cloud instances.

## 🛠️ Technology Stack

- **Frontend:** React, Axios, Productivity Theme
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB (Local Instance)
- **Deployment:** PM2 for high availability

## 💻 Local Development Setup

### 1. Database Setup (MongoDB)

If you are on Ubuntu 24.04 (noble), install MongoDB 8.0 with the official repository and keyring:

```bash
sudo apt-get update
sudo apt-get install -y gnupg curl
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl daemon-reload
sudo systemctl start mongod
sudo systemctl status mongod
mongosh
```

Make sure the service status shows `Active: active (running)` before starting the backend.

If you already have MongoDB installed, the default connection is `mongodb://127.0.0.1:27017/task-db`.

Use MongoDB Compass or `mongosh` to verify connectivity.

### 2. Backend Setup

### 2. Node.js Setup (nvm)

Install `nvm` and Node.js 24 before running the backend or frontend:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash

# In lieu of restarting the shell
. "$HOME/.nvm/nvm.sh"

# Download and install Node.js
nvm install 24

# Verify the Node.js version
node -v

# Verify npm version
npm -v
```

The expected versions are `v24.15.0` for Node.js and `11.12.1` for npm.

### 3. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/task-db
   ```
4. Start the server:
   ```bash
   npm start
   ```
   The backend should now be running on `http://localhost:5000`.

### 4. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Create a `.env` file in the `frontend` folder and set the API URL to your server IP:
   ```env
   VITE_API_URL=http://public_ip:5000/api/tasks
   ```
   Replace `public_ip` with the actual public IP address or hostname of your backend server.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend should now be accessible at `http://localhost:5173`.

## 📊 API Interface

- `GET /api/tasks` - Fetch all task assignments.
- `POST /api/tasks` - Create new task.
- `PUT /api/tasks/:id` - Update task status or priority.
- `DELETE /api/tasks/:id` - Archive/Remove task.

## 🛠️ Troubleshooting (Local)

- **Version Mismatch:** Ensure you are using **Node.js 18+**. Older versions may not support the modern syntax in this project.
- **CORS Errors:** Ensure the backend has `cors` enabled.
- **Mongo Error:** Use `127.0.0.1` instead of `localhost` in your `.env` to avoid IPv6 resolution issues.
- **Node Version:** Recommended Node.js version 18.x or 20.x.

---

_Developed for Academic Practical Examination - Cloud Computing & LP2._
