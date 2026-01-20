# AGYDemo - Full-Stack .NET & Angular POC

This project is a high-performance Full-Stack Proof of Concept (POC) demonstrating Clean Architecture, Observability (SRE), and Automated QA.

## 🚀 Overview

- **Backend**: .NET 9 API following Clean Architecture (Domain, Application, Infrastructure, API).
- **Frontend**: Angular 19+ with Standalone Components, Reactive Forms, and Signals.
- **Database**: PostgreSQL (AWS RDS) with Entity Framework Core.
- **Observability**: Distributed Tracing (OpenTelemetry), Correlation ID propagation, and Structured Logging (Serilog).
- **Automation**: End-to-End and API testing using Playwright (TypeScript/POM).

## 🛠 Tech Stack

- **.NET 9 SDK**
- **Angular CLI v19**
- **PostgreSQL / Npgsql**
- **OpenTelemetry & Serilog**
- **Playwright**

## 📂 Project Structure

- `dotnet-core-api/`: Backend solution and projects.
- `angular-poc/`: Frontend application code.
- `automation-tests/`: QA Automation suite.
- `DbConnectivityTest/`: Utility for database connection verification.

## ⚙️ Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js v18+](https://nodejs.org/)
- [Angular CLI](https://angular.dev/tools/cli)
- A running PostgreSQL instance (or AWS RDS).

## 🏃 Local Setup

### 1. Database Configuration
Update `dotnet-core-api/src/CleanArch.Api/appsettings.json` with your PostgreSQL connection string.

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=...;Port=5432;Database=...;Username=...;Password=...;"
}
```

### 2. Run Backend
```powershell
cd dotnet-core-api
dotnet build
dotnet run --project src/CleanArch.Api --launch-profile http
```
*API will be available at `http://localhost:5067/swagger`*

### 3. Run Frontend
```powershell
cd angular-poc
npm install
npm start
```
*Frontend will be available at `http://localhost:4200`*

### 4. Run Tests
```powershell
cd automation-tests
npm install
npx playwright install chromium
npm test
```

## ☁️ AWS EC2 Deployment (Ubuntu 22.04)

The project includes a bootstrap script and Docker orchestration for a 3-tier production environment.

### 1. Provision EC2
Launch an AWS EC2 instance with **Ubuntu 22.04 LTS**. Ensure your Security Group allows:
- **SSH (22)**
- **HTTP (80)**
- **HTTPS (443)**

### 2. Bootstrap the Environment
Clone the repository and run the bootstrap script:
```bash
git clone https://github.com/rahulguptanetsolutions/AGYDemo.git
cd AGYDemo
chmod +x scripts/bootstrap-ec2.sh
./scripts/bootstrap-ec2.sh
```
*This script installs Docker, Docker Compose, Nginx, and configures the firewall.*

### 3. Deploy the Stack
Create a `.env` file in the root directory with your production secrets:
```bash
DB_CONNECTION_STRING="Host=your-rds-host;Port=5432;Database=...;Username=...;Password=...;"
JWT_SECRET="YourSuperSecretKeyMin32Chars"
```

Then launch the 3-tier environment:
```bash
sudo docker compose up -d --build
```
*The stack will be available on your EC2 Public IP.*

## 📊 Observability
The application implements SRE best practices:
- **X-Correlation-ID**: Propagated from Frontend to Backend and included in logs/error responses.
- **Structured Logs**: JSON-formatted logs for easy aggregation.
- **Tracing**: OpenTelemetry instrumentation for total visibility.

## ✍️ Authors
- **Rahul Gupta** ( rahulguptanetsolutions )
