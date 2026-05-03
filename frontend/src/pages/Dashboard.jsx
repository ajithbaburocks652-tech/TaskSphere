import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, Clock, ListTodo, AlertCircle, History, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

const StatCard = ({ title, value, icon, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass-card p-8 flex items-center justify-between group"
  >
    <div className="space-y-2">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{title}</p>
      <h3 className="text-4xl font-bold text-slate-700 tracking-tight">{value}</h3>
    </div>
    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white ${color} shadow-lg transition-transform group-hover:scale-110 duration-300`}>
      {icon}
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/dashboard/stats', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setData(data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user.token]);

  if (loading) return (
    <div className="flex items-center justify-center h-[calc(100vh-120px)]">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-bold text-slate-700 tracking-tight">Overview</h1>
          <p className="text-slate-400 mt-2 font-medium text-lg">Hello, {user?.name.split(' ')[0]}. Here's your workspace report.</p>
        </div>
        <div className="glass-card px-8 py-4 flex items-center gap-4 bg-white/60">
           <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
           <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">System Active</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          title="Total Tasks" 
          value={data?.stats.totalTasks || 0} 
          icon={<ListTodo size={28} />} 
          color="bg-slate-700"
          delay={0.1}
        />
        <StatCard 
          title="Completed" 
          value={data?.stats.completedTasks || 0} 
          icon={<CheckCircle2 size={28} />} 
          color="bg-emerald-500"
          delay={0.2}
        />
        <StatCard 
          title="Pending" 
          value={data?.stats.pendingTasks || 0} 
          icon={<Clock size={28} />} 
          color="bg-amber-500"
          delay={0.3}
        />
        <StatCard 
          title="Overdue" 
          value={data?.stats.overdueTasks || 0} 
          icon={<AlertCircle size={28} />} 
          color="bg-rose-500"
          delay={0.4}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 glass-card p-10 bg-white/50"
        >
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-700">
              <History size={24} className="text-slate-400" />
              Activity Stream
            </h2>
            <button className="text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors uppercase tracking-widest">History</button>
          </div>

          <div className="space-y-10">
            {data?.recentActivities.length > 0 ? (
              data.recentActivities.map((activity, index) => (
                <div key={index} className="flex gap-8 relative group">
                  {index !== data.recentActivities.length - 1 && (
                    <div className="absolute left-[23px] top-12 bottom-[-40px] w-[2px] bg-slate-100"></div>
                  )}
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-slate-600 leading-relaxed font-medium">
                        <span className="font-bold text-slate-800">{activity.user.name}</span>{' '}
                        {activity.action}
                      </p>
                      <span className="text-[10px] font-bold text-slate-300 uppercase">
                        {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 font-medium italic">
                      {activity.project?.name || 'Workspace'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-center py-10 italic">Quiet day in the workspace.</p>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-10"
        >
          <div className="glass-card p-10 bg-gradient-to-br from-white/80 to-white/40">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-700">
              <TrendingUp size={22} className="text-slate-400" />
              Deadlines
            </h2>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm group hover:shadow-md transition-all">
                <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest bg-rose-50 px-2 py-1 rounded">High Priority</span>
                <p className="font-bold text-slate-700 mt-3 group-hover:text-slate-900 transition-colors">Complete Design Review</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">2 hours remaining</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm group hover:shadow-md transition-all">
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest bg-amber-50 px-2 py-1 rounded">Moderate</span>
                <p className="font-bold text-slate-700 mt-3 group-hover:text-slate-900 transition-colors">Team Standup Prep</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">Tomorrow, 10:00 AM</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
