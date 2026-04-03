# Finance Record Management API

A role-based backend API built with **Node.js, Express, SQLite, and Sequelize** that allows organizations to manage financial records with proper access control and dashboard insights.

---

## 🚀 Features

### 🔐 Authentication & RBAC
- JWT-based authentication
- Role-based access control (RBAC)
- Roles:
  - **Admin** – Full access
  - **Analyst** – Can create/update records
  - **Viewer** – Read-only access
- Soft-delete support for users (isActive flag)

---

### 👤 User Management (Admin Only)
- Create user
- Update user
- Activate / deactivate user
- View all users

---

### 💰 Financial Records
- Create income/expense record
- Update record
- Delete record
- List records (with pagination)
- Filter by:
  - Type (income/expense)
  - Category
  - Date range

---

### 📊 Dashboard
- Summary statistics:
  - Total income
  - Total expense
  - Net balance
- Recent activity endpoint

---

### ✅ Validation
- Request validation using `express-validator`
- Proper error responses
- Clean status codes

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **SQLite**
- **Sequelize ORM**
- **JWT (jsonwebtoken)**
- **bcrypt**
- **express-validator**

---

## 📁 Project Structure

server/
│
├── src/
│ ├── config/ # Database configuration
│ ├── controllers/ # Route controllers
│ ├── middleware/ # Auth, RBAC, validation middleware
│ ├── models/ # Sequelize models
│ ├── routes/ # API routes
│ ├── services/ # Business logic layer
│ ├── validators/ # Request validation rules
│ └── app.js # Express app setup
│
├── server.js # Entry point
├── package.json
└── database.sqlite


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd server

2️⃣ Install dependencies
npm install
3️⃣ Create .env file
PORT=5000
JWT_SECRET=your_secret_key
4️⃣ Run the server
npm run dev

Server will run at:

http://localhost:5000

🔑 API Endpoints
🧑 Auth
Method	Endpoint	Description
POST	/api/auth/login	Login user
👤 Users (Admin Only)
Method	Endpoint	Description
GET	/api/users	Get all users
POST	/api/users	Create user
PUT	/api/users/:id	Update user
PATCH	/api/users/:id/toggle	Activate/Deactivate user
💰 Records
Method	Endpoint	Description
GET	/api/records	Get all records (filters supported)
POST	/api/records	Create record
PUT	/api/records/:id	Update record
DELETE	/api/records/:id	Delete record
Query Parameters
?page=1
&limit=10
&type=income
&category=salary
&startDate=2026-01-01
&endDate=2026-12-31
📊 Dashboard
Method	Endpoint	Description
GET	/api/dashboard/summary	Financial summary
GET	/api/dashboard/recent	Recent activity
🔐 Role Permissions
Action	Admin	Analyst	Viewer
Manage users	✅	❌	❌
Create record	✅	✅	❌
Update record	✅	✅	❌
Delete record	✅	❌	❌
View records	✅	✅	✅
View dashboard	✅	✅	✅
📌 Assumptions & Design Decisions
Passwords are hashed using bcrypt.
Soft delete is implemented for users via isActive.
RBAC is enforced using middleware.
Services layer handles business logic.
Controllers handle request/response only.
SQLite is used for simplicity and portability.