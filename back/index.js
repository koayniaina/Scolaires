import dotenv from "dotenv"
dotenv.config();

import express from "express"
import cors from "cors"
import connecDB from "./config/db.js";
import AuthRoutes from "./routes/AuthRoutes.js"
import TaskRoutes from "./routes/TaskRoutes.js"

const app =  express()
connecDB();

app.use(cors());
app.use(express.json())

const PORT =  process.env.PORT || 7000

app.use("/api/auth" , AuthRoutes);
app.use("/api/task" , TaskRoutes);

app.listen(PORT , () => {
    console.log(`Server running in ${PORT}`)
} )