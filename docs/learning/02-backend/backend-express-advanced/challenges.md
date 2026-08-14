# Backend Express Advanced - Challenges

## Build a burn-on-read service

Build a small Express application with TypeScript that lets one user create a message and another user open it exactly once.

Use the logger from this session as shared infrastructure for the whole app, then add the burn-on-read behavior on top.

Requirements:

- Set up an Express application with TypeScript
- Use Nunjucks for templates
- Add your own CSS or use a small CSS framework
- Provide a text field where the user can enter a message
- Sanitize the input before storing it
- Store the message in a file
- Generate a unique link for the stored message
- Show that link to the sender after creation
- Delete the file after the link is opened once

Useful review questions while building:

- Which part of the app should create the file name or ID?
- Where should files be stored so the path stays predictable?
- What should happen if a user opens an expired or missing link?
- Which requests should appear in the access log for this app?
