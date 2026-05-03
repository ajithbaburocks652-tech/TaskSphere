const Task = require('../models/Task');
const Activity = require('../models/Activity');
const User = require('../models/User');

exports.getDashboardStats = async (req, res) => {
    try {
        let taskQuery = {};
        if (req.user.role !== 'Admin') {
            taskQuery.assignedTo = req.user._id;
        }

        const tasks = await Task.find(taskQuery);
        
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(t => t.status === 'Done').length;
        const pendingTasks = tasks.filter(t => t.status !== 'Done').length;
        
        const now = new Date();
        const overdueTasks = tasks.filter(t => t.status !== 'Done' && new Date(t.deadline) < now).length;

        // Get recent activities
        let activityQuery = {};
        if (req.user.role !== 'Admin') {
            activityQuery.user = req.user._id;
        }
        const activities = await Activity.find(activityQuery)
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('user', 'name')
            .populate('project', 'name')
            .populate('task', 'title');

        res.json({
            stats: {
                totalTasks,
                completedTasks,
                pendingTasks,
                overdueTasks
            },
            recentActivities: activities
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('name email role');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
