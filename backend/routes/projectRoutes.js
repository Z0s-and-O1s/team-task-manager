const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const Project = require('../models/Project');

// Create project (only logged in user)
router.post('/', protect, adminOnly, async (req, res) => {
        try {
        const { name } = req.body;

        const project = await Project.create({
            name,
            createdBy: req.user.id,
            members: [req.user.id, ...(req.body.members || [])]        });

        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all projects for user
router.get('/', protect, async (req, res) => {
    try {
        const projects = await Project.find({
            members: req.user.id
        });

        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add member to project
router.put('/add-member/:id', protect, adminOnly, async (req, res) => {
        try {
        const { userId } = req.body;

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // only creator can add members (simple logic)
        if (project.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not allowed" });
        }

        if (!project.members.includes(userId)) {
            project.members.push(userId);
        }

        await project.save();

        res.json(project);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;