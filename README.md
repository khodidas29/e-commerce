🛒 MERN E-Commerce Platform
A production-ready, full-stack E-Commerce application crafted with the MERN stack (MongoDB, Express.js, React, Node.js). Features a sleek modern shopping interface for customers alongside an enterprise-grade admin dashboard for store operations.

⚡ Quick Navigation
🚀 Tech Stack

✨ Features

🔐 Authentication Flow

🗄️ Database Schema

⚙️ Prerequisites & Setup

🧪 Quality Assurance

🚀 Tech Stack
🎨 Frontend
⚛️ React.js — Component-driven UI development

🔀 React Router v6 — Client-side SPA routing

🎨 Tailwind CSS — Utility-first, responsive styling

⚙️ Backend
🟢 Node.js — Event-driven JS runtime environment

🚀 Express.js — Lightweight Web Framework

🍃 MongoDB & Mongoose — NoSQL Document Database & ODM

🔑 JWT & bcrypt.js — Token authentication & password hashing

📁 Multer — Multipart form-data handling for image uploads

🌐 CORS — Cross-Origin Resource Sharing control

🛠️ Developer Tools
📦 npm — Node Package Manager

🔄 Nodemon — Real-time development auto-reloader

🐙 Git & GitHub — Version control system

💻 VS Code — Primary IDE

✨ Features
🛍️ Customer Experience
🔐 Account System: Secure registration, authentication, and persistent sessions.

🔍 Product Discovery: Global product search, dynamic category filtering, and multi-attribute sorting.

📦 Product Catalog: High-resolution galleries, stock availability, and rich product details.

🛒 Shopping Cart: Real-time quantity adjustments, price calculations, and dynamic item removal.

💳 Checkout & Orders: Frictionless order placement with comprehensive user order history.

📱 Adaptive UI: Fully responsive design tailored for mobile, tablet, and desktop viewports.

🛡️ Admin Suite
📊 Store Dashboard: High-level analytics and business metrics at a glance.

📦 Product Manager: Full CRUD operations with dynamic image upload integration.

📂 Category Manager: Dynamic taxonomy classification for products.

🚚 Order Manager: Order lifecycle tracking, status updates, and dispatch management.

👥 User Administration: User role governance and customer management.

📥 Customer Inquiries: Centralized inbox for customer messages and support queries.

🔐 Authentication Flow
Plaintext
  [ Client / User ]
         │
         │  1. Login / Register Request
         ▼
  [ Express Backend ]
         │
         │  2. Verify credentials & sign payload
         ▼
  [ JWT Token Issued ]
         │
         │  3. Token saved in Client (Cookies/LocalStorage)
         ▼
  [ Protected API Call ] ──( Header: Bearer <token> )──► [ Middleware Verification ]
                                                                   │
                                                                   ▼
                                                            [ Protected Route ]

🗄️ Database Schema
The database utilizes MongoDB documents mapped via Mongoose models:

CollectionKey            |       Responsibilities
-----------------------------------------------------------------------------------------------------------------------------------
👤 Users                 |       	Identity, credentials (hashed passwords), delivery addresses, role definitions (customer, admin).
🏷️ Products              |        Inventory items, dynamic pricing, stock counts, image URLs, category links.
📂 Categories            |        Product classification tree, URL slugs, active display status.
🛍️ Cart                  |        Active guest/user carts, item quantities, total calculation holds.
📦 Orders                |        Finalized purchases, order items, payment status, shipping metrics, tracking.


⚙️ Prerequisites & Setup
📋 Prerequisites
Ensure you have the following installed locally:

Bash
# Check Node.js version (v16+ recommended)
node -v

# Check npm version
npm -v

# Check Git installation
git --version


Run Backend Server
Bash
cd backend
npm install
npm run dev

Run Frontend App (In a new terminal window)
Bash
cd frontend
npm install
npm run dev
