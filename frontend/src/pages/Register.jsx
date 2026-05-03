import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Member');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(name, email, password, role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Spheres */}
      <div className="sphere-overlay">
        <div className="sphere w-[500px] h-[500px] -top-20 -right-20"></div>
        <div className="sphere w-[400px] h-[400px] bottom-10 left-10"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[800px] glass p-16 rounded-[2.5rem] flex flex-col items-center shadow-2xl border-white/50"
      >
        <h1 className="text-5xl font-medium tracking-[0.2em] text-slate-700 mb-12 uppercase text-center leading-tight">Create <br/>Account</h1>

        {error && (
          <div className="w-full max-w-md bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl text-sm mb-8 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <label className="input-label ml-2">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field" 
            />
          </div>

          <div className="space-y-2">
            <label className="input-label ml-2">Email address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field" 
            />
          </div>

          <div className="space-y-2">
            <label className="input-label ml-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pr-14" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="input-label ml-2">Join as</label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setRole('Member')}
                className={`p-3 rounded-2xl border transition-all font-medium text-sm ${role === 'Member' ? 'bg-white border-white shadow-sm text-slate-700' : 'bg-white/30 border-white/20 text-slate-500 hover:bg-white/50'}`}
              >
                Member
              </button>
              <button 
                type="button"
                onClick={() => setRole('Admin')}
                className={`p-3 rounded-2xl border transition-all font-medium text-sm ${role === 'Admin' ? 'bg-white border-white shadow-sm text-slate-700' : 'bg-white/30 border-white/20 text-slate-500 hover:bg-white/50'}`}
              >
                Admin
              </button>
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary min-w-[240px]"
            >
              {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Get Started'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-slate-400 text-sm font-medium">
          Already have an account? <Link to="/login" className="text-slate-600 hover:underline font-bold transition-all">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
