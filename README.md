# RBAC-assignment
# Blog App with Email Verification

This is a full-stack Blog application with **User Signup/Login** and **Email Verification** functionality built using:

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React.js, Tailwind CSS
- **Email Service**: Nodemailer + Mailtrap

---

## 🚀 Features

- User Registration (Signup)
- Email Verification through a secure token
- User Login (only after email verification)
- Protected routes for authenticated users
- Clean UI built with TailwindCSS
- Full API Integration between frontend and backend

---

## 🛠️ Tech Stack

- Frontend: React.js, Tailwind CSS, Axios
- Backend: Node.js, Express.js
- Database: MongoDB
- Email Service: Nodemailer with Mailtrap
- Token System: JWT

---

## 📦 How to Setup the Project Locally

Follow these steps to get the project running on your machine:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/blog-app.git

#2. install dependencies
# For Backend
cd backend
npm install

#For Frontend
cd ../frontend
npm install

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=your_mailtrap_username
MAIL_PASS=your_mailtrap_password

##starting the application

cd backend
npm run dev

cd frontend
npm run dev
