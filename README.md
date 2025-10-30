# spendWyse

A full-stack personal finance management application to help users track, categorize, and analyze transactions.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
  - [Prerequisites](#prerequisites)
  - [Backend (API)](#backend-api)
  - [Frontend (Client)](#frontend-client)
- [API Structure](#api-structure)
- [Usage](#usage)
- [Dev & Contribution](#dev--contribution)
- [Architecture](#architecture)

## Features

- User authentication
- Add, update, delete transactions
- Manage and categorize transactions
- Visual charts and analytics
- Profile and password management

## Tech Stack

- **Frontend:** React, Redux, Vite, React Query, Formik
- **Backend:** Node, Express, MongoDB (Mongoose)
- **API:** RESTful endpoints, JWT auth

## Setup & Installation

### Prerequisites

- Node.js (v16+)
- MongoDB

### Backend (API)

1. `cd api`
2. `npm install`
3. Copy/Paste/Edit `.env.example` as `.env` and set your MongoDB URI and JWT secret
4. `npm run dev` (or `npm start`)
5. Server runs on `http://localhost:5000` by default

### Frontend (Client)

1. `cd client`
2. `npm install`
3. `npm run dev` (default to `http://localhost:5173`)

## Project Structure

Below is the top-level folder structure for this repository. It shows the primary directories and important files to help you navigate the codebase.

```
spendWyse/
├─ api/
│  ├─ package.json
│  ├─ server.js
│  ├─ app/
│  │  └─ app.js
│  ├─ config/
│  │  └─ dbConfig.js
│  ├─ controllers/
│  │  ├─ auth.controller.js
│  │  ├─ category.controller.js
│  │  ├─ transaction.controller.js
│  │  └─ user.controller.js
│  ├─ middlewares/
│  │  ├─ errorHandlerMiddleware.js
│  │  └─ isAuth.js
│  ├─ models/
│  │  ├─ Category.js
│  │  ├─ Transaction.js
│  │  └─ User.js
│  ├─ routes/
│  │  ├─ auth.route.js
│  │  ├─ category.route.js
│  │  ├─ transaction.route.js
│  │  └─ user.route.js
│  └─ utils/
│     └─ (helpers)
├─ client/
│  ├─ package.json
│  ├─ index.html
│  ├─ vite.config.js
│  ├─ public/
│  └─ src/
│     ├─ App.css
│     ├─ App.jsx
│     ├─ index.css
│     ├─ main.jsx
│     ├─ assets/
│     ├─ components/
│     │  ├─ TransactionList.jsx
│     │  ├─ Alert/
│     │  │  └─ AlertMessage.jsx
│     │  ├─ Auth/
│     │  │  ├─ Login.jsx
│     │  │  └─ Register.jsx
│     │  ├─ Category/
│     │  │  ├─ AddCategory.jsx
│     │  │  ├─ CategoriesList.jsx
│     │  │  └─ UpdateCategory.jsx
│     │  ├─ Home/
│     │  │  └─ HomePage.jsx
│     │  ├─ Navbar/
│     │  │  ├─ PrivateNavbar.jsx
│     │  │  └─ PublicNavbar.jsx
│     │  ├─ Transactions/
│     │  │  ├─ TransactionChart.jsx
│     │  │  ├─ TransactionForm.jsx
│     │  │  └─ TransactionList.jsx
│     │  └─ Users/
│     │     ├─ Dashboard.jsx
│     │     ├─ UpdatePassword.jsx
│     │     └─ UserProfile.jsx
│     ├─ redux/
│     │  ├─ slice/
│     │  │  └─ authSlice.js
│     │  └─ store/
│     │     └─ store.js
│     ├─ services/
│     │  ├─ auth/
│     │  │  └─ authServices.js
│     │  ├─ categories/
│     │  │  └─ categoryService.js
│     │  ├─ transactions/
│     │  │  └─ transactionService.js
│     │  └─ users/
│     │     └─ userServices.js
│     └─ utils/
  ├─ getUserFromStorage.js
  └─ url.js
```

## API Structure

- Base URL: `/api/`
- Auth: `/api/auth`
- User Profile: `/api/profile`
- Categories: `/api/category`
- Transactions: `/api/transaction`

## Usage

1. Register/login to create a profile
2. Add your categories
3. Add and manage transactions
4. Analyze via charts/summary views
5. Update profile/password as needed

## Dev & Contribution

- Use `prettier` and `eslint` for code consistency
- Keep API tokens/secrets in the `.env` file and never commit credentials
- Open issues or PRs for proposed changes
- See comments in the code for advanced environment setup

See ARCHITECTURE.md for system design diagram.

---

Enjoy using spendWyse! For questions, open an issue.
