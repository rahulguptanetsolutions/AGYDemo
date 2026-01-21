# API Design Prompt

**Context:** .NET 9 Web API using Clean Architecture.

**Goal:** consistent, RESTful, and scalable API endpoints.

**Guidelines:**
1.  **Routing**: Use attribute routing `[Route("api/[controller]")]`.
2.  **DTOs**: Always use DTOs for requests and responses; never expose entities directly.
3.  **Status Codes**:
    - `200 OK` for success.
    - `201 Created` for resource creation (include `Location` header).
    - `204 No Content` for updates/deletes.
    - `400 Bad Request` for validation failures.
    - `404 Not Found` when resource doesn't exist.
4.  **Versioning**: Support API versioning if needed (default to v1).
5.  **Documentation**: All endpoints must have XML comments for Swagger documentation.
