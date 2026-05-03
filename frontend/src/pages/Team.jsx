import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Users, Mail, Shield, User as UserIcon, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Team = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/dashboard/users', {
          headers: { Authorization: `Bearer ${currentUser.token}` }
        });
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [currentUser.token]);

  if (loading) return (
    <div className="flex items-center justify-center h-[calc(100vh-120px)]">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white">Team Members</h1>
        <p className="text-white/40 mt-1">Manage roles and view your team's composition.</p>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/5">
              <th className="px-6 py-4 text-sm font-semibold text-white/60">Member</th>
              <th className="px-6 py-4 text-sm font-semibold text-white/60">Email</th>
              <th className="px-6 py-4 text-sm font-semibold text-white/60">Role</th>
              <th className="px-6 py-4 text-sm font-semibold text-white/60 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((user, index) => (
              <motion.tr 
                key={user._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-white/[0.02] transition-all"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary/40 to-purple-500/40 border border-white/10 flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-white/40">
                  <div className="flex items-center gap-2">
                    <Mail size={14} />
                    {user.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {user.role === 'Admin' ? (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full border border-primary/20">
                        <Shield size={12} /> ADMIN
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full border border-blue-400/20">
                        <UserIcon size={12} /> MEMBER
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block mr-2 shadow-[0_0_8px_rgba(52,211,153,0.4)]"></span>
                  <span className="text-xs text-white/40 font-medium uppercase tracking-wider">Active</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Team;
