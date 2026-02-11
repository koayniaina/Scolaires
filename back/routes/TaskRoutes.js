import express from "express";
import Task from "../models/Task.js";
import { verifyToken } from "../middleware/middleware.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
    const { title, description, priority, status, due_date } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: "Title et description sont requis." });
    }

    try {
        const newTask = new Task({
            title,
            description,
            priority: priority || "low",
            status: status || "pending",
            due_date,
            user_id: req.user.userId
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Impossible de créer la tâche." });
    }
});

router.get("/", verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find({ user_id: req.user.userId }).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Impossible de récupérer les tâches." });
    }
});

router.get("/:id", verifyToken, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Tâche introuvable." });

        if (task.user_id.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Accès refusé." });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});

router.put("/:id", verifyToken, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Tâche introuvable." });

        if (task.user_id.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Accès refusé." });
        }

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});

router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Tâche introuvable." });

        if (task.user_id.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Accès refusé." });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Tâche supprimée avec succès." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});

export default router;
