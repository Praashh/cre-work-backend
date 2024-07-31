import { User } from "../models/user";
import bcrypt from "bcryptjs";
import { setCookie } from "../utils/features";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../middleware/error";
import { sendEmail } from "../utils/email";

export const Register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    // console.log(password)
    let user = await User.findOne({ email });


    if (user) return next(new ErrorHandler("user already exist", 404));


    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });
    const mailRes = await sendEmail(email);
    if (!mailRes.sucess) return res.status(500).json({ msg: "Something went wrong with email!" });

    setCookie(user, res, user.name!, 201);
  } catch (error) {
    next(error);
  }
};
export const Login = async (req: Request, res: Response, next: NextFunction ) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invailid Email or Password", 400));


    const isMatch = bcrypt.compare(password, user.password!);

    if (!isMatch) return next(new ErrorHandler("Invailid Email or Password", 404));

    setCookie(user, res, user.name!, 200);
  } catch (error) {
    next(error);
  }
};

export const Auth = (req: Request, res: Response) => {
  if (req.cookies && req.cookies.token) {
    res.status(200).json({ isAuthenticated: true });
  } else {
    res.status(400).json({ isAuthenticated: false });
  }
}

export const getMyDetails = (req: any, res: Response) => {
  // console.log(req.user);
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = async (req: any, res: Response) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};