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

## 📊 Observability
The application implements SRE best practices:
- **X-Correlation-ID**: Propagated from Frontend to Backend and included in logs/error responses.
- **Structured Logs**: JSON-formatted logs for easy aggregation.
- **Tracing**: OpenTelemetry instrumentation for total visibility.

## ✍️ Authors
- **Rahul Gupta** ( rahulguptanetsolutions )
