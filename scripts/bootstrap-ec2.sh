#!/bin/bash

# ==============================================================================
# EC2 Bootstrap Script - Ubuntu 22.04
# Purpose: Installs Docker, Docker Compose, Nginx, and configures UFW firewall.
# ==============================================================================

set -e

echo "--- Starting EC2 Bootstrap ---"

# 1. Update System
echo "Updating package lists..."
sudo apt-get update -y
sudo apt-get upgrade -y

# 2. Install Prerequisites
echo "Installing prerequisites..."
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    ufw

# 3. Install Docker
echo "Installing Docker..."
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 4. Enable Docker on Startup
echo "Configuring Docker..."
sudo systemctl enable docker
sudo systemctl start docker

# Add current user to docker group (optional but helpful)
sudo usermod -aG docker $USER

# 5. Install Nginx (on host, as requested)
echo "Installing Nginx on host..."
sudo apt-get install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# 6. Configure Firewall (UFW)
echo "Configuring firewall..."
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
echo "y" | sudo ufw enable

# 7. Install Docker Compose (Standalone if plugin isn't enough/preferred)
echo "Verifying Docker Compose..."
docker compose version

echo "--- Bootstrap Complete ---"
echo "NOTE: You may need to log out and back in for 'docker' group changes to take effect."
