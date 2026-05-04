# Security Specification - Syllab

## 1. Data Invariants

1.  **User Profiles**: Every student must have a profile indexed by their Auth UID. Fields like `score`, `xp`, and `rank` track progress. `createdAt` is immutable.
2.  **Academic Progress**: Tracks completed chapters and concepts. Indexed by Auth UID.
3.  **Mistake Records**: Immutable records of incorrect answers. Must belong to the authenticated user.
4.  **Quiz Sessions**: Persistence for active quizzes. Indexed by Auth UID to prevent multiple concurrent sessions per device/user.
5.  **Contacts**: Publicly writable for leads, but once written, immutable.

## 2. The "Dirty Dozen" Payloads (Deny Cases)

1.  **Identity Spoofing**: Attempt to create a user profile with a different `userId`.
2.  **Privilege Escalation**: Attempt to update `role` or `isAdmin` (none currently defined, but system-wide deny-all is in place).
3.  **Shadow Update**: Attempt to inject `isVerified: true` into a profile update.
4.  **Immutable Breach**: Attempt to change `createdAt` on a user profile.
5.  **Relational Orphan**: Attempt to save a mistake record with a `userId` that is not the current user.
6.  **Type Injection**: Attempt to set `score` as a string instead of an integer.
7.  **Resource Poisoning**: Attempt to save a `message` in `contacts` that is 1MB.
8.  **Status Skip**: (N/A for current logic, but status fields must be guarded).
9.  **ID Poisoning**: Attempt to use `../poison/doc` as a document ID.
10. **Unauthenticated Write**: Attempt to save a session without being logged in.
11. **Cross-User Session Overwrite**: User A trying to write to `/quizSessions/UserB`.
12. **Unauthorized List**: Attempt to read all mistake records without a filter for `userId`.

## 3. Test Runner (Conceptual)

The `firestore.rules.test.ts` would verify these cases. Since I don't have a test runner environment, I will focus on the logic in the rules.
