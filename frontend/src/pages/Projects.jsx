import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Plus, Folder, ArrowRight, Loader2, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/projects', { name, description });
      setShowModal(false);
      setName('');
      setDescription('');
      fetchProjects();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-slate-700 tracking-tight">Projects</h1>
          <p className="text-slate-400 mt-2 font-medium text-lg">Manage team initiatives and collaboration.</p>
        </div>
        {user?.role === 'Admin' && (
          <button 
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} /> Create New
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {projects.map((project, index) => (
            <motion.div 
              key={project._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-10 flex flex-col h-full relative group"
            >
              <div className="flex items-start justify-between mb-10">
                <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform duration-300">
                  <Folder size={32} />
                </div>
                <button className="text-slate-300 hover:text-slate-600 transition-colors">
                   <MoreHorizontal size={24} />
                </button>
              </div>
              
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-bold text-slate-700 tracking-tight">{project.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 font-medium">
                  {project.description || 'Organize and collaborate on project tasks effortlessly.'}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-10 border-t border-slate-100 mt-8">
                <div className="flex -space-x-3">
                  {project.members.slice(0, 4).map((member, i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 rounded-xl bg-white border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-slate-500"
                      title={member.name}
                    >
                      {member.name.charAt(0)}
                    </div>
                  ))}
                  {project.members.length > 4 && (
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400">
                      +{project.members.length - 4}
                    </div>
                  )}
                </div>
                <button className="w-12 h-12 rounded-2xl bg-slate-700 text-white flex items-center justify-center hover:bg-slate-900 transition-all shadow-lg group-hover:translate-x-2">
                  <ArrowRight size={24} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/10 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl glass p-16 rounded-[3rem] space-y-10 shadow-2xl border-white"
          >
            <h2 className="text-3xl font-bold text-slate-700 tracking-tight text-center uppercase">New Project</h2>

            <form onSubmit={handleCreate} className="space-y-8">
              <div className="space-y-2">
                <label className="input-label ml-2">Project Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field" 
                  placeholder="" 
                />
              </div>
              <div className="space-y-2">
                <label className="input-label ml-2">Description</label>
                <textarea 
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-field resize-none" 
                  placeholder=""
                ></textarea>
              </div>
              <div className="flex justify-center gap-6 pt-6">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-primary px-12"
                >
                  {loading ? <Loader2 className="animate-spin" /> : 'Launch'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Projects;
