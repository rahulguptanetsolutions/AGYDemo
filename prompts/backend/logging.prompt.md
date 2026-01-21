# Logging Prompt

**Context:** Serilog with OpenTelemetry.

**Goal:** Structured, queryable logs for observability.

**Guidelines:**
1.  **Framework**: Use Serilog.
2.  **Levels**:
    - `Information`: Standard business flow.
    - `Warning`: Recoverable issues or business rule violations.
    - `Error`: Exceptions and system failures.
    - `Debug`: Detailed dev troubleshooting.
3.  **Structured Data**: Use message templates `Log.Info("User {UserId} logged in", userId)` instead of string concatenation.
4.  **Context**: Always enrich logs with `CorrelationId` and `MachineName`.
5.  **Sensitive Data**: NEVER log PII (Personal Identifiable Information) or secrets (passwords, tokens).
