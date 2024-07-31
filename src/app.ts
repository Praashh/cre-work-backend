import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import rootRouter from "./routes/index"
dotenv.config();

export const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL! || "http://localhost:3000",
    methods:["GET", "PUT" ,"POST", "DELETE"],
    credentials:true,
}));

app.use("/api/v1", rootRouter);
app.get("/", async (req,res)=>{ res.send("working")});
