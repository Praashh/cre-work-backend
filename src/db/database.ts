import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI!)
    .then((c) => console.log(`DataBase Added with ${c.connection.host}`))
    .catch((e) => console.log(e));
};