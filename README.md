
# 🛠 MindSync – Full Stack Project

This is a **MERN Stack Booking System** that includes **user authentication, admin management, and booking functionalities**.

---

## 🚀 Setup Instructions

### **1️⃣ Backend Setup**
#### **Step 1: Navigate to the backend folder**
```sh
cd backend
Step 2: Install dependencies
sh
Copy
Edit
npm install
Step 3: Configure the .env file
Create a .env file inside the backend directory and add the following:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Step 4: Start the backend server
sh
Copy
Edit
npm start
The server will run on http://localhost:5000/

2️⃣ Frontend Setup
Step 1: Navigate to the frontend folder
sh
Copy
Edit
cd frontend
Step 2: Install dependencies
sh
Copy
Edit
npm install
Step 3: Start the React frontend
sh
Copy
Edit
npm start
The React app will run on http://localhost:3000/

📌 API Routes Overview
🟢 Authentication
Method	Endpoint	Description	Auth Required
POST	/api/auth/register	Register a new user	❌ No
POST	/api/auth/login	Login & get JWT token	❌ No
GET	/api/auth/profile	Get user profile	✅ Yes
🟢 Booking Items
Method	Endpoint	Description	Auth Required
GET	/api/items	Get all booking items	❌ No
POST	/api/items	Create a new item (Admin only)	✅ Yes
PUT	/api/items/:id	Update an item (Admin only)	✅ Yes
DELETE	/api/items/:id	Delete an item (Admin only)	✅ Yes
🟢 Booking Management
Method	Endpoint	Description	Auth Required
POST	/api/bookings	Create a new booking	✅ Yes
GET	/api/bookings	Get user bookings	✅ Yes
PUT	/api/bookings/:id/cancel	Cancel a booking	✅ Yes
🟢 Admin Panel
Method	Endpoint	Description	Auth Required
GET	/api/admin/users	Get all users (Admin only)	✅ Yes
DELETE	/api/admin/users/:id	Delete a user (Admin only)	✅ Yes
GET	/api/admin/bookings	Get all bookings (Admin only)	✅ Yes
🛠 Tech Stack
Frontend: React.js, Redux, Material-UI
Backend: Node.js, Express.js
Database: MongoDB with Mongoose
Authentication: JWT (JSON Web Token)
State Management: Redux Toolkit
📌 Run Full Project
1️⃣ Start the backend

sh
Copy
Edit
cd backend && npm start
2️⃣ Start the frontend

sh
Copy
Edit
cd frontend && npm start
🚀 Now visit: http://localhost:3000/ to use the app!

yaml
Copy
Edit

---

### **✅ Now You Can Share Your Project Easily!**  
Just **copy-paste this file** into your project as `README.md` and push it to GitHub! 🚀🔥  
Let me know if you need any changes. 🚀







