import { Task } from "../models/task";
import ErrorHandler from "../middleware/error"

export async function createTask(req:any, res: any, next: any){
    try {
        let status = "Pending";
        let priority = "Low";
        const { title, description, statusInput, priorityInput } = req.body;
        if(!req.user){return res.status(400).json("login first")}
        if(statusInput) status = statusInput;
        if(priorityInput) priority = priorityInput;
        
        await Task.create({
          title,
          description,
          status,
          priority,
          user: req.user,
        });
        res.status(201).json({
          success: true,
          message: "Task Added Successfully",
        });
    } catch (error) {
        next(error);
    }
}

export const getMyTask = async (req:any, res:any, next:any) => {
    try {
        const userid = req.user._id;
        const tasks = await Task.find({ user: userid });
      
        res.status(200).json({
          success: true,
          tasks,
        });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req:any, res:any, next:any) => {
    try {
        const {status, priority, deadline} = req.body;
        const id = req.params.id;
        const task = await Task.findById(id);
        if (!task) return next(new ErrorHandler("Invalid ID", 404));
        if(status ) task.status = status;
        if(priority) task.priority = priority;
        if(deadline) task.deadline = deadline;
        await task.save();
        res.status(200).json({
          success: true,
          message: "Task Updated",
        });
    } catch (error) {
        next(error);
    }
};
export const deleteTask = async (req:any, res:any, next:any) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id);
        if (!task) return next(new ErrorHandler("Invalid ID", 404));
      
        await task.deleteOne();
        res.status(200).json({
          success: true,
          message: "Task Deleted",
        });
    } catch (error) {
        next(error);
    }
};