import React from 'react';
import { Bell, Search, Settings, Command } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-24 px-12 flex items-center justify-between bg-white/20 backdrop-blur-2xl sticky top-0 z-10 border-b border-white/50">
      <div className="relative group w-[450px]">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Search everything..." 
          className="w-full bg-white/40 border border-white/60 rounded-2xl py-3.5 pl-14 pr-14 text-sm focus:outline-none focus:border-white focus:bg-white/60 transition-all placeholder:text-slate-400 shadow-sm"
        />
        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-white/50 border border-white px-2 py-1 rounded-lg text-[10px] font-bold text-slate-400">
          <Command size={10} /> K
        </div>
      </div>

      <div className="flex items-center gap-10">
        <div className="flex items-center gap-4">
          <button className="w-12 h-12 rounded-2xl bg-white/40 border border-white/60 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-white/60 transition-all shadow-sm">
            <Bell size={22} />
          </button>
          <button className="w-12 h-12 rounded-2xl bg-white/40 border border-white/60 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-white/60 transition-all shadow-sm">
            <Settings size={22} />
          </button>
        </div>

        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-700">{user?.name}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user?.role}</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white border border-white shadow-md p-1 flex items-center justify-center overflow-hidden">
             <div className="w-full h-full rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xl">
                {user?.name?.charAt(0)}
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
