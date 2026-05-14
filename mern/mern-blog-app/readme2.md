Repository: https://github.com/ParthNMahajan/LP2.git
Sub-directory: mern/mern-blog-app

*Step 0: Provisioning & Prerequisites*
Provision two Ubuntu Server 24.04 LTS (Standard_B1s) VMs in the same region.

VM1 (App Server): Open Ports 80 (HTTP) and 22 (SSH). Note the Public IP.

VM2 (Database Server): Open Port 22 (SSH). Note the Private IP.

Download the SSH .pem key to your MacBook Air and restrict its permissions:

Bash
chmod 400 ~/Downloads/cc-web-key.pem
Phase 1: Database Setup (VM2)
Ubuntu 24.04 requires adding the official MongoDB repository manually.

1. Connect to VM2:

Bash
ssh -i ~/Downloads/cc-web-key.pem azureuser@<VM2_PUBLIC_IP>
2. Install MongoDB 7.0:

Bash
sudo apt update && sudo apt install gnupg curl -y
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update && sudo apt install -y mongodb-org
3. Configure Network Access:

Bash
sudo nano /etc/mongod.conf
Change bindIp: 127.0.0.1 to bindIp: 0.0.0.0. Save and exit.

4. Start Database:

Bash
sudo systemctl start mongod && sudo systemctl enable mongod
5. Azure Portal Firewall: Go to VM2's Networking tab. Add an Inbound Rule allowing Port 27017 with the source set strictly to VM1's Private IP.  

*Phase 2: App Server Environment (VM1)*
We must install Node.js 22 before PM2 to prevent compatibility crashes with the MongoDB driver.  

1. Connect to VM1:

Bash
ssh -i ~/Downloads/cc-web-key.pem azureuser@<VM1_PUBLIC_IP>
2. Install Node 22, Git, and Nginx:

Bash
sudo apt update && sudo apt install git nginx curl -y
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
3. Install Process Manager:

Bash
sudo npm install -g pm2
*Phase 3: Backend Deployment (VM1)*
1. Clone the Code:

Bash
git clone https://github.com/ParthNMahajan/LP2.git
cd ~/LP2/mern/mern-blog-app/backend
npm install
2. Configure Environment:

Bash
nano .env
Paste the following (replace with VM2's Private IP):

Ini, TOML
PORT=5000
MONGO_URI=mongodb://<VM2_PRIVATE_IP>:27017/mern-blog
3. Start Backend API:

Bash
pm2 start server.js --name "blog-backend"
*Phase 4: Frontend Deployment (VM1)*
1. Navigate and Install:

Bash
cd ~/LP2/mern/mern-blog-app/frontend
npm install
2. Configure Environment:

Bash
nano .env
Paste the following API route:

Ini, TOML
VITE_API_BASE_URL=/api/blogs
3. Build Static Files:

Bash
npm run build
*Phase 5: Nginx Reverse Proxy (VM1)*
Nginx will serve the React UI and route API traffic to Node, ensuring no trailing slashes break the route formatting.

1. Clear Defaults & Grant Permissions:

Bash
sudo rm /etc/nginx/sites-enabled/default
chmod 711 /home/azureuser
2. Create Configuration:

Bash
sudo nano /etc/nginx/sites-available/blog-app
Paste the routing logic:

Nginx
server {
    listen 80;
    server_name _; 

    # Serve React Frontend
    location / {
        root /home/azureuser/LP2/mern/mern-blog-app/frontend/dist;
        index index.html;
        try_files $uri $uri/ /index.html; 
    }

    # Proxy API requests (Note: NO trailing slash on proxy_pass)
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
3. Enable and Restart:

Bash
sudo ln -s /etc/nginx/sites-available/blog-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
Verification: Open VM1's Public IP in your browser. The app is live, fully functional, and ready for evaluation.
