# note-taking-app

It is a full-stack, responsive note-taking web application that allows users to securely sign up, log in, and manage their personal text-based notes. The application features a modern, clean user interface and robust authentication using both an email/password flow (verified by OTP).



---

## ✨ Features

* **Secure Authentication:**
    * Sign up with an **Email and Password**, with account verification via a One-Time Password (OTP) sent to the email.
    * Log in using either the registered Email/Password.
* **JWT-Powered Security:** User sessions and API routes are secured using JSON Web Tokens (JWT) to ensure only authorized users can access or modify their data.
* **Note Management (CRUD):**
    * **Create:** Easily add new text notes to your personal dashboard.
    * **Read:** View all your notes at a glance on the welcome page.
    * **Delete:** Remove notes you no longer need.
* **User-Friendly Interface:** A welcome page greets users and displays their profile information.
* **Robust Error Handling:** Clear, informative error messages for invalid inputs, failed API requests, or incorrect OTPs.
* **Responsive Design:** A mobile-first design that provides a seamless experience across all devices, from desktops to smartphones.

---

## 🛠️ Technology Stack

* **Front-end:** React.js, TypeScript, Vite, Tailwind CSS.
* **Back-end:** Node.js, Express.js, TypeScript
* **Database:** MongoDB
* **Authentication:** JWT (JSON Web Tokens), bcrypt, **Nodemailer**
* **Deployment:** Vercel (for Front-end), Render (for Back-end & Database)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (v18 or later)
* npm or yarn
* Git
* A MongoDB database instance (local or via MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ImmrAD/note-taking-app.git
    cd note-taking-app
    ```

2.  **Setup the Back-end:**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `server` directory and add the following environment variables:
    ```env
    # .env
    PORT=8080
    MONGO_URI="your_mongodb_connection_string"
    JWT_SECRET="a_very_strong_and_secret_key" 
    # Nodemailer (for OTP via email)
    # Use your SMTP provider's details. For Gmail, use an App Password.
    EMAIL_USER="your_email_address@gmail.com"
    EMAIL_PASS="your_gmail_app_password"
    ```
    Start the back-end server:
    ```bash
    npm run dev
    ```

3.  **Setup the Front-end:**
    ```bash
    cd ../frontend
    npm install
    ```
    Create a `.env` file in the `client` directory and add the following:
    ```env
    # .env
    VITE_API_BASE_URL="http://localhost:8080"
    ```
    Start the front-end development server:
    ```bash
    npm run dev
    ```

The application should now be running on `http://localhost:5173` (or another port specified by Vite).

---

## 📝 API Endpoints

A brief overview of the core API endpoints:

| Method   | Endpoint                    | Description                                  | Protected |
| :------- | :-------------------------- | :------------------------------------------- | :-------- |
| `POST`   | `/api/auth/register`        | Register a new user with email/password & send OTP. | No        |
| `POST`   | `/api/auth/verify-otp`      | Verify OTP to complete registration.         | No        |
| `POST`   | `/api/auth/login`           | Log in a user with email and password.       | No        |
| `GET`    | `/api/user/me`              | Get logged-in user's profile.                | Yes       |
| `GET`    | `/api/notes`                | Get all notes for the logged-in user.        | Yes       |
| `POST`   | `/api/notes`                | Create a new text note.                      | Yes       |
| `DELETE` | `/api/notes/:id`            | Delete a specific note.                      | Yes       |
