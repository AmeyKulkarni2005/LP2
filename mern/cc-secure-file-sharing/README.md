# 🔒 Secure Multi-Instance File Exchange

A cloud infrastructure project demonstrating secure inter-instance communication and data synchronization within a private Virtual Network (VNet).

## 🚀 Architectural Focus
- **Internal Networking:** Utilizes private subnets for isolated data exchange, reducing external attack vectors.
- **Asymmetric Encryption:** Leverages RSA-4096 bit SSH key pairs for secure, passwordless authentication.
- **Protocol Security:** Standardizes on Secure Copy Protocol (SCP) for encrypted transit.
- **Access Control:** Implements POSIX-level permission hardening (700/600) for data at rest.

## 🛠️ Technology Stack
- **Cloud Platform:** Microsoft Azure (VNet, VMs)
- **Security:** OpenSSH, RSA Key Pairs
- **Automation:** Bash Scripting (Posix Standard)
- **OS:** Ubuntu 22.04 LTS

## 💻 Local Simulation Setup
To test the secure exchange concept locally (requires SSH server enabled):

### 1. SSH Configuration
1. Ensure `OpenSSH Server` is installed on your Linux/WSL instance.
2. Verify SSH service: `sudo systemctl status ssh`

### 2. Key Generation
1. Generate an RSA key pair:
   ```bash
   ssh-keygen -t rsa -b 4096
   ```
2. Press Enter to use the default path and no passphrase.

### 3. Key Propagation (Simulated)
1. Copy the public key to your own authorized keys (to simulate sending to another instance):
   ```bash
   ssh-copy-id localhost
   ```

### 4. Secure Transfer Test
1. Send `hello.py` to a target directory:
   ```bash
   scp hello.py localhost:~/
   ```

## 📊 Infrastructure Verification
- `ssh-keygen` - Cryptographic identity generation.
- `ssh-copy-id` - Secure public key propagation.
- `scp` - Encrypted multi-instance synchronization.

## 🛠️ Troubleshooting (Local)
- **Connection Refused:** Ensure SSH server is running (`sudo service ssh start`).
- **Key Error:** If you get "Host key verification failed", try `ssh-keygen -R localhost`.
- **Permission Denied:** Ensure your user has write permissions to the target directory.

---
*Developed for Academic Practical Examination - Cloud Computing & LP2.*
 