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

// how to update the user balance based on the transaction type
  if (getTransactions.transaction_type === "income") {
    // income logic
    await usersModel.updateOne(
      { _id: getTransactions.user_id },
      {
        $inc: {
          balance: amount * -1,
        },
      },
      {
        runValidators: true,
      }
    );
  } else {
    // expense logic
    await usersModel.updateOne(
      { _id: getTransactions.user_id },
      {
        $inc: {
          balance: amount,
        },
      },
      {
        runValidators: true,
      }
    );
    
}

  res.status(200).json({
    status: "Transaction updated successfully",
  });
};

module.exports = editTransactions;
