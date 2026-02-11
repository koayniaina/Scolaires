import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"], 
        default: "low"
    },
    status: {
        type: String,
        enum: ["pending", "in_progress", "completed"], 
        default: "pending"
    },
    due_date: {
        type: Date
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Task", TaskSchema);
