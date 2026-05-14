# 📝 MERN Blog Application

A robust Full-Stack blogging platform designed for distributed cloud environments. This application demonstrates a decoupled architecture with a focus on high availability and self-hosted database management.

## 🚀 Architectural Features

- **Decoupled Frontend:** Built with React.js using functional components and custom hooks for efficient state management.
- **RESTful Backend:** Express.js server implementing standard HTTP verbs for CRUD operations.
- **Self-Hosted Persistence:** Integrated with a local MongoDB instance to ensure full data sovereignty and zero dependency on managed cloud databases.
- **Cross-Origin Resource Sharing (CORS):** Fully configured middleware for secure cross-domain communication.

## 🛠️ Technology Stack

- **Frontend:** React (Vite), Axios, CSS3
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB (Local Instance)
- **Deployment:** PM2 Process Management

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

If you already have MongoDB installed, the default connection is `mongodb://127.0.0.1:27017/blog-db`.

Use MongoDB Compass or `mongosh` to verify connectivity.

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
   MONGO_URI=mongodb://127.0.0.1:27017/blog-db
   ```
4. Start the server:

   ```bash
   npm start

   NODE_ENV=production npm start
   ```

   The backend should now be running on `http://localhost:5000`.

### 4. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Create a `.env` file in the `frontend` folder and set the API URL to your server IP:
   ```env
   VITE_API_URL=http://public_ip:5000/api/blogs
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

## 📊 API Documentation

- `GET /api/blogs` - Fetch all published content.
- `POST /api/blogs` - Publish new content with server-side validation.
- `PUT /api/blogs/:id` - Update existing content by ID.
- `DELETE /api/blogs/:id` - Remove content from persistence layer.

## 🛠️ Troubleshooting (Local)

- **Version Mismatch:** Ensure you are using **Node.js 18+**. Newer dependencies like Express 5 require modern Node runtimes.
- **CORS Blocked:** Ensure `app.use(cors())` is present in `server.js`.
- **Database Connection:** Use `127.0.0.1` instead of `localhost` in your `.env` to avoid IPv6 resolution issues.
- **npm install errors:** Try clearing cache with `npm cache clean --force` or check Node version.

---

_Developed for Academic Practical Examination - Cloud Computing & LP2._
