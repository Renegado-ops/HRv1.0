import React from 'react';
import { LeaveRequest, Employee } from '../types';

interface Props {
  requests: LeaveRequest[];
  employees: Employee[];
}

export const Dashboard: React.FC<Props> = ({ requests, employees }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-normal text-slate-700">Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
            Pending Requests
          </p>
          <p className="text-3xl font-bold text-slate-700 mt-1">
            {requests.filter((r) => r.status === 'Pending').length}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 font-bold">
          !
        </div>
      </div>
      <div className="bg-white p-6 rounded border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
            Approved Absences
          </p>
          <p className="text-3xl font-bold text-slate-700 mt-1">
            {requests.filter((r) => r.status === 'Approved').length}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 font-bold">
          ✓
        </div>
      </div>
      <div className="bg-white p-6 rounded border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
            Active Employees
          </p>
          <p className="text-3xl font-bold text-slate-700 mt-1">
            {employees.filter((e) => e.status === 'Active').length}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 font-bold">
          👥
        </div>
      </div>
    </div>
  </div>
);
