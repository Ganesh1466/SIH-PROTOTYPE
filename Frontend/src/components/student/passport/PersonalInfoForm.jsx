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
    <div className="bg-white rounded-xl p-6 border border-[#E7E9EE] shadow-2xs space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center space-x-2">
          <User className="w-5 h-5 text-indigo-600" />
          <span>Section 01 — Personal Information</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Enter your official identity details as registered with Rajasthan Technical University / State Colleges.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
        
        {/* Full Name */}
        <div className="space-y-1 sm:col-span-2">
          <label className="block text-slate-700 uppercase tracking-wider">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={data.full_name || ''}
              onChange={(e) => handleChange('full_name', e.target.value)}
              className={`w-full pl-9 pr-3 py-2.5 bg-slate-50 border rounded-lg text-sm font-medium focus:bg-white focus:outline-hidden transition-all ${
                errors.full_name ? 'border-rose-300 focus:ring-1 focus:ring-rose-500' : 'border-slate-200 focus:ring-1 focus:ring-indigo-500'
              }`}
              required
            />
          </div>
          {errors.full_name && <p className="text-[11px] text-rose-600 font-medium">{errors.full_name}</p>}
        </div>

        {/* Email Address */}
        <div className="space-y-1">
          <label className="block text-slate-700 uppercase tracking-wider">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              placeholder="e.g. rahul.sharma@college.edu.in"
              value={data.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full pl-9 pr-3 py-2.5 bg-slate-50 border rounded-lg text-sm font-medium focus:bg-white focus:outline-hidden transition-all ${
                errors.email ? 'border-rose-300 focus:ring-1 focus:ring-rose-500' : 'border-slate-200 focus:ring-1 focus:ring-indigo-500'
              }`}
              required
            />
          </div>
          {errors.email && <p className="text-[11px] text-rose-600 font-medium">{errors.email}</p>}
        </div>

        {/* 10-digit Indian Mobile Number */}
        <div className="space-y-1">
          <label className="block text-slate-700 uppercase tracking-wider">
            Mobile Number (10 Digits) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              placeholder="e.g. 9876543210"
              maxLength={10}
              value={data.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, ''))}
              className={`w-full pl-9 pr-3 py-2.5 bg-slate-50 border rounded-lg text-sm font-medium focus:bg-white focus:outline-hidden transition-all ${
                errors.phone ? 'border-rose-300 focus:ring-1 focus:ring-rose-500' : 'border-slate-200 focus:ring-1 focus:ring-indigo-500'
              }`}
              required
            />
          </div>
          {errors.phone && <p className="text-[11px] text-rose-600 font-medium">{errors.phone}</p>}
        </div>

        {/* Date of Birth */}
        <div className="space-y-1">
          <label className="block text-slate-700 uppercase tracking-wider">
            Date of Birth
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="date"
              value={data.date_of_birth || ''}
              onChange={(e) => handleChange('date_of_birth', e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-1">
          <label className="block text-slate-700 uppercase tracking-wider">
            Gender
          </label>
          <select
            value={data.gender || ''}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>

        {/* City */}
        <div className="space-y-1">
          <label className="block text-slate-700 uppercase tracking-wider">
            Current City in Rajasthan <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. Jaipur, Kota, Jodhpur, Udaipur"
              value={data.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
              required
            />
          </div>
          {errors.city && <p className="text-[11px] text-rose-600 font-medium">{errors.city}</p>}
        </div>

        {/* State */}
        <div className="space-y-1">
          <label className="block text-slate-700 uppercase tracking-wider">
            State
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={data.state || 'Rajasthan'}
              onChange={(e) => handleChange('state', e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
