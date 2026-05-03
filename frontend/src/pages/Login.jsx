import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Spheres */}
      <div className="sphere-overlay">
        <div className="sphere w-[600px] h-[600px] -top-40 -left-20"></div>
        <div className="sphere w-[400px] h-[400px] top-1/2 -translate-y-1/2 right-10"></div>
        <div className="sphere w-[300px] h-[300px] -bottom-20 left-1/3"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[800px] glass p-16 rounded-[2.5rem] flex flex-col items-center shadow-2xl border-white/50"
      >
        <h1 className="text-5xl font-medium tracking-[0.2em] text-slate-700 mb-16 uppercase">Login</h1>

        {error && (
          <div className="w-full max-w-md bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl text-sm mb-8 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-10">
          <div className="space-y-3">
            <label className="input-label ml-2">Email address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field" 
              placeholder="" 
            />
          </div>

          <div className="space-y-3 relative">
            <label className="input-label ml-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pr-14" 
                placeholder="" 
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

          <div className="flex items-center justify-between px-2 text-sm text-slate-500 font-medium">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-slate-400 focus:ring-slate-400" />
              <span className="group-hover:text-slate-700 transition-colors">Remember me</span>
            </label>
            <a href="#" className="hover:text-slate-700 transition-colors">Forgot password?</a>
          </div>

          <div className="flex justify-center pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary min-w-[240px]"
            >
              {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Sign In'}
            </button>
          </div>
        </form>

        <p className="mt-12 text-slate-400 text-sm font-medium tracking-wide">
          Don't have an account? <Link to="/register" className="text-slate-600 hover:underline font-bold transition-all">Register now</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
