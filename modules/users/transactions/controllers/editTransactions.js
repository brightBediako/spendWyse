const mongoose = require("mongoose");
const validator = require("validator");

const editTransactions = async (req, res) => {
  const transactionModel = mongoose.model("transactions");
  const usersModel = mongoose.model("users");

  const { transaction_id, amount, transaction_type, remarks } = req.body;

  if (!transaction_id) throw "Transaction ID is not valid";

  if (transaction_type !== "income" && transaction_type !== "expense")
    throw "Transaction type is not valid";

  if (!validator.isMongoId(transaction_id.toString()))
    throw "Transaction ID is not valid";

  const getTransactions = await transactionModel.findOne({
    _id: transaction_id,
  });

  if (!getTransactions) throw "Transaction not found";

  // Retrieve the user associated with the transaction
  const user = await usersModel.findOne({ _id: getTransactions.user_id });
  if (!user) throw "User not found";

  // Calculate the balance adjustment
  let balanceAdjustment = 0;

  // Reverse the effect of the old transaction
  if (getTransactions.transaction_type === "income") {
    balanceAdjustment -= getTransactions.amount;
  } else if (getTransactions.transaction_type === "expense") {
    balanceAdjustment += getTransactions.amount;
  }

  // Apply the effect of the new transaction
  if (transaction_type === "income") {
    balanceAdjustment += amount;
  } else if (transaction_type === "expense") {
    balanceAdjustment -= amount;
  }

  // Update the user's balance
  user.balance += balanceAdjustment;
  await user.save();

  // Update the transaction
  await transactionModel.updateOne(
    {
      _id: transaction_id,
    },
    {
      $set: {
        amount,
        transaction_type,
        remarks,
      },
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "Transaction updated successfully",
  });
};

module.exports = editTransactions;
