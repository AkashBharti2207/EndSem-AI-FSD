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

