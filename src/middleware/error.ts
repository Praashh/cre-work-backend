class ErrorHandler extends Error{
    statusCode: any;
    constructor(message: string | undefined, statusCode: any){
        super(message);
        this.statusCode = statusCode;
    } 
}
export const errorMiddleware = (err: { message: string; statusCode: number; },req: any,res: { status: (arg0: any) => { (): any; new(): any; json: { (arg0: { success: boolean; message: any; }): any; new(): any; }; }; }, next: any)=>{

    err.message = err.message || "Internal server Error"
    err.statusCode = err.statusCode || 500

    return res.status(err.statusCode).json({
      success:false,
      message:err.message,
  })
};

export default ErrorHandler;