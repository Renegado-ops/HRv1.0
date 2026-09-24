import React, { useState, useEffect } from 'react';
import { 
  Search, Bell, Plus, X, Check, XCircle, ChevronDown, ChevronUp, Pencil, LogOut, ArrowLeft,
  Settings as GearIcon, Users, Calendar, Clock, Sun, Globe, Eye, EyeOff, ArrowUpDown, Send, CheckCircle2,
  Trash2, MapPin, Building2, Globe2, Download, AlignLeft, List, UserCheck, Info, ShieldCheck, Key, UserCog, Lock,
  AlertTriangle, CheckCircle, FileSpreadsheet, ChevronLeft, ChevronRight, Upload, Server
} from 'lucide-react';

// --- INTERFACES ---
export interface Employee {
  id: string;
  name: string;
  email: string;
  governmentId: string;
  role: 'User' | 'Admin' | 'Accounting' | 'Owner';
  loginMethod: string;
  lastLogin: string;
  status: 'Active' | 'Disabled';
  hireDate: string;
  office: string;
  team: string;
}

export interface LeaveRequest {
  id: string;
  employeeName: string;
  type: 'Vacation' | 'Sick leave' | 'PTO' | 'Floating Day' | 'Tardanza (Late Arrival)';
  startDate: string;
  endDate: string;
  duration: 'Full Day' | 'Half Day (Morning)' | 'Half Day (Afternoon)' | 'Hourly (Late Arrival)';
  days: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
  approver: string;
  reason?: string;
}

export interface Team {
  id: string;
  name: string;
  lead: string;
  membersCount: number;
  description: string;
}

export interface Office {
  id: string;
  name: string;
  location: string;
  timezone: string;
  employeesCount: number;
  type: 'Main Office' | 'Regional' | 'Remote';
  holidayCalendar: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
}

// --- BRAND COMPONENT (ITR HRv) ---
const ITRHRvBrand: React.FC<{ variant?: 'header' | 'login' }> = ({ variant = 'header' }) => (
  <div className="flex items-center space-x-2.5 cursor-pointer select-none">
    <svg viewBox="0 0 100 100" className={variant === 'login' ? "w-12 h-12" : "w-8 h-8"}>
      <defs>
        <linearGradient id="itrBrandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0052cc" />
          <stop offset="50%" stopColor="#1ba0d7" />
          <stop offset="100%" stopColor="#00f2ad" />
        </linearGradient>
      </defs>
      <circle 
        cx="50" cy="50" r="36" fill="none" stroke="url(#itrBrandGradient)" 
        strokeWidth="14" strokeDasharray="170 55" transform="rotate(-40 50 50)" strokeLinecap="round" 
      />
    </svg>
    <div className="flex items-center space-x-1.5 font-sans">
      <span className={`font-bold tracking-tight ${variant === 'login' ? 'text-3xl text-[#0052cc]' : 'text-xl text-white'}`}>
        ITR
      </span>
      <span className={`px-2 py-0.5 rounded-md font-semibold tracking-wider uppercase ${
        variant === 'login' ? 'bg-[#1ba0d7] text-white text-sm' : 'bg-white/20 text-white border border-white/30 text-xs'
      }`}>
        HRv
      </span>
    </div>
  </div>
);

// --- GOOGLE ICON COMPONENT ---
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// --- MOCK DATA ---
const initialEmployees: Employee[] = [
  { id: '1', name: 'Aaron Garcia', email: 'aaron.garcia@company.com', governmentId: '001-1829304-5', role: 'User', loginMethod: 'Google', lastLogin: '24 days ago', status: 'Active', hireDate: '2024-01-15', office: 'Santiago Operations', team: 'Customer Support' },
  { id: '2', name: 'Abby Jhonson', email: 'abby.jhonson@company.com', governmentId: 'US-PASSPORT-882192', role: 'User', loginMethod: 'Google', lastLogin: '2 days ago', status: 'Active', hireDate: '2024-03-10', office: 'Headquarters (HQ)', team: 'Engineering & Product' },
  { id: '3', name: 'Abraham Cedano', email: 'abraham.cedano@company.com', governmentId: '402-9812733-1', role: 'Disabled', loginMethod: 'Invitation', lastLogin: 'Never', status: 'Disabled', hireDate: '2023-11-01', office: 'Santiago Operations', team: 'Accounting & Tax Relief' },
  { id: '4', name: 'Alex Morgan', email: 'alex.morgan@company.com', governmentId: 'US-DL-9921023', role: 'Owner', loginMethod: 'Google Workspace', lastLogin: 'Today', status: 'Active', hireDate: '2022-05-01', office: 'Headquarters (HQ)', team: 'Engineering & Product' },
  { id: '5', name: 'Carlos Mendoza', email: 'carlos.mendoza@company.com', governmentId: '031-0021923-8', role: 'User', loginMethod: 'Google', lastLogin: '3 days ago', status: 'Active', hireDate: '2025-02-18', office: 'Santiago Operations', team: 'Accounting & Tax Relief' },
  { id: '6', name: 'Sarah Connor', email: 'sarah.connor@company.com', governmentId: 'US-SSN-449102', role: 'Admin', loginMethod: 'Google Workspace', lastLogin: '1 day ago', status: 'Active', hireDate: '2023-08-12', office: 'Headquarters (HQ)', team: 'Accounting & Tax Relief' },
];

const initialRequests: LeaveRequest[] = [
  { id: '101', employeeName: 'Carlos Mendoza', type: 'Vacation', startDate: '2026-09-10', endDate: '2026-09-12', duration: 'Full Day', days: 3, status: 'Approved', approver: 'Sarah Connor', reason: 'Annual family vacation' },
  { id: '102', employeeName: 'Abby Jhonson', type: 'Sick leave', startDate: '2026-09-15', endDate: '2026-09-15', duration: 'Half Day (Morning)', days: 0.5, status: 'Approved', approver: 'Alex Morgan', reason: 'Medical appointment' },
  { id: '103', employeeName: 'Aaron Garcia', type: 'Tardanza (Late Arrival)', startDate: '2026-09-23', endDate: '2026-09-23', duration: 'Hourly (Late Arrival)', days: 0.25, status: 'Approved', approver: 'Alex Morgan', reason: 'Heavy traffic on highway' },
  { id: '104', employeeName: 'Carlos Mendoza', type: 'PTO', startDate: '2026-09-25', endDate: '2026-09-25', duration: 'Full Day', days: 1, status: 'Approved', approver: 'Sarah Connor', reason: 'Personal matters' },
];

const initialTeams: Team[] = [
  { id: '1', name: 'Engineering & Product', lead: 'Alex Morgan', membersCount: 4, description: 'Software architecture, frontend development and quality assurance.' },
  { id: '2', name: 'Accounting & Tax Relief', lead: 'Sarah Connor', membersCount: 3, description: 'Financial planning, client tax strategy, and audit operations.' },
  { id: '3', name: 'Customer Support', lead: 'Aaron Garcia', membersCount: 2, description: 'Client onboarding and technical support assistance.' },
];

const initialOffices: Office[] = [
  { id: '1', name: 'Headquarters (HQ)', location: 'Miami, Florida, USA', timezone: 'EST (UTC-5)', employeesCount: 6, type: 'Main Office', holidayCalendar: 'US Federal Holidays' },
  { id: '2', name: 'Santiago Operations', location: 'Santiago, Dominican Republic', timezone: 'AST (UTC-4)', employeesCount: 4, type: 'Regional', holidayCalendar: 'Dominican Republic National Holidays' },
  { id: '3', name: 'Remote Hub', location: 'Global / Virtual Work', timezone: 'Flexible', employeesCount: 2, type: 'Remote', holidayCalendar: 'International Standard' },
];

const initialAuditLogs: AuditLog[] = [
  { id: '1', timestamp: '2026-09-23 09:15:22', user: 'System', action: 'Configuration', details: 'Google Workspace SSO Enforced.' },
  { id: '2', timestamp: '2026-09-20 14:02:10', user: 'Alex Morgan', action: 'Approve Request', details: 'Approved Sick leave request for Abby Jhonson.' },
];

export default function App() {
  // Autenticación & Usuario en Sesión
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    role: 'User' | 'Admin' | 'Accounting' | 'Owner';
    avatar: string;
    password: string;
  }>({
    name: 'Alex Morgan',
    email: 'alex.morgan@company.com',
    role: 'Owner',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop',
    password: 'SSO_MANAGED'
  });

  // Modal Profile Settings
  const [isMyProfileModalOpen, setIsMyProfileModalOpen] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profileAvatar, setProfileAvatar] = useState('');
  const [passMessage, setPassMessage] = useState({ type: '', text: '' });

  // Navegación
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [settingsSubView, setSettingsSubView] = useState<string | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  // Desplegables Header
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'New leave request', desc: 'Carlos Mendoza requested 4 days Vacation', time: '10m ago' },
    { id: '2', title: 'Late arrival reported', desc: 'Aaron Garcia reported Tardanza for today', time: '1h ago' }
  ]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Datos del Sistema
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('itr_hrv_employees_final_v6');
    return saved ? JSON.parse(saved) : initialEmployees;
  });

  const [requests, setRequests] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem('itr_hrv_requests_final_v6');
    return saved ? JSON.parse(saved) : initialRequests;
  });

  const [teams] = useState<Team[]>(initialTeams);
  const [offices] = useState<Office[]>(initialOffices);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);

  // Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isOfficeModalOpen, setIsOfficeModalOpen] = useState(false);

  // Filtros
  const [requestFilter, setRequestFilter] = useState('All Pending');
  const [empSearchQuery, setEmpSearchQuery] = useState('');
  const [openUserMenuId, setOpenUserMenuId] = useState<string | null>(null);
  const [dashboardCalendarFilter, setDashboardCalendarFilter] = useState('All Events');

  // Formulario Usuario (Manual)
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserGovId, setNewUserGovId] = useState('');
  const [newUserRole, setNewUserRole] = useState<'User' | 'Admin' | 'Accounting' | 'Owner'>('User');

  // Formulario Solicitud / Tardanza
  const [reqEmployee, setReqEmployee] = useState('');
  const [reqType, setReqType] = useState<'Vacation' | 'Sick leave' | 'PTO' | 'Floating Day' | 'Tardanza (Late Arrival)'>('Vacation');
  const [reqDuration, setReqDuration] = useState<'Full Day' | 'Half Day (Morning)' | 'Half Day (Afternoon)' | 'Hourly (Late Arrival)'>('Full Day');
  const [reqStart, setReqStart] = useState('');
  const [reqEnd, setReqEnd] = useState('');
  const [reqReason, setReqReason] = useState('');

  // Control del Mes en el Calendario Interactivo
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // September 2026

  useEffect(() => { localStorage.setItem('itr_hrv_employees_final_v6', JSON.stringify(employees)); }, [employees]);
  useEffect(() => { localStorage.setItem('itr_hrv_requests_final_v6', JSON.stringify(requests)); }, [requests]);

  const addAuditLog = (user: string, action: string, details: string) => {
    const newLog: AuditLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user,
      action,
      details
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  const isAdminOrOwner = currentUser.role === 'Admin' || currentUser.role === 'Owner';

  // --- GOOGLE WORKSPACE SSO & AUTO-PROVISIONING LOGIC ---
  const handleGoogleSSOLogin = (mockProfile: { name: string, email: string, avatar: string, role?: 'Owner' | 'User' }) => {
    const existingEmp = employees.find(e => e.email.toLowerCase() === mockProfile.email.toLowerCase());

    if (!existingEmp) {
      // AUTO-PROVISIONING: Create account instantly
      const newEmp: Employee = {
        id: Date.now().toString(),
        name: mockProfile.name,
        email: mockProfile.email,
        governmentId: 'PENDING-SSO',
        role: mockProfile.role || 'User',
        loginMethod: 'Google Workspace',
        lastLogin: 'Just now',
        status: 'Active',
        hireDate: new Date().toISOString().split('T')[0],
        office: 'Remote Hub', // Default assignment
        team: 'General'
      };
      
      const updatedEmployees = [newEmp, ...employees];
      setEmployees(updatedEmployees);
      addAuditLog('System', 'Auto-Provisioning', `Google SSO created account for ${newEmp.email}`);
      
      setCurrentUser({
        name: newEmp.name,
        email: newEmp.email,
        role: newEmp.role,
        avatar: mockProfile.avatar,
        password: 'SSO_MANAGED'
      });
    } else {
      if (existingEmp.status === 'Disabled') {
        alert('Your account is disabled. Contact HR.');
        return;
      }
      
      // Update last login
      const updatedEmployees = employees.map(e => e.id === existingEmp.id ? { ...e, lastLogin: 'Just now', loginMethod: 'Google Workspace' } : e);
      setEmployees(updatedEmployees);
      
      setCurrentUser({
        name: existingEmp.name,
        email: existingEmp.email,
        role: existingEmp.role,
        avatar: mockProfile.avatar, // Auto sync latest Google Profile Pic
        password: 'SSO_MANAGED'
      });
      addAuditLog(existingEmp.name, 'Login', 'Logged in successfully via Google Workspace');
    }

    // Set initial modal values
    setProfileName(mockProfile.name);
    setProfileAvatar(mockProfile.avatar);
    setIsLoggedIn(true);
  };


  // --- ACCIONES EMPLEADOS ---
  const handleToggleStatus = (id: string) => {
    if (!isAdminOrOwner) return;
    const emp = employees.find(e => e.id === id);
    if (!emp) return;
    const nextStatus = emp.status === 'Active' ? 'Disabled' : 'Active';
    setEmployees(employees.map(e => e.id === id ? { ...e, status: nextStatus } : e));
    addAuditLog(currentUser.name, 'Toggle Status', `Changed ${emp.name}'s status to ${nextStatus}`);
    setOpenUserMenuId(null);
  };

  const handleChangeRole = (id: string, newRole: 'User' | 'Admin' | 'Accounting' | 'Owner') => {
    if (!isAdminOrOwner) return;
    const emp = employees.find(e => e.id === id);
    if (!emp) return;
    setEmployees(employees.map(e => e.id === id ? { ...e, role: newRole } : e));
    addAuditLog(currentUser.name, 'Change Role', `Changed ${emp.name}'s role to ${newRole}`);
    setOpenUserMenuId(null);
  };

  const handleDeleteUser = (id: string) => {
    if (!isAdminOrOwner) return;
    const emp = employees.find(e => e.id === id);
    if (!emp) return;
    setEmployees(employees.filter(e => e.id !== id));
    addAuditLog(currentUser.name, 'Delete User', `Deleted user ${emp.name}`);
    setOpenUserMenuId(null);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;
    const newUser: Employee = {
      id: Date.now().toString(),
      name: newUserName,
      email: newUserEmail,
      governmentId: newUserGovId || '001-0000000-0',
      role: newUserRole,
      loginMethod: 'Invitation (Pending)',
      lastLogin: 'Never',
      status: 'Active',
      hireDate: new Date().toISOString().split('T')[0],
      office: 'Headquarters (HQ)',
      team: 'General'
    };
    setEmployees([newUser, ...employees]);
    addAuditLog(currentUser.name, 'Create User', `Manually created user ${newUserName} (${newUserGovId}).`);
    setIsUserModalOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserGovId('');
  };

  // --- SOLICITUDES / TARDANZAS ---
  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqEmployee || !reqStart || !reqEnd) return;

    let calculatedDays = 1;
    if (reqDuration === 'Full Day') {
      const start = new Date(reqStart);
      const end = new Date(reqEnd);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      calculatedDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);
    } else if (reqDuration.startsWith('Half Day')) {
      calculatedDays = 0.5;
    } else {
      calculatedDays = 0.25;
    }

    const newReq: LeaveRequest = {
      id: Date.now().toString(),
      employeeName: reqEmployee,
      type: reqType,
      startDate: reqStart,
      endDate: reqEnd,
      duration: reqDuration,
      days: calculatedDays,
      status: 'Pending',
      approver: 'Alex Morgan',
      reason: reqReason
    };

    setRequests([newReq, ...requests]);
    addAuditLog(currentUser.name, 'Create Request', `Submitted ${reqType} for ${reqEmployee}.`);
    setIsModalOpen(false);
    setReqEmployee('');
    setReqStart('');
    setReqEnd('');
    setReqReason('');
  };

  const updateRequestStatus = (id: string, newStatus: 'Approved' | 'Rejected' | 'Cancelled') => {
    const req = requests.find(r => r.id === id);
    setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
    if (req) {
      addAuditLog(currentUser.name, `${newStatus} Request`, `${newStatus} ${req.type} request for ${req.employeeName}`);
    }
  };

  // --- GUARDAR PROFILE SETTINGS (IMAGEN LOCAL) ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setPassMessage({ type: '', text: '' });

    setCurrentUser({
      ...currentUser,
      name: profileName,
      avatar: profileAvatar,
    });

    addAuditLog(currentUser.name, 'Update Profile', 'Updated personal profile settings & avatar.');
    setPassMessage({ type: 'success', text: 'Profile updated successfully!' });
    
    // If the user modified their name, update it in the employees array too
    const updatedEmployees = employees.map(e => e.email === currentUser.email ? { ...e, name: profileName } : e);
    setEmployees(updatedEmployees);

    setTimeout(() => {
      setIsMyProfileModalOpen(false);
      setPassMessage({ type: '', text: '' });
    }, 1000);
  };

  // Exportar CSV
  const downloadReportCSV = (reportTitle: string) => {
    let csvData = "data:text/csv;charset=utf-8,";
    if (reportTitle === 'Leave & Tardanzas Report') {
      csvData += "Employee,Type,Start Date,End Date,Duration,Days,Status,Reason\n";
      requests.forEach(r => {
        csvData += `"${r.employeeName}","${r.type}","${r.startDate}","${r.endDate}","${r.duration}",${r.days},"${r.status}","${r.reason || ''}"\n`;
      });
    } else {
      csvData += "Employee,Cedula / Gov ID,Email,Office,Role,Status\n";
      employees.forEach(e => {
        csvData += `"${e.name}","${e.governmentId}","${e.email}","${e.office}","${e.role}","${e.status}"\n`;
      });
    }
    const encodedUri = encodeURI(csvData);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${reportTitle.toLowerCase().replace(/ /g, '_')}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRequests = requests.filter(req => {
    if (requestFilter === 'All Pending') return req.status === 'Pending';
    if (requestFilter === 'Approved') return req.status === 'Approved';
    if (requestFilter === 'Rejected') return req.status === 'Rejected';
    return true;
  });

  const sortedEmployees = [...employees].filter(emp =>
    emp.name.toLowerCase().includes(empSearchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(empSearchQuery.toLowerCase()) ||
    emp.governmentId.toLowerCase().includes(empSearchQuery.toLowerCase())
  );

  const activeEmployee = employees.find(e => e.id === selectedEmployeeId);

  // --- LOGIC PARA EL CALENDARIO INTERACTIVO (GRILLA MENSUAL) ---
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const renderCalendarCells = () => {
    const cells = [];
    const today = new Date(2026, 8, 23); // Simulate Today is Sep 23, 2026

    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`empty-${i}`} className="bg-slate-50/50 p-2 min-h-[100px] border-b border-r border-slate-100 rounded-sm"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = today.getFullYear() === currentDate.getFullYear() && today.getMonth() === currentDate.getMonth() && today.getDate() === day;

      const dayEvents = requests.filter(req => {
        if (req.status !== 'Approved' && req.status !== 'Pending') return false;
        const s = new Date(req.startDate);
        const e = new Date(req.endDate);
        const current = new Date(dateStr);
        return current >= s && current <= e;
      });

      cells.push(
        <div key={day} className={`p-2 min-h-[100px] border-b border-r border-slate-100 ${isToday ? 'bg-sky-50/30' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-1">
            <span className={`text-xs font-semibold ${isToday ? 'bg-sky-500 text-white px-2 py-0.5 rounded-full' : 'text-slate-500'}`}>{day}</span>
          </div>
          <div className="space-y-1">
            {dayEvents.map(event => (
              <div key={`${event.id}-${day}`} className={`text-[10px] px-1.5 py-1 rounded shadow-sm border font-medium truncate ${
                event.type === 'Tardanza (Late Arrival)' ? 'bg-rose-50 border-rose-200 text-rose-700' :
                event.type === 'Vacation' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                event.type === 'Sick leave' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-sky-50 border-sky-200 text-sky-700'
              }`}>
                {event.employeeName.split(' ')[0]} - {event.type === 'Tardanza (Late Arrival)' ? 'Late' : event.type}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return cells;
  };

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));


  // --- VISTA PANTALLA DE LOGIN (SSO) ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center p-4 font-sans relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-96 bg-[#1ba0d7] transform -skew-y-6 -translate-y-32 z-0"></div>
        
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full border border-slate-100 flex flex-col items-center text-slate-800 space-y-8 relative z-10">
          <ITRHRvBrand variant="login" />
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-800">Welcome back</h2>
            <p className="text-xs text-gray-500">Sign in securely using your company account.</p>
          </div>

          <div className="w-full space-y-4 pt-4">
            {/* GOOGLE SSO LOGIN BUTTON */}
            <button 
              onClick={() => handleGoogleSSOLogin({ 
                name: 'Alex Morgan', 
                email: 'alex.morgan@company.com', 
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop',
                role: 'Owner'
              })}
              className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-slate-700 font-semibold py-3 rounded-full text-sm shadow-sm transition flex items-center justify-center space-x-3"
            >
              <GoogleIcon />
              <span>Sign in as Admin (Alex)</span>
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-medium">Or simulate new hire</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* AUTO-PROVISIONING DEMO BUTTON */}
            <button 
              onClick={() => handleGoogleSSOLogin({ 
                name: 'Elena Rodríguez', 
                email: 'elena.rodriguez@company.com', 
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop',
                role: 'User'
              })}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 rounded-full text-sm shadow-md transition flex items-center justify-center space-x-3"
            >
              <Globe className="w-4 h-4 text-sky-400" />
              <span>New Hire Google SSO Demo</span>
            </button>
          </div>

          <div className="flex items-center space-x-1.5 text-[10px] text-gray-400 pt-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Protected by Google Workspace OAuth 2.0</span>
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA APLICACIÓN PRINCIPAL ---
  return (
    <div className="min-h-screen bg-[#f4f7f6] font-sans antialiased text-slate-800" onClick={() => { setIsNotifOpen(false); setIsProfileOpen(false); setOpenUserMenuId(null); }}>
      {/* NAVBAR SUPERIOR */}
      <header className="bg-[#1ba0d7] text-white px-8 py-3 flex items-center justify-between shadow-sm relative z-30" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center space-x-8">
          <div onClick={() => { setActiveTab('Dashboard'); setSelectedEmployeeId(null); }}>
            <ITRHRvBrand variant="header" />
          </div>
          <nav className="flex space-x-1.5 text-sm font-medium">
            {['Dashboard', 'Calendar', 'Requests', 'Employees', 'Teams', 'Offices', 'Reports', 'Audit Trail', 'Settings'].map((item) => (
              <button
                key={item}
                onClick={() => { setActiveTab(item); setSelectedEmployeeId(null); setSettingsSubView(null); }}
                className={`px-3 py-1.5 rounded transition-colors ${activeTab === item ? 'bg-black/15 font-semibold text-white' : 'hover:bg-white/10 text-cyan-50'}`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="relative focus:outline-none flex items-center">
              <Bell className="w-4 h-4 text-white/90 hover:opacity-80" />
              {notifications.length > 0 && <span className="absolute -top-1.5 -right-2 bg-[#2ecc71] text-[10px] text-white rounded-full px-1.5 font-bold">{notifications.length}</span>}
            </button>
            {isNotifOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-md shadow-xl border border-slate-200 z-50 text-slate-800 p-2">
                <div className="p-2 border-b font-semibold text-xs text-slate-700 flex justify-between">
                  <span>Notifications</span>
                  <button onClick={() => setNotifications([])} className="text-sky-600 text-[10px]">Clear all</button>
                </div>
                {notifications.map(n => (
                  <div key={n.id} className="p-2 border-b text-xs hover:bg-slate-50">
                    <p className="font-bold text-slate-800">{n.title}</p>
                    <p className="text-[11px] text-gray-500">{n.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <img
              src={currentUser.avatar}
              alt="Avatar" onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-8 h-8 rounded-full border border-white/40 cursor-pointer hover:ring-2 hover:ring-white/50 object-cover"
            />
            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 text-slate-800 p-2 space-y-1">
                <div className="px-3 py-2 border-b text-xs">
                  <p className="font-bold text-slate-800">{currentUser.name}</p>
                  <p className="text-[10px] text-gray-400">{currentUser.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800">
                    {currentUser.role}
                  </span>
                </div>
                
                <button 
                  onClick={() => { setIsMyProfileModalOpen(true); setIsProfileOpen(false); }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg flex items-center space-x-2 font-medium transition"
                >
                  <UserCog className="w-4 h-4 text-sky-500" />
                  <span>Profile Settings</span>
                </button>

                <button 
                  onClick={() => setIsLoggedIn(false)} 
                  className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center space-x-2 font-medium border-t border-slate-100 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="p-8 max-w-6xl mx-auto space-y-6">

        {/* 1. DASHBOARD */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-normal text-slate-700">Dashboard</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Pending Requests</p>
                  <p className="text-3xl font-bold text-slate-700 mt-1">{requests.filter(r => r.status === 'Pending').length}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 font-bold">!</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Approved Absences</p>
                  <p className="text-3xl font-bold text-slate-700 mt-1">{requests.filter(r => r.status === 'Approved').length}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 font-bold">✓</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Tardanzas Today</p>
                  <p className="text-3xl font-bold text-rose-600 mt-1">{requests.filter(r => r.type === 'Tardanza (Late Arrival)').length}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 font-bold">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Active Staff</p>
                  <p className="text-3xl font-bold text-slate-700 mt-1">{employees.filter(e => e.status === 'Active').length}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 font-bold">👥</div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-[#1ba0d7]" />
                    <span>Live Attendance & PTO Schedule (2026)</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">Real-time track for Vacations, PTOs, Sick Leaves, and Late Arrivals (Tardanzas).</p>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <select 
                    value={dashboardCalendarFilter}
                    onChange={(e) => setDashboardCalendarFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-slate-700 font-medium focus:outline-sky-500"
                  >
                    <option value="All Events">All Events</option>
                    <option value="Vacation">Vacations Only</option>
                    <option value="PTO">PTOs Only</option>
                    <option value="Tardanza (Late Arrival)">Tardanzas Only</option>
                  </select>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {requests
                  .filter(r => dashboardCalendarFilter === 'All Events' || r.type === dashboardCalendarFilter)
                  .map((r) => (
                    <div key={r.id} className="py-3 flex items-center justify-between hover:bg-slate-50 transition px-2 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          r.type === 'Tardanza (Late Arrival)' ? 'bg-rose-500' :
                          r.type === 'Vacation' ? 'bg-amber-500' :
                          r.type === 'Sick leave' ? 'bg-emerald-500' : 'bg-sky-500'
                        }`}></div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{r.employeeName}</p>
                          <p className="text-xs text-gray-500">{r.type} • <span className="font-medium text-slate-700">{r.duration}</span></p>
                          {r.reason && <p className="text-[11px] text-gray-400 italic mt-0.5">"{r.reason}"</p>}
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs font-semibold text-slate-700">{r.startDate} to {r.endDate}</p>
                        <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          r.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                          r.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {r.status}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. ABSENCE CALENDAR INTERACTIVO */}
        {activeTab === 'Calendar' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-normal text-slate-700">Company Calendar</h2>
            
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center space-x-3">
                  <button onClick={prevMonth} className="p-1 rounded bg-slate-100 hover:bg-slate-200 transition">
                    <ChevronLeft className="w-5 h-5 text-slate-600" />
                  </button>
                  <span className="font-bold text-slate-800 text-lg w-40 text-center">{monthName}</span>
                  <button onClick={nextMonth} className="p-1 rounded bg-slate-100 hover:bg-slate-200 transition">
                    <ChevronRight className="w-5 h-5 text-slate-600" />
                  </button>
                </div>

                <div className="flex space-x-4 text-xs font-medium">
                  <span className="flex items-center space-x-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-amber-500"></span><span>Vacation</span></span>
                  <span className="flex items-center space-x-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-sky-500"></span><span>PTO</span></span>
                  <span className="flex items-center space-x-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-emerald-500"></span><span>Sick Leave</span></span>
                  <span className="flex items-center space-x-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-rose-500"></span><span>Late / Tardanza</span></span>
                </div>
              </div>

              <div className="grid grid-cols-7 border-t border-l border-slate-100 rounded overflow-hidden">
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                  <div key={day} className="p-2 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400 border-r border-b border-slate-100 bg-slate-50">
                    {day}
                  </div>
                ))}
                {renderCalendarCells()}
              </div>
            </div>
          </div>
        )}

        {/* 3. REQUESTS */}
        {activeTab === 'Requests' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <select value={requestFilter} onChange={(e) => setRequestFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white text-slate-700 font-medium">
                <option value="All Pending">All Pending Requests</option>
                <option value="Approved">Approved Requests</option>
                <option value="Rejected">Rejected Requests</option>
                <option value="All">All Requests</option>
              </select>

              <button onClick={() => setIsModalOpen(true)} className="bg-[#4a90e2] hover:bg-[#3b7dc9] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition flex items-center space-x-2">
                <Plus className="w-4 h-4" /><span>Create New Request</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs font-semibold text-gray-500 uppercase border-b">
                  <tr>
                    <th className="p-3.5 pl-6">Employee</th>
                    <th className="p-3.5">Type & Duration</th>
                    <th className="p-3.5">Dates</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredRequests.map(req => (
                    <tr key={req.id} className="hover:bg-slate-50">
                      <td className="p-3.5 pl-6 font-medium text-slate-800">{req.employeeName}</td>
                      <td className="p-3.5">{req.type} <span className="text-xs text-gray-400">({req.duration})</span></td>
                      <td className="p-3.5 text-xs">{req.startDate} to {req.endDate} ({req.days} d)</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                          req.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right pr-6 space-x-1">
                        {req.status === 'Pending' && isAdminOrOwner && (
                          <>
                            <button onClick={() => updateRequestStatus(req.id, 'Approved')} title="Approve" className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"><Check className="w-4 h-4" /></button>
                            <button onClick={() => updateRequestStatus(req.id, 'Rejected')} title="Reject" className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"><XCircle className="w-4 h-4" /></button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. EMPLOYEES */}
        {activeTab === 'Employees' && (
          <div>
            {!selectedEmployeeId ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-normal text-slate-700">Employees</h2>
                  {isAdminOrOwner && (
                    <button onClick={() => setIsUserModalOpen(true)} className="bg-[#4a90e2] hover:bg-[#3b7dc9] text-white px-4 py-2 rounded text-sm font-medium shadow-sm transition">
                      Add User
                    </button>
                  )}
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <div className="relative w-80">
                      <input
                        type="text" placeholder="Search by name, email or Cedula/ID..."
                        value={empSearchQuery} onChange={(e) => setEmpSearchQuery(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm pl-9 focus:outline-sky-500 bg-white"
                      />
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">Showing {sortedEmployees.length} users</span>
                  </div>

                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-slate-50 text-xs font-semibold text-gray-500 uppercase border-b border-slate-100">
                      <tr>
                        <th className="p-3">Name</th>
                        <th className="p-3">Cedula / Gov ID</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Role</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Office</th>
                        <th className="p-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {sortedEmployees.map((emp) => {
                        const initials = emp.name.split(' ').map(n => n[0]).join('').substring(0, 2);
                        return (
                          <tr key={emp.id} className="hover:bg-slate-50/80 transition">
                            <td className="p-3 flex items-center space-x-3">
                              <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center">{initials}</span>
                              <span onClick={() => setSelectedEmployeeId(emp.id)} className={`font-medium ${emp.status === 'Disabled' ? 'text-gray-400 line-through' : 'text-sky-600 hover:underline cursor-pointer'}`}>
                                {emp.name}
                              </span>
                            </td>
                            <td className="p-3 text-xs font-mono font-medium text-slate-700">{emp.governmentId}</td>
                            <td className="p-3 text-gray-500 text-xs">{emp.email}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                emp.role === 'Owner' ? 'bg-amber-100 text-amber-800' :
                                emp.role === 'Admin' ? 'bg-sky-100 text-sky-800' :
                                emp.role === 'Accounting' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                              }`}>
                                {emp.role}
                              </span>
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                emp.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                              }`}>
                                {emp.status}
                              </span>
                            </td>
                            <td className="p-3 text-xs text-gray-500">{emp.office}</td>
                            <td className="p-3 text-center relative">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (isAdminOrOwner) setOpenUserMenuId(openUserMenuId === emp.id ? null : emp.id);
                                }} 
                                disabled={!isAdminOrOwner}
                                className={`p-1.5 rounded transition ${isAdminOrOwner ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100' : 'text-slate-200 cursor-not-allowed'}`}
                              >
                                {isAdminOrOwner ? <GearIcon className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5 text-gray-300" />}
                              </button>

                              {openUserMenuId === emp.id && isAdminOrOwner && (
                                <div onClick={(e) => e.stopPropagation()} className="absolute right-4 top-10 w-60 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 text-left py-1 text-xs divide-y divide-slate-100">
                                  <div className="py-1">
                                    <button 
                                      onClick={() => handleToggleStatus(emp.id)} 
                                      className="w-full text-left px-3 py-1.5 text-slate-700 hover:bg-slate-50 transition font-medium flex items-center justify-between"
                                    >
                                      <span>{emp.status === 'Active' ? 'Disable user' : 'Enable user'}</span>
                                      <span className={`w-2 h-2 rounded-full ${emp.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                                    </button>
                                  </div>

                                  <div className="py-1">
                                    <p className="px-3 py-1 text-[10px] font-bold uppercase text-gray-400">Assign Role</p>
                                    {(['User', 'Admin', 'Accounting', 'Owner'] as const).map((roleChoice) => (
                                      <button
                                        key={roleChoice}
                                        onClick={() => handleChangeRole(emp.id, roleChoice)}
                                        className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 transition flex items-center justify-between ${emp.role === roleChoice ? 'font-bold text-sky-600 bg-sky-50/50' : 'text-slate-600'}`}
                                      >
                                        <span>Set as {roleChoice}</span>
                                        {emp.role === roleChoice && <Check className="w-3 h-3 text-sky-600" />}
                                      </button>
                                    ))}
                                  </div>

                                  <div className="py-1">
                                    <button 
                                      onClick={() => handleDeleteUser(emp.id)} 
                                      className="w-full text-left px-3 py-1.5 text-rose-600 hover:bg-rose-50 font-medium transition flex items-center space-x-1.5"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                      <span>Delete user</span>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2 border-b pb-2">
                    <ShieldCheck className="w-4 h-4 text-sky-500" />
                    <span>Role Permission Definitions</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                      <p className="font-bold text-slate-800 flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                        <span>User</span>
                      </p>
                      <p className="text-gray-500 leading-relaxed">Acceso a autoservicio básico. Puede solicitar días libres, ver sus propios balances y consultar el directorio general de empleados.</p>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                      <p className="font-bold text-emerald-800 flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>Accounting</span>
                      </p>
                      <p className="text-gray-500 leading-relaxed">Acceso a reportes de horas de trabajo, exportación de listas de ausencias a CSV y revisión de acumulación de vacaciones para nómina.</p>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                      <p className="font-bold text-sky-800 flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                        <span>Admin</span>
                      </p>
                      <p className="text-gray-500 leading-relaxed">Control operativo total. Puede crear/editar usuarios, aprobar/rechazar solicitudes de cualquier equipo, administrar oficinas y asignar roles.</p>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                      <p className="font-bold text-amber-800 flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span>Owner</span>
                      </p>
                      <p className="text-gray-500 leading-relaxed">Privilegios globales máximos de la organización. Incluye auditoría del sistema (Audit Trail), gestión administrativa y control de la cuenta.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* DETALLE DE EMPLEADO */
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-4">
                  <button onClick={() => setSelectedEmployeeId(null)} className="flex items-center space-x-2 text-sky-600 hover:text-sky-800 text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" /><span>Back to Employees</span>
                  </button>
                  <h2 className="text-2xl font-normal text-slate-700">{activeEmployee?.name}</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl border p-6 shadow-sm flex flex-col items-center text-center">
                      <ITRHRvBrand variant="login" />
                      <h3 className="text-lg font-bold text-slate-800 mt-2">{activeEmployee?.name}</h3>
                      <p className="text-xs text-gray-400">Hire date: {activeEmployee?.hireDate}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border p-6 shadow-sm space-y-4">
                      <h3 className="text-base font-semibold text-slate-700 border-b pb-3">Personal & Legal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 text-xs items-center">
                        <span className="font-medium text-slate-600">Cedula / Government ID:</span>
                        <div className="md:col-span-2 bg-slate-50 border rounded px-3 py-1.5 font-mono font-bold text-slate-800">{activeEmployee?.governmentId}</div>

                        <span className="font-medium text-slate-600">Role:</span>
                        <div className="md:col-span-2 bg-slate-50 border rounded px-3 py-1.5 text-slate-700">{activeEmployee?.role}</div>

                        <span className="font-medium text-slate-600">Email Address:</span>
                        <div className="md:col-span-2 bg-slate-50 border rounded px-3 py-1.5 text-slate-700">{activeEmployee?.email}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. TEAMS */}
        {activeTab === 'Teams' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-normal text-slate-700">Teams & Departments</h2>
              {isAdminOrOwner && (
                <button onClick={() => setIsTeamModalOpen(true)} className="bg-[#4a90e2] hover:bg-[#3b7dc9] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition flex items-center space-x-2">
                  <Plus className="w-4 h-4" /><span>New Team</span>
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teams.map(t => (
                <div key={t.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <h3 className="font-bold text-slate-800 text-base">{t.name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{t.description}</p>
                  <p className="text-xs font-semibold text-sky-600 pt-2 border-t">Team Lead: {t.lead}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. OFFICES */}
        {activeTab === 'Offices' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-normal text-slate-700">Offices & Locations</h2>
              {isAdminOrOwner && (
                <button onClick={() => setIsOfficeModalOpen(true)} className="bg-[#4a90e2] hover:bg-[#3b7dc9] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition flex items-center space-x-2">
                  <Plus className="w-4 h-4" /><span>New Office</span>
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offices.map(o => (
                <div key={o.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <h3 className="font-bold text-slate-800 text-base">{o.name}</h3>
                  <p className="text-xs text-gray-500 flex items-center space-x-1"><MapPin className="w-3.5 h-3.5" /><span>{o.location}</span></p>
                  <p className="text-xs text-gray-400">Timezone: {o.timezone}</p>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">{o.holidayCalendar}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. REPORTS */}
        {activeTab === 'Reports' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-normal text-slate-700">System Reports & Payroll Export</h2>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <p className="text-xs text-gray-500">Export structured data for payroll, compliance, or HR audit purposes.</p>
              <div className="flex space-x-3">
                <button onClick={() => downloadReportCSV('Leave & Tardanzas Report')} className="bg-[#1ba0d7] hover:bg-[#188db8] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition shadow-sm">
                  <Download className="w-4 h-4" /><span>Export Leave & Tardanzas CSV</span>
                </button>
                <button onClick={() => downloadReportCSV('Employee Master Report')} className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition shadow-sm">
                  <Download className="w-4 h-4" /><span>Export Employee Master CSV</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 8. AUDIT TRAIL */}
        {activeTab === 'Audit Trail' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-normal text-slate-700 flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <span>System Audit Trail Log</span>
            </h2>
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 font-semibold uppercase text-slate-500 border-b">
                  <tr>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">User</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono text-slate-400">{log.timestamp}</td>
                      <td className="p-3 font-semibold text-slate-800">{log.user}</td>
                      <td className="p-3"><span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-medium">{log.action}</span></td>
                      <td className="p-3 text-slate-600">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 9. SETTINGS - GOOGLE WORKSPACE (SSO) PANEL */}
        {activeTab === 'Settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-normal text-slate-700">Settings & Integrations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* GOOGLE WORKSPACE CARD */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200">
                    <GoogleIcon />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Google Workspace SSO</h3>
                    <p className="text-xs text-emerald-600 font-medium">Integration Active</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <div>
                      <p className="font-semibold text-slate-700">Auto-Provisioning</p>
                      <p className="text-gray-500">Create ITR accounts on first Google sign-in</p>
                    </div>
                    <div className="w-8 h-4 bg-emerald-500 rounded-full relative shadow-inner">
                      <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow"></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <div>
                      <p className="font-semibold text-slate-700">Strict Auth Mode</p>
                      <p className="text-gray-500">Require @company.com email domains</p>
                    </div>
                    <div className="w-8 h-4 bg-emerald-500 rounded-full relative shadow-inner">
                      <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow"></div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-[11px] text-gray-400 bg-sky-50 p-2 rounded-lg text-sky-800 border border-sky-100 flex items-start space-x-2">
                    <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
                    <span>User avatars and basic info are automatically synced from Google Directory on every login.</span>
                  </p>
                </div>
              </div>
              
              {/* SYSTEM PREFERENCES */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200">
                    <Server className="w-5 h-5 text-sky-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">System Preferences</h3>
                    <p className="text-xs text-gray-400">Core application rules</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <div>
                      <p className="font-semibold text-slate-700">Audit Trail Logging</p>
                      <p className="text-gray-500">Record all administrative actions permanently</p>
                    </div>
                    <div className="w-8 h-4 bg-emerald-500 rounded-full relative shadow-inner cursor-not-allowed opacity-75" title="Mandatory for compliance">
                      <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <div>
                      <p className="font-semibold text-slate-700">Email Notifications</p>
                      <p className="text-gray-500">Send alerts for PTO approvals/rejections</p>
                    </div>
                    <div className="w-8 h-4 bg-emerald-500 rounded-full relative shadow-inner">
                      <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* --- MODAL EDITAR PROFILE SETTINGS (SUBIDA DE IMAGEN LOCAL) --- */}
      {isMyProfileModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={(e) => e.stopPropagation()}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5 border border-slate-100 relative">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                <UserCog className="w-5 h-5 text-sky-500" />
                <span>Profile Settings</span>
              </h3>
              <button onClick={() => setIsMyProfileModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              {passMessage.text && (
                <div className={`p-2.5 rounded-lg text-xs font-medium ${passMessage.type === 'error' ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
                  {passMessage.text}
                </div>
              )}

              {/* FOTO DE PERFIL / AVATAR CON SUBIDA DE ARCHIVO (FILE UPLOAD) */}
              <div className="space-y-2">
                <label className="block font-semibold text-slate-700">Profile Picture / Avatar</label>
                <div className="flex items-center space-x-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <img src={profileAvatar} alt="Preview" className="w-14 h-14 rounded-full border-2 border-sky-500 object-cover shadow-sm bg-white" />
                  
                  <div className="flex-1 flex flex-col justify-center">
                    <label className="cursor-pointer bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition inline-flex items-center space-x-2 w-fit">
                      <Upload className="w-3.5 h-3.5 text-sky-500" />
                      <span>Upload photo</span>
                      <input 
                        type="file" 
                        accept=".jpg,.jpeg,.png" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => setProfileAvatar(reader.result as string);
                            reader.readAsDataURL(file);
                          }
                        }} 
                      />
                    </label>
                    <p className="text-[10px] text-gray-400 mt-1.5">Max size: 2MB. Formats: PNG, JPEG.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t">
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text" required value={profileName} onChange={(e) => setProfileName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-sky-500 bg-white"
                />
              </div>

              <div className="space-y-2 pt-2 border-t">
                <p className="font-semibold text-slate-700 flex items-center space-x-1.5 mb-2">
                  <Key className="w-3.5 h-3.5 text-amber-500" /><span>Change Password</span>
                </p>

                <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-[11px] text-amber-800 mb-3">
                  <span className="font-bold">SSO Managed Account:</span> Passwords for this account are managed by Google Workspace.
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button type="button" onClick={() => setIsMyProfileModalOpen(false)} className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 text-xs bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-lg font-medium shadow-sm transition">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CREAR REGISTRO DE AUSENCIA / TARDANZA */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-slate-700">Create New Request / Tardanza</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Employee</label>
                <select required value={reqEmployee} onChange={(e) => setReqEmployee(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-xs bg-white">
                  <option value="">Select Employee...</option>
                  {employees.filter(e => e.status === 'Active').map((emp) => (
                    <option key={emp.id} value={emp.name}>{emp.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Type</label>
                <select value={reqType} onChange={(e) => setReqType(e.target.value as any)} className="w-full border rounded-lg px-3 py-2 text-xs bg-white">
                  <option value="Vacation">Vacation</option>
                  <option value="PTO">PTO</option>
                  <option value="Sick leave">Sick leave</option>
                  <option value="Tardanza (Late Arrival)">Tardanza (Late Arrival)</option>
                  <option value="Floating Day">Floating Day</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Duration</label>
                <select value={reqDuration} onChange={(e) => setReqDuration(e.target.value as any)} className="w-full border rounded-lg px-3 py-2 text-xs bg-white">
                  <option value="Full Day">Full Day</option>
                  <option value="Half Day (Morning)">Half Day (Morning)</option>
                  <option value="Half Day (Afternoon)">Half Day (Afternoon)</option>
                  <option value="Hourly (Late Arrival)">Hourly (Late Arrival)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" required value={reqStart} onChange={(e) => setReqStart(e.target.value)} className="w-full border rounded-lg px-3 py-1.5 text-xs" />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">End Date</label>
                  <input type="date" required value={reqEnd} onChange={(e) => setReqEnd(e.target.value)} className="w-full border rounded-lg px-3 py-1.5 text-xs" />
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Reason / Notes</label>
                <input type="text" value={reqReason} onChange={(e) => setReqReason(e.target.value)} placeholder="Reason for request or tardanza..." className="w-full border rounded-lg px-3 py-1.5 text-xs" />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 text-xs bg-[#4a90e2] text-white rounded-lg font-medium shadow-sm">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}