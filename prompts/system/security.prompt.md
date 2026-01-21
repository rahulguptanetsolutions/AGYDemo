# Security Prompt

**Context:** Secure by Design.

**Goal:** Zero-trust security implementation.

**Guidelines:**
1.  **Secrets**: NEVER commit secrets to Git. Use environment variables.
2.  **Authentication**: Validate JWT signature and expiration on every protected request.
3.  **Authorization**: Use Role-Based Access Control (RBAC) via `[Authorize(Roles="...")]`.
4.  **Input Validation**: Sanitize all inputs. Prevent SQL Injection (EF Core does this, avoid raw SQL) and XSS.
5.  **Dependencies**: regularly scan `npm audit` and NuGet packages for vulnerabilities.
