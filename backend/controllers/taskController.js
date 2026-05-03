const Task = require('../models/Task');
const Activity = require('../models/Activity');

exports.createTask = async (req, res) => {
    const { title, description, project, assignedTo, deadline } = req.body;

    try {
        const task = await Task.create({
            title,
            description,
            project,
            assignedTo,
            deadline
        });

        await Activity.create({
            action: `Created task: ${title}`,
            user: req.user._id,
            project,
            task: task._id
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const { projectId } = req.query;
        let query = {};
        if (projectId) query.project = projectId;

        if (req.user.role !== 'Admin') {
            query.assignedTo = req.user._id;
        }

        const tasks = await Task.find(query).populate('assignedTo', 'name email').populate('project', 'name');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTaskStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const task = await Task.findById(req.params.id);

        if (task) {
            task.status = status;
            const updatedTask = await task.save();

            await Activity.create({
                action: `Updated task status: ${task.title} to ${status}`,
                user: req.user._id,
                project: task.project,
                task: task._id
            });

            res.json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
