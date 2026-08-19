import React from 'react';
import { User, Mail, Phone, Calendar, MapPin, Building } from 'lucide-react';

export const PersonalInfoForm = ({ data = {}, onChange, errors = {} }) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl space-y-6 bg-[#0F1630]">
      <div className="border-b border-white/10 pb-3">
        <h3 className="text-base font-bold text-white font-heading tracking-tight flex items-center space-x-2">
          <User className="w-5 h-5 text-pink-400" />
          <span>Section 01 — Personal Information</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          Enter your official identity details as registered with Rajasthan Technical University / State Colleges.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
        
        {/* Full Name */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="block text-slate-300 uppercase tracking-wider">
            Full Name <span className="text-pink-400">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={data.full_name || ''}
              onChange={(e) => handleChange('full_name', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm font-medium text-white placeholder-slate-500 focus:border-pink-500/50 focus:outline-none transition-all"
              required
            />
          </div>
          {errors.full_name && <p className="text-[11px] text-rose-400 font-medium">{errors.full_name}</p>}
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="block text-slate-300 uppercase tracking-wider">
            Email Address <span className="text-pink-400">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              placeholder="e.g. rahul.sharma@college.edu.in"
              value={data.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm font-medium text-white placeholder-slate-500 focus:border-pink-500/50 focus:outline-none transition-all"
              required
            />
          </div>
          {errors.email && <p className="text-[11px] text-rose-400 font-medium">{errors.email}</p>}
        </div>

        {/* 10-digit Indian Mobile Number */}
        <div className="space-y-1.5">
          <label className="block text-slate-300 uppercase tracking-wider">
            Mobile Number (10 Digits) <span className="text-pink-400">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              placeholder="e.g. 9876543210"
              maxLength={10}
              value={data.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, ''))}
              className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm font-medium text-white placeholder-slate-500 focus:border-pink-500/50 focus:outline-none transition-all font-metrics"
              required
            />
          </div>
          {errors.phone && <p className="text-[11px] text-rose-400 font-medium">{errors.phone}</p>}
        </div>

        {/* Date of Birth */}
        <div className="space-y-1.5">
          <label className="block text-slate-300 uppercase tracking-wider">
            Date of Birth <span className="text-pink-400">*</span>
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="date"
              value={data.date_of_birth || '2004-05-15'}
              onChange={(e) => handleChange('date_of_birth', e.target.value)}
              style={{ colorScheme: 'dark' }}
              className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm font-medium text-white focus:border-pink-500/50 focus:outline-none cursor-pointer [color-scheme:dark]"
            />
          </div>
        </div>

        {/* City */}
        <div className="space-y-1.5">
          <label className="block text-slate-300 uppercase tracking-wider">
            Current City in Rajasthan <span className="text-pink-400">*</span>
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. Jaipur, Kota, Jodhpur"
              value={data.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm font-medium text-white placeholder-slate-500 focus:border-pink-500/50 focus:outline-none"
              required
            />
          </div>
          {errors.city && <p className="text-[11px] text-rose-400 font-medium">{errors.city}</p>}
        </div>

      </div>
    </div>
  );
};
