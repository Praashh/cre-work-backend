import mongoose from "mongoose";

const PriorityType = ["Low", "Medium", "Urgent"] as const;
const StatusType = ["TODO", "Pending", "Reviewing", "Completed"] as const;

const schema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    status: {
        type: StatusType,
        require: true,
    },
    priority: {
        type: PriorityType,
    },
    deadline: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export const Task = mongoose.model("Task", schema);