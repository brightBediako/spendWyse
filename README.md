# spendWyse

A full-stack personal finance management application to help users track, categorize, and analyze transactions.

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

## Architecture Diagram

```mermaid
graph TD
  subgraph Client [Frontend: React App]
    A[App.jsx]
    B[HomePage]
    C[Login / Register]
    D[PrivateNavbar/PublicNavbar]
    E[Dashboard]
    F[TransactionForm]
    G[CategoriesList / AddCategory / UpdateCategory]
    H[UserProfile]
    I[Redux Store]
    J[Service layer (API calls)]
    K[React Query Provider]
  end

  subgraph API [Backend: Express API]
    L[server.js / app.js]
    M[auth.route.js]
    N[category.route.js]
    O[transaction.route.js]
    P[user.route.js]
    Q[Controllers<br>(auth, user, category, transaction)]
    R[Models<br>(User, Category, Transaction)]
    S[DB Config]
    T[Middleware]
  end

  %% Internal frontend
  A --> B
  A --> C
  A --> D
  A --> E
  A --> G
  A --> F
  A --> H
  A --> K
  H --> J
  E --> J
  F --> J
  G --> J
  J --> K
  A --> I

  %% API endpoints used by client
  J -- "REST (auth, user, category, transaction)" --> L

  %% Backend structure
  L --> M & N & O & P
  M --> Q
  N --> Q
  O --> Q
  P --> Q
  Q --> R
  L --> S
  L --> T
```

---

Enjoy using spendWyse! For questions, open an issue.
