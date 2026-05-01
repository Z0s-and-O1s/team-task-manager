const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const Task = require('../models/Task');
const Project = require('../models/Project');

// Create task
router.post('/', protect, async (req, res) => {
    try {
        // const { title, projectId, assignedTo } = req.body;
        const { title, projectId, assignedTo, dueDate } = req.body;

        // check project exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        

        const task = await Task.create({
            title,
            project: projectId,
            assignedTo,
            dueDate
        });

        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get tasks for logged in user
router.get('/', protect, async (req, res) => {
    try {
        let tasks;

        if (req.user.role === 'admin') {
            // admin sees all tasks
            tasks = await Task.find();
        } else {
            // member sees only their tasks
            tasks = await Task.find({
                assignedTo: req.user.id
            });
        }

        res.json(tasks);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Update task status
router.put('/:id', protect, async (req, res) => {
    try {
        const { status } = req.body;

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // only assigned user can update
        if (task.assignedTo.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not allowed" });
        }

        task.status = status || task.status;

        await task.save();

        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Dashboard stats
router.get('/dashboard', protect, async (req, res) => {
    try {
        let tasks;

    if (req.user.role === 'admin') {
        tasks = await Task.find();
    } else {
        tasks = await Task.find({ assignedTo: req.user.id });
    }

        let pending = 0;
        let completed = 0;
        let overdue = 0;

        tasks.forEach(task => {
            if (task.status === 'pending') {
                pending++;
            } else if (task.status === 'completed') {
                completed++;
            }

            // 👇 ADD THIS PART (overdue logic)
            if (
                task.dueDate &&
                task.dueDate < new Date() &&
                task.status !== 'completed'
            ) {
                overdue++;
            }
        });

        res.json({
            total: tasks.length,
            pending,
            completed,
            overdue
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;