#   Blog App Backend

Backend API for the Blog Application built using **Node.js**, **Express.js**, and **MongoDB Atlas**.

This backend handles:
- User Authentication
- Role-based Authorization (Admin / Author / User)
- Article Management
- Image Uploads using Cloudinary
- Secure JWT Authentication
- MongoDB Database Operations

---

##   Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Cloudinary
- Multer
- bcryptjs
- CORS
- dotenv

---

##   Project Structure

```
Blogapp/
│
├── APIs/
│ ├── AdminAPI.js
│ ├── AuthorAPI.js
│ ├── CommonAPI.js
│ └── userAPI.js
│
├── Models/
│ ├── UserModel.js
│ ├── AdminModel.js
│ └── ArticleModel.js
│
├── config/
│ ├── cloudinary.js
│ ├── cloudinaryUpload.js
│ └── multer.js
│
├── middlewares/
│ ├── verifyTokens.js
│ └── checkauthor.js
│
├── services/
│ └── authService.js
│
├── server.js
├── package.json
└── README.MD
```

---

#   Installation

Clone repository

```bash
git clone https://github.com/SamrakshReddy/CapstoneProject.git
```

Move into backend

```bash
cd Blogapp
```

Install dependencies

```bash
npm install
```

---

#   Environment Variables

Create `.env`

```env
PORT=4000

MONGO_URI=your_mongodb_atlas_connection

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

#  Run Server

Development

```bash
npm run dev
```

Production

```bash
npm start
```

Server:

```
http://localhost:4000
```

---

#  API Routes

## Authentication

### Register User

```http
POST /user-api/users
```

### Register Author

```http
POST /author-api/users
```

### Login

```http
POST /common-api/login
```

### Logout

```http
GET /common-api/logout
```

---

## Articles

### Create Article

```http
POST /author-api/articles
```

### Get All Articles

```http
GET /user-api/articles
```

### Update Article

```http
PUT /author-api/articles/:id
```

### Delete Article

```http
DELETE /author-api/articles/:id
```

---

## Admin

### Get Users

```http
GET /admin-api/users
```

### Delete User

```http
DELETE /admin-api/users/:id
```

---

#  Deployment

## Backend Deployment

Platform: Render

Build Command:

```bash
npm install
```

Start Command:

```bash
npm start
```

Environment Variables:

```env
PORT
MONGO_URI
JWT_SECRET
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

---

#  Author

**Samraksh Reddy**

Capstone Project — Full Stack Blog Application

---
