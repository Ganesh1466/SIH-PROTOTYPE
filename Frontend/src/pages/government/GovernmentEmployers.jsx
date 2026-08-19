import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertOctagon, 
  Search, 
  Filter, 
  ExternalLink, 
  Eye, 
  X, 
  Clock,
  Phone,
  Mail,
  MapPin,
  FileBadge,
  Briefcase,
  Users,
  Award,
  Globe,
  PlusCircle,
  LayoutGrid,
  List,
  Sparkles,
  Check,
  Building,
  UserCheck
} from 'lucide-react';
import { Chip, Tooltip as MuiTooltip } from '@mui/material';
import { governmentApi } from '../../api/governmentApi';
import { Badge } from '../../components/common/Badge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import toast from 'react-hot-toast';

export const GovernmentEmployers = () => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  
  // Selected employer for modal view / action notes
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [actionNotes, setActionNotes] = useState('');
  const [actionModal, setActionModal] = useState({ open: false, type: '', employer: null });

  // Add Employer Modal State
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newEmployerData, setNewEmployerData] = useState({
    companyName: '',
    industry: 'Enterprise SaaS & Cloud',
    district: 'Jaipur',
    location: 'Sitapura Industrial Area, Jaipur',
    contactPerson: '',
    designation: 'Head of Human Resources',
    email: '',
    phone: '+91 98290 00000',
    website: 'https://example.demo',
    cin: 'U72200RJ2024PTC088219',
    gstin: '08AAACE8821R1Z1',
    companySize: '100 - 250 Employees',
    contactPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&auto=format&fit=crop&q=80'
  });

  useEffect(() => {
    fetchEmployers();
  }, [statusFilter, districtFilter]);

  const fetchEmployers = async () => {
    try {
      setLoading(true);
      const res = await governmentApi.getEmployers({
        status: statusFilter,
        district: districtFilter,
        search: searchTerm
      });
      if (res.data?.success) {
        setEmployers(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load employers.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (employerId, newStatus) => {
    try {
      let res;
      if (newStatus === 'VERIFIED') {
        res = await governmentApi.verifyEmployer(employerId, actionNotes);
      } else if (newStatus === 'REJECTED') {
        res = await governmentApi.rejectEmployer(employerId, actionNotes);
      } else if (newStatus === 'SUSPENDED') {
        res = await governmentApi.suspendEmployer(employerId, actionNotes);
      }

      if (res?.data?.success) {
        toast.success(res.data.message);
        setActionModal({ open: false, type: '', employer: null });
        setActionNotes('');
        fetchEmployers();
      }
    } catch (err) {
      toast.error('Failed to update employer verification status.');
    }
  };

  const handleAddEmployer = (e) => {
    e.preventDefault();
    const createdEmp = {
      id: `emp-${Date.now()}`,
      ...newEmployerData,
      registrationNumber: `RJ-${newEmployerData.district.substring(0, 3).toUpperCase()}-CORP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      registrationDate: new Date().toISOString().split('T')[0],
      verificationStatus: 'PENDING',
      activeJobsCount: 1,
      activeInternshipsCount: 1,
      totalHires: 0
    };

    setEmployers([createdEmp, ...employers]);
    toast.success(`Employer registration created for ${newEmployerData.companyName}!`);
    setAddModalOpen(false);
  };

  const openActionModal = (employer, type) => {
    setActionModal({ open: true, type, employer });
    setActionNotes('');
  };

  const filteredEmployers = employers.filter(e => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return e.companyName.toLowerCase().includes(q) || 
           e.industry.toLowerCase().includes(q) ||
           e.district.toLowerCase().includes(q) ||
           e.contactPerson?.toLowerCase().includes(q) ||
           e.registrationNumber.toLowerCase().includes(q);
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'VERIFIED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>✓ Verified Entity</span>
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>⏳ Pending Review</span>
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/40">
            <XCircle className="w-3 h-3 text-rose-400" />
            <span>✕ Rejected</span>
          </span>
        );
      case 'SUSPENDED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-orange-500/20 text-orange-300 border border-orange-500/40">
            <AlertOctagon className="w-3 h-3 text-orange-400" />
            <span>⚠ Suspended</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 text-slate-100 pb-10 font-sans">
      
      {/* 1. Header */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Rajasthan Corporate Registry</span>
            </span>
            <Chip 
              label="Statutory Verification Active" 
              size="small" 
              sx={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', fontWeight: 700, fontSize: '0.7rem' }} 
            />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Registered Employers & Verified Enterprise Profiles
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Official government console verifying authorized corporate entities, HR leadership identities, statutory GSTIN/CIN documentation, and Rajasthan campus placement licenses.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-black flex items-center space-x-1.5 shadow cursor-pointer transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register Employer</span>
          </button>

          {/* Counts summary */}
          <div className="flex items-center space-x-3 text-xs bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
            <div className="text-center">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Total</span>
              <span className="text-sm font-black text-white">{employers.length}</span>
            </div>
            <div className="h-6 w-px bg-slate-800"></div>
            <div className="text-center">
              <span className="text-emerald-400 block text-[10px] uppercase font-bold">Verified</span>
              <span className="text-sm font-black text-emerald-400">
                {employers.filter(e => e.verificationStatus === 'VERIFIED').length}
              </span>
            </div>
            <div className="h-6 w-px bg-slate-800"></div>
            <div className="text-center">
              <span className="text-amber-400 block text-[10px] uppercase font-bold">Pending</span>
              <span className="text-sm font-black text-amber-400">
                {employers.filter(e => e.verificationStatus === 'PENDING').length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Filter and Search Bar */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search company, HR director, district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Status, District & View Filters */}
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="ALL">All Verification Statuses</option>
            <option value="PENDING">⏳ Pending Review</option>
            <option value="VERIFIED">✓ Verified Only</option>
            <option value="SUSPENDED">⚠ Suspended</option>
            <option value="REJECTED">✕ Rejected</option>
          </select>

          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="ALL">All Districts</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Jodhpur">Jodhpur</option>
            <option value="Kota">Kota</option>
            <option value="Udaipur">Udaipur</option>
            <option value="Ajmer">Ajmer</option>
            <option value="Bikaner">Bikaner</option>
            <option value="Alwar">Alwar</option>
            <option value="Sikar">Sikar</option>
          </select>

          {/* Grid vs Table View Switcher */}
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded cursor-pointer transition-colors ${viewMode === 'grid' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded cursor-pointer transition-colors ${viewMode === 'table' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              title="Compact Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* 3. Employer Content: Card Grid View or Table View */}
      {loading ? (
        <SkeletonLoader count={4} />
      ) : filteredEmployers.length === 0 ? (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-12 text-center text-slate-500 space-y-2">
          <Building2 className="w-8 h-8 mx-auto text-slate-600 animate-pulse" />
          <p className="text-sm font-semibold">No employers found matching specified query.</p>
        </div>
      ) : viewMode === 'grid' ? (
        /* Rich Modern Grid Card View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEmployers.map((emp) => (
            <div 
              key={emp.id}
              className="bg-slate-950 rounded-2xl border border-slate-800 hover:border-slate-700 shadow-xl overflow-hidden flex flex-col justify-between transition-all group"
            >
              <div>
                {/* Card Header with Company Logo & Status */}
                <div className="p-5 border-b border-slate-800/80 bg-gradient-to-br from-slate-900/90 to-slate-950">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={emp.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&auto=format&fit=crop&q=80'} 
                        alt={emp.companyName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow shrink-0"
                      />
                      <div>
                        <h3 className="font-extrabold text-white text-base leading-tight group-hover:text-amber-400 transition-colors">
                          {emp.companyName}
                        </h3>
                        <span className="text-xs text-sky-400 font-medium">{emp.industry}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-800/60">
                    <span className="flex items-center space-x-1 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{emp.district}, Rajasthan</span>
                    </span>
                    {getStatusBadge(emp.verificationStatus)}
                  </div>
                </div>

                {/* Body Details & Professional Representative Profile Photo */}
                <div className="p-5 space-y-4 text-xs">
                  {/* HR / Director Profile Box */}
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center space-x-3">
                    <div className="relative shrink-0">
                      <img 
                        src={emp.contactPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'} 
                        alt={emp.contactPerson}
                        className="w-11 h-11 rounded-full object-cover border-2 border-amber-400/50 shadow"
                      />
                      <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900 absolute -bottom-0.5 -right-0.5"></span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Authorized Representative</span>
                      <span className="font-bold text-white text-xs block">{emp.contactPerson}</span>
                      <span className="text-[11px] text-slate-400">{emp.designation || 'VP HR / Talent Head'}</span>
                    </div>
                  </div>

                  {/* Quick Meta Grid */}
                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800/60">
                      <span className="text-[10px] text-slate-400 block font-semibold">Active Jobs</span>
                      <span className="text-sm font-black text-sky-400">{emp.activeJobsCount} Openings</span>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800/60">
                      <span className="text-[10px] text-slate-400 block font-semibold">Rajasthan Hires</span>
                      <span className="text-sm font-black text-emerald-400">{emp.totalHires} Students</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-slate-400 pt-1">
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span>Reg ID:</span>
                      <span className="text-slate-300 font-semibold">{emp.registrationNumber}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>GSTIN:</span>
                      <span className="text-slate-300 font-mono font-medium">{emp.gstin || '08AAACT8842R1Z5'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Scale:</span>
                      <span className="text-slate-300 font-medium">{emp.companySize || '100 - 250 Employees'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedEmployer(emp)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>Inspect Credentials</span>
                </button>

                <div className="flex items-center space-x-1.5">
                  {emp.verificationStatus !== 'VERIFIED' && (
                    <button
                      onClick={() => openActionModal(emp, 'VERIFIED')}
                      className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-xs font-black transition-colors cursor-pointer"
                    >
                      Verify
                    </button>
                  )}
                  {emp.verificationStatus !== 'SUSPENDED' && emp.verificationStatus === 'VERIFIED' && (
                    <button
                      onClick={() => openActionModal(emp, 'SUSPENDED')}
                      className="px-2.5 py-1.5 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/40 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      Suspend
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* High-Density Compliance Table View */
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-5">Company & HR Head</th>
                  <th className="py-3.5 px-4">Industry Sector</th>
                  <th className="py-3.5 px-4">District</th>
                  <th className="py-3.5 px-4">Registration ID</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-center">Active Jobs</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredEmployers.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={emp.contactPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'} 
                          alt={emp.contactPerson}
                          className="w-9 h-9 rounded-full object-cover border border-amber-400/50 shadow"
                        />
                        <div>
                          <span className="font-bold text-white block text-sm">{emp.companyName}</span>
                          <span className="text-[11px] text-slate-400">{emp.contactPerson} ({emp.designation || 'HR Head'})</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300 font-medium">
                      {emp.industry}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="flex items-center space-x-1 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-amber-400/80" />
                        <span>{emp.district}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                      {emp.registrationNumber}
                    </td>

                    <td className="py-3.5 px-4">
                      {getStatusBadge(emp.verificationStatus)}
                    </td>

                    <td className="py-3.5 px-4 text-center font-bold text-sky-400">
                      {emp.activeJobsCount}
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => setSelectedEmployer(emp)}
                          className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-md border border-slate-700 transition-colors cursor-pointer"
                          title="Inspect Credentials"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {emp.verificationStatus !== 'VERIFIED' && (
                          <button
                            onClick={() => openActionModal(emp, 'VERIFIED')}
                            className="px-2.5 py-1 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 rounded-md font-bold text-[11px] transition-colors cursor-pointer"
                          >
                            Verify
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Modal: Detailed Employer Credential Inspection */}
      {selectedEmployer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-4">
                <img 
                  src={selectedEmployer.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&auto=format&fit=crop&q=80'} 
                  alt={selectedEmployer.companyName}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-700 shadow"
                />
                <div>
                  <h3 className="text-lg font-black text-white">{selectedEmployer.companyName}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-amber-400 font-semibold">{selectedEmployer.industry}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400">{selectedEmployer.district}, Rajasthan</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedEmployer(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Representative Profile Spotlight */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
              <img 
                src={selectedEmployer.contactPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'} 
                alt={selectedEmployer.contactPerson}
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow"
              />
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <span className="font-extrabold text-white text-sm">{selectedEmployer.contactPerson}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                    KYC Verified
                  </span>
                </div>
                <p className="text-xs text-slate-400">{selectedEmployer.designation || 'Head of Talent & Recruitment'} • {selectedEmployer.email}</p>
                <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start space-x-1">
                  <Phone className="w-3 h-3 text-sky-400" />
                  <span>{selectedEmployer.phone}</span>
                </p>
              </div>
            </div>

            {/* Registry Info Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">State Registration ID</span>
                <span className="font-mono text-amber-300 font-bold">{selectedEmployer.registrationNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">Registration Date</span>
                <span className="text-white font-medium">{selectedEmployer.registrationDate}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">Corporate CIN</span>
                <span className="text-slate-300 font-mono">{selectedEmployer.cin || 'U72200RJ2021PTC074521'}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">GSTIN Identification</span>
                <span className="text-slate-300 font-mono">{selectedEmployer.gstin || '08AAACT8842R1Z5'}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">Registered Office Address</span>
                <span className="text-slate-300">{selectedEmployer.location}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedEmployer(null)}
                className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white bg-slate-800 rounded-xl cursor-pointer"
              >
                Close
              </button>
              {selectedEmployer.verificationStatus !== 'VERIFIED' && (
                <button
                  onClick={() => {
                    const emp = selectedEmployer;
                    setSelectedEmployer(null);
                    openActionModal(emp, 'VERIFIED');
                  }}
                  className="px-4 py-2 text-xs font-black text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl cursor-pointer"
                >
                  Approve Verification
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal: Register New Employer Entity */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Register Corporate Entity</h3>
              </div>
              <button
                onClick={() => setAddModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEmployer} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Company Legal Name</label>
                <input
                  type="text"
                  required
                  value={newEmployerData.companyName}
                  onChange={(e) => setNewEmployerData({ ...newEmployerData, companyName: e.target.value })}
                  placeholder="e.g. Apex Cloud Labs Pvt Ltd"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Industry Domain</label>
                  <input
                    type="text"
                    required
                    value={newEmployerData.industry}
                    onChange={(e) => setNewEmployerData({ ...newEmployerData, industry: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">District Node</label>
                  <select
                    value={newEmployerData.district}
                    onChange={(e) => setNewEmployerData({ ...newEmployerData, district: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Jaipur">Jaipur</option>
                    <option value="Jodhpur">Jodhpur</option>
                    <option value="Kota">Kota</option>
                    <option value="Udaipur">Udaipur</option>
                    <option value="Ajmer">Ajmer</option>
                    <option value="Bikaner">Bikaner</option>
                    <option value="Alwar">Alwar</option>
                    <option value="Sikar">Sikar</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Authorized Representative</label>
                  <input
                    type="text"
                    required
                    value={newEmployerData.contactPerson}
                    onChange={(e) => setNewEmployerData({ ...newEmployerData, contactPerson: e.target.value })}
                    placeholder="e.g. Rajiv Menon"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Official Email</label>
                  <input
                    type="email"
                    required
                    value={newEmployerData.email}
                    onChange={(e) => setNewEmployerData({ ...newEmployerData, email: e.target.value })}
                    placeholder="hr@company.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white bg-slate-800 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow cursor-pointer"
                >
                  Submit Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Modal: Verification Confirmation Action */}
      {actionModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {actionModal.type === 'VERIFIED' && 'Approve & Verify Employer'}
                {actionModal.type === 'REJECTED' && 'Reject Employer Registration'}
                {actionModal.type === 'SUSPENDED' && 'Suspend Employer Account'}
              </h3>
              <button
                onClick={() => setActionModal({ open: false, type: '', employer: null })}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Confirm status change for <strong className="text-white">{actionModal.employer?.companyName}</strong>.
            </p>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Administrative Directives / Notes</label>
              <textarea
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                placeholder="Optional regulatory compliance notes..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 h-20 resize-none"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setActionModal({ open: false, type: '', employer: null })}
                className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white bg-slate-800 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange(actionModal.employer?.id, actionModal.type)}
                className={`px-5 py-2 text-xs font-black rounded-xl shadow cursor-pointer ${
                  actionModal.type === 'VERIFIED' 
                    ? 'bg-emerald-400 text-slate-950 hover:bg-emerald-300' 
                    : actionModal.type === 'SUSPENDED' 
                    ? 'bg-orange-500 text-white hover:bg-orange-400' 
                    : 'bg-rose-500 text-white hover:bg-rose-400'
                }`}
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
