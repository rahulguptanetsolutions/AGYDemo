# AGYDemo - Full-Stack .NET & Angular POC

This project is a high-performance Full-Stack Proof of Concept (POC) demonstrating Clean Architecture, Observability (SRE), and Automated QA.

## 🚀 Overview
- **Backend**: .NET 9 API following Clean Architecture.
- **Frontend**: Angular 19+ with Standalone Components.
- **Database**: PostgreSQL (AWS RDS) with EF Core.
- **Observability**: Distributed Tracing, Correlation ID, and Structured Logging.
- **Automation**: E2E and API testing using Playwright.

## 🏃 Quick Start (Local)
1. Configure connection string in `appsettings.json`.
2. Backend: `dotnet run` in `dotnet-core-api`.
3. Frontend: `npm start` in `angular-poc`.
4. Tests: `npm test` in `automation-tests`.

## ☁️ Deployment
Use `scripts/deploy.sh` to target AWS EC2 Ubuntu instances.
Detailed instructions are in the root README.md.
