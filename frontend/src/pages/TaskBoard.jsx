import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Plus, CheckCircle, Clock, Loader2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [deadline, setDeadline] = useState('');

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${user.token}` };
      const [tasksRes, projectsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/tasks', { headers }),
        axios.get('http://localhost:5000/api/projects', { headers })
      ]);
      setTasks(tasksRes.data);
      setProjects(projectsRes.data);
      if (user.role === 'Admin') {
        const usersRes = await axios.get('http://localhost:5000/api/dashboard/users', { headers });
        setUsers(usersRes.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/tasks', 
        { title, description, project: projectId, assignedTo, deadline },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setShowModal(false);
      resetForm();
      fetchData();
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const resetForm = () => { setTitle(''); setDescription(''); setProjectId(''); setAssignedTo(''); setDeadline(''); };

  const updateStatus = async (taskId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}/status`, { status }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchData();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-slate-700 tracking-tight">Board</h1>
          <p className="text-slate-400 mt-2 font-medium text-lg">Track progress and manage your workflow.</p>
        </div>
        {user?.role === 'Admin' && (
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
            <Plus size={20} /> Add Task
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {['Todo', 'In Progress', 'Done'].map(status => (
          <div key={status} className="space-y-8">
            <div className="flex items-center justify-between px-4">
              <h3 className="font-bold text-slate-400 uppercase tracking-[0.2em] text-sm flex items-center gap-3">
                {status === 'Todo' && <Clock size={18} />}
                {status === 'In Progress' && <Loader2 size={18} className="animate-spin" />}
                {status === 'Done' && <CheckCircle size={18} />}
                {status}
              </h3>
              <span className="bg-white/50 px-3 py-1 rounded-full text-xs font-bold text-slate-400 shadow-sm border border-white">
                {tasks.filter(t => t.status === status).length}
              </span>
            </div>
            
            <div className="space-y-6 min-h-[500px]">
              {tasks.filter(t => t.status === status).map((task, idx) => (
                <motion.div 
                  key={task._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="glass-card p-6 space-y-6 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-start">
                    <select 
                      value={task.status}
                      onChange={(e) => updateStatus(task._id, e.target.value)}
                      className="text-[10px] font-bold uppercase tracking-widest bg-white/40 border-white/60 rounded-md px-2 py-1 outline-none text-slate-500 cursor-pointer hover:bg-white"
                    >
                      <option value="Todo">Todo</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-slate-700 leading-tight">{task.title}</h4>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 font-medium">{task.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <Calendar size={14} />
                      {format(new Date(task.deadline), 'MMM d')}
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 shadow-inner">
                      {task.assignedTo?.name?.charAt(0) || '?'}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/10 backdrop-blur-md">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-xl glass p-16 rounded-[3rem] space-y-10 border-white shadow-2xl">
            <h2 className="text-3xl font-bold text-slate-700 tracking-tight text-center uppercase">New Task</h2>
            <form onSubmit={handleCreateTask} className="space-y-6">
              <div className="space-y-2">
                <label className="input-label ml-2">Task Title</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="input-label ml-2">Project</label>
                  <select required value={projectId} onChange={(e) => setProjectId(e.target.value)} className="input-field">
                    <option value=""></option>
                    {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="input-label ml-2">Deadline</label>
                  <input type="date" required value={deadline} onChange={(e) => setDeadline(e.target.value)} className="input-field" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="input-label ml-2">Assign To</label>
                <select required value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} className="input-field">
                  <option value=""></option>
                  {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                </select>
              </div>
              <div className="flex justify-center gap-6 pt-6">
                <button type="button" onClick={() => setShowModal(false)} className="font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest text-sm">Discard</button>
                <button type="submit" disabled={loading} className="btn-primary px-12">{loading ? <Loader2 className="animate-spin" /> : 'Assign'}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;
