# Exception Handling Prompt

**Context:** Global central exception handling middleware.

**Goal:** Standardized error responses across the API.

**Guidelines:**
1.  **Middleware**: Use `GlobalExceptionMiddleware`.
2.  **Response Format**: Use `ProblemDetails` (RFC 7807) structure.
    - `title`: Short error summary.
    - `status`: HTTP status code.
    - `detail`: Human-readable explanation.
    - `instance`: Request extraction path.
3.  **Custom Exceptions**: Throw domain-specific exceptions (e.g., `NotFoundException`, `ValidationException`) in the Application layer.
4.  **Logging**: Log the full stack trace only for 500 server errors; keep 4xx logs concise.
5.  **Correlation ID**: Ensure `X-Correlation-ID` is included in the error response.
