const Project = require('../models/Project');
const Activity = require('../models/Activity');

exports.createProject = async (req, res) => {
    const { name, description, members } = req.body;

    try {
        const project = await Project.create({
            name,
            description,
            members: members || [],
            createdBy: req.user._id
        });

        await Activity.create({
            action: `Created project: ${name}`,
            user: req.user._id,
            project: project._id
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProjects = async (req, res) => {
    try {
        let projects;
        if (req.user.role === 'Admin') {
            projects = await Project.find({}).populate('members', 'name email');
        } else {
            projects = await Project.find({ members: req.user._id }).populate('members', 'name email');
        }
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('members', 'name email');
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
