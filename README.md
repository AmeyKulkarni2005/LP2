# Configuration for Running the System Locally

This guide walks you through setting up and running the MERN Blog Application locally on a Linux environment (Ubuntu).

---

## 📋 Table of Contents
1. [Database Setup (MongoDB 7.0)](#1-database-setup-mongodb-70)
2. [Backend Setup](#2-backend-setup)
3. [Frontend Setup](#3-frontend-setup)
4. [Web Server Configuration (Nginx)](#4-web-server-configuration-nginx)

---

## 1. Database Setup (MongoDB 7.0)

Follow these steps to install, configure, and launch MongoDB:

```bash
# 1. Update system packages and ensure tools are installed
sudo apt update && sudo apt install gnupg curl -y

# 2. Download the official MongoDB 7.0 security key safely
curl -fsSL [https://www.mongodb.org/static/pgp/server-7.0.asc](https://www.mongodb.org/static/pgp/server-7.0.asc) | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor --yes

# 3. Add the verified MongoDB 7.0 repository list
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] [https://repo.mongodb.org/apt/ubuntu](https://repo.mongodb.org/apt/ubuntu) jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# 4. Update the package database and install MongoDB
sudo apt update && sudo apt install -y mongodb-org

# 5. Open configuration file to modify bindIp from 127.0.0.1 to 0.0.0.0
sudo nano /etc/mongod.conf

# 6. Start the database engine and enable it to launch automatically on boot
sudo systemctl start mongod && sudo systemctl enable mongod
```

## 2. Backend Setup

```bash
# 1. Install base utilities: Git, Nginx, and Curl
sudo apt update && sudo apt install git nginx curl -y

# 2. Add the Node.js 22 LTS installation script
curl -fsSL [https://deb.nodesource.com/setup_22.x](https://deb.nodesource.com/setup_22.x) | sudo -E bash -

# 3. Install Node.js
sudo apt install -y nodejs

# 4. Install PM2 globally to keep the Node backend running constantly
sudo npm install -g pm2

# 5. Clone your assignment project code repository
git clone [https://github.com/AmeyKulkarni2005/LP2.git](https://github.com/AmeyKulkarni2005/LP2.git)

# 6. Navigate to the backend directory and install code dependencies
cd ~/LP2/mern/mern-blog-app/backend
npm install

# 7. Create the environment configuration file
nano .env
# PASTE THE FOLLOWING:
# PORT=5000
# MONGO_URI=mongodb://<IP_Address>:27017/mern-blog

# 8. Start the backend app via PM2
pm2 start server.js --name "blog-backend"
```

## 3. Frontend Setup

```bash
# 1. Navigate to the frontend UI workspace folder
cd ~/LP2/mern/mern-blog-app/frontend

# 2. Install React frontend framework dependencies
npm install

# 3. Create the frontend API mapping file
nano .env
# PASTE THE FOLLOWING:
# VITE_API_BASE_URL=/api/blogs

# 4. Compile the application into optimized production-ready static assets
npm run build
```


## 4. Web Server Configuration (Nginx)
```bash
# 1. Remove the default Nginx welcome page mapping
sudo rm /etc/nginx/sites-enabled/default

# 2. Grant Nginx traversal rights across your home space directory
chmod 711 /home/azureuser_frontback

# 3. Grant Nginx structural read/execute rights over the project build folder
chmod -R 755 /home/azureuser_frontback/LP2

# 4. Create your production routing template
sudo nano /etc/nginx/sites-available/blog-app

#PASTE THE FOLLOWING:
server {
    listen 80;
    server_name _;

    # Serve React Frontend Static Files
    location / {
        root /home/azureuser_frontback/LP2/mern/mern-blog-app/frontend/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API Requests cleanly to Node.js Backend Server
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}


# 5. Create a symbolic link to activate the block configuration
sudo ln -s /etc/nginx/sites-available/blog-app /etc/nginx/sites-enabled/

# 6. Run a configuration sanity validation check
sudo nginx -t

# 7. Perform a hard reset clean reboot on the Nginx routing service
sudo systemctl stop nginx
sudo systemctl start nginx
```
