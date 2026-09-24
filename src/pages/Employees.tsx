import React from 'react';
import { Search, ArrowUpDown, Settings as GearIcon } from 'lucide-react';
import { Employee } from '../types';

interface Props {
  sortedEmployees: Employee[];
  totalEmployeesCount: number;
  empSearchQuery: string;
  setEmpSearchQuery: (v: string) => void;
  handleSort: (field: string) => void;
  setSelectedEmployeeId: (id: string) => void;
  openUserMenuId: string | null;
  setOpenUserMenuId: (id: string | null) => void;
  toggleDisableUser: (id: string) => void;
  deleteUser: (id: string) => void;
  onOpenAddModal: () => void;
}

export const Employees: React.FC<Props> = ({
  sortedEmployees,
  totalEmployeesCount,
  empSearchQuery,
  setEmpSearchQuery,
  handleSort,
  setSelectedEmployeeId,
  openUserMenuId,
  setOpenUserMenuId,
  toggleDisableUser,
  deleteUser,
  onOpenAddModal,
}) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-normal text-slate-700">Employees</h2>
      <button
        onClick={onOpenAddModal}
        className="bg-[#4a90e2] hover:bg-[#3b7dc9] text-white px-4 py-2 rounded text-sm font-medium shadow-sm transition"
      >
        Add User
      </button>
    </div>

    <div className="bg-white rounded border border-slate-200 shadow-sm p-4 space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
        <div className="relative w-80">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={empSearchQuery}
            onChange={(e) => setEmpSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm pl-9 focus:outline-none focus:border-sky-500 bg-white"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <span className="text-xs text-gray-500 font-medium">
          Showing {sortedEmployees.length} of {totalEmployeesCount} users
        </span>
      </div>

      <div className="overflow-visible">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-slate-50 text-xs font-semibold text-gray-500 uppercase border-b border-slate-100">
            <tr>
              <th
                onClick={() => handleSort('name')}
                className="p-3 cursor-pointer hover:text-sky-600"
              >
                <div className="flex items-center space-x-1">
                  <span>Name</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('email')}
                className="p-3 cursor-pointer hover:text-sky-600"
              >
                <div className="flex items-center space-x-1">
                  <span>Email</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('role')}
                className="p-3 cursor-pointer hover:text-sky-600"
              >
                <div className="flex items-center space-x-1">
                  <span>Role</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('loginMethod')}
                className="p-3 cursor-pointer hover:text-sky-600"
              >
                <div className="flex items-center space-x-1">
                  <span>Logs in with</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('lastLogin')}
                className="p-3 cursor-pointer hover:text-sky-600"
              >
                <div className="flex items-center space-x-1">
                  <span>Last login</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th className="p-3 text-center">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedEmployees.map((emp) => {
              const initials = emp.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .substring(0, 2);
              return (
                <tr key={emp.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-3 flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center">
                      {initials}
                    </span>
                    <span
                      onClick={() => setSelectedEmployeeId(emp.id)}
                      className={`font-medium ${
                        emp.status === 'Disabled'
                          ? 'text-gray-400 line-through'
                          : 'text-sky-600 hover:underline cursor-pointer'
                      }`}
                    >
                      {emp.name}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500 text-xs">{emp.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        emp.status === 'Disabled'
                          ? 'bg-gray-100 text-gray-400'
                          : emp.role === 'Owner'
                          ? 'bg-amber-100 text-amber-800'
                          : emp.role === 'Admin'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {emp.role}
                    </span>
                  </td>
                  <td className="p-3 text-xs text-gray-500">
                    {emp.loginMethod}
                  </td>
                  <td className="p-3 text-xs text-gray-500">{emp.lastLogin}</td>
                  <td className="p-3 text-center relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenUserMenuId(
                          openUserMenuId === emp.id ? null : emp.id
                        );
                      }}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition"
                    >
                      <GearIcon className="w-4 h-4" />
                    </button>

                    {openUserMenuId === emp.id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-4 top-10 w-52 bg-white rounded shadow-xl border border-slate-200 z-50 text-left py-1 text-xs"
                      >
                        <button
                          onClick={() => toggleDisableUser(emp.id)}
                          className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 transition font-medium"
                        >
                          {emp.status === 'Active'
                            ? 'Disable user'
                            : 'Enable user'}
                        </button>
                        <button
                          onClick={() => deleteUser(emp.id)}
                          className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 transition border-t border-slate-100 font-medium"
                        >
                          Delete user
                        </button>
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
);
