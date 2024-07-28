import jwt from "jsonwebtoken";

export const setCookie = (user: { _id: any; }, res: { status: (arg0: number) => { (): any; new(): any; cookie: { (arg0: string, arg1: any, arg2: { httpOnly: boolean; maxAge: number; sameSite: string; secure: boolean; }): { (): any; new(): any; json: { (arg0: { success: boolean; message: any; }): void; new(): any; }; }; new(): any; }; }; }, message: any,statusCode=200)=>{

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || "secret");
    res
      .status(statusCode)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true,
      })
      .json({
        success: true,
        message,
      });
}