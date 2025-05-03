const mongoose = require("mongoose");
const validator = require("validator");

const addExpense = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionsModel = mongoose.model("transactions");

  const { amount, remarks } = req.body;

  if (!amount) throw "Amount is required!";
  if (!remarks) throw "Description is required!";

  if (remarks.length < 10)
    throw "Description should at least be 10 characters long!";

  if (!validator.isNumeric(amount.toString()))
    throw "Amount should be a valid number!";

  if (amount < 0) throw "Amount cannot be negative!";

  await transactionsModel.create({
    user_id: req.user._id,
    amount: amount,
    remarks: remarks,
    transaction_type: "expense",
  });

  // Update the user's balance
  await usersModel.updateOne(
    {
      _id: req.user._id,
    },
    {
      $inc: {
        balance: amount * -1, // Decrease the balance by the expense amount
      },
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Expenses added successfully",
  });
};

module.exports = addExpense;
