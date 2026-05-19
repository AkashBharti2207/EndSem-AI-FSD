# AI-Based Smart Complaint Management System

A full-stack MERN application that allows users to register complaints online. It uses AI to classify complaint priority, suggest the responsible department, and generate automated responses.

## Features

- **User Authentication**: Secure signup and login using JWT and bcrypt.
- **Complaint Management**: Users can register complaints with details like category, location, and description.
- **AI Integration**: Powered by Google Gemini AI, the system automatically analyzes the complaint to determine urgency (Low, Medium, High), suggest a handling department, and generate a summary and auto-response.
- **Dashboard**: View all complaints, filter by category, and search by location.
- **Admin Capabilities**: Update the status of a complaint (Pending, In Progress, Resolved).
- **Modern UI**: Premium styling using Vanilla CSS with glassmorphism and modern aesthetics.

## Tech Stack

- **Frontend**: React (Vite), React Router, Axios, Vanilla CSS
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
- **AI**: Google Generative AI (`@google/generative-ai`)

## Local Setup

### Prerequisites

- Node.js installed
- MongoDB installed locally or a MongoDB Atlas URI

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update the `.env` file with your credentials:
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/complaint_system
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   PORT=5000
   ```
4. Start the server:
   ```bash
   node server.js
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```

## Deployment on Render

### Backend

1. Push your code to GitHub.
2. In Render, create a new "Web Service".
3. Connect your repository and select the `backend` folder as the Root Directory.
4. Set the Build Command to `npm install`.
5. Set the Start Command to `node server.js`.
6. Add the Environment Variables (`MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`).

### Frontend

1. In Render, create a new "Static Site".
2. Connect your repository and select the `frontend` folder as the Root Directory.
3. Set the Build Command to `npm run build`.
4. Set the Publish Directory to `dist`.
5. Ensure `axios` base URLs in your React components point to the deployed Backend URL instead of `http://localhost:5000`.

## Testing

Use the frontend UI or Postman to test the endpoints.
- Register a user and log in to get a token.
- Submit a complaint with text like "Water pipe burst near main market causing flooding" to see the AI correctly identify the Water Department and set a High priority.
