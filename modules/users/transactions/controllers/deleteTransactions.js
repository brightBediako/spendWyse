const mongoose = require("mongoose");
const validator = require("validator");


const deleteTransactions = async (req, res) => {
  const transactionModel = mongoose.model("transactions");
  const usersModel = mongoose.model("users");

  const { transaction_id } = req.params;

  if (!validator.isMongoId(transaction_id.toString()))
    throw "Transaction ID is not valid";

  const getTransactions = await transactionModel.findOne({
    _id: transaction_id,
  });

  if (!getTransactions) throw "Transaction not found";

  if (getTransactions.transaction_type === "income") {
    // income logic
    await usersModel.updateOne(
      { _id: getTransactions.user_id },
      {
        $inc: {
          balance: getTransactions.amount * -1,
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
          balance: getTransactions.amount,
        },
      },
      {
        runValidators: true,
      }
    );
  }

  await transactionModel.deleteOne({
    _id: transaction_id,
  });

  res.status(200).json({
    status: "Transaction deleted",
  });
};

module.exports = deleteTransactions;
