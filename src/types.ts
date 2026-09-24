export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  loginMethod: string;
  lastLogin: string;
  status: 'Active' | 'Disabled';
  hireDate?: string;
}

export interface LeaveRequest {
  id: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  approver?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
}

export interface LeaveType {
  id: string;
  name: string;
  color: string;
  allowance: string;
  requiresApproval: boolean;
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
  type: string;
}
