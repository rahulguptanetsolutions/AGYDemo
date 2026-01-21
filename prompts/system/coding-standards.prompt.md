# Coding Standards Prompt

**Context:** Full Stack (C# & TypeScript).

**Goal:** Maintainable, readable, clean code.

**Guidelines:**
1.  **Naming**:
    - C#: PascalCase for public members, Classes, Methods. camelCase for parameters.
    - TS: camelCase for variables/functions. PascalCase for Classes/Interfaces.
2.  **Clean Code**:
    - DRY (Don't Repeat Yourself).
    - SOLID Principles.
    - Functions should be small and do one thing.
3.  **Async/Await**: Always use `async/await` over raw Promises or blocking calls (`.Result`).
4.  **Comments**: Document *why*, not *what*. Use self-documenting code over excessive comments.
5.  **Formatting**: Use Prettier (TS) and `.editorconfig` (C#).
