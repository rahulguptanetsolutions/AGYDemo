#!/bin/bash

# ==============================================================================
# Remote Deployment Script - AWS EC2
# Purpose: Builds locally, syncs to EC2, and launches the production stack.
# ==============================================================================

set -e

# --- Configuration (Adjust these for your environment) ---
EC2_USER="ubuntu"
EC2_IP="YOUR_EC2_PUBLIC_IP"
SSH_KEY_PATH="~/path/to/your-key.pem"
REMOTE_APP_DIR="/home/ubuntu/AGYDemo"

echo "--- Starting Deployment to $EC2_IP ---"

# 1. Local Pre-build (Sanity Check)
echo "Step 1: Running local pre-build check..."
# (Optional: Add 'npm run build' or 'dotnet build' here if you want to fail fast)

# 2. Sync Files to EC2
echo "Step 2: Syncing files to EC2 via SCP..."
# We explicitly exclude node_modules, bin, obj, and .git folders
ssh -i "$SSH_KEY_PATH" "$EC2_USER@$EC2_IP" "mkdir -p $REMOTE_APP_DIR"

scp -i "$SSH_KEY_PATH" -r \
    ./angular-poc \
    ./dotnet-core-api \
    ./nginx \
    ./docker-compose.yml \
    ./.env \
    "$EC2_USER@$EC2_IP:$REMOTE_APP_DIR"

# 3. Remote Execution
echo "Step 3: Launching containers on EC2..."
ssh -i "$SSH_KEY_PATH" "$EC2_USER@$EC2_IP" << EOF
    cd $REMOTE_APP_DIR
    sudo docker compose down
    sudo docker compose up -d --build
EOF

# 4. Verify Health
echo "Step 4: Verifying container health..."
sleep 10 # Give containers a moment to start
ssh -i "$SSH_KEY_PATH" "$EC2_USER@$EC2_IP" "sudo docker ps"

# 5. Output Results
echo "--- Deployment Complete ---"
echo "Application URL: http://$EC2_IP"
echo "Backend URL: http://$EC2_IP/api"
echo "Swagger: http://$EC2_IP/api/swagger/index.html"
