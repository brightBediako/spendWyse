💸 spendWy$e API

spendWy$e is a RESTful API built with Node.js, Express.js, and MongoDB that allows users to track their expenses securely. It features user authentication using JWT, secure password handling, and basic CRUD operations for managing expenses.


🚀 Features

    ✅ User Registration & Login (with JWT-based authentication)
    🔐 Protected Routes for authenticated users
    📊 Full CRUD Operations on Expenses
    🔁 Forgot Password and Reset Password (via email using Nodemailer)
    🔄 Token-based session management
    📦 RESTful API architecture


🛠️ Technology Stack

    Backend: Node.js, Express.js
    Database: MongoDB
    Authentication: JWT (JSON Web Tokens)
    Password Hashing: bcryptjs
    Environment Variables: dotenv
    Email: Nodemailer
    Validation: Express-validator
    Testing: Jest/Mocha
    Documentation: Swagger/Postman


📁 Project Structure
    spendWy$e/
    ├── handlers/
    │   ├── errorHandler.js
    ├── managers/
    │   ├── emailManager.js
    │   └── jwtManager.js
    ├── middleware/
    │   ├── auth.js
    ├── models/
    │   ├── users.js
    │   └── transactions.js
    ├── modules/
    │   └── transactions/
    │   │   └── controllers/
    │   │   │   ├── addExpense.js
    │   │   │   ├── addIncome.js
    │   │   │   ├── deleteTransactions.js
    │   │   │   ├── editTransactions.js
    │   │   │   └── getTransactions.js
    │   │   └── transactions.routes.js
    │   └── users/
    │       └── controllers/
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


⚙️ Installation
    git clone https://github.com/brightBediako/spendWyse.git
    cd spendWy$e
    npm install


Create a .env file in the root directory and add your environment variables:
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret


▶️ Running the App
    node index.js
    # or for development with nodemon
    nodemon index.js


🔐 Authentication Flow

    1. Register: POST /api/auth/register
    2. Login: POST /api/auth/login
    3. Forgot Password: POST /api/auth/forgot-password
    4. Reset Password: PUT /api/auth/reset-password/:token


🧾 Expense Endpoints (Protected)
    Add Expense: POST /api/transactions/add-expense
    Add Income: POST /api/transactions/add-income
    Edit Transaction: PUT /api/transactions/edit-transaction/:id
    Delete Transaction: DELETE /api/transactions/delete-transaction/:id
    Get Transactions: GET /api/transactions/get-transactions


    | Method | Endpoint            | Description           |
    | ------ | ------------------- | --------------------- |
    | GET    | `/api/expenses`     | Get all user expenses |
    | POST   | `/api/expenses`     | Create a new expense  |
    | GET    | `/api/expenses/:id` | Get a single expense  |
    | PUT    | `/api/expenses/:id` | Update an expense     |
    | DELETE | `/api/expenses/:id` | Delete an expense     |

    Add Authorization: Bearer <token> header to access these routes.


💌 Email Functionality

    Users can reset their password by receiving a secure reset link via email.
    Emails are sent using Nodemailer with your configured email service.



Testing
Run tests with the following command:
    npm test

For test coverage:
    npm run test:coverage















Contributing

    Fork the repository
    Create your feature branch (git checkout -b feature/amazing-feature)
    Commit your changes (git commit -m 'Add some amazing feature')
    Push to the branch (git push origin feature/amazing-feature)
    Open a Pull Request

License
    This project is licensed under the MIT License - see the LICENSE file for details.




