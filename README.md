💸 SpendWyse API

SpendWyse is a RESTful API built with Node.js, Express.js, and MongoDB that allows users to track their expenses securely. It features user authentication using JWT, secure password handling, and basic CRUD operations for managing expenses.
🚀 Features

    ✅ User Registration & Login (with JWT-based authentication)
    🔐 Protected Routes for authenticated users
    📊 Full CRUD Operations on Expenses
    🔁 Forgot Password and Reset Password (via email using Nodemailer)
    🔄 Token-based session management
    📦 RESTful API architecture

🛠️ Technologies Used

    Node.js
    Express.js
    MongoDB + Mongoose
    JWT (jsonwebtoken)
    bcryptjs
    Nodemailer
    dotenv
    Express Validator
    Morgan (for logging)

📁 Project Structure
    spendWyse/
    ├── controllers/
    │   ├── authController.js
    │   └── expenseController.js
    ├── models/
    │   ├── User.js
    │   └── Expense.js
    ├── routes/
    │   ├── authRoutes.js
    │   └── expenseRoutes.js
    ├── middlewares/
    │   ├── authMiddleware.js
    │   └── errorHandler.js
    ├── utils/
    │   └── sendEmail.js
    ├── .env
    ├── server.js
    └── README.md


⚙️ Installation
    git clone https://github.com/brightBediako/spendWyse.git
    cd spendWyse
    npm install








