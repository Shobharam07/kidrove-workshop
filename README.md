# Kidrove AI & Robotics Summer Workshop

Responsive React + TypeScript landing page with a minimal Express API for workshop enquiries.

## Confirmed Choices

- Styling: CSS Modules
- State management: local React component state
- Backend: Express.js with validation, CORS, and optional MongoDB persistence
- MongoDB setup details: included below

## Phased Plan

### MVP

1. Create the responsive landing page with hero, details, FAQ, and registration form.
2. Add client-side validation for name, email, and phone.
3. Add `POST /api/enquiry` with required-field validation and JSON responses.
4. Wire the form to the backend with `fetch`.
5. Document local setup for frontend and backend.

### Enhancements

1. Persist enquiries in MongoDB when `MONGODB_URI` is configured.
2. Add spam protection such as rate limiting or CAPTCHA.
3. Add analytics for enroll button and form completion.
4. Add email confirmation or CRM forwarding.
5. Expand tests for form validation and API validation.

## Code Structure

```text
kidrove-workshop/
  client/
    public/
      assets/
        workshop-hero.png
    src/
      components/
        Details.tsx
        FAQ.tsx
        Hero.tsx
        RegistrationForm.tsx
        WorkshopPage.tsx
      styles/
        WorkshopPage.module.css
      App.tsx
      main.tsx
      types.ts
      vite-env.d.ts
    index.html
    package.json
    tsconfig.json
    vite.config.ts
  server/
    src/
      models/
        Enquiry.ts
      routes/
        enquiry.ts
      index.ts
    .env.example
    package.json
    tsconfig.json
  package.json
  README.md
```

## Run Locally

Install all dependencies:

```bash
npm run install:all
```

Run both frontend and backend:

```bash
npm run dev
```

Or run separately:

```bash
npm run dev:client
npm run dev:server
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:4000`

## Backend Environment

Create `server/.env` from `server/.env.example`:

```bash
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
MONGODB_URI=
```

MongoDB is optional. If `MONGODB_URI` is set, enquiries are saved through Mongoose. If it is empty, the server logs validated enquiries to the console.

Example MongoDB URI:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/kidrove_workshop
```

## Registration Submission Snippet

This is the core form submission flow used by the React registration form:

```ts
const response = await fetch(`${import.meta.env.VITE_API_URL ?? "http://localhost:4000"}/api/enquiry`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    workshopId: "ai-robotics-summer-2026"
  })
});

const result = await response.json();

if (!response.ok) {
  throw new Error(result.message ?? "Unable to submit enquiry.");
}
```

## API Contract

`POST /api/enquiry`

Request:

```json
{
  "name": "Aarav Sharma",
  "email": "parent@example.com",
  "phone": "9876543210",
  "workshopId": "ai-robotics-summer-2026"
}
```

Success response:

```json
{
  "success": true,
  "message": "Enquiry received successfully."
}
```

Validation error response:

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": {
    "email": "Enter a valid email address."
  }
}
```
