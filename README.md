# AetherChat AI - Professional Full-Stack AI Chatbot Platform

AetherChat is a professional, full-stack, AI-powered chatbot application built with React, Node.js, Express, TypeScript, and the Google Gemini API.

## Project Overview

AetherChat provides a secure, scalable, and responsive conversational AI experience with user authentication, conversation history persistence, customizable system prompts, and robust server-side architecture.

## Technology Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Lucide React, Motion
- **Backend:** Node.js, Express.js, TypeScript
- **Database & ODM:** MongoDB, Mongoose
- **AI Integration:** Google Gemini API (`@google/genai`) via secure server-side proxy routes
- **Authentication:** JWT (JSON Web Tokens) with secure HTTP-only cookies and bcryptjs password hashing
- **Validation:** Zod request schema validation

## Architecture

- **`server.ts`**: Unified root entry point running Express with Vite development middleware.
- **`server/src/`**: Modular backend architecture including config, controllers, middleware, models, routes, and validators.
- **`src/`**: Modern React SPA architecture organized into components, pages, layouts, hooks, services, and types.
- **`shared/`**: Shared TypeScript definitions and types.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables in `.env`:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGO_URI="mongodb://localhost:27017/aetherchat"
   JWT_SECRET="your_secure_jwt_secret"
   GEMINI_API_KEY="your_gemini_api_key"
   ```

## Development Instructions

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
npm start
```
