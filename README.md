# Task Management Application

A full-stack Task Management Application built using **React, Express.js, MongoDB, and Firebase Authentication**. Users can add, edit, delete, and reorder tasks using drag-and-drop functionality. The application ensures real-time updates and persistence.

## 🚀 Live Demo
[Live Application](#) (Add your deployed link here)

## 📂 Repository Structure
```
├── frontend  (React + Vite.js)
├── backend   (Express.js + MongoDB)
└── README.md
```

## 🔑 Features
- **Authentication**: Firebase Google Sign-In.
- **Task Management**: Add, edit, delete, and reorder tasks.
- **Drag & Drop**: Move tasks between categories.
- **Real-Time Updates**: Data is instantly synced with MongoDB.
- **Persistent Storage**: Tasks remain after refresh.
- **Fully Responsive**: Works on both mobile and desktop.

## 🛠 Technologies Used
### **Frontend:**
- React (Vite.js)
- Tailwind CSS
- DnD Kit (Drag & Drop)
- Firebase Authentication
- Axios (API requests)

### **Backend:**
- Express.js
- MongoDB
- CORS & dotenv

## 📌 Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
```
### **2️⃣ Setup Frontend**
```sh
cd frontend
npm install
npm run dev
```
### **3️⃣ Setup Backend**
```sh
cd backend
npm install
node server.js
```

## 🎯 API Endpoints
| Method | Endpoint       | Description |
|--------|---------------|-------------|
| GET    | /tasks        | Get all tasks for the user |
| POST   | /tasks        | Add a new task |
| PUT    | /tasks/:id    | Update a task |
| DELETE | /tasks/:id    | Delete a task |

## 🎉 Bonus Features
- Dark Mode Toggle 🌙
- Task Due Dates with Color Indicators 🕒
- Activity Log for Task Movements 📜

## 🏆 Author
[Your Name](https://github.com/your-username)

## 📜 License
This project is licensed under the MIT License.
