# Form Validation Prompt

**Context:** Angular Reactive Forms.

**Goal:** Consistent validation logic and user feedback.

**Guidelines:**
1.  **Validators**: Prefer built-in `Validators` (min, max, pattern). Create custom validators in `shared/validators` for complex logic.
2.  **Error Messages**: Use a shared `ValidationMessageComponent` or pipe to standardize text.
3.  **Cross-Field**: Use `FormGroup` validators for multi-field logic (e.g., Password Match).
4.  **Async**: Use `AsyncValidators` for server-side checks (e.g., "Username Taken"), ensuring `updateOn: 'blur'`.
5.  **Testing**: Write unit tests for custom validators.
