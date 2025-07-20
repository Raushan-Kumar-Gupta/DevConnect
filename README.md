# DevConnect

DevConnect is a full-stack MERN (MongoDB, Express, React, Node.js) web application designed to help professionals connect, network, and collaborate. The platform features user authentication, profile management, connection requests, real-time chat, and a modern, responsive UI.

---

## Table of Contents

- [Features]
- [Tech Stack]
- [Project Structure]
- [Core Functionality]
  - [Authentication]
  - [Profile Management]
  - [Connections & Requests]
  - [Feed]
  - [Chat]
- [Deployment]

---

## Features

- **User Signup & Login**: Secure authentication with JWT and cookies.
- **Profile Management**: Users can edit their profile, including photo, skills, and bio.
- **Connection Requests**: Send, accept, or ignore connection requests.
- **Feed**: Discover new users to connect with.
- **Connections**: View and chat with your accepted connections.
- **Real-time Chat**: Instant messaging with your connections using Socket.IO.
- **Responsive UI**: Modern design with Tailwind CSS and DaisyUI.
- **Redux State Management**: Efficient state handling for user, feed, requests, and connections.

---

## Tech Stack

**Frontend:**
- React (with Vite)
- Redux Toolkit
- Axios
- Tailwind CSS + DaisyUI
- Framer Motion (animations)
- React Router DOM

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (Authentication)
- Socket.IO (Real-time chat)
- Bcrypt (Password hashing)
- Validator (Input validation)
- CORS, Cookie-Parser

---

## 🚀 Core Features

### 🔐 Authentication
- **Signup**:  
  Users can register by providing their name, email, password, age, gender, profile photo, about section, and skills.  
  Passwords are securely hashed before being stored.
  
- **Login**:  
  Users log in using their email and password.  
  A **JWT** (JSON Web Token) is issued and stored securely in cookies for session management.

- **Logout**:  
  Logging out clears the authentication cookie, ending the session.

---

### 👤 Profile Management
- **View & Edit Profile**:  
  Users can view and update all profile details. All fields are required for a complete profile.

- **Profile Picture Support**:  
  Supports both direct image URLs and base64-encoded image uploads.

---

### 🤝 Connections & Requests
- **Send Requests**:  
  From the user feed, you can send "Interested" or "Ignore" connection requests to other users.

- **Review Requests**:  
  Incoming requests can be accepted or rejected.

- **Connections List**:  
  All accepted requests are shown in your personal connections list.

---

### 📰 User Feed
- **Personalized Feed**:  
  Displays users you haven’t interacted with—no sent or received connection requests.

- **Quick Actions**:  
  Easily send connection requests directly from the feed interface.

---

### 💬 Real-time Chat
- **Instant Messaging**:  
  Chat with your connections using **Socket.IO** for real-time communication.

- **Chat History**:  
  Messages are stored in the database and automatically loaded when a chat is opened.

---

