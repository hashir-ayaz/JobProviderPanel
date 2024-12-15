# SkillConnect Job Provider Panel

The **Job Provider Panel** is part of the SkillConnect platform, designed to assist job providers in managing their projects efficiently. This includes posting jobs, reviewing freelancer proposals, tracking project progress, and processing payments.

---

## Features

### 1. Job Management
- Create, edit, and manage job listings.
- Set project requirements, budget, and deadlines.
- Close job postings and communicate with applicants.

### 2. Freelancer Selection
- Browse freelancer profiles and proposals.
- Approve or reject applications.
- Communicate directly with freelancers for clarification.

### 3. Project Tracking
- Monitor progress, request updates, and approve submissions.
- Provide feedback and request revisions if necessary.

### 4. Payment Processing
- Process secure payments to freelancers upon project completion.
- Manage payment methods and view transaction history.

### 5. Feedback System
- Provide ratings and reviews for freelancers after project completion.
- Use feedback as a reference for future hiring decisions.

---

## Directory Structure

### Backend
```
hashir-ayaz-JobProviderPanel/
├── backend/
│   ├── server.js
│   ├── public/
│   │   └── favicon.ico
│   ├── script.sh
│   ├── package.json
│   ├── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── middleware/
│       ├── config/
│       ├── utils/
│       ├── email/
```

### Frontend
```
hashir-ayaz-JobProviderPanel/
└── frontend-job-provider/
    ├── src/
    ├── public/
    ├── components/
    ├── pages/
    ├── services/
    ├── hooks/
    ├── context/
    ├── assets/
    ├── utils/
```

---

## Technology Stack

### Backend
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT, Google OAuth
- **Email Service**: SendGrid

### Frontend
- **Framework**: React (Vite setup)
- **Styling**: Tailwind CSS

---

## Setup Instructions

### Prerequisites
- Node.js
- MongoDB
- SendGrid API Key
- Google OAuth credentials

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   SENDGRID_API_KEY=<your-sendgrid-api-key>
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   COOKIE_KEY=<your-cookie-secret-key>
   CLIENT_URL=http://localhost:5173
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend-job-provider` directory:
   ```bash
   cd frontend-job-provider
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## API Endpoints

### Authentication
- **POST** `/api/v1/auth/signup`: Register a new user.
- **POST** `/api/v1/auth/login`: Log in a user.
- **GET** `/api/v1/auth/google`: Google OAuth login.

### Jobs
- **GET** `/api/v1/jobs`: Fetch all jobs.
- **POST** `/api/v1/jobs`: Create a new job.
- **GET** `/api/v1/jobs/:id`: Get details of a specific job.

### Skills
- **GET** `/api/v1/skills`: Fetch all available skills.

---

## Contribution Guidelines
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and open a pull request.

---

## License
This project is licensed under the MIT License.
