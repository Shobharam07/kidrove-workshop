# Kidrove AI & Robotics Summer Workshop

## Internship Evaluation Submission (Internshala)

This project is a full-stack workshop enquiry application built for the **Kidrove AI & Robotics Summer Workshop**.
It includes a responsive landing page for parents/students and a backend API to receive and store enquiries.

## Live Deployment

- Frontend (Vercel): https://kidrove-workshop-ten.vercel.app
- Backend (Render): https://kidrove-workshop-l1sv.onrender.com
- Note: deployment links should be re-verified before sharing externally.

## Problem Solved

The app helps Kidrove collect workshop registrations in a clean and user-friendly way:

- Presents workshop details, outcomes, and FAQs.
- Validates user inputs before submission.
- Sends enquiry data to backend API.
- Persists enquiries to MongoDB when configured.
- Falls back to server logging if DB is not connected.

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- CSS Modules

### Backend
- Node.js
- Express
- TypeScript
- Mongoose
- CORS + dotenv

## Key Features

1. **Responsive workshop landing page**
   - Hero section with CTA
   - Workshop details and learning outcomes
   - FAQ section

2. **Registration form with validation**
   - Name required
   - Email format validation
   - Phone format validation
   - Submission success and error states

3. **Backend enquiry API**
   - Endpoint: `POST /api/enquiry`
   - Server-side validation
   - Standard success/error JSON responses
   - Optional MongoDB storage

4. **Health endpoint**
   - Endpoint: `GET /health`
   - Useful for deployment checks

## Project Structure

```text
kidrove-workshop/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── types.ts
│   ├── public/assets/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── models/Enquiry.ts
│   │   ├── routes/enquiry.ts
│   │   └── index.ts
│   └── package.json
├── package.json
└── README.md
```

## Local Setup Instructions

### 1) Clone repository

```bash
git clone https://github.com/Shobharam07/kidrove-workshop.git
cd kidrove-workshop
```

### 2) Install dependencies

```bash
npm install
npm --prefix frontend install
npm --prefix backend install
```

### 3) Run frontend and backend (separate terminals)

Terminal 1:
```bash
npm --prefix backend run dev
```

Terminal 2:
```bash
npm --prefix frontend run dev
```

Local URLs:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:7000`

## Backend Environment Variables

Create a `.env` file inside `/backend`:

```bash
PORT=7000
MONGODB_URI=<your_mongodb_connection_string>
```

Notes:
- If `MONGODB_URI` is not provided, enquiries are logged to server console.
- CORS origin is currently set in `backend/src/index.ts`.
- Frontend API base URL is currently set in `frontend/src/components/RegistrationForm.tsx`.

## API Documentation

### `POST /api/enquiry`

#### Request Body

```json
{
  "name": "Aarav Sharma",
  "email": "parent@example.com",
  "phone": "9876543210"
}
```

#### Success Response (`201`)

```json
{
  "success": true,
  "message": "Enquiry received successfully."
}
```

#### Validation Error (`400`)

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": {
    "email": "Enter a valid email address."
  }
}
```

#### Server Error (`500`)

```json
{
  "success": false,
  "message": "Something went wrong. Please try again later."
}
```

## Build Commands

```bash
npm --prefix frontend run build
npm --prefix backend run build
```

## Future Improvements

- Move API base URL and allowed CORS origin to environment variables.
- Add rate limiting / CAPTCHA to reduce spam.
- Add automated tests (frontend form + backend API).
- Add admin dashboard for viewing enquiries.

## Author

**Shobharam**

Submission prepared for internship evaluation on Internshala.
