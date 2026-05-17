Password storage policy

- Passwords are never stored in plaintext. They are hashed with bcrypt before saving to the database.
- The Mongoose `password` field is defined with `select: false` to avoid accidental exposure in queries and API responses.
- Login compares the provided password with the stored bcrypt hash using `bcrypt.compare()`.
- Keep `JWT_SECRET` and `MONGO_URL` in environment variables; never commit them to source control.

If you want to remove password storage entirely and switch to third-party auth (OAuth), open an issue or request and I can implement that flow.