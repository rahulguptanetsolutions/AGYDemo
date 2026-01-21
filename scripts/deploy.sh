#!/bin/bash

# ==============================================================================
# Remote Deployment Script - AWS EC2
# Purpose: Builds locally, syncs to EC2, and launches the production stack.
# ==============================================================================

set -e

# --- Configuration (Defaults) ---
EC2_USER="ubuntu"
REMOTE_APP_DIR="/home/ubuntu/AGYDemo"

# Load values from .env if it exists locally
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
    EC2_IP=${EC2_IP:-"98.91.98.242"}
    SSH_KEY_PATH=${SSH_KEY_PATH:-"scripts/keys/agy-demo.pem"}
else
    EC2_IP="98.91.98.242"
    SSH_KEY_PATH="scripts/keys/agy-demo.pem"
fi

echo "--- Starting Deployment to $EC2_IP ---"

# 1. Local Payload Preparation
echo "Step 1: Preparing deployment payload (ZIP)..."
# Create a ZIP of the current git HEAD (respects .gitignore)
git archive --format=zip HEAD -o deploy-payload.zip

# Ensure the SSH key has the correct permissions (Handled via icacls on Windows, but safe to keep here)
# chmod 400 "$SSH_KEY_PATH"

# 2. Sync Files to EC2
echo "Step 2: Syncing files to EC2..."
ssh -o StrictHostKeyChecking=no -i "$SSH_KEY_PATH" "$EC2_USER@$EC2_IP" "mkdir -p $REMOTE_APP_DIR"

# Transfer the ZIP payload and the untracked .env file
scp -o StrictHostKeyChecking=no -i "$SSH_KEY_PATH" deploy-payload.zip .env "$EC2_USER@$EC2_IP:$REMOTE_APP_DIR/"

# 3. Remote Extraction and Execution
echo "Step 3: Extracting and launching containers on EC2..."
ssh -o StrictHostKeyChecking=no -i "$SSH_KEY_PATH" "$EC2_USER@$EC2_IP" << EOF
    sudo apt-get install unzip -y # Ensure unzip is present
    cd $REMOTE_APP_DIR
    unzip -o deploy-payload.zip
    sudo docker compose down
    sudo docker compose up -d --build
    rm deploy-payload.zip # Cleanup
EOF

# 4. Cleanup Local
rm deploy-payload.zip

# 5. Verify Health
echo "Step 4: Verifying container health..."
sleep 10
ssh -o StrictHostKeyChecking=no -i "$SSH_KEY_PATH" "$EC2_USER@$EC2_IP" "sudo docker ps"

# 6. Output Results
echo "--- Deployment Complete ---"
echo "Application URL: http://$EC2_IP"
echo "Backend URL: http://$EC2_IP/api"
echo "Swagger: http://$EC2_IP/api/swagger/index.html"
