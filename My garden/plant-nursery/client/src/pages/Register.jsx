import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Lock, Mail, User, Phone, AlertCircle } from 'lucide-react';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'CUSTOMER',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (formData.role === 'SUPER_ADMIN') {
      setError('Registration as Super Admin is not permitted.');
      setSubmitting(false);
      return;
    }

    try {
      const newUser = await register(formData);
      if (newUser.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F7F5EE] min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6 bg-white p-8 sm:p-10 rounded-lg border border-[#163A24]/10 shadow-sm">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-[#163A24] flex items-center justify-center text-[#F7F5EE] mx-auto">
            <span className="font-serif font-semibold text-base">K</span>
          </div>
          <h2 className="font-serif text-3xl font-normal text-[#0B2115]">Create Account</h2>
          <p className="text-xs text-[#647563]">Join Kinattukara Nutmeg Nursery community.</p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2.5 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#172018] mb-1 font-medium">Full Name *</label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Anand Menon"
                className="w-full bg-[#F7F5EE] border border-[#163A24]/20 rounded-md pl-10 pr-4 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24]"
              />
              <User className="w-4 h-4 text-[#647563] absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#172018] mb-1 font-medium">Email Address *</label>
            <div className="relative">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="anand@example.com"
                className="w-full bg-[#F7F5EE] border border-[#163A24]/20 rounded-md pl-10 pr-4 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24]"
              />
              <Mail className="w-4 h-4 text-[#647563] absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#172018] mb-1 font-medium">Phone / WhatsApp Number *</label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98470 12345"
                className="w-full bg-[#F7F5EE] border border-[#163A24]/20 rounded-md pl-10 pr-4 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24]"
              />
              <Phone className="w-4 h-4 text-[#647563] absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#172018] mb-1 font-medium">Password *</label>
            <div className="relative">
              <input
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Minimum 6 characters"
                className="w-full bg-[#F7F5EE] border border-[#163A24]/20 rounded-md pl-10 pr-4 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24]"
              />
              <Lock className="w-4 h-4 text-[#647563] absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-medium py-3 rounded-full text-xs transition-colors flex items-center justify-center space-x-2 shadow"
          >
            <UserPlus className="w-4 h-4" />
            <span>{submitting ? 'Creating Account...' : 'Register'}</span>
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#163A24]/10">
          <p className="text-xs text-[#647563]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#163A24] font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
