import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const VALID_CREDENTIALS = {
  student: {
    email: 'student01@gmail.com',
    role: 'student',
    name: 'Rahul Sharma',
    id: 'stu-1',
    dashboardPath: '/student/dashboard',
    loginPath: '/student/login'
  },
  employer: {
    email: 'employee01@gmail.com',
    role: 'employer',
    name: 'TechNova Solutions',
    id: 'comp-1',
    dashboardPath: '/employer/dashboard',
    loginPath: '/employer/login'
  },
  government: {
    email: 'rajgoverment@gmail.com',
    role: 'government',
    name: 'Rajasthan Technical Education Directorate',
    id: 'dept-admin',
    dashboardPath: '/government/dashboard',
    loginPath: '/government/login'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('hiringwallah_auth_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem('hiringwallah_auth_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password, requestedRole) => {
    const cred = VALID_CREDENTIALS[requestedRole];
    
    // In demo environment, validate against assigned role credentials
    if (!cred || cred.email.toLowerCase() !== email.toLowerCase().trim()) {
      toast.error(`Invalid login credentials for ${requestedRole} portal. Please use ${cred?.email}`);
      return false;
    }

    const authUser = {
      email: cred.email,
      name: cred.name,
      role: cred.role,
      token: 'demo-jwt-token-hiringwallah'
    };

    setUser(authUser);
    localStorage.setItem('hiringwallah_auth_user', JSON.stringify(authUser));
    toast.success(`Authenticated as ${cred.name} (${requestedRole.toUpperCase()})`);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hiringwallah_auth_user');
    toast.success('Successfully logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center font-semibold text-slate-500 text-sm">
        Authenticating session...
      </div>
    );
  }

  if (!user) {
    // Redirect to unified portal login
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (user.role !== allowedRole) {
    // Cross-role access restriction: Redirect to the user's authorized dashboard
    const redirectTarget = user.role === 'student' ? '/student/dashboard' :
                           user.role === 'employer' ? '/employer/dashboard' :
                           '/government/dashboard';
    
    return <Navigate to={redirectTarget} replace />;
  }

  return children;
};
