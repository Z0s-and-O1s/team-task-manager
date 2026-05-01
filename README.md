# Team Task Manager

## 📌 Project Overview

This is a simple Team Task Manager web application.
It allows users to create projects, assign tasks, and track progress.

The goal of this project is to demonstrate a basic full-stack system with authentication, role-based access, and task tracking.

---

## 🚀 Features

### 🔐 Authentication

* User Signup and Login
* JWT-based authentication
* Only logged-in users can access the system

### 👤 Role-Based Access

* Admin:

  * Create projects
  * Add members
  * Create and assign tasks
  * View all tasks
* Member:

  * View assigned tasks
  * Update task status

### 📁 Project Management

* Create projects
* Add team members to projects

### ✅ Task Management

* Create tasks
* Assign tasks to users
* Update task status (pending/completed)

### 📊 Dashboard

* Shows:

  * Total tasks
  * Pending tasks
  * Completed tasks
  * Overdue tasks

### ⏰ Overdue Feature

* Tasks with a due date that are not completed are marked as overdue

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js, Express
* **Database:** MongoDB
* **Authentication:** JWT
* **Deployment:**

  * Backend → Railway
  * Frontend → Vercel

---

## 🌐 Live Demo

* **Frontend:** https://your-vercel-link
* **Backend:** https://team-task-manager-production-384b.up.railway.app

---

## ⚙️ How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/team-task-manager.git
```

### 2. Setup backend

```bash
cd backend
npm install
```

### 3. Create `.env` file

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 4. Run backend

```bash
npm start
```

### 5. Open frontend

* Open `frontend/login.html`
* Or use Live Server

---

## 🎥 Demo Video

A short demo video is included showing:

* Login/Register
* Role-based access
* Project creation
* Task assignment
* Dashboard and overdue tracking

---

## 🎯 Conclusion

This project demonstrates:

* REST API development
* Database integration
* Role-based access control
* Full-stack deployment

---

## 🙌 Note

This project is built as a beginner-friendly full-stack application focusing on functionality and clarity.
