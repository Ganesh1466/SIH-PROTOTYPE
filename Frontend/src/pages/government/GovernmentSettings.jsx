import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Database, 
  Server, 
  Key, 
  Sliders, 
  CheckCircle2, 
  Info, 
  Layers, 
  Lock, 
  Users, 
  Bell, 
  FileText, 
  Activity, 
  RefreshCw, 
  PlusCircle, 
  Check, 
  X, 
  Trash2, 
  Edit3, 
  Globe, 
  Cpu, 
  Laptop, 
  Radio, 
  UserCheck, 
  LogOut,
  AlertCircle
} from 'lucide-react';
import { Switch, Chip, Tooltip as MuiTooltip } from '@mui/material';
import { Badge } from '../../components/common/Badge';
import toast from 'react-hot-toast';
import { 
  INITIAL_GENERAL_SETTINGS, 
  INITIAL_DASHBOARD_PREFERENCES, 
  INITIAL_GOVERNMENT_USERS, 
  INITIAL_ROLE_PERMISSIONS, 
  INITIAL_NOTIFICATION_SETTINGS, 
  INITIAL_DATA_SETTINGS, 
  SYSTEM_HEALTH_INFO 
} from '../../data/governmentSettingsData';

export const GovernmentSettings = () => {
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'dashboard' | 'users' | 'permissions' | 'notifications' | 'data' | 'security' | 'system'
  
  // State for all settings sections
  const [generalSettings, setGeneralSettings] = useState(INITIAL_GENERAL_SETTINGS);
  const [dashboardPrefs, setDashboardPrefs] = useState(INITIAL_DASHBOARD_PREFERENCES);
  const [usersList, setUsersList] = useState(INITIAL_GOVERNMENT_USERS);
  const [selectedRole, setSelectedRole] = useState('Government Officer');
  const [rolePermissions, setRolePermissions] = useState(INITIAL_ROLE_PERMISSIONS);
  const [notificationSettings, setNotificationSettings] = useState(INITIAL_NOTIFICATION_SETTINGS);
  const [dataSettings, setDataSettings] = useState(INITIAL_DATA_SETTINGS);
  
  // Security State
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30 Minutes');
  const [passwordPolicy, setPasswordPolicy] = useState(true);

  // Add User Modal State
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'Government Officer',
    department: 'Dept. of Skill & Employment',
    district: 'Jaipur'
  });

  // System Diagnostics Refresh State
  const [systemRefreshing, setSystemRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(SYSTEM_HEALTH_INFO.lastSync);

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    toast.success('General portal configuration saved successfully!');
  };

  const handleToggleDashboardPref = (key) => {
    setDashboardPrefs(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success(`Dashboard widget updated.`);
  };

  const handleTogglePermission = (permissionKey) => {
    setRolePermissions(prev => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [permissionKey]: !prev[selectedRole][permissionKey]
      }
    }));
    toast.success(`Permission updated for ${selectedRole}`);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = {
      id: `usr-0${usersList.length + 1}`,
      name: newUserData.name,
      email: newUserData.email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      role: newUserData.role,
      department: newUserData.department,
      district: newUserData.district,
      lastActive: 'Just Now',
      status: 'Active'
    };

    setUsersList([newUser, ...usersList]);
    toast.success(`Government Officer ${newUserData.name} added successfully!`);
    setAddUserModalOpen(false);
    setNewUserData({ name: '', email: '', role: 'Government Officer', department: 'Dept. of Skill & Employment', district: 'Jaipur' });
  };

  const handleRefreshSystemStatus = () => {
    setSystemRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      setLastSyncTime(`${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`);
      setSystemRefreshing(false);
      toast.success('System diagnostics and Supabase database connection verified (Healthy, 4ms latency)!');
    }, 700);
  };

  const handleLogoutAllSessions = () => {
    toast.success('All other remote administrative sessions terminated.');
  };

  const navTabs = [
    { id: 'general', label: 'General Configuration', icon: Settings, desc: 'Portal identity, department & localization' },
    { id: 'dashboard', label: 'Dashboard Preferences', icon: Sliders, desc: 'Configurable widgets & visual cards' },
    { id: 'users', label: 'Users & Roles', icon: Users, desc: 'Officer directories & credentials' },
    { id: 'permissions', label: 'Role Permissions', icon: Key, desc: 'Granular governance access controls' },
    { id: 'notifications', label: 'Notification Channels', icon: Bell, desc: 'Dispatch routes for policy alerts' },
    { id: 'data', label: 'Data & Reporting Rules', icon: FileText, desc: 'Sync cadence & automated archives' },
    { id: 'security', label: 'Security & Sessions', icon: ShieldCheck, desc: '2FA, audit logs & session locks' },
    { id: 'system', label: 'System Health & Latency', icon: Activity, desc: 'Supabase DB, REST APIs & telemetry' }
  ];

  return (
    <div className="space-y-7 text-slate-100 pb-12 font-sans bg-slate-950">
      
      {/* 1. Header */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-1.5">
            <Settings className="w-4 h-4" />
            <span>Rajasthan Governance Administration</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Portal Administration & Governance Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Configure state matching engines, verification gates, role permissions, notification channels, and infrastructure telemetry.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 px-3.5 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold shadow">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Core Governance Active (SIH 1632)</span>
        </div>
      </div>

      {/* 2. Mobile Horizontal Tab Bar */}
      <div className="flex lg:hidden overflow-x-auto gap-2 pb-2 -mx-1 px-1 no-scrollbar">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Main Two-Column Layout: Left Navigation & Right Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left-Side Settings Navigation (4 Cols) - Desktop only */}
        <div className="hidden lg:block lg:col-span-4 bg-slate-950 rounded-2xl p-3 border border-slate-800 shadow-xl space-y-1">
          <div className="p-3 pb-2 text-[10px] uppercase font-black tracking-wider text-slate-500">
            Settings Modules
          </div>

          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left p-3.5 rounded-xl transition-all flex items-start space-x-3 cursor-pointer ${
                  isActive 
                    ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold shadow-amber-500/20 translate-x-1' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <div>
                  <span className="text-xs font-bold block leading-tight">{tab.label}</span>
                  <span className={`text-[10px] block mt-0.5 ${isActive ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
                    {tab.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right-Side Active Content Panel (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
          
          {/* TAB 1: GENERAL CONFIGURATION */}
          {activeTab === 'general' && (
            <div className="space-y-5 text-xs">
              <div className="pb-3 border-b border-slate-800">
                <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <span>Portal Identity & Localization Configuration</span>
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">Statutory portal metadata and regional department routing</p>
              </div>

              <form onSubmit={handleSaveGeneral} className="space-y-4">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Official Portal Name</label>
                  <input
                    type="text"
                    value={generalSettings.portalName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, portalName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Administrative Department</label>
                  <input
                    type="text"
                    value={generalSettings.department}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, department: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">State Jurisdiction</label>
                    <input
                      type="text"
                      value={generalSettings.state}
                      disabled
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-400 font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Default UI Language</label>
                    <select
                      value={generalSettings.defaultLanguage}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, defaultLanguage: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="English">English (Official Government)</option>
                      <option value="Hindi">हिंदी (Hindi Localization)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Standard Timezone</label>
                    <input
                      type="text"
                      value={generalSettings.timezone}
                      disabled
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-400 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Support / Governance Email</label>
                    <input
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black shadow transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: DASHBOARD PREFERENCES */}
          {activeTab === 'dashboard' && (
            <div className="space-y-5 text-xs">
              <div className="pb-3 border-b border-slate-800">
                <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  <span>Dashboard Widget Configuration</span>
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">Toggle visible widgets on the main government dashboard</p>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'placementRate', title: 'Placement Rate & Funnel Metrics', desc: 'Display candidate conversion rate and placed student tally' },
                  { key: 'studentRegistration', title: 'Student Registration Pipeline', desc: 'Monitor active intake and verification rates' },
                  { key: 'employmentOpportunities', title: 'Employment Opportunities Stream', desc: 'Show active job & internship listings' },
                  { key: 'skillGap', title: 'Critical Skill Gap Matrix', desc: 'Expose high-priority employer talent shortages' },
                  { key: 'districtPerformance', title: 'District Performance Analytics', desc: 'Show regional comparative metrics' },
                  { key: 'opportunityTrends', title: 'Opportunity Growth Trends', desc: 'Display 6-month growth curves' },
                  { key: 'recentApplications', title: 'Recent Corporate Applications', desc: 'Track live incoming candidate applications' },
                  { key: 'aiInsightsFeed', title: 'AI Policy Intelligence Feed', desc: 'Show automated government actionable directives' }
                ].map((widget) => (
                  <div 
                    key={widget.key}
                    className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <span className="font-bold text-white block text-sm">{widget.title}</span>
                      <span className="text-slate-400 text-xs">{widget.desc}</span>
                    </div>

                    <button
                      onClick={() => handleToggleDashboardPref(widget.key)}
                      className={`px-3 py-1 rounded-full text-xs font-black transition-all cursor-pointer ${
                        dashboardPrefs[widget.key] 
                          ? 'bg-emerald-500 text-slate-950 shadow' 
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {dashboardPrefs[widget.key] ? 'ON' : 'OFF'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: USERS & ROLES */}
          {activeTab === 'users' && (
            <div className="space-y-5 text-xs">
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <div>
                  <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span>Government Officers & User Directory</span>
                  </h2>
                  <p className="text-slate-400 text-xs mt-0.5">Manage administrative credentials, departments, and active statuses</p>
                </div>

                <button
                  onClick={() => setAddUserModalOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-black flex items-center space-x-1.5 shadow cursor-pointer transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Government Officer</span>
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Officer</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Department & District</th>
                      <th className="py-3 px-4">Last Active</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {usersList.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center space-x-2.5">
                            <img 
                              src={u.avatar || '/national-emblem.svg'} 
                              alt={u.name}
                              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/national-emblem.svg'; }}
                              className="w-8 h-8 rounded-full object-cover border border-amber-400/50"
                            />
                            <div>
                              <span className="font-bold text-white block">{u.name}</span>
                              <span className="text-[11px] text-slate-400">{u.email}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {u.role}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-slate-300">
                          <span className="block font-medium">{u.department}</span>
                          <span className="text-[11px] text-slate-500">{u.district}</span>
                        </td>

                        <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                          {u.lastActive}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-black ${
                            u.status === 'Active' 
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
                            <span>{u.status}</span>
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => toast.success(`Audit log loaded for ${u.name}`)}
                            className="p-1 text-slate-400 hover:text-white cursor-pointer"
                            title="Inspect Activity"
                          >
                            <Info className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: ROLE PERMISSIONS */}
          {activeTab === 'permissions' && (
            <div className="space-y-5 text-xs">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                    <Key className="w-4 h-4 text-amber-400" />
                    <span>Granular Role Permission Matrix</span>
                  </h2>
                  <p className="text-slate-400 text-xs mt-0.5">Control administrative access privileges per governance role</p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 font-bold">Select Role:</span>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500 font-bold cursor-pointer"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Government Officer">Government Officer</option>
                    <option value="District Officer">District Officer</option>
                    <option value="Department Officer">Department Officer</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  { key: 'viewStudents', label: 'View Students & Academic GPA' },
                  { key: 'viewOpportunities', label: 'View Corporate Opportunities' },
                  { key: 'generateReports', label: 'Generate Employment Intelligence Reports' },
                  { key: 'exportReports', label: 'Export Reports (PDF / Excel / CSV)' },
                  { key: 'manageUsers', label: 'Manage Government User Credentials' },
                  { key: 'manageOpportunities', label: 'Approve & Suspend Corporate Job Posts' },
                  { key: 'viewAnalytics', label: 'View High-Resolution Analytics & Graphs' },
                  { key: 'manageSettings', label: 'Manage Governance System Settings' }
                ].map((perm) => {
                  const isEnabled = rolePermissions[selectedRole]?.[perm.key];
                  return (
                    <div 
                      key={perm.key}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between"
                    >
                      <span className="font-semibold text-white">{perm.label}</span>
                      
                      <button
                        onClick={() => handleTogglePermission(perm.key)}
                        className={`px-3 py-1 rounded-full text-xs font-black transition-all cursor-pointer ${
                          isEnabled 
                            ? 'bg-emerald-500 text-slate-950 shadow' 
                            : 'bg-slate-800 text-slate-500 border border-slate-700'
                        }`}
                      >
                        {isEnabled ? 'ON' : 'OFF'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: NOTIFICATION CHANNELS */}
          {activeTab === 'notifications' && (
            <div className="space-y-5 text-xs">
              <div className="pb-3 border-b border-slate-800">
                <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span>Notification Dispatch Preferences</span>
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">Route alerts across Email, Administrative Dashboard, or Both</p>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'newStudentRegistration', label: 'New Student Registration Intake' },
                  { key: 'newEmploymentOpportunity', label: 'New Corporate Opportunity Submission' },
                  { key: 'placementMilestone', label: 'Placement Rate Milestone Trigger' },
                  { key: 'lowPlacementRateAlert', label: 'Low Placement Rate Regional Alert (<35%)' },
                  { key: 'skillGapAlert', label: 'Critical Skill Gap Shortage Alert' },
                  { key: 'newReportGenerated', label: 'New Intelligence Report Generated' },
                  { key: 'systemUpdates', label: 'System Security & Database Sync Updates' }
                ].map((n) => (
                  <div 
                    key={n.key}
                    className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                  >
                    <span className="font-bold text-white">{n.label}</span>

                    <select
                      value={notificationSettings[n.key]}
                      onChange={(e) => {
                        setNotificationSettings({ ...notificationSettings, [n.key]: e.target.value });
                        toast.success(`Notification channel set to ${e.target.value}`);
                      }}
                      className="bg-slate-950 border border-slate-700 text-amber-400 text-xs font-bold rounded-lg px-3 py-1.5 cursor-pointer"
                    >
                      <option value="Both">Dashboard & Email (Both)</option>
                      <option value="Dashboard">Dashboard Alert Only</option>
                      <option value="Email">Official Email Only</option>
                      <option value="Disabled">Disabled</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: DATA & REPORTING SETTINGS */}
          {activeTab === 'data' && (
            <div className="space-y-5 text-xs">
              <div className="pb-3 border-b border-slate-800">
                <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Data Ingestion & Report Retention Rules</span>
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">Automated synchronization schedule and storage compliance</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <label className="font-bold text-white block">Automatic Data Refresh Cadence</label>
                  <select
                    value={dataSettings.autoRefresh}
                    onChange={(e) => {
                      setDataSettings({ ...dataSettings, autoRefresh: e.target.value });
                      toast.success(`Auto refresh interval updated.`);
                    }}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2 font-semibold cursor-pointer"
                  >
                    <option value="Every 15 minutes">Every 15 Minutes</option>
                    <option value="Every 30 minutes">Every 30 Minutes</option>
                    <option value="Every 1 hour">Every 1 Hour</option>
                    <option value="Manual Only">Manual Refresh Only</option>
                  </select>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <label className="font-bold text-white block">Report Retention Period</label>
                  <select
                    value={dataSettings.reportRetention}
                    onChange={(e) => {
                      setDataSettings({ ...dataSettings, reportRetention: e.target.value });
                      toast.success(`Retention policy updated.`);
                    }}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2 font-semibold cursor-pointer"
                  >
                    <option value="90 Days">90 Days</option>
                    <option value="1 Year">1 Year (Mandatory Minimum)</option>
                    <option value="3 Years">3 Years (Audited Archive)</option>
                  </select>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <label className="font-bold text-white block">Default Export Format</label>
                  <select
                    value={dataSettings.defaultReportFormat}
                    onChange={(e) => setDataSettings({ ...dataSettings, defaultReportFormat: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2 font-semibold cursor-pointer"
                  >
                    <option value="PDF">PDF Dossier (Standard)</option>
                    <option value="CSV">CSV / Excel Spreadsheet</option>
                  </select>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <label className="font-bold text-white block">Default Reporting Date Range</label>
                  <select
                    value={dataSettings.defaultDateRange}
                    onChange={(e) => setDataSettings({ ...dataSettings, defaultDateRange: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2 font-semibold cursor-pointer"
                  >
                    <option value="Last 30 Days">Last 30 Days</option>
                    <option value="Current Quarter">Current Quarter</option>
                    <option value="Financial Year">Current Fiscal Year</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Auto Generate Monthly Policy Report</span>
                  <span className="text-slate-400 text-xs">Automatically compile statewide analytics on the 1st of every month</span>
                </div>
                <button
                  onClick={() => {
                    setDataSettings({ ...dataSettings, autoGenerateMonthly: !dataSettings.autoGenerateMonthly });
                    toast.success('Automated monthly report toggle updated.');
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-black transition-all cursor-pointer ${
                    dataSettings.autoGenerateMonthly ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {dataSettings.autoGenerateMonthly ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: SECURITY & SESSIONS */}
          {activeTab === 'security' && (
            <div className="space-y-5 text-xs">
              <div className="pb-3 border-b border-slate-800">
                <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Administrative Security & Session Governance</span>
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">Two-factor enforcement, session timeouts, and remote device termination</p>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">Mandatory Two-Factor Authentication (2FA)</span>
                    <span className="text-slate-400 text-xs">Enforce OTP verification for all Government Officer logins</span>
                  </div>
                  <button
                    onClick={() => {
                      setTwoFactorAuth(!twoFactorAuth);
                      toast.success(`2FA is now ${!twoFactorAuth ? 'Enforced' : 'Optional'}`);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-black transition-all cursor-pointer ${
                      twoFactorAuth ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {twoFactorAuth ? 'ENFORCED' : 'OPTIONAL'}
                  </button>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">Session Idle Timeout</span>
                    <span className="text-slate-400 text-xs">Automatically lock screen after inactivity</span>
                  </div>
                  <select
                    value={sessionTimeout}
                    onChange={(e) => {
                      setSessionTimeout(e.target.value);
                      toast.success(`Session timeout set to ${e.target.value}`);
                    }}
                    className="bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-1.5 font-bold cursor-pointer"
                  >
                    <option value="15 Minutes">15 Minutes</option>
                    <option value="30 Minutes">30 Minutes</option>
                    <option value="60 Minutes">60 Minutes</option>
                  </select>
                </div>

                {/* Active Session Info Card */}
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-white block text-sm">Active Administrative Sessions</span>
                      <span className="text-slate-400 text-xs">Last login: Today, 05:42 PM (Jaipur IP Node)</span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">
                      2 Active Sessions
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-end">
                    <button
                      onClick={handleLogoutAllSessions}
                      className="px-3.5 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-xl font-bold transition-colors cursor-pointer"
                    >
                      Logout All Other Sessions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: SYSTEM HEALTH & LATENCY */}
          {activeTab === 'system' && (
            <div className="space-y-5 text-xs">
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <div>
                  <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span>System Health & Infrastructure Telemetry</span>
                  </h2>
                  <p className="text-slate-400 text-xs mt-0.5">Real-time status of Supabase, Express API servers, and database pipelines</p>
                </div>

                <button
                  onClick={handleRefreshSystemStatus}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-700 rounded-xl font-bold flex items-center space-x-1.5 cursor-pointer shadow"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${systemRefreshing ? 'animate-spin text-amber-400' : ''}`} />
                  <span>Refresh System Status</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Node.js Express Backend</span>
                    <span className="font-bold text-white text-sm">Port 5000 Active</span>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full font-black text-[10px] flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Connected</span>
                  </span>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Supabase Cloud Database</span>
                    <span className="font-bold text-white text-sm">PostgreSQL Storage</span>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full font-black text-[10px] flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Connected</span>
                  </span>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Government REST APIs</span>
                    <span className="font-bold text-white text-sm">HTTP 200 OK</span>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full font-black text-[10px]">
                    Healthy
                  </span>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Database Query Latency</span>
                    <span className="font-bold text-emerald-400 text-sm">4ms Latency</span>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full font-black text-[10px]">
                    Optimal
                  </span>
                </div>

              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-mono text-slate-400 text-[11px]">
                <div>Last Telemetry Synchronization: <strong className="text-slate-200">{lastSyncTime}</strong></div>
                <div className="text-amber-400 font-bold">{SYSTEM_HEALTH_INFO.version}</div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* 3. Modal: Add Government Officer */}
      {addUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Add Government Officer</h3>
              </div>
              <button
                onClick={() => setAddUserModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-3.5">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Full Official Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rameshwar Lal, RAS"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Official Government Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@rajasthan.gov.in"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Governance Role</label>
                  <select
                    value={newUserData.role}
                    onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Government Officer">Government Officer</option>
                    <option value="District Officer">District Officer</option>
                    <option value="Department Officer">Department Officer</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">District Node</label>
                  <select
                    value={newUserData.district}
                    onChange={(e) => setNewUserData({ ...newUserData, district: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Jaipur">Jaipur</option>
                    <option value="Jodhpur">Jodhpur</option>
                    <option value="Kota">Kota</option>
                    <option value="Udaipur">Udaipur</option>
                    <option value="Ajmer">Ajmer</option>
                    <option value="Alwar">Alwar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Department</label>
                <input
                  type="text"
                  required
                  value={newUserData.department}
                  onChange={(e) => setNewUserData({ ...newUserData, department: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setAddUserModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-400 hover:text-white rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-black shadow cursor-pointer"
                >
                  Create Officer Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
