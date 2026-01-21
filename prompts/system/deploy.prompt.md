# Prompt Name: Deployment – system
Version: 1.2
Owner: Infrastructure Team
Last Updated: 2026-01-21

## Objective
Standardized deployment strategy for 3-tier applications (Angular/Nginx/.NET) to AWS EC2.

## Action Items
1.  **Preparation**:
    - Ensure `.env.template` is up-to-date with placeholders for all secrets.
    - Verify `docker-compose.yml` configures network isolation and restart policies.
    - Validate `nginx.conf` acts as a reverse proxy for both Frontend and Backend.
    - **Dynamic IP**: If EC2 IP changes, update `EC2_IP` in `.env` and `deploy.sh`.

2.  **Infrastructure (Bootstrap)**:
    - Use `bootstrap-ec2.sh` to install Docker, Compose, and Nginx on the target host.
    - Configure UFW firewall to allow SSH (22), HTTP (80), and HTTPS (443).
    - Hardening: Disable root login and perform OS updates.

3.  **Deployment Execution**:
    - Use `deploy.sh` for atomic updates.
    - Method: `git archive` (ZIP payload) to minimize transfer time.
    - Permissions: Use `icacls` (Windows) or `chmod` (Linux) to strictly secure SSH keys (400).
    - Orchestration: `docker compose up -d --build --remove-orphans`.

## Verification criteria
-   All containers (backend, frontend, proxy) state is `Up`.
-   Public URL serves the Angular app.
-   Public URL/api/health returns 200 OK.
