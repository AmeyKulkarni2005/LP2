# Deployment Documentation: Static Website on Azure VM

This guide details the exact commands used to configure the Ubuntu server and deploy the static website.

### Prerequisites

* An active Azure Virtual Machine running Ubuntu.


* SSH access configured with a `.pem` private key.



---

### Step 1: Connect to the Virtual Machine

* Secure your private key file by restricting its permissions.
`chmod 400 ~/Downloads/cc-web-key.pem` 


* Connect to the virtual machine using the SSH key and the server's public IP address (`20.198.124.195`).
`ssh -i ~/Downloads/cc-web-key.pem azureuser@20.198.124.195` 


* If prompted to verify the host authenticity, type `yes`.



### Step 2: Update System Packages

* Ensure the package lists are up to date before installing new software.
`sudo apt update` 



### Step 3: Install and Start Nginx

* Install the Nginx web server.
`sudo apt install nginx -y` 


* Start the Nginx service to get the web server running.
`sudo systemctl start nginx` 


* Enable Nginx to automatically start whenever the virtual machine boots up.
`sudo systemctl enable nginx` 



### Step 4: Retrieve the Code

* Install Git (if it is not already installed on the system).
`sudo apt install git -y` 


* Clone the GitHub repository containing the website files into the home directory.
`git clone https://github.com/ParthNMahajan/LP2.git` 



### Step 5: Deploy the Static Files

* Remove the default Nginx welcome page from the web root.
`sudo rm /var/www/html/index.nginx-debian.html` 


* Copy the static website files from the cloned repository directly into the Nginx web root directory so they can be served publicly.
`sudo cp -r ~/LP2/mern/cc-static-website/website/* /var/www/html/`
