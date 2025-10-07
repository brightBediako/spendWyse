import mongoose from "mongoose";

const dbConfig = async () => {
  // try {
  //   mongoose.set("strictQuery", false);
  //   const connected = await mongoose.connect(process.env.MONGO_URI);
  //   console.log(`Mongodb connected ${connected.connection.host}`);
  // } catch (error) {
  //   console.log(`Error: ${error.message}`);
  //   process.exit(1);
  // }
};

export default dbConfig;
