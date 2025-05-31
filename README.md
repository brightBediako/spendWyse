## 💸 spendWy$e API

## Introduction
SpendWy$e is a RESTful API built with **Node.js**, **Express.js**, and **MongoDB** that allows users to securely track their expenses. It features user authentication using **JWT**, secure password handling, and basic **CRUD** operations for managing transactions.


## 🚀 Features

- ✅ User Registration & Login (JWT-based authentication)
- 🔐 Protected Routes for authenticated users
- 📊 Full CRUD Operations on Expenses
- 🔁 Forgot Password and Reset Password (via Nodemailer)
- 🔄 Token-based Session Management
- 📦 RESTful API Architecture


## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Environment Variables**: dotenv
- **Email**: Nodemailer
- **Validation**: express-validator
- **Testing**: Jest / Mocha
- **Documentation**: Swagger / Postman

---

## 📁 Project Structure

```
spendWy$e/
├── handlers/
│   └── errorHandler.js
├── managers/
│   ├── emailManager.js
│   └── jwtManager.js
├── middleware/
│   └── auth.js
├── models/
│   ├── users.js
│   └── transactions.js
├── modules/
│   ├── transactions/
│   │   ├── controllers/
│   │   │   ├── addExpense.js
│   │   │   ├── addIncome.js
│   │   │   ├── deleteTransactions.js
│   │   │   ├── editTransactions.js
│   │   │   └── getTransactions.js
│   │   └── transactions.routes.js
│   └── users/
│       ├── controllers/
│       │   ├── login.js
│       │   ├── register.js
│       │   ├── resetPassword.js
│       │   ├── forgetPassword.js
│       │   └── userDashboard.js
│       └── users.routes.js
├── .env
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Installation

```bash
git clone https://github.com/brightBediako/spendWyse.git
cd spendWy$e
npm install
```

---

## 🧾 Environment Variables

Create a `.env` file in the root directory with the following:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

---

## ▶️ Running the App

```bash
node index.js
# or with nodemon for development
nodemon index.js
```

---

## 🔐 Authentication Flow

| Method | Endpoint                         | Description                    |
|--------|----------------------------------|--------------------------------|
| POST   | `/api/auth/register`             | Register a new user            |
| POST   | `/api/auth/login`                | Login and receive JWT token    |
| POST   | `/api/auth/forgot-password`      | Request password reset link    |
| PUT    | `/api/auth/reset-password/:token`| Reset password via token       |

---

## 💰 Expense Endpoints (Protected)

> All routes require the header:  
> `Authorization: Bearer <token>`

| Method | Endpoint                                      | Description                     |
|--------|-----------------------------------------------|---------------------------------|
| POST   | `/api/transactions/add-expense`               | Add a new expense               |
| POST   | `/api/transactions/add-income`                | Add income record               |
| PUT    | `/api/transactions/edit-transaction/:id`      | Edit a transaction              |
| DELETE | `/api/transactions/delete-transaction/:id`    | Delete a transaction            |
| GET    | `/api/transactions/get-transactions`          | Get all user transactions       |

---

## 💌 Email Functionality

- Users can reset their password by receiving a secure reset link via email.
- Emails are sent using **Nodemailer** and your configured email provider.

---

## 🧪 Testing

Run unit and integration tests:

```bash
npm test
```

Run test coverage report:

```bash
npm run test:coverage
```

![Postman Test](public/image.png)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 🔗 Connect

Created with ❤️ by **Bright Bediako**  
[GitHub](https://github.com/brightBediako)