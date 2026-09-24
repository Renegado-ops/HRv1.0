import {
  Employee,
  LeaveRequest,
  NotificationItem,
  LeaveType,
  Team,
  Office,
} from '../types';

export const initialNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'New leave request',
    desc: 'Carlos Mendoza requested 4 days Vacation',
    time: '10m ago',
  },
  {
    id: '2',
    title: 'Request approved',
    desc: 'Sarah Connor approved Sick leave for Michael Scott',
    time: '1h ago',
  },
  {
    id: '3',
    title: 'Public holiday reminder',
    desc: 'Office closed next Monday for Bank Holiday',
    time: '1d ago',
  },
];

export const initialRequests: LeaveRequest[] = [
  {
    id: '101',
    employeeName: 'Carlos Mendoza',
    type: 'Vacation',
    startDate: '2026-10-12',
    endDate: '2026-10-15',
    days: 4,
    status: 'Pending',
    approver: 'Sarah Connor',
  },
  {
    id: '102',
    employeeName: 'Michael Scott',
    type: 'Sick leave',
    startDate: '2026-09-20',
    endDate: '2026-09-21',
    days: 1,
    status: 'Approved',
    approver: 'Alex Morgan',
  },
  {
    id: '103',
    employeeName: 'Abby Jhonson',
    type: 'Floating Day',
    startDate: '2026-11-02',
    endDate: '2026-11-02',
    days: 1,
    status: 'Pending',
    approver: 'Alex Morgan',
  },
];

export const initialLeaveTypes: LeaveType[] = [
  {
    id: '1',
    name: 'Floating Day',
    color: '#2ecc71',
    allowance: '-',
    requiresApproval: true,
  },
  {
    id: '2',
    name: 'Sick leave',
    color: '#e74c3c',
    allowance: '-',
    requiresApproval: true,
  },
  {
    id: '3',
    name: 'Unpaid Time Off',
    color: '#34495e',
    allowance: '-',
    requiresApproval: true,
  },
  {
    id: '4',
    name: 'PTO (default)',
    color: '#f1948a',
    allowance: 'Uses own allowance',
    requiresApproval: true,
  },
  {
    id: '5',
    name: 'Vacation',
    color: '#795548',
    allowance: 'Uses own allowance',
    requiresApproval: true,
  },
];

export const sampleEmployees: Employee[] = [
  {
    id: '1',
    name: 'Aaron Garcia',
    email: 'aaron.garcia@company.com',
    role: 'User',
    loginMethod: 'Google',
    lastLogin: '24 days ago',
    status: 'Active',
    hireDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Abby Jhonson',
    email: 'abby.jhonson@company.com',
    role: 'User',
    loginMethod: 'Google',
    lastLogin: '2 days ago',
    status: 'Active',
    hireDate: '2024-03-10',
  },
  {
    id: '3',
    name: 'Abraham Cedano',
    email: 'abraham.cedano@company.com',
    role: 'Disabled',
    loginMethod: 'Invitation (pending response)',
    lastLogin: 'Never',
    status: 'Disabled',
    hireDate: '2023-11-01',
  },
  {
    id: '4',
    name: 'Alex Morgan',
    email: 'alex.morgan@company.com',
    role: 'Owner',
    loginMethod: 'Google',
    lastLogin: 'Today',
    status: 'Active',
    hireDate: '2022-05-01',
  },
  {
    id: '5',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@company.com',
    role: 'User',
    loginMethod: 'Google',
    lastLogin: '3 days ago',
    status: 'Active',
    hireDate: '2025-02-18',
  },
  {
    id: '6',
    name: 'Sarah Connor',
    email: 'sarah.connor@company.com',
    role: 'Admin',
    loginMethod: 'Password',
    lastLogin: '1 day ago',
    status: 'Active',
    hireDate: '2023-08-12',
  },
];

export const initialTeams: Team[] = [
  {
    id: '1',
    name: 'Engineering & Product',
    lead: 'Alex Morgan',
    membersCount: 4,
    description:
      'Software architecture, frontend development and quality assurance.',
  },
  {
    id: '2',
    name: 'Accounting & Tax Relief',
    lead: 'Sarah Connor',
    membersCount: 3,
    description:
      'Financial planning, client tax strategy, and audit operations.',
  },
  {
    id: '3',
    name: 'Customer Support',
    lead: 'Aaron Garcia',
    membersCount: 2,
    description: 'Client onboarding and technical support assistance.',
  },
];

export const initialOffices: Office[] = [
  {
    id: '1',
    name: 'Headquarters (HQ)',
    location: 'Miami, Florida, USA',
    timezone: 'EST (UTC-5)',
    employeesCount: 6,
    type: 'Main Office',
  },
  {
    id: '2',
    name: 'Santiago Operations',
    location: 'Santiago, Dominican Republic',
    timezone: 'AST (UTC-4)',
    employeesCount: 4,
    type: 'Regional',
  },
  {
    id: '3',
    name: 'Remote Hub',
    location: 'Global / Virtual Work',
    timezone: 'Flexible',
    employeesCount: 2,
    type: 'Remote',
  },
];
