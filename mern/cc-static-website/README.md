# 🌐 High-Performance Static Web Hosting

A professional cloud deployment project showcasing the configuration of a high-concurrency web server for serving static assets on a distributed infrastructure.

## 🚀 Architectural Focus
- **Nginx Orchestration:** Implementation of a high-performance, event-driven web server for static file delivery.
- **Network Hardening:** Configuring Security Groups (NSG) and UFW firewalls for controlled public access.
- **Remote Synchronization:** Leveraging secure terminal protocols for out-of-band content updates.
- **Optimization:** Utilizing modern web standards (HTML5/CSS3) with server-side performance tuning.

## 🛠️ Technology Stack
- **Web Server:** Nginx (Stable Edition)
- **Networking:** HTTP (Port 80), SSH (Port 22)
- **Firewall:** UFW, Azure Network Security Groups
- **OS:** Linux (Ubuntu 22.04 LTS)

## 💻 Local Development Setup

### 1. Previewing Content
1. Navigate to the `website` directory.
2. Open `index.html` in any modern web browser.
3. Alternatively, use the **VSCode Live Server** extension for real-time previewing.

### 2. Local Nginx Testing (Optional)
If you have Nginx installed locally (Linux/WSL):
1. Copy the website files to the Nginx root:
   ```bash
   sudo cp -r website/* /var/www/html/
   ```
2. Restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```
3. Access via `http://localhost`.

## 📊 Deployment Verification
- `systemctl status nginx` - Server health monitoring.
- `nginx -t` - Configuration syntax validation.
- `ufw status` - Firewall policy verification.

## 🛠️ Troubleshooting (Local)
- **403 Forbidden:** Check folder permissions (`chmod -R 755 /var/www/html`).
- **Nginx Start Failure:** Check for other services on port 80 (`sudo lsof -i :80`).
- **Styles Not Loading:** Ensure the file paths in `index.html` are relative and correct.

---
*Developed for Academic Practical Examination - Cloud Computing & LP2.*
 