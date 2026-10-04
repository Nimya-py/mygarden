# GreenLeaf — Premium Plant Nursery & Management Platform

A high-end luxury botanical Plant Nursery Website + Multi-Role Management Platform built with React, Vite, Node.js, Express.js, and MongoDB.

---

## 🌿 System Architecture

```text
plant-nursery/
├── client/                 # React + Vite Frontend (Port 5173)
│   ├── src/
│   │   ├── components/     # Reusable UI & Layout Components (Navbar, Footer, ProtectedRoute)
│   │   ├── pages/          # Public & Protected Admin Pages
│   │   ├── layouts/        # PublicLayout & AdminLayout (Sidebar Navigation)
│   │   ├── services/       # Axios API Client Interceptors
│   │   ├── context/        # AuthContext (JWT & Role State)
│   │   ├── App.jsx         # React Router Routing Foundation
│   │   └── main.jsx
│   └── package.json
│
├── server/                 # Node.js + Express API Backend (Port 5000)
│   ├── src/
│   │   ├── config/         # Database Connection (Mongoose)
│   │   ├── controllers/    # Business Logic Controllers (Auth, Product, Nursery, Enquiry, SuperAdmin)
│   │   ├── middleware/     # JWT Auth & Role Authorization Middleware
│   │   ├── models/         # Mongoose Schemas (User, Nursery, Category, Product, Enquiry)
│   │   ├── routes/         # Express API Routes
│   │   ├── utils/          # Database Seed Script
│   │   └── app.js          # Express Application Entry Point
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- MongoDB running locally at `mongodb://127.0.0.1:27017`

### 1. Backend Setup (`server/`)
```bash
cd server
npm install
npm run seed     # Populates initial categories, nursery, products, users
npm run dev      # Starts server on http://localhost:5000
```

### 2. Frontend Setup (`client/`)
```bash
cd client
npm install
npm run dev      # Starts frontend on http://localhost:5173
```

---

## 🔑 Demo Login Credentials

| Role | Email | Password | Access Level |
|---|---|---|---|
| **SUPER ADMIN** | `superadmin@plantnursery.com` | `SuperAdmin123!` | Manage all nurseries, approval/rejection, users, categories |
| **NURSERY ADMIN** | `admin@greenleaf.com` | `NurseryAdmin123!` | Manage own nursery profile, products, customer enquiries |
| **CUSTOMER** | `arjun@example.com` | `Customer123!` | Browse sanctuary plants, search, filter, submit enquiries |

---

## 📡 API Endpoints

- `GET /api/health` — Health check status
- `POST /api/auth/register` — User registration (default: `CUSTOMER`)
- `POST /api/auth/login` — User authentication & JWT generation
- `GET /api/auth/me` — Current logged-in profile
- `GET /api/products` — Search & filter active plant products
- `POST /api/products` — Create plant specimen (`ADMIN`, `SUPER_ADMIN`)
- `GET /api/nurseries` — Approved nurseries list
- `POST /api/enquiries` — Send direct enquiry to nursery
- `GET /api/super-admin/stats` — Platform metrics overview (`SUPER_ADMIN`)

---

## 🎨 Visual Identity & Color Palette

- **Dark Background:** `#0B0F0C`
- **Deep Green:** `#183522`
- **Botanical Green:** `#6F9657`
- **Cream Text:** `#F4F0E7`
- **Warm White:** `#FAF9F5`
- **Muted Gold:** `#B9A36A`
