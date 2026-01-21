# Angular Login Prompt

**Context:** Angular 19+ Standalone Components.

**Goal:** Secure, user-friendly login page.

**Guidelines:**
1.  **Reactive Forms**: Use `FormGroup` with `Validators.required` and `Validators.email`.
2.  **UI/UX**:
    - Material Design or Tailwind CSS.
    - Show error messages *only* when field is touched and invalid.
    - Disable Submit button until form is valid.
3.  **State Management**: Use `AuthService` with Signals to track login state.
4.  **Security**:
    - Store JWT in LocalStorage (or HTTP-only cookie if backend supports it).
    - Clear token on Logout.
5.  **Redirect**: Navigate to `/dashboard` or previous URL on success.
