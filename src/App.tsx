import React, { useState, useEffect } from 'react';
import { 
  Search, Bell, Plus, X, Check, XCircle, Pencil, LogOut, ArrowLeft,
  Settings as GearIcon, Users, Calendar, AlertTriangle, Download, Info, ShieldCheck, Key, UserCog, Lock,
  ChevronLeft, ChevronRight, Upload, Server, Trash2, MapPin, UserPlus, Globe, Clock, BarChart3
} from 'lucide-react';

// --- INTERFACES ---
export interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'User' | 'Manager' | 'Admin' | 'Accounting' | 'Owner';
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

// --- DICCIONARIO DE TRADUCCIÓN COMPLETO (EN / ES) ---
const translations = {
  EN: {
    dashboard: 'Dashboard',
    calendar: 'Calendar',
    requests: 'Requests',
    employees: 'Employees',
    teams: 'Teams',
    offices: 'Offices',
    reports: 'Reports',
    auditTrail: 'Audit Trail',
    settings: 'Settings',
    pendingRequests: 'Pending Requests',
    approvedAbsences: 'Approved Absences',
    tardanzasToday: 'Tardanzas Today',
    activeStaff: 'Active Staff',
    liveAttendance: 'Live Attendance & PTO Schedule (2026)',
    liveAttendanceSub: 'Real-time track for Vacations, PTOs, Sick Leaves, and Late Arrivals (Tardanzas).',
    allEvents: 'All Events',
    vacationsOnly: 'Vacations Only',
    ptosOnly: 'PTOs Only',
    tardanzasOnly: 'Tardanzas Only',
    allPendingRequests: 'All Pending Requests',
    approvedRequests: 'Approved Requests',
    rejectedRequests: 'Rejected Requests',
    allRequests: 'All Requests',
    companyCalendar: 'Company Calendar',
    createNewRequest: 'Create New Request',
    rolePermissions: 'Role Permission Definitions',
    addUser: 'Add User',
    newTeam: 'New Team',
    newOffice: 'New Office',
    reportsDesc: 'Export structured data for payroll, compliance, or HR audit purposes.',
    exportCSV: 'Export Leave & Tardanzas CSV',
    exportMasterCSV: 'Export Employee Master CSV',
    profileSettings: 'Profile Settings',
    logout: 'Log out',
    uploadPhoto: 'Upload photo',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    role: 'Role',
    status: 'Status',
    office: 'Office',
    team: 'Team',
    actions: 'Actions',
    name: 'Name',
    dates: 'Dates',
    typeAndDuration: 'Type & Duration',
    searchPlaceholder: 'Search by name or email...',
    showingUsers: 'Showing',
    usersText: 'users',
    saveChanges: 'Save Changes',
    saveUser: 'Save User',
    saveTeam: 'Save Team',
    saveOffice: 'Save Office',
    cancel: 'Cancel',
    submit: 'Submit',
    selectEmployee: 'Select Employee...',
    selectManager: 'Select Manager...',
    type: 'Type',
    duration: 'Duration',
    startDate: 'Start Date',
    endDate: 'End Date',
    reasonNotes: 'Reason / Notes',
    teamLead: 'Team Lead',
    teamMembers: 'Team Members:',
    membersTotal: 'Members Total',
    noMembersAssigned: 'No additional members assigned.',
    addMember: 'Add Member',
    assignToTeam: 'Assign to Team',
    editDetails: 'Edit Employee Details',
    disableUser: 'Disable user',
    enableUser: 'Enable user',
    assignRole: 'Assign Role',
    deleteUser: 'Delete user',
    notifications: 'Notifications',
    clearAll: 'Clear all',
    systemAuditTrail: 'System Audit Trail Log',
    timestamp: 'Timestamp',
    user: 'User',
    action: 'Action',
    details: 'Details',
    managerView: 'Manager View: Team',
    protectedGoogle: 'Protected by Google Workspace OAuth 2.0',
    welcomeBack: 'Welcome back',
    signInAdmin: 'Sign in as Admin (Alex)',
    signInManager: 'Sign in as Manager (Sarah)',
    signInUser: 'Sign in as Employee (Aaron)',
    newHireDemo: 'New Hire Google SSO Demo',
    userDesc: 'Basic self-service access. Request time-off and view personal balances.',
    managerDesc: 'Supervision. Approve or reject requests exclusively for their assigned team.',
    accountingDesc: 'Access to work hours, CSV exports, and payroll vacation accruals.',
    adminDesc: 'Full operational control. Create/edit users, manage offices, and assign roles.',
    ownerDesc: 'Maximum organization privileges. Includes audit trail, security, and global control.',
    settingsTitle: 'Settings & Integrations',
    integrationActive: 'Integration Active',
    autoProvTitle: 'Auto-Provisioning',
    autoProvSub: 'Create ITR accounts on first Google sign-in',
    strictAuthTitle: 'Strict Auth Mode',
    strictAuthSub: 'Require @company.com email domains',
    sysPrefTitle: 'System Preferences',
    sysPrefSub: 'Core application rules',
    auditTrailTitle: 'Audit Trail Logging',
    auditTrailSub: 'Record all administrative actions permanently',
    emailNotifTitle: 'Email Notifications',
    emailNotifSub: 'Send alerts for PTO approvals and tardanzas',
    timezoneLabel: 'Timezone:',
    backToEmployees: 'Back to Employees',
    currentLeaveYear: 'Current Leave Year (2026)',
    vacationAllowance: 'Vacation Allowance',
    vacationTaken: 'Vacation Taken',
    ptoAllowance: 'PTO Allowance',
    ptoTaken: 'PTO Taken',
    sickAllowance: 'Sick Leave Allowance',
    sickTaken: 'Sick Leave Taken',
    floatingAllowance: 'Floating Day Allowance',
    floatingTaken: 'Floating Day Taken',
    tardanzaAllowance: 'Tardanza Limit (Incidences)',
    tardanzaTaken: 'Tardanzas Logged',
    remaining: 'Remaining',
    personalInfo: 'Personal Information',
    currentSchedule: 'Current Schedule',
    weeklyWorkSchedule: 'Weekly Work Schedule',
    workdayHours: '40 hours / 5 days = 8h:00m per workday',
    timeOffApprover: 'Time Off Approver',
    hireDateLabel: 'Hire date:',
    editBtn: 'Edit'
  },
  ES: {
    dashboard: 'Panel Principal',
    calendar: 'Calendario',
    requests: 'Solicitudes',
    employees: 'Empleados',
    teams: 'Equipos',
    offices: 'Oficinas',
    reports: 'Reportes',
    auditTrail: 'Auditoría',
    settings: 'Configuración',
    pendingRequests: 'Solicitudes Pendientes',
    approvedAbsences: 'Ausencias Aprobadas',
    tardanzasToday: 'Tardanzas de Hoy',
    activeStaff: 'Personal Activo',
    liveAttendance: 'Calendario de Asistencia y PTO en Vivo (2026)',
    liveAttendanceSub: 'Seguimiento en tiempo real para Vacaciones, PTOs, Licencias Médicas y Tardanzas.',
    allEvents: 'Todos los Eventos',
    vacationsOnly: 'Solo Vacaciones',
    ptosOnly: 'Solo PTOs',
    tardanzasOnly: 'Solo Tardanzas',
    allPendingRequests: 'Todas las Solicitudes Pendientes',
    approvedRequests: 'Solicitudes Aprobadas',
    rejectedRequests: 'Solicitudes Rechazadas',
    allRequests: 'Todas las Solicitudes',
    companyCalendar: 'Calendario de la Empresa',
    createNewRequest: 'Crear Nueva Solicitud',
    rolePermissions: 'Definición de Permisos de Roles',
    addUser: 'Agregar Usuario',
    newTeam: 'Nuevo Equipo',
    newOffice: 'Nueva Oficina',
    reportsDesc: 'Exporte datos estructurados para nómina, cumplimiento o auditoría de RRHH.',
    exportCSV: 'Exportar CSV de Permisos y Tardanzas',
    exportMasterCSV: 'Exportar CSV Maestro de Empleados',
    profileSettings: 'Ajustes de Perfil',
    logout: 'Cerrar Sesión',
    uploadPhoto: 'Subir Foto',
    fullName: 'Nombre Completo',
    emailAddress: 'Correo Electrónico',
    role: 'Rol',
    status: 'Estado',
    office: 'Oficina',
    team: 'Equipo',
    actions: 'Acciones',
    name: 'Nombre',
    dates: 'Fechas',
    typeAndDuration: 'Tipo de Permiso y Duración',
    searchPlaceholder: 'Buscar por nombre o correo...',
    showingUsers: 'Mostrando',
    usersText: 'usuarios',
    saveChanges: 'Guardar Cambios',
    saveUser: 'Guardar Usuario',
    saveTeam: 'Guardar Equipo',
    saveOffice: 'Guardar Oficina',
    cancel: 'Cancelar',
    submit: 'Enviar Solicitud',
    selectEmployee: 'Seleccionar Empleado...',
    selectManager: 'Seleccionar Manager...',
    type: 'Tipo de Permiso',
    duration: 'Duración',
    startDate: 'Fecha Inicio',
    endDate: 'Fecha Fin',
    reasonNotes: 'Motivo / Notas',
    teamLead: 'Líder de Equipo',
    teamMembers: 'MIEMBROS DEL EQUIPO:',
    membersTotal: 'Miembros en Total',
    noMembersAssigned: 'Sin miembros adicionales asignados.',
    addMember: 'Agregar Miembro',
    assignToTeam: 'Asignar al Equipo',
    editDetails: 'Editar Detalles del Empleado',
    disableUser: 'Desactivar usuario',
    enableUser: 'Activar usuario',
    assignRole: 'Asignar Rol',
    deleteUser: 'Eliminar usuario',
    notifications: 'Notificaciones',
    clearAll: 'Limpiar todo',
    systemAuditTrail: 'Registro de Auditoría del Sistema',
    timestamp: 'FECHA Y HORA',
    user: 'USUARIO',
    action: 'ACCIÓN',
    details: 'DETALLES',
    managerView: 'Vista de Manager: Equipo',
    protectedGoogle: 'Protegido por Google Workspace OAuth 2.0',
    welcomeBack: 'Bienvenido de nuevo',
    signInAdmin: 'Iniciar como Admin (Alex)',
    signInManager: 'Iniciar como Manager (Sarah)',
    signInUser: 'Iniciar como Empleado (Aaron)',
    newHireDemo: 'Demo SSO Nuevo Empleado',
    userDesc: 'Autoservicio básico. Solicitar permisos y ver balances personales.',
    managerDesc: 'Supervisión. Aprobar o rechazar permisos exclusivamente de su equipo.',
    accountingDesc: 'Acceso a reportes de horas de trabajo, exportación CSV y nómina.',
    adminDesc: 'Control operativo total. Crear/editar usuarios, administrar oficinas y roles.',
    ownerDesc: 'Privilegios máximos. Incluye auditoría, seguridad y control global.',
    settingsTitle: 'Configuración e Integraciones',
    integrationActive: 'Integración Activa',
    autoProvTitle: 'Aprovisionamiento Automático',
    autoProvSub: 'Crear cuentas ITR en el primer inicio de sesión de Google',
    strictAuthTitle: 'Modo de Autenticación Estricto',
    strictAuthSub: 'Requerir dominios de correo @company.com',
    sysPrefTitle: 'Preferencias del Sistema',
    sysPrefSub: 'Reglas principales de la aplicación',
    auditTrailTitle: 'Registro de Auditoría',
    auditTrailSub: 'Registrar todas las acciones administrativas permanentemente',
    emailNotifTitle: 'Notificaciones por Correo',
    emailNotifSub: 'Enviar alertas para aprobaciones de PTO y tardanzas',
    timezoneLabel: 'Zona Horaria:',
    backToEmployees: 'Volver a Empleados',
    currentLeaveYear: 'Año de Licencia Actual (2026)',
    vacationAllowance: 'Límite de Vacaciones',
    vacationTaken: 'Vacaciones Tomadas',
    ptoAllowance: 'Límite de PTO',
    ptoTaken: 'PTO Tomado',
    sickAllowance: 'Límite de Licencia Médica',
    sickTaken: 'Licencias Médicas Tomadas',
    floatingAllowance: 'Límite de Días Flotantes',
    floatingTaken: 'Días Flotantes Tomados',
    tardanzaAllowance: 'Límite de Tardanzas',
    tardanzaTaken: 'Tardanzas Registradas',
    remaining: 'Restante',
    personalInfo: 'Información Personal',
    currentSchedule: 'Horario Actual',
    weeklyWorkSchedule: 'Horario Semanal de Trabajo',
    workdayHours: '40 horas / 5 días = 8h:00m por día laboral',
    timeOffApprover: 'Aprobador de Permisos',
    hireDateLabel: 'Fecha de Contratación:',
    editBtn: 'Editar'
  }
};

// --- FUNCIONES TRADUCTORAS ---
const translateRole = (role: string, lang: 'EN' | 'ES') => {
  if (lang === 'EN') return role;
  const map: Record<string, string> = {
    'User': 'Usuario',
    'Manager': 'Manager',
    'Accounting': 'Contabilidad',
    'Admin': 'Administrador',
    'Owner': 'Propietario'
  };
  return map[role] || role;
};

const translateStatus = (status: string, lang: 'EN' | 'ES') => {
  if (lang === 'EN') return status;
  const map: Record<string, string> = {
    'Active': 'Activo',
    'Disabled': 'Inactivo',
    'Pending': 'Pendiente',
    'Approved': 'Aprobado',
    'Rejected': 'Rechazado',
    'Cancelled': 'Cancelado'
  };
  return map[status] || status;
};

const translateType = (type: string, lang: 'EN' | 'ES') => {
  if (lang === 'EN') return type;
  const map: Record<string, string> = {
    'Vacation': 'Vacaciones',
    'Sick leave': 'Licencia Médica',
    'PTO': 'PTO',
    'Floating Day': 'Día Flotante',
    'Tardanza (Late Arrival)': 'Tardanza (Llegada Tarde)'
  };
  return map[type] || type;
};

const translateDuration = (dur: string, lang: 'EN' | 'ES') => {
  if (lang === 'EN') return dur;
  const map: Record<string, string> = {
    'Full Day': 'Día Completo',
    'Half Day (Morning)': 'Medio Día (Mañana)',
    'Half Day (Afternoon)': 'Medio Día (Tarde)',
    'Hourly (Late Arrival)': 'Por Horas (Tardanza)'
  };
  return map[dur] || dur;
};

// FUNCIÓN AUXILIAR DE ACCESO A PESTAÑAS SEGÚN EL ROL
const getAllowedTabs = (role: string) => {
  switch (role) {
    case 'User':
      return ['Dashboard', 'Calendar', 'Requests'];
    case 'Manager':
      return ['Dashboard', 'Calendar', 'Requests', 'Teams'];
    case 'Accounting':
      return ['Dashboard', 'Calendar', 'Requests', 'Reports'];
    case 'Admin':
    case 'Owner':
    default:
      return ['Dashboard', 'Calendar', 'Requests', 'Employees', 'Teams', 'Offices', 'Reports', 'Audit Trail', 'Settings'];
  }
};

// --- BRAND COMPONENT ---
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

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const ToggleSwitch: React.FC<{ isOn: boolean; onToggle: () => void; disabled?: boolean }> = ({ isOn, onToggle, disabled = false }) => (
  <button
    type="button"
    onClick={disabled ? undefined : onToggle}
    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    } ${isOn ? 'bg-[#00c896]' : 'bg-gray-300'}`}
  >
    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${isOn ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

// --- MOCK DATA INICIAL ---
const initialEmployees: Employee[] = [
  { id: '1', name: 'Aaron Garcia', email: 'aaron.garcia@company.com', role: 'User', loginMethod: 'Google Workspace', lastLogin: '24 days ago', status: 'Active', hireDate: '2024-01-15', office: 'Santiago Operations', team: 'Customer Support' },
  { id: '2', name: 'Abby Jhonson', email: 'abby.jhonson@company.com', role: 'User', loginMethod: 'Google Workspace', lastLogin: '2 days ago', status: 'Active', hireDate: '2024-03-10', office: 'Headquarters (HQ)', team: 'Engineering & Product' },
  { id: '3', name: 'Abraham Cedano', email: 'abraham.cedano@company.com', role: 'Disabled', loginMethod: 'Invitation', lastLogin: 'Never', status: 'Disabled', hireDate: '2023-11-01', office: 'Santiago Operations', team: 'Accounting & Tax Relief' },
  { id: '4', name: 'Alex Morgan', email: 'alex.morgan@company.com', role: 'Owner', loginMethod: 'Google Workspace', lastLogin: 'Today', status: 'Active', hireDate: '2022-05-01', office: 'Headquarters (HQ)', team: 'Engineering & Product' },
  { id: '5', name: 'Carlos Mendoza', email: 'carlos.mendoza@company.com', role: 'User', loginMethod: 'Google Workspace', lastLogin: '3 days ago', status: 'Active', hireDate: '2025-02-18', office: 'Santiago Operations', team: 'Accounting & Tax Relief' },
  { id: '6', name: 'Sarah Connor', email: 'sarah.connor@company.com', role: 'Manager', loginMethod: 'Google Workspace', lastLogin: '1 day ago', status: 'Active', hireDate: '2023-08-12', office: 'Headquarters (HQ)', team: 'Accounting & Tax Relief' },
];

const initialRequests: LeaveRequest[] = [
  { id: '101', employeeName: 'Carlos Mendoza', type: 'Vacation', startDate: '2026-09-10', endDate: '2026-09-12', duration: 'Full Day', days: 3, status: 'Approved', approver: 'Sarah Connor', reason: 'Annual family vacation' },
  { id: '102', employeeName: 'Abby Jhonson', type: 'Sick leave', startDate: '2026-09-15', endDate: '2026-09-15', duration: 'Half Day (Morning)', days: 0.5, status: 'Approved', approver: 'Alex Morgan', reason: 'Medical appointment' },
  { id: '103', employeeName: 'Aaron Garcia', type: 'Tardanza (Late Arrival)', startDate: '2026-09-23', endDate: '2026-09-23', duration: 'Hourly (Late Arrival)', days: 0.25, status: 'Approved', approver: 'Alex Morgan', reason: 'Heavy traffic on highway' },
  { id: '104', employeeName: 'Carlos Mendoza', type: 'PTO', startDate: '2026-09-25', endDate: '2026-09-25', duration: 'Full Day', days: 1, status: 'Pending', approver: 'Pending Approval', reason: 'Personal matters' },
  { id: '105', employeeName: 'Sarah Connor', type: 'Vacation', startDate: '2026-10-01', endDate: '2026-10-05', duration: 'Full Day', days: 5, status: 'Pending', approver: 'Pending Approval', reason: 'Manager vacation' },
];

const initialTeams: Team[] = [
  { id: '1', name: 'Engineering & Product', lead: 'Alex Morgan', membersCount: 2, description: 'Software architecture, frontend development and quality assurance.' },
  { id: '2', name: 'Accounting & Tax Relief', lead: 'Sarah Connor', membersCount: 2, description: 'Financial planning, client tax strategy, and audit operations.' },
  { id: '3', name: 'Customer Support', lead: 'Aaron Garcia', membersCount: 1, description: 'Client onboarding and technical support assistance.' },
];

const initialOffices: Office[] = [
  { id: '1', name: 'Headquarters (HQ)', location: 'Miami, Florida, USA', timezone: 'EST (UTC-5)', employeesCount: 6, type: 'Main Office', holidayCalendar: 'US Federal Holidays' },
  { id: '2', name: 'Santiago Operations', location: 'Santiago, Dominican Republic', timezone: 'AST (UTC-4)', employeesCount: 4, type: 'Regional', holidayCalendar: 'Dominican Republic National Holidays' },
  { id: '3', name: 'Remote Hub', location: 'Global / Virtual Work', timezone: 'Flexible', employeesCount: 2, type: 'Remote', holidayCalendar: 'International Standard' },
];

const initialAuditLogs: AuditLog[] = [
  { id: '1', timestamp: '2026-09-24 08:30:00', user: 'System', action: 'Configuration', details: 'Google Workspace SSO & Auto-Provisioning Active.' },
  { id: '2', timestamp: '2026-09-23 09:15:22', user: 'Carlos Mendoza', action: 'Create Request', details: 'Submitted Vacation request for 3 days.' },
];

export default function App() {
  // Idioma del sistema (EN por defecto, alternable a ES)
  const [lang, setLang] = useState<'EN' | 'ES'>('EN');
  const t = translations[lang];

  // Autenticación & Usuario en Sesión
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    role: 'User' | 'Manager' | 'Admin' | 'Accounting' | 'Owner';
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

  // Modal Editar Empleado
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // Navegación
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [settingsSubView, setSettingsSubView] = useState<string | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  // Desplegables Header
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'New leave request', desc: 'Carlos Mendoza requested 1 day PTO', time: '10m ago' },
    { id: '2', title: 'Manager leave request', desc: 'Sarah Connor requested 5 days Vacation', time: '20m ago' }
  ]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Estado del Sistema
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('itr_hrv_employees_final_v23');
    return saved ? JSON.parse(saved) : initialEmployees;
  });

  const [requests, setRequests] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem('itr_hrv_requests_final_v23');
    return saved ? JSON.parse(saved) : initialRequests;
  });

  const [teams, setTeams] = useState<Team[]>(() => {
    const saved = localStorage.getItem('itr_hrv_teams_v23');
    return saved ? JSON.parse(saved) : initialTeams;
  });

  const [offices, setOffices] = useState<Office[]>(() => {
    const saved = localStorage.getItem('itr_hrv_offices_v23');
    return saved ? JSON.parse(saved) : initialOffices;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);

  // Configuraciones Toggles
  const [settingsAutoProv, setSettingsAutoProv] = useState(true);
  const [settingsStrictAuth, setSettingsStrictAuth] = useState(true);
  const [settingsAuditTrail] = useState(true);
  const [settingsEmailNotif, setSettingsEmailNotif] = useState(true);

  // Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isOfficeModalOpen, setIsOfficeModalOpen] = useState(false);
  const [addingMemberToTeam, setAddingMemberToTeam] = useState<Team | null>(null);
  const [selectedMemberToAdd, setSelectedMemberToAdd] = useState<string>('');

  // Filtros
  const [requestFilter, setRequestFilter] = useState('All Pending');
  const [empSearchQuery, setEmpSearchQuery] = useState('');
  const [openUserMenuId, setOpenUserMenuId] = useState<string | null>(null);
  const [dashboardCalendarFilter, setDashboardCalendarFilter] = useState('All Events');

  // Formulario Usuario
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'User' | 'Manager' | 'Admin' | 'Accounting' | 'Owner'>('User');

  // Formulario Solicitud
  const [reqEmployee, setReqEmployee] = useState('');
  const [reqType, setReqType] = useState<'Vacation' | 'Sick leave' | 'PTO' | 'Floating Day' | 'Tardanza (Late Arrival)'>('Vacation');
  const [reqDuration, setReqDuration] = useState<'Full Day' | 'Half Day (Morning)' | 'Half Day (Afternoon)' | 'Hourly (Late Arrival)'>('Full Day');
  const [reqStart, setReqStart] = useState('');
  const [reqEnd, setReqEnd] = useState('');
  const [reqReason, setReqReason] = useState('');

  // Formulario Equipos y Oficinas
  const [teamName, setTeamName] = useState('');
  const [teamLead, setTeamLead] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [officeName, setOfficeName] = useState('');
  const [officeLocation, setOfficeLocation] = useState('');
  const [officeTimezone, setOfficeTimezone] = useState('AST (UTC-4)');

  // Control del Calendario
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1));

  useEffect(() => { localStorage.setItem('itr_hrv_employees_final_v23', JSON.stringify(employees)); }, [employees]);
  useEffect(() => { localStorage.setItem('itr_hrv_requests_final_v23', JSON.stringify(requests)); }, [requests]);
  useEffect(() => { localStorage.setItem('itr_hrv_teams_v23', JSON.stringify(teams)); }, [teams]);
  useEffect(() => { localStorage.setItem('itr_hrv_offices_v23', JSON.stringify(offices)); }, [offices]);

  // Asegurar que la pestaña activa corresponda con los permisos del usuario al cambiar de rol o login
  useEffect(() => {
    const allowed = getAllowedTabs(currentUser.role);
    if (!allowed.includes(activeTab)) {
      setActiveTab('Dashboard');
    }
  }, [currentUser.role, isLoggedIn]);

  // RESETEAR FORMULARIO DE SOLICITUD
  const resetRequestForm = () => {
    setReqEmployee('');
    setReqType('Vacation');
    setReqDuration('Full Day');
    setReqStart('');
    setReqEnd('');
    setReqReason('');
  };

  const handleCloseRequestModal = () => {
    resetRequestForm();
    setIsModalOpen(false);
  };

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

  const isOwner = currentUser.role === 'Owner';
  const isAdminOrOwner = currentUser.role === 'Admin' || currentUser.role === 'Owner';
  const isManager = currentUser.role === 'Manager';

  // Nombres de los equipos liderados por el usuario actual
  const teamsLedByCurrentUser = teams.filter(t => t.lead.toLowerCase() === currentUser.name.toLowerCase()).map(t => t.name);
  const managedEmployeeNames = employees.filter(e => teamsLedByCurrentUser.includes(e.team) && e.name.toLowerCase() !== currentUser.name.toLowerCase()).map(e => e.name);

  // Verificación de aprobación (Nadie aprueba su propio permiso)
  const canManageRequest = (req: LeaveRequest) => {
    if (req.employeeName.toLowerCase() === currentUser.name.toLowerCase()) {
      return false; // Bloqueado: Nadie aprueba su propia solicitud
    }
    if (isAdminOrOwner) return true;
    if (isManager) return managedEmployeeNames.includes(req.employeeName);
    return false;
  };

  // --- GOOGLE WORKSPACE SSO LOGIN ---
  const handleGoogleSSOLogin = (mockProfile: { name: string, email: string, avatar: string, role?: 'Owner' | 'Manager' | 'User' }) => {
    const existingEmp = employees.find(e => e.email.toLowerCase() === mockProfile.email.toLowerCase());

    if (!existingEmp) {
      if (settingsAutoProv) {
        const newEmp: Employee = {
          id: Date.now().toString(),
          name: mockProfile.name,
          email: mockProfile.email,
          role: mockProfile.role || 'User',
          loginMethod: 'Google Workspace',
          lastLogin: 'Just now',
          status: 'Active',
          hireDate: new Date().toISOString().split('T')[0],
          office: 'Remote Hub',
          team: 'General'
        };
        setEmployees([newEmp, ...employees]);
        addAuditLog('System', 'Auto-Provisioning', `Google SSO created account for ${newEmp.email}`);
        setCurrentUser({ name: newEmp.name, email: newEmp.email, role: newEmp.role, avatar: mockProfile.avatar, password: 'SSO_MANAGED' });
      } else {
        alert("Account does not exist and Auto-Provisioning is disabled.");
        return;
      }
    } else {
      if (existingEmp.status === 'Disabled') {
        alert('Your account is disabled. Contact HR.');
        return;
      }
      setEmployees(employees.map(e => e.id === existingEmp.id ? { ...e, lastLogin: 'Just now', loginMethod: 'Google Workspace' } : e));
      setCurrentUser({ name: existingEmp.name, email: existingEmp.email, role: existingEmp.role, avatar: mockProfile.avatar, password: 'SSO_MANAGED' });
      addAuditLog(existingEmp.name, 'Login', 'Logged in successfully via Google Workspace');
    }

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

  const handleChangeRole = (id: string, newRole: 'User' | 'Manager' | 'Admin' | 'Accounting' | 'Owner') => {
    if (!isAdminOrOwner) return;

    // RESTRICCIÓN DE SEGURIDAD: Solo Owner puede asignar el rol de Owner y máximo 2
    if (newRole === 'Owner') {
      if (!isOwner) {
        alert("Only the Owner can assign the Owner role.");
        return;
      }
      const ownerCount = employees.filter(e => e.role === 'Owner').length;
      if (ownerCount >= 2) {
        alert("Maximum limit of 2 Owners reached for this organization.");
        return;
      }
    }

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

  const handleOpenEditModal = (emp: Employee) => {
    if (!emp) return;
    setEditingEmployee({
      id: emp.id || Date.now().toString(),
      name: emp.name || '',
      email: emp.email || '',
      role: emp.role || 'User',
      loginMethod: emp.loginMethod || 'Google Workspace',
      lastLogin: emp.lastLogin || 'Never',
      status: emp.status || 'Active',
      hireDate: emp.hireDate || '2026-01-01',
      office: emp.office || 'Headquarters (HQ)',
      team: emp.team || 'General'
    });
    setOpenUserMenuId(null);
  };

  const handleSaveEditEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEmployee) return;

    // Validación si se intentó cambiar a Owner desde Admin
    if (editingEmployee.role === 'Owner' && !isOwner) {
      alert("Only the Owner can assign the Owner role.");
      return;
    }

    setEmployees(employees.map(emp => emp.id === editingEmployee.id ? editingEmployee : emp));
    addAuditLog(currentUser.name, 'Edit User', `Updated employee details for ${editingEmployee.name}`);
    setEditingEmployee(null);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    if (newUserRole === 'Owner' && !isOwner) {
      alert("Only the Owner can assign the Owner role.");
      return;
    }

    const newUser: Employee = {
      id: Date.now().toString(),
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      loginMethod: 'Invitation (Pending)',
      lastLogin: 'Never',
      status: 'Active',
      hireDate: new Date().toISOString().split('T')[0],
      office: 'Headquarters (HQ)',
      team: 'General'
    };
    setEmployees([newUser, ...employees]);
    addAuditLog(currentUser.name, 'Create User', `Manually created user ${newUserName}.`);
    setIsUserModalOpen(false);
    setNewUserName('');
    setNewUserEmail('');
  };

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName || !teamLead) return;
    const newTeam: Team = {
      id: Date.now().toString(),
      name: teamName,
      lead: teamLead,
      membersCount: 0,
      description: teamDescription || 'Department responsibilities...'
    };
    setTeams([...teams, newTeam]);
    addAuditLog(currentUser.name, 'Create Team', `Created team ${teamName} with lead ${teamLead}`);
    setIsTeamModalOpen(false);
    setTeamName('');
    setTeamLead('');
    setTeamDescription('');
  };

  const handleAddMemberToTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addingMemberToTeam || !selectedMemberToAdd) return;

    setEmployees(employees.map(emp => emp.id === selectedMemberToAdd ? { ...emp, team: addingMemberToTeam.name } : emp));
    addAuditLog(currentUser.name, 'Assign Team Member', `Assigned member to team ${addingMemberToTeam.name}`);
    setAddingMemberToTeam(null);
    setSelectedMemberToAdd('');
  };

  const handleCreateOffice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officeName || !officeLocation) return;
    const newOffice: Office = {
      id: Date.now().toString(),
      name: officeName,
      location: officeLocation,
      timezone: officeTimezone,
      employeesCount: 1,
      type: 'Regional',
      holidayCalendar: 'Standard Corporate Calendar'
    };
    setOffices([...offices, newOffice]);
    addAuditLog(currentUser.name, 'Create Office', `Created office ${officeName}`);
    setIsOfficeModalOpen(false);
    setOfficeName('');
    setOfficeLocation('');
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
      approver: 'Pending Approval',
      reason: reqReason
    };

    setRequests([newReq, ...requests]);
    addAuditLog(reqEmployee, 'Create Request', `Submitted ${reqType} (${reqDuration}) for ${calculatedDays} days.`);
    
    resetRequestForm();
    setIsModalOpen(false);
  };

  const updateRequestStatus = (id: string, newStatus: 'Approved' | 'Rejected' | 'Cancelled') => {
    const req = requests.find(r => r.id === id);
    if (!req || !canManageRequest(req)) return;

    setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus, approver: currentUser.name } : r));
    addAuditLog(currentUser.name, `${newStatus} Request`, `${newStatus} ${req.type} request for ${req.employeeName}`);
  };

  // --- GUARDAR PROFILE SETTINGS ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({ ...currentUser, name: profileName, avatar: profileAvatar });
    addAuditLog(currentUser.name, 'Update Profile', 'Updated personal profile settings & avatar.');
    setPassMessage({ type: 'success', text: 'Profile updated successfully!' });
    setEmployees(employees.map(e => e.email === currentUser.email ? { ...e, name: profileName } : e));
    setTimeout(() => { setIsMyProfileModalOpen(false); setPassMessage({ type: '', text: '' }); }, 1000);
  };

  // --- EXPORTAR CSV ---
  const downloadReportCSV = (reportTitle: string) => {
    let csvData = "data:text/csv;charset=utf-8,";
    if (reportTitle === 'Leave & Tardanzas Report') {
      csvData += "Employee,Type,Start Date,End Date,Duration,Days,Status,Reason\n";
      requests.forEach(r => csvData += `"${r.employeeName}","${r.type}","${r.startDate}","${r.endDate}","${r.duration}",${r.days},"${r.status}","${r.reason || ''}"\n`);
    } else {
      csvData += "Employee,Email,Office,Role,Status\n";
      employees.forEach(e => csvData += `"${e.name}","${e.email}","${e.office}","${e.role}","${e.status}"\n`);
    }
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvData));
    link.setAttribute("download", `${reportTitle.toLowerCase().replace(/ /g, '_')}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtro de solicitudes
  const filteredRequests = requests.filter(req => {
    if (isManager && !managedEmployeeNames.includes(req.employeeName) && req.employeeName.toLowerCase() !== currentUser.name.toLowerCase()) {
      return false;
    }
    if (requestFilter === 'All Pending') return req.status === 'Pending';
    if (requestFilter === 'Approved') return req.status === 'Approved';
    if (requestFilter === 'Rejected') return req.status === 'Rejected';
    return true;
  });

  const sortedEmployees = [...employees].filter(emp =>
    emp.name.toLowerCase().includes(empSearchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(empSearchQuery.toLowerCase())
  );

  const activeEmployee = employees.find(e => e.id === selectedEmployeeId);

  // --- CALENDARIO INTERACTIVO ---
  const renderCalendarCells = () => {
    const cells = [];
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const today = new Date(2026, 8, 23);

    for (let i = 0; i < firstDayOfMonth; i++) cells.push(<div key={`empty-${i}`} className="bg-slate-50/50 p-2 min-h-[100px] border-b border-r border-slate-100"></div>);

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = today.getFullYear() === currentDate.getFullYear() && today.getMonth() === currentDate.getMonth() && today.getDate() === day;
      const dayEvents = requests.filter(req => {
        if (req.status !== 'Approved' && req.status !== 'Pending') return false;
        if (isManager && !managedEmployeeNames.includes(req.employeeName) && req.employeeName.toLowerCase() !== currentUser.name.toLowerCase()) return false;
        return new Date(dateStr) >= new Date(req.startDate) && new Date(dateStr) <= new Date(req.endDate);
      });

      cells.push(
        <div key={day} className={`p-2 min-h-[100px] border-b border-r border-slate-100 ${isToday ? 'bg-sky-50/30' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-1">
            <span className={`text-xs font-semibold ${isToday ? 'bg-[#0052cc] text-white px-2 py-0.5 rounded-full' : 'text-slate-500'}`}>{day}</span>
          </div>
          <div className="space-y-1">
            {dayEvents.map(event => (
              <div key={`${event.id}-${day}`} className={`text-[10px] px-1.5 py-1 rounded shadow-sm border font-medium truncate ${
                event.type === 'Tardanza (Late Arrival)' ? 'bg-rose-50 border-rose-200 text-rose-700' :
                event.type === 'Vacation' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                event.type === 'Sick leave' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-sky-50 border-sky-200 text-sky-700'
              }`}>
                {event.employeeName.split(' ')[0]} - {event.type === 'Tardanza (Late Arrival)' ? (lang === 'ES' ? 'Tardanza' : 'Late') : translateType(event.type, lang)}
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

  // --- VISTA LOGIN ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center p-4 font-sans relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-r from-[#0052cc] via-[#1ba0d7] to-[#00f2ad] transform -skew-y-6 -translate-y-32 z-0"></div>
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full border border-slate-100 flex flex-col items-center text-slate-800 space-y-6 relative z-10">
          <ITRHRvBrand variant="login" />
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-slate-800">{t.welcomeBack}</h2>
            <p className="text-xs text-gray-500">{t.protectedGoogle}</p>
          </div>
          
          <div className="w-full space-y-2.5 pt-2">
            <button onClick={() => handleGoogleSSOLogin({ name: 'Alex Morgan', email: 'alex.morgan@company.com', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop', role: 'Owner' })} className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-slate-700 font-semibold py-2 rounded-full text-xs shadow-sm transition flex items-center justify-center space-x-2 cursor-pointer">
              <GoogleIcon /><span>{t.signInAdmin}</span>
            </button>

            <button onClick={() => handleGoogleSSOLogin({ name: 'Sarah Connor', email: 'sarah.connor@company.com', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&h=120&fit=crop', role: 'Manager' })} className="w-full bg-[#0052cc] hover:bg-[#003db3] text-white font-semibold py-2 rounded-full text-xs shadow-sm transition flex items-center justify-center space-x-2 cursor-pointer">
              <ShieldCheck className="w-4 h-4 text-[#00f2ad]" /><span>{t.signInManager}</span>
            </button>

            <button onClick={() => handleGoogleSSOLogin({ name: 'Aaron Garcia', email: 'aaron.garcia@company.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop', role: 'User' })} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-full text-xs transition flex items-center justify-center space-x-2 cursor-pointer border border-slate-200">
              <Users className="w-4 h-4 text-slate-600" /><span>{t.signInUser}</span>
            </button>

            <div className="relative flex items-center py-1">
              <div className="flex-grow border-t border-gray-200"></div><span className="flex-shrink-0 mx-3 text-gray-400 text-[10px] font-medium">Or simulate new hire</span><div className="flex-grow border-t border-gray-200"></div>
            </div>

            <button onClick={() => handleGoogleSSOLogin({ name: 'Elena Rodríguez', email: 'elena.rodriguez@company.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop', role: 'User' })} className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2 rounded-full text-xs shadow-md transition flex items-center justify-center space-x-2 cursor-pointer">
              <Users className="w-4 h-4 text-sky-400" /><span>{t.newHireDemo}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Pestañas permitidas según el rol actual del usuario en sesión
  const allowedTabs = getAllowedTabs(currentUser.role);

  // --- VISTA APLICACIÓN PRINCIPAL ---
  return (
    <div className="min-h-screen bg-[#f4f7f6] font-sans antialiased text-slate-800" onClick={() => { setIsNotifOpen(false); setIsProfileOpen(false); setOpenUserMenuId(null); }}>
      
      {/* ENCABEZADO CON COLOR AZUL SÓLIDO #1ba0d7 */}
      <header className="bg-[#1ba0d7] text-white px-4 sm:px-8 py-3 shadow-md relative z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* LOGO ITR HRv */}
          <div className="flex-shrink-0" onClick={() => { setActiveTab('Dashboard'); setSelectedEmployeeId(null); }}>
            <ITRHRvBrand variant="header" />
          </div>

          {/* NAVEGACIÓN FILTRADA ESTRICTAMENTE SEGÚN ROL */}
          <nav className="hidden md:flex items-center justify-center space-x-1 lg:space-x-2 text-xs lg:text-sm font-medium mx-auto">
            {[
              { id: 'Dashboard', label: t.dashboard },
              { id: 'Calendar', label: t.calendar },
              { id: 'Requests', label: t.requests },
              { id: 'Employees', label: t.employees },
              { id: 'Teams', label: t.teams },
              { id: 'Offices', label: t.offices },
              { id: 'Reports', label: t.reports },
              { id: 'Audit Trail', label: t.auditTrail },
              { id: 'Settings', label: t.settings }
            ]
            .filter(tab => allowedTabs.includes(tab.id))
            .map((item) => (
              <button
                key={item.id}
                onClick={(e) => { e.stopPropagation(); setActiveTab(item.id); setSelectedEmployeeId(null); setSettingsSubView(null); }}
                className={`px-2.5 lg:px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === item.id 
                    ? 'bg-black/20 font-semibold text-white shadow-inner' 
                    : 'hover:bg-white/15 text-white/90'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* DERECHA: CAMBIO DE IDIOMA EN/ES, NOTIFICACIONES Y PERFIL */}
          <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
            
            {/* SELECTOR DE IDIOMA EN / ES */}
            <button 
              onClick={(e) => { e.stopPropagation(); setLang(lang === 'EN' ? 'ES' : 'EN'); }}
              className="bg-black/20 hover:bg-black/30 border border-white/30 text-white text-xs font-bold px-2.5 py-1 rounded-lg transition flex items-center space-x-1 cursor-pointer"
              title="Switch Language / Cambiar Idioma"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'EN' ? 'ES' : 'EN'}</span>
            </button>

            {/* NOTIFICACIONES */}
            <div 
              className="relative flex items-center py-1" 
              onMouseLeave={() => setIsNotifOpen(false)}
            >
              <button 
                onClick={(e) => { e.stopPropagation(); setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }} 
                className="relative focus:outline-none flex items-center p-1 cursor-pointer"
              >
                <Bell className="w-4 h-4 text-white hover:opacity-80" />
                {notifications.length > 0 && <span className="absolute -top-1 -right-1.5 bg-[#00f2ad] text-[10px] text-slate-900 rounded-full px-1.5 font-bold">{notifications.length}</span>}
              </button>
              
              {isNotifOpen && (
                <div className="absolute right-0 top-full pt-1 z-50" onClick={(e) => e.stopPropagation()}>
                  <div className="w-80 bg-white rounded-md shadow-xl border border-slate-200 text-slate-800 p-2">
                    <div className="p-2 border-b font-semibold text-xs text-slate-700 flex justify-between">
                      <span>{t.notifications}</span><button onClick={() => setNotifications([])} className="text-[#0052cc] text-[10px] cursor-pointer">{t.clearAll}</button>
                    </div>
                    {notifications.map(n => (
                      <div key={n.id} className="p-2 border-b text-xs hover:bg-slate-50">
                        <p className="font-bold text-slate-800">{n.title}</p><p className="text-[11px] text-gray-500">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AVATAR DERECHO CON CIERRE AUTOMÁTICO EN ONMOUSELEAVE */}
            <div 
              className="relative flex items-center py-1"
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              <img 
                src={currentUser.avatar} 
                alt="Avatar" 
                onClick={(e) => { e.stopPropagation(); setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }} 
                className="w-8 h-8 rounded-full border-2 border-white/60 cursor-pointer hover:ring-2 hover:ring-white/80 object-cover" 
              />
              
              {isProfileOpen && (
                <div className="absolute right-0 top-full pt-1 z-50" onClick={(e) => e.stopPropagation()}>
                  <div className="w-56 bg-white rounded-xl shadow-2xl border border-slate-200 text-slate-800 p-2 space-y-1">
                    <div className="px-3 py-2 border-b text-xs">
                      <p className="font-bold text-slate-800">{currentUser.name}</p>
                      <p className="text-[10px] text-gray-400">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#0052cc]/10 text-[#0052cc]">{translateRole(currentUser.role, lang)}</span>
                    </div>
                    <button onClick={() => { setIsMyProfileModalOpen(true); setIsProfileOpen(false); }} className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg flex items-center space-x-2 font-medium transition cursor-pointer">
                      <UserCog className="w-4 h-4 text-[#0052cc]" /><span>{t.profileSettings}</span>
                    </button>
                    <button onClick={() => setIsLoggedIn(false)} className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center space-x-2 font-medium border-t border-slate-100 transition cursor-pointer">
                      <LogOut className="w-4 h-4" /><span>{t.logout}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 pb-16">

        {/* 1. DASHBOARD */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-normal text-slate-700">{t.dashboard}</h2>
              {isManager && (
                <span className="bg-sky-50 text-[#0052cc] px-3 py-1 rounded-lg text-xs font-semibold border border-sky-100">
                  {t.managerView}: "{teamsLedByCurrentUser.join(', ') || 'Accounting'}"
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div><p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{t.pendingRequests}</p><p className="text-3xl font-bold text-slate-700 mt-1">{filteredRequests.filter(r => r.status === 'Pending').length}</p></div>
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 font-bold">!</div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div><p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{t.approvedAbsences}</p><p className="text-3xl font-bold text-slate-700 mt-1">{filteredRequests.filter(r => r.status === 'Approved').length}</p></div>
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 font-bold">✓</div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div><p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{t.tardanzasToday}</p><p className="text-3xl font-bold text-rose-600 mt-1">{filteredRequests.filter(r => r.type === 'Tardanza (Late Arrival)').length}</p></div>
                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 font-bold"><AlertTriangle className="w-5 h-5" /></div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div><p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{t.activeStaff}</p><p className="text-3xl font-bold text-slate-700 mt-1">{employees.filter(e => e.status === 'Active' && (!isManager || managedEmployeeNames.includes(e.name) || e.name.toLowerCase() === currentUser.name.toLowerCase())).length}</p></div>
                <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-[#0052cc] font-bold">👥</div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2"><Calendar className="w-5 h-5 text-[#0052cc]" /><span>{t.liveAttendance}</span></h3>
                  <p className="text-xs text-gray-400 mt-0.5">{t.liveAttendanceSub}</p>
                </div>
                <select value={dashboardCalendarFilter} onChange={(e) => setDashboardCalendarFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-slate-700 text-xs font-medium focus:outline-[#0052cc]">
                  <option value="All Events">{t.allEvents}</option><option value="Vacation">{t.vacationsOnly}</option><option value="PTO">{t.ptosOnly}</option><option value="Tardanza (Late Arrival)">{t.tardanzasOnly}</option>
                </select>
              </div>
              <div className="divide-y divide-slate-100">
                {filteredRequests.filter(r => dashboardCalendarFilter === 'All Events' || r.type === dashboardCalendarFilter).map((r) => (
                  <div key={r.id} className="py-3 flex items-center justify-between hover:bg-slate-50 transition px-2 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${r.type === 'Tardanza (Late Arrival)' ? 'bg-rose-500' : r.type === 'Vacation' ? 'bg-amber-500' : r.type === 'Sick leave' ? 'bg-emerald-500' : 'bg-[#0052cc]'}`}></div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{r.employeeName}</p>
                        <p className="text-xs text-gray-500">{translateType(r.type, lang)} • <span className="font-medium text-slate-700">{translateDuration(r.duration, lang)}</span></p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-slate-700">{r.startDate} to {r.endDate}</p>
                      <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${r.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : r.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}`}>{translateStatus(r.status, lang)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. CALENDAR */}
        {activeTab === 'Calendar' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-normal text-slate-700">{t.companyCalendar}</h2>
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-3">
                <div className="flex items-center space-x-3">
                  <button onClick={prevMonth} className="p-1 rounded bg-slate-100 hover:bg-slate-200 transition cursor-pointer"><ChevronLeft className="w-5 h-5 text-slate-600" /></button>
                  <span className="font-bold text-slate-800 text-lg w-40 text-center">{currentDate.toLocaleString(lang === 'EN' ? 'en-US' : 'es-ES', { month: 'long', year: 'numeric' })}</span>
                  <button onClick={nextMonth} className="p-1 rounded bg-slate-100 hover:bg-slate-200 transition cursor-pointer"><ChevronRight className="w-5 h-5 text-slate-600" /></button>
                </div>
                <div className="flex flex-wrap gap-3 text-xs font-medium">
                  <span className="flex items-center space-x-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-amber-500"></span><span>Vacation</span></span>
                  <span className="flex items-center space-x-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#0052cc]"></span><span>PTO</span></span>
                  <span className="flex items-center space-x-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-emerald-500"></span><span>Sick Leave</span></span>
                  <span className="flex items-center space-x-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-rose-500"></span><span>Late / Tardanza</span></span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-7 border-t border-l border-slate-100 rounded min-w-[700px]">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (<div key={day} className="p-2 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400 border-r border-b border-slate-100 bg-slate-50">{day}</div>))}
                  {renderCalendarCells()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. REQUESTS */}
        {activeTab === 'Requests' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <select value={requestFilter} onChange={(e) => setRequestFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white text-slate-700 font-medium">
                <option value="All Pending">{t.allPendingRequests}</option>
                <option value="Approved">{t.approvedRequests}</option>
                <option value="Rejected">{t.rejectedRequests}</option>
                <option value="All">{t.allRequests}</option>
              </select>
              <button onClick={() => setIsModalOpen(true)} className="bg-[#0052cc] hover:bg-[#003db3] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition flex items-center space-x-2 cursor-pointer">
                <Plus className="w-4 h-4" /><span>{t.createNewRequest}</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 min-w-[650px]">
                <thead className="bg-slate-50 text-xs font-semibold text-gray-500 uppercase border-b">
                  <tr><th className="p-3.5 pl-6">{t.employees}</th><th className="p-3.5">{t.typeAndDuration}</th><th className="p-3.5">{t.dates}</th><th className="p-3.5">{t.status}</th><th className="p-3.5 text-right pr-6">{t.actions}</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredRequests.map(req => (
                    <tr key={req.id} className="hover:bg-slate-50">
                      <td className="p-3.5 pl-6 font-medium text-slate-800">{req.employeeName}</td>
                      <td className="p-3.5">{translateType(req.type, lang)} <span className="text-xs text-gray-400">({translateDuration(req.duration, lang)})</span></td>
                      <td className="p-3.5 text-xs">{req.startDate} to {req.endDate} ({req.days} d)</td>
                      <td className="p-3.5"><span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : req.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}`}>{translateStatus(req.status, lang)}</span></td>
                      <td className="p-3.5 text-right pr-6 space-x-1">
                        {req.status === 'Pending' && canManageRequest(req) && (
                          <><button onClick={() => updateRequestStatus(req.id, 'Approved')} title="Approve Request" className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded cursor-pointer"><Check className="w-4 h-4" /></button>
                          <button onClick={() => updateRequestStatus(req.id, 'Rejected')} title="Reject Request" className="p-1.5 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"><XCircle className="w-4 h-4" /></button></>
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
        {activeTab === 'Employees' && allowedTabs.includes('Employees') && (
          <div>
            {!selectedEmployeeId ? (
              <div className="space-y-6">
                
                {/* ENCABEZADO Y BOTÓN ADD USER */}
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-normal text-slate-700">{t.employees}</h2>
                  {isAdminOrOwner && (
                    <button onClick={() => setIsUserModalOpen(true)} className="bg-[#0052cc] hover:bg-[#003db3] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition cursor-pointer">
                      {t.addUser}
                    </button>
                  )}
                </div>

                {/* CUADRO DE DEFINICIÓN DE PERMISOS DE ROLES */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2 border-b pb-2">
                    <ShieldCheck className="w-4 h-4 text-[#0052cc]" />
                    <span>{t.rolePermissions}</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                      <p className="font-bold text-slate-800 flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                        <span>{translateRole('User', lang)}</span>
                      </p>
                      <p className="text-gray-500 leading-relaxed text-[11px]">{t.userDesc}</p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                      <p className="font-bold text-sky-800 flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                        <span>{translateRole('Manager', lang)}</span>
                      </p>
                      <p className="text-gray-500 leading-relaxed text-[11px]">{t.managerDesc}</p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                      <p className="font-bold text-emerald-800 flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#00c896]"></span>
                        <span>{translateRole('Accounting', lang)}</span>
                      </p>
                      <p className="text-gray-500 leading-relaxed text-[11px]">{t.accountingDesc}</p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                      <p className="font-bold text-[#0052cc] flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#0052cc]"></span>
                        <span>{translateRole('Admin', lang)}</span>
                      </p>
                      <p className="text-gray-500 leading-relaxed text-[11px]">{t.adminDesc}</p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                      <p className="font-bold text-amber-800 flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span>{translateRole('Owner', lang)}</span>
                      </p>
                      <p className="text-gray-500 leading-relaxed text-[11px]">{t.ownerDesc}</p>
                    </div>
                  </div>
                </div>

                {/* TABLA DE EMPLEADOS CON OVERFLOW VISIBLE Y PB-16 PARA ELIMINAR CUALQUIER BARRA DE SCROLL VERTICAL */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4 pb-16 overflow-visible">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <div className="relative w-80">
                      <input type="text" placeholder={t.searchPlaceholder} value={empSearchQuery} onChange={(e) => setEmpSearchQuery(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm pl-9 focus:outline-[#0052cc] bg-white" />
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{t.showingUsers} {sortedEmployees.length} {t.usersText}</span>
                  </div>

                  <div className="overflow-visible">
                    <table className="w-full text-left text-sm text-gray-600 min-w-[650px]">
                      <thead className="bg-slate-50 text-xs font-semibold text-gray-500 uppercase border-b border-slate-100">
                        <tr><th className="p-3">{t.name}</th><th className="p-3">{t.emailAddress}</th><th className="p-3">{t.role}</th><th className="p-3">{t.team}</th><th className="p-3">{t.status}</th><th className="p-3">{t.office}</th><th className="p-3 text-center">{t.actions}</th></tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {sortedEmployees.map((emp) => {
                          const initials = emp.name.split(' ').map(n => n[0]).join('').substring(0, 2);

                          return (
                            <tr key={emp.id} className="hover:bg-slate-50/80 transition">
                              <td className="p-3 flex items-center space-x-3">
                                <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center">{initials}</span>
                                <span onClick={() => setSelectedEmployeeId(emp.id)} className={`font-medium ${emp.status === 'Disabled' ? 'text-gray-400 line-through' : 'text-[#0052cc] hover:underline cursor-pointer'}`}>{emp.name}</span>
                              </td>
                              <td className="p-3 text-gray-500 text-xs">{emp.email}</td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                  emp.role === 'Owner' ? 'bg-amber-100 text-amber-800' : 
                                  emp.role === 'Admin' ? 'bg-[#0052cc]/10 text-[#0052cc]' : 
                                  emp.role === 'Manager' ? 'bg-sky-100 text-sky-800' :
                                  emp.role === 'Accounting' ? 'bg-[#00c896]/15 text-[#008f62]' : 'bg-slate-100 text-slate-700'
                                }`}>
                                  {translateRole(emp.role, lang)}
                                </span>
                              </td>
                              <td className="p-3 text-xs text-slate-600 font-medium">{emp.team}</td>
                              <td className="p-3"><span className={`px-2 py-0.5 rounded text-xs font-semibold ${emp.status === 'Active' ? 'bg-[#00c896]/15 text-[#008f62]' : 'bg-slate-100 text-slate-500'}`}>{translateStatus(emp.status, lang)}</span></td>
                              <td className="p-3 text-xs text-gray-500">{emp.office}</td>
                              
                              <td className="p-3 text-center relative">
                                <button 
                                  onClick={(e) => { 
                                    e.stopPropagation(); 
                                    if (isAdminOrOwner) setOpenUserMenuId(openUserMenuId === emp.id ? null : emp.id); 
                                  }} 
                                  disabled={!isAdminOrOwner} className={`p-1.5 rounded transition cursor-pointer ${isAdminOrOwner ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100' : 'text-slate-200 cursor-not-allowed'}`}
                                  title={isAdminOrOwner ? "User Actions" : "Only Administrators can modify user permissions"}
                                >
                                  {isAdminOrOwner ? <GearIcon className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5 text-gray-300" />}
                                </button>

                                {openUserMenuId === emp.id && isAdminOrOwner && (
                                  <div 
                                    onClick={(e) => e.stopPropagation()} 
                                    className="absolute right-0 top-full mt-1 w-60 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 text-left py-1 text-xs divide-y divide-slate-100"
                                  >
                                    <div className="py-1">
                                      <button onClick={() => handleOpenEditModal(emp)} className="w-full text-left px-3 py-1.5 text-slate-700 hover:bg-slate-50 transition font-medium flex items-center space-x-2 cursor-pointer">
                                        <Pencil className="w-3.5 h-3.5 text-[#0052cc]" /><span>{t.editDetails}</span>
                                      </button>
                                    </div>
                                    <div className="py-1">
                                      <button onClick={() => handleToggleStatus(emp.id)} className="w-full text-left px-3 py-1.5 text-slate-700 hover:bg-slate-50 transition font-medium flex items-center justify-between cursor-pointer">
                                        <span>{emp.status === 'Active' ? t.disableUser : t.enableUser}</span><span className={`w-2 h-2 rounded-full ${emp.status === 'Active' ? 'bg-[#00c896]' : 'bg-rose-500'}`}></span>
                                      </button>
                                    </div>
                                    <div className="py-1">
                                      <p className="px-3 py-1 text-[10px] font-bold uppercase text-gray-400">{t.assignRole}</p>
                                      {(['User', 'Manager', 'Admin', 'Accounting', 'Owner'] as const).map((roleChoice) => {
                                        // Si el usuario actual es Admin, ocultar opción de Owner
                                        if (roleChoice === 'Owner' && !isOwner) return null;

                                        return (
                                          <button key={roleChoice} onClick={() => handleChangeRole(emp.id, roleChoice)} className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 transition flex items-center justify-between cursor-pointer ${emp.role === roleChoice ? 'font-bold text-[#0052cc] bg-sky-50/50' : 'text-slate-600'}`}>
                                            <span>Set as {translateRole(roleChoice, lang)}</span>{emp.role === roleChoice && <Check className="w-3 h-3 text-[#0052cc]" />}
                                          </button>
                                        );
                                      })}
                                    </div>
                                    <div className="py-1">
                                      <button onClick={() => handleDeleteUser(emp.id)} className="w-full text-left px-3 py-1.5 text-rose-600 hover:bg-rose-50 font-medium transition flex items-center space-x-1.5 cursor-pointer">
                                        <Trash2 className="w-3.5 h-3.5" /><span>{t.deleteUser}</span>
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
                </div>

              </div>
            ) : (
              /* DETALLE DE EMPLEADO COMPLETO (CON EDICIÓN Y TODOS LOS BALANCES) */
              (() => {
                const emp = activeEmployee;
                if (!emp) return null;

                const empVacationTaken = requests
                  .filter(r => r.employeeName === emp.name && r.type === 'Vacation' && r.status === 'Approved')
                  .reduce((sum, r) => sum + r.days, 0);

                const empPtoTaken = requests
                  .filter(r => r.employeeName === emp.name && r.type === 'PTO' && r.status === 'Approved')
                  .reduce((sum, r) => sum + r.days, 0);

                const empSickTaken = requests
                  .filter(r => r.employeeName === emp.name && r.type === 'Sick leave' && r.status === 'Approved')
                  .reduce((sum, r) => sum + r.days, 0);

                const empFloatingTaken = requests
                  .filter(r => r.employeeName === emp.name && r.type === 'Floating Day' && r.status === 'Approved')
                  .reduce((sum, r) => sum + r.days, 0);

                const empTardanzaTaken = requests
                  .filter(r => r.employeeName === emp.name && r.type === 'Tardanza (Late Arrival)' && r.status === 'Approved')
                  .length;

                const vacAllowance = 14.0;
                const ptoAllowance = 3.0;
                const sickAllowance = 5.0;
                const floatingAllowance = 2.0;
                const tardanzaAllowance = 5;

                const vacRemaining = Math.max(0, vacAllowance - empVacationTaken);
                const ptoRemaining = Math.max(0, ptoAllowance - empPtoTaken);
                const sickRemaining = Math.max(0, sickAllowance - empSickTaken);
                const floatingRemaining = Math.max(0, floatingAllowance - empFloatingTaken);
                const tardanzaRemaining = Math.max(0, tardanzaAllowance - empTardanzaTaken);

                const vacTakenPct = Math.min(100, Math.round((empVacationTaken / vacAllowance) * 100));
                const ptoTakenPct = Math.min(100, Math.round((empPtoTaken / ptoAllowance) * 100));
                const sickTakenPct = Math.min(100, Math.round((empSickTaken / sickAllowance) * 100));
                const floatingTakenPct = Math.min(100, Math.round((empFloatingTaken / floatingAllowance) * 100));
                const tardanzaTakenPct = Math.min(100, Math.round((empTardanzaTaken / tardanzaAllowance) * 100));

                const empTeamObj = teams.find(tItem => tItem.name === emp.team);
                const timeOffApprover = empTeamObj?.lead || 'Alex Morgan';

                return (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b pb-4">
                      <button onClick={() => setSelectedEmployeeId(null)} className="flex items-center space-x-2 text-[#0052cc] hover:underline text-sm font-semibold cursor-pointer">
                        <ArrowLeft className="w-4 h-4" /><span>{t.backToEmployees}</span>
                      </button>
                      <h2 className="text-2xl font-normal text-slate-700">{emp.name}</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="space-y-6">
                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col items-center text-center space-y-3 relative">
                          <ITRHRvBrand variant="login" />
                          <h3 className="text-lg font-bold text-slate-800 mt-1">{emp.name}</h3>
                          <p className="text-xs text-gray-400">{t.hireDateLabel} <span className="font-semibold text-slate-700">{emp.hireDate}</span></p>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            emp.role === 'Owner' ? 'bg-amber-100 text-amber-800' :
                            emp.role === 'Admin' ? 'bg-[#0052cc]/10 text-[#0052cc]' :
                            emp.role === 'Manager' ? 'bg-sky-100 text-sky-800' :
                            emp.role === 'Accounting' ? 'bg-[#00c896]/15 text-[#008f62]' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {translateRole(emp.role, lang)}
                          </span>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
                          <div className="flex justify-between items-center border-b pb-3">
                            <h4 className="font-bold text-slate-800 text-sm">{t.currentLeaveYear}</h4>
                            <span className="text-[10px] text-gray-400 font-medium">Jan 01 — Dec 31, 2026</span>
                          </div>

                          <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <div className="flex justify-between text-xs font-semibold text-slate-700">
                              <span>{t.vacationAllowance}</span>
                              <span>{vacAllowance.toFixed(1)} days</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>{t.vacationTaken}</span>
                              <span className="text-amber-600 font-semibold">-{empVacationTaken.toFixed(1)} days</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-slate-800 border-t pt-1">
                              <span>{t.remaining}</span>
                              <span className="text-[#0052cc]">{vacRemaining.toFixed(1)} days</span>
                            </div>
                            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mt-1">
                              <div className="bg-[#0052cc] h-full transition-all duration-300" style={{ width: `${vacTakenPct}%` }}></div>
                            </div>
                          </div>

                          <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <div className="flex justify-between text-xs font-semibold text-slate-700">
                              <span>{t.ptoAllowance}</span>
                              <span>{ptoAllowance.toFixed(1)} days</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>{t.ptoTaken}</span>
                              <span className="text-amber-600 font-semibold">-{empPtoTaken.toFixed(1)} days</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-slate-800 border-t pt-1">
                              <span>{t.remaining}</span>
                              <span className="text-[#00c896]">{ptoRemaining.toFixed(1)} days</span>
                            </div>
                            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mt-1">
                              <div className="bg-[#00c896] h-full transition-all duration-300" style={{ width: `${ptoTakenPct}%` }}></div>
                            </div>
                          </div>

                          <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <div className="flex justify-between text-xs font-semibold text-slate-700">
                              <span>{t.sickAllowance}</span>
                              <span>{sickAllowance.toFixed(1)} days</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>{t.sickTaken}</span>
                              <span className="text-amber-600 font-semibold">-{empSickTaken.toFixed(1)} days</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-slate-800 border-t pt-1">
                              <span>{t.remaining}</span>
                              <span className="text-emerald-600">{sickRemaining.toFixed(1)} days</span>
                            </div>
                            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mt-1">
                              <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${sickTakenPct}%` }}></div>
                            </div>
                          </div>

                          <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <div className="flex justify-between text-xs font-semibold text-slate-700">
                              <span>{t.floatingAllowance}</span>
                              <span>{floatingAllowance.toFixed(1)} days</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>{t.floatingTaken}</span>
                              <span className="text-amber-600 font-semibold">-{empFloatingTaken.toFixed(1)} days</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-slate-800 border-t pt-1">
                              <span>{t.remaining}</span>
                              <span className="text-sky-600">{floatingRemaining.toFixed(1)} days</span>
                            </div>
                            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mt-1">
                              <div className="bg-sky-500 h-full transition-all duration-300" style={{ width: `${floatingTakenPct}%` }}></div>
                            </div>
                          </div>

                          <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <div className="flex justify-between text-xs font-semibold text-slate-700">
                              <span>{t.tardanzaAllowance}</span>
                              <span>{tardanzaAllowance} max</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>{t.tardanzaTaken}</span>
                              <span className="text-rose-600 font-semibold">{empTardanzaTaken} logged</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-slate-800 border-t pt-1">
                              <span>{t.remaining}</span>
                              <span className="text-rose-500">{tardanzaRemaining} left</span>
                            </div>
                            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mt-1">
                              <div className="bg-rose-500 h-full transition-all duration-300" style={{ width: `${tardanzaTakenPct}%` }}></div>
                            </div>
                          </div>

                          <div className="pt-2 border-t space-y-2">
                            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700">
                              <BarChart3 className="w-4 h-4 text-[#0052cc]" />
                              <span>Time Off Usage Summary</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-500 pt-1">
                              <div>Vacation: <span className="font-bold text-slate-800">{vacTakenPct}%</span></div>
                              <div>PTO: <span className="font-bold text-slate-800">{ptoTakenPct}%</span></div>
                              <div>Sick: <span className="font-bold text-slate-800">{sickTakenPct}%</span></div>
                              <div>Floating: <span className="font-bold text-slate-800">{floatingTakenPct}%</span></div>
                            </div>
                          </div>
                        </div>

                      </div>

                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                          <div className="flex justify-between items-center border-b pb-3">
                            <h3 className="text-base font-bold text-slate-800">{t.personalInfo}</h3>
                            {isAdminOrOwner && (
                              <button 
                                onClick={() => handleOpenEditModal(emp)} 
                                className="text-[#0052cc] hover:underline flex items-center space-x-1 font-semibold text-xs cursor-pointer"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                                <span>{t.editBtn}</span>
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="space-y-1">
                              <span className="text-gray-400 font-medium">{t.fullName}</span>
                              <p className="bg-slate-50 border rounded-lg px-3 py-2 font-semibold text-slate-800">{emp.name}</p>
                            </div>

                            <div className="space-y-1">
                              <span className="text-gray-400 font-medium">{t.emailAddress}</span>
                              <p className="bg-slate-50 border rounded-lg px-3 py-2 font-semibold text-slate-800">{emp.email}</p>
                            </div>

                            <div className="space-y-1">
                              <span className="text-gray-400 font-medium">{t.role}</span>
                              <p className="bg-slate-50 border rounded-lg px-3 py-2 font-semibold text-[#0052cc]">{translateRole(emp.role, lang)}</p>
                            </div>

                            <div className="space-y-1">
                              <span className="text-gray-400 font-medium">{t.team}</span>
                              <p className="bg-slate-50 border rounded-lg px-3 py-2 font-semibold text-slate-800">{emp.team}</p>
                            </div>

                            <div className="space-y-1">
                              <span className="text-gray-400 font-medium">{t.office}</span>
                              <p className="bg-slate-50 border rounded-lg px-3 py-2 font-semibold text-slate-800">{emp.office}</p>
                            </div>

                            <div className="space-y-1">
                              <span className="text-gray-400 font-medium">{t.timeOffApprover}</span>
                              <p className="bg-slate-50 border rounded-lg px-3 py-2 font-semibold text-slate-800">{timeOffApprover}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                          <div className="flex justify-between items-center border-b pb-3">
                            <h3 className="text-base font-bold text-slate-800">{t.weeklyWorkSchedule}</h3>
                            <span className="text-xs text-gray-400 font-medium">{t.currentSchedule}</span>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="w-full text-center text-xs text-slate-600 min-w-[500px]">
                              <thead className="bg-slate-50 text-[11px] font-semibold text-gray-500 uppercase border-b">
                                <tr>
                                  <th className="p-2 text-left">Period</th>
                                  <th className="p-2">Monday</th>
                                  <th className="p-2">Tuesday</th>
                                  <th className="p-2">Wednesday</th>
                                  <th className="p-2">Thursday</th>
                                  <th className="p-2">Friday</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                <tr>
                                  <td className="p-2.5 text-left font-bold text-slate-700">Morning</td>
                                  <td className="p-2.5">9:00am - 12:00pm</td>
                                  <td className="p-2.5">9:00am - 12:00pm</td>
                                  <td className="p-2.5">9:00am - 12:00pm</td>
                                  <td className="p-2.5">9:00am - 12:00pm</td>
                                  <td className="p-2.5">9:00am - 12:00pm</td>
                                </tr>
                                <tr>
                                  <td className="p-2.5 text-left font-bold text-slate-700">Afternoon</td>
                                  <td className="p-2.5">1:00pm - 6:00pm</td>
                                  <td className="p-2.5">1:00pm - 6:00pm</td>
                                  <td className="p-2.5">1:00pm - 6:00pm</td>
                                  <td className="p-2.5">1:00pm - 6:00pm</td>
                                  <td className="p-2.5">1:00pm - 6:00pm</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div className="pt-2 border-t text-center">
                            <p className="text-xs font-bold text-[#0052cc]">{t.workdayHours}</p>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })()
            )}
          </div>
        )}

        {/* 5. TEAMS */}
        {activeTab === 'Teams' && allowedTabs.includes('Teams') && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-normal text-slate-700">{t.teams}</h2>
              {isAdminOrOwner && (
                <button onClick={() => setIsTeamModalOpen(true)} className="bg-[#0052cc] hover:bg-[#003db3] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition flex items-center space-x-2 cursor-pointer">
                  <Plus className="w-4 h-4" /><span>{t.newTeam}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams
                .filter(tItem => !isManager || tItem.lead.toLowerCase() === currentUser.name.toLowerCase())
                .map(tItem => {
                  const teamMembers = employees.filter(e => e.team === tItem.name && e.name.toLowerCase() !== tItem.lead.toLowerCase());
                  return (
                    <div key={tItem.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-slate-800 text-base">{tItem.name}</h3>
                          <span className="bg-sky-50 text-[#0052cc] px-2 py-0.5 rounded text-[10px] font-bold border border-sky-100">
                            {teamMembers.length + 1} {t.membersTotal}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{tItem.description}</p>
                        
                        <div className="pt-2 border-t space-y-2">
                          <p className="text-xs font-semibold text-[#0052cc]">{t.teamLead}: <span className="text-slate-800 font-bold">{tItem.lead}</span></p>
                          
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase text-gray-400">{t.teamMembers}</p>
                            <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                              {teamMembers.length > 0 ? (
                                teamMembers.map(m => (
                                  <span key={m.id} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-medium">
                                    {m.name}
                                  </span>
                                ))
                              ) : (
                                <span className="text-[11px] text-gray-400 italic">{t.noMembersAssigned}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {(isAdminOrOwner || (isManager && tItem.lead.toLowerCase() === currentUser.name.toLowerCase())) && (
                        <button 
                          onClick={() => { setAddingMemberToTeam(tItem); setSelectedMemberToAdd(''); }}
                          className="w-full mt-2 bg-slate-50 hover:bg-sky-50 text-[#0052cc] border border-slate-200 hover:border-sky-200 py-2 rounded-lg text-xs font-semibold transition flex items-center justify-center space-x-1.5 cursor-pointer"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>{t.addMember}</span>
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* 6. OFFICES */}
        {activeTab === 'Offices' && allowedTabs.includes('Offices') && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-normal text-slate-700">{t.offices}</h2>
              {isAdminOrOwner && (
                <button onClick={() => setIsOfficeModalOpen(true)} className="bg-[#0052cc] hover:bg-[#003db3] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition flex items-center space-x-2 cursor-pointer">
                  <Plus className="w-4 h-4" /><span>{t.newOffice}</span>
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {offices.map(o => (
                <div key={o.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <h3 className="font-bold text-slate-800 text-base">{o.name}</h3>
                  <p className="text-xs text-gray-500 flex items-center space-x-1"><MapPin className="w-3.5 h-3.5" /><span>{o.location}</span></p>
                  <p className="text-xs text-gray-400">{t.timezoneLabel} {o.timezone}</p>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-[#0052cc]">{o.holidayCalendar}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. REPORTS */}
        {activeTab === 'Reports' && allowedTabs.includes('Reports') && (
          <div className="space-y-6">
            <h2 className="text-2xl font-normal text-slate-700">{t.reports}</h2>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <p className="text-xs text-gray-500">{t.reportsDesc}</p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => downloadReportCSV('Leave & Tardanzas Report')} className="bg-[#0052cc] hover:bg-[#003db3] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition shadow-sm cursor-pointer">
                  <Download className="w-4 h-4" /><span>{t.exportCSV}</span>
                </button>
                <button onClick={() => downloadReportCSV('Employee Master Report')} className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition shadow-sm cursor-pointer">
                  <Download className="w-4 h-4" /><span>{t.exportMasterCSV}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 8. AUDIT TRAIL */}
        {activeTab === 'Audit Trail' && allowedTabs.includes('Audit Trail') && (
          <div className="space-y-6">
            <h2 className="text-2xl font-normal text-slate-700 flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-[#00c896]" /><span>{t.systemAuditTrail}</span>
            </h2>
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 min-w-[600px]">
                <thead className="bg-slate-50 font-semibold uppercase text-slate-500 border-b">
                  <tr><th className="p-3">{t.timestamp}</th><th className="p-3">{t.user}</th><th className="p-3">{t.action}</th><th className="p-3">{t.details}</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono text-slate-400">{log.timestamp}</td>
                      <td className="p-3 font-semibold text-slate-800">{log.user}</td>
                      <td className="p-3"><span className="bg-sky-100 text-[#0052cc] px-2 py-0.5 rounded font-medium">{log.action}</span></td>
                      <td className="p-3 text-slate-600">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 9. SETTINGS */}
        {activeTab === 'Settings' && allowedTabs.includes('Settings') && (
          <div className="space-y-6">
            <h2 className="text-2xl font-normal text-slate-700">{t.settingsTitle}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* GOOGLE WORKSPACE CARD */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200">
                    <GoogleIcon />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Google Workspace SSO</h3>
                    <p className="text-xs text-[#00c896] font-medium">{t.integrationActive}</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-semibold text-slate-700">{t.autoProvTitle}</p>
                      <p className="text-gray-500">{t.autoProvSub}</p>
                    </div>
                    <ToggleSwitch isOn={settingsAutoProv} onToggle={() => setSettingsAutoProv(!settingsAutoProv)} disabled={!isAdminOrOwner} />
                  </div>

                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-semibold text-slate-700">{t.strictAuthTitle}</p>
                      <p className="text-gray-500">{t.strictAuthSub}</p>
                    </div>
                    <ToggleSwitch isOn={settingsStrictAuth} onToggle={() => setSettingsStrictAuth(!settingsStrictAuth)} disabled={!isAdminOrOwner} />
                  </div>
                </div>
              </div>
              
              {/* SYSTEM PREFERENCES */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200">
                    <Server className="w-5 h-5 text-[#0052cc]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{t.sysPrefTitle}</h3>
                    <p className="text-xs text-gray-400">{t.sysPrefSub}</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-semibold text-slate-700">{t.auditTrailTitle}</p>
                      <p className="text-gray-500">{t.auditTrailSub}</p>
                    </div>
                    <ToggleSwitch isOn={settingsAuditTrail} onToggle={() => {}} disabled={true} />
                  </div>

                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-semibold text-slate-700">{t.emailNotifTitle}</p>
                      <p className="text-gray-500">{t.emailNotifSub}</p>
                    </div>
                    <ToggleSwitch isOn={settingsEmailNotif} onToggle={() => setSettingsEmailNotif(!settingsEmailNotif)} disabled={!isAdminOrOwner} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL EDITAR EMPLEADO */}
      {editingEmployee && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 border border-slate-100">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-slate-800">{t.editDetails}</h3>
              <button onClick={() => setEditingEmployee(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveEditEmployee} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-gray-700 mb-1">{t.fullName}</label>
                <input type="text" required value={editingEmployee.name || ''} onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })} className="w-full border rounded-lg px-3 py-1.5 text-xs bg-white focus:outline-[#0052cc]" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">{t.emailAddress}</label>
                <input type="email" required value={editingEmployee.email || ''} onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })} className="w-full border rounded-lg px-3 py-1.5 text-xs bg-white focus:outline-[#0052cc]" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">{t.role}</label>
                <select value={editingEmployee.role || 'User'} onChange={(e) => setEditingEmployee({ ...editingEmployee, role: e.target.value as any })} className="w-full border rounded-lg px-3 py-1.5 text-xs bg-white focus:outline-[#0052cc]">
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                  <option value="Accounting">Accounting</option>
                  <option value="Admin">Admin</option>
                  {isOwner && <option value="Owner">Owner</option>}
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">{t.team}</label>
                <select value={editingEmployee.team || 'General'} onChange={(e) => setEditingEmployee({ ...editingEmployee, team: e.target.value })} className="w-full border rounded-lg px-3 py-1.5 text-xs bg-white focus:outline-[#0052cc]">
                  {teams.map(teamItem => <option key={teamItem.id} value={teamItem.name}>{teamItem.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">{t.status}</label>
                <select value={editingEmployee.status || 'Active'} onChange={(e) => setEditingEmployee({ ...editingEmployee, status: e.target.value as any })} className="w-full border rounded-lg px-3 py-1.5 text-xs bg-white focus:outline-[#0052cc]">
                  <option value="Active">Active</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">{t.office}</label>
                <select value={editingEmployee.office || 'Headquarters (HQ)'} onChange={(e) => setEditingEmployee({ ...editingEmployee, office: e.target.value })} className="w-full border rounded-lg px-3 py-1.5 text-xs bg-white focus:outline-[#0052cc]">
                  <option value="Headquarters (HQ)">Headquarters (HQ)</option>
                  <option value="Santiago Operations">Santiago Operations</option>
                  <option value="Remote Hub">Remote Hub</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button type="button" onClick={() => setEditingEmployee(null)} className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg font-medium cursor-pointer">{t.cancel}</button>
                <button type="submit" className="px-4 py-2 text-xs bg-[#0052cc] hover:bg-[#003db3] text-white rounded-lg font-medium shadow-sm cursor-pointer">{t.saveChanges}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDITAR PROFILE SETTINGS */}
      {isMyProfileModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={(e) => e.stopPropagation()}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5 border border-slate-100 relative">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                <UserCog className="w-5 h-5 text-[#0052cc]" />
                <span>{t.profileSettings}</span>
              </h3>
              <button onClick={() => setIsMyProfileModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="space-y-2">
                <label className="block font-semibold text-slate-700">Profile Picture / Avatar</label>
                <div className="flex items-center space-x-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <img src={profileAvatar} alt="Preview" className="w-14 h-14 rounded-full border-2 border-[#0052cc] object-cover shadow-sm bg-white" />
                  <div className="flex-1 flex flex-col justify-center">
                    <label className="cursor-pointer bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition inline-flex items-center space-x-2 w-fit">
                      <Upload className="w-3.5 h-3.5 text-[#0052cc]" /><span>{t.uploadPhoto}</span>
                      <input type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={handleImageUpload} />
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t">
                <label className="block font-semibold text-slate-700 mb-1">{t.fullName}</label>
                <input type="text" required value={profileName} onChange={(e) => setProfileName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-[#0052cc] bg-white" />
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button type="button" onClick={() => setIsMyProfileModalOpen(false)} className="px-4 py-2 text-xs text-gray-600 hover:bg-slate-100 rounded-lg font-medium cursor-pointer">{t.cancel}</button>
                <button type="submit" className="px-4 py-2 text-xs bg-[#0052cc] hover:bg-[#003db3] text-white rounded-lg font-medium shadow-sm transition cursor-pointer">{t.saveChanges}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CREAR REQUEST */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-slate-700">{t.createNewRequest}</h3>
              <button onClick={handleCloseRequestModal} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreateRequest} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-gray-700 mb-1">{t.employees}</label>
                <select required value={reqEmployee} onChange={(e) => setReqEmployee(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-xs bg-white">
                  <option value="">{t.selectEmployee}</option>
                  {employees.filter(e => e.status === 'Active' && (!isManager || managedEmployeeNames.includes(e.name) || e.name.toLowerCase() === currentUser.name.toLowerCase())).map((emp) => <option key={emp.id} value={emp.name}>{emp.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">{t.type}</label>
                <select value={reqType} onChange={(e) => setReqType(e.target.value as any)} className="w-full border rounded-lg px-3 py-2 text-xs bg-white">
                  <option value="Vacation">Vacation</option><option value="PTO">PTO</option><option value="Sick leave">Sick leave</option><option value="Tardanza (Late Arrival)">Tardanza (Late Arrival)</option><option value="Floating Day">Floating Day</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">{t.duration}</label>
                <select value={reqDuration} onChange={(e) => setReqDuration(e.target.value as any)} className="w-full border rounded-lg px-3 py-2 text-xs bg-white">
                  <option value="Full Day">Full Day</option><option value="Half Day (Morning)">Half Day (Morning)</option><option value="Half Day (Afternoon)">Half Day (Afternoon)</option><option value="Hourly (Late Arrival)">Hourly (Late Arrival)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block font-medium text-gray-700 mb-1">{t.startDate}</label><input type="date" required value={reqStart} onChange={(e) => setReqStart(e.target.value)} className="w-full border rounded-lg px-3 py-1.5 text-xs" /></div>
                <div><label className="block font-medium text-gray-700 mb-1">{t.endDate}</label><input type="date" required value={reqEnd} onChange={(e) => setReqEnd(e.target.value)} className="w-full border rounded-lg px-3 py-1.5 text-xs" /></div>
              </div>
              <div><label className="block font-medium text-gray-700 mb-1">{t.reasonNotes}</label><input type="text" value={reqReason} onChange={(e) => setReqReason(e.target.value)} placeholder="Reason..." className="w-full border rounded-lg px-3 py-1.5 text-xs" /></div>
              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button type="button" onClick={handleCloseRequestModal} className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">{t.cancel}</button>
                <button type="submit" className="px-4 py-2 text-xs bg-[#0052cc] hover:bg-[#003db3] text-white rounded-lg font-medium cursor-pointer">{t.submit}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL AGREGAR USUARIO */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-slate-700">{t.addUser}</h3>
              <button onClick={() => setIsUserModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div><label className="block font-medium text-gray-700 mb-1">{t.fullName}</label><input type="text" required value={newUserName} onChange={(e) => setNewUserName(e.target.value)} className="w-full border rounded-lg px-3 py-1.5 text-xs" placeholder="Ej. Juan Pérez" /></div>
              <div><label className="block font-medium text-gray-700 mb-1">{t.emailAddress}</label><input type="email" required value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} className="w-full border rounded-lg px-3 py-1.5 text-xs" placeholder="juan.perez@company.com" /></div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">{t.role}</label>
                <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value as any)} className="w-full border rounded-lg px-3 py-1.5 text-xs bg-white">
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                  <option value="Accounting">Accounting</option>
                  <option value="Admin">Admin</option>
                  {isOwner && <option value="Owner">Owner</option>}
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button type="button" onClick={() => setIsUserModalOpen(false)} className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">{t.cancel}</button>
                <button type="submit" className="px-4 py-2 text-xs bg-[#0052cc] hover:bg-[#003db3] text-white rounded-lg font-medium cursor-pointer">{t.saveUser}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CREAR EQUIPO */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-slate-700">{t.newTeam}</h3>
              <button onClick={() => setIsTeamModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreateTeam} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Team Name</label>
                <input type="text" required value={teamName} onChange={(e) => setTeamName(e.target.value)} className="w-full border rounded-lg px-3 py-1.5 text-xs" placeholder="Ej. Quality Assurance" />
              </div>
              
              <div>
                <label className="block font-medium text-gray-700 mb-1">Team Lead (Manager)</label>
                <select required value={teamLead} onChange={(e) => setTeamLead(e.target.value)} className="w-full border rounded-lg px-3 py-1.5 text-xs bg-white">
                  <option value="">{t.selectManager}</option>
                  {employees.filter(e => e.status === 'Active' && (e.role === 'Manager' || e.role === 'Admin' || e.role === 'Owner')).map(m => (
                    <option key={m.id} value={m.name}>{m.name} ({translateRole(m.role, lang)})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Description</label>
                <input type="text" value={teamDescription} onChange={(e) => setTeamDescription(e.target.value)} className="w-full border rounded-lg px-3 py-1.5 text-xs" placeholder="Department responsibilities..." />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button type="button" onClick={() => setIsTeamModalOpen(false)} className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">{t.cancel}</button>
                <button type="submit" className="px-4 py-2 text-xs bg-[#0052cc] hover:bg-[#003db3] text-white rounded-lg font-medium cursor-pointer">{t.saveTeam}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL AGREGAR MIEMBRO A EQUIPO */}
      {addingMemberToTeam && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-slate-700">{t.addMember} - {addingMemberToTeam.name}</h3>
              <button onClick={() => setAddingMemberToTeam(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddMemberToTeamSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-gray-700 mb-1">{t.selectEmployee}</label>
                <select required value={selectedMemberToAdd} onChange={(e) => setSelectedMemberToAdd(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-xs bg-white">
                  <option value="">{t.selectEmployee}</option>
                  {employees.filter(e => e.status === 'Active' && e.team !== addingMemberToTeam.name && e.name.toLowerCase() !== addingMemberToTeam.lead.toLowerCase()).map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name} (Current Team: {emp.team || 'None'})</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button type="button" onClick={() => setAddingMemberToTeam(null)} className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">{t.cancel}</button>
                <button type="submit" className="px-4 py-2 text-xs bg-[#0052cc] hover:bg-[#003db3] text-white rounded-lg font-medium cursor-pointer">{t.assignToTeam}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CREAR OFICINA */}
      {isOfficeModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-slate-700">{t.newOffice}</h3>
              <button onClick={() => setIsOfficeModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreateOffice} className="space-y-4 text-xs">
              <div><label className="block font-medium text-gray-700 mb-1">Office Name</label><input type="text" required value={officeName} onChange={(e) => setOfficeName(e.target.value)} className="w-full border rounded-lg px-3 py-1.5 text-xs" placeholder="Ej. Santo Domingo HQ" /></div>
              <div><label className="block font-medium text-gray-700 mb-1">Location</label><input type="text" required value={officeLocation} onChange={(e) => setOfficeLocation(e.target.value)} className="w-full border rounded-lg px-3 py-1.5 text-xs" placeholder="Ej. Santo Domingo, DR" /></div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Timezone</label>
                <select value={officeTimezone} onChange={(e) => setOfficeTimezone(e.target.value)} className="w-full border rounded-lg px-3 py-1.5 text-xs bg-white">
                  <option value="AST (UTC-4)">AST (UTC-4)</option>
                  <option value="EST (UTC-5)">EST (UTC-5)</option>
                  <option value="PST (UTC-8)">PST (UTC-8)</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button type="button" onClick={() => setIsOfficeModalOpen(false)} className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">{t.cancel}</button>
                <button type="submit" className="px-4 py-2 text-xs bg-[#0052cc] hover:bg-[#003db3] text-white rounded-lg font-medium cursor-pointer">{t.saveOffice}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}