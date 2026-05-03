import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, CheckSquare, Users, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={22} />, path: '/' },
    { name: 'Projects', icon: <FolderKanban size={22} />, path: '/projects' },
    { name: 'Task Board', icon: <CheckSquare size={22} />, path: '/tasks' },
  ];

  if (user?.role === 'Admin') {
    menuItems.push({ name: 'Team', icon: <Users size={22} />, path: '/team' });
  }

  return (
    <aside className="w-80 glass border-r-white/50 h-screen sticky top-0 flex flex-col p-10 z-20">
      <div className="flex items-center gap-4 mb-16 px-2">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-bold text-slate-700 shadow-sm border border-white">
          <Sparkles size={24} className="text-slate-500" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight text-slate-700">
            TaskSphere
          </h1>
          <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Workspace Premium</span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'bg-white text-slate-700 shadow-md shadow-slate-200/50 border border-white' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/40'
              }`
            }
          >
            <span>{item.icon}</span>
            <span className="font-bold text-sm tracking-wide">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <button 
          onClick={logout}
          className="flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-400 hover:text-slate-700 hover:bg-white/40 transition-all duration-300 w-full group"
        >
          <LogOut size={22} />
          <span className="font-bold text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
