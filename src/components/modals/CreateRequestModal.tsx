import React from 'react';
import { X } from 'lucide-react';
import { Employee, LeaveType } from '../../types';

interface Props {
  reqEmployee: string;
  setReqEmployee: (v: string) => void;
  reqType: string;
  setReqType: (v: string) => void;
  reqStart: string;
  setReqStart: (v: string) => void;
  reqEnd: string;
  setReqEnd: (v: string) => void;
  employees: Employee[];
  leaveTypes: LeaveType[];
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const CreateRequestModal: React.FC<Props> = ({
  reqEmployee,
  setReqEmployee,
  reqType,
  setReqType,
  reqStart,
  setReqStart,
  reqEnd,
  setReqEnd,
  employees,
  leaveTypes,
  onSubmit,
  onClose,
}) => (
  <div
    className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
      <div className="flex justify-between items-center border-b pb-3">
        <h3 className="text-lg font-semibold text-slate-700">
          Create New Request
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Employee
          </label>
          <select
            required
            value={reqEmployee}
            onChange={(e) => setReqEmployee(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-sky-500 bg-white"
          >
            <option value="">Select Employee...</option>
            {employees
              .filter((e) => e.status === 'Active')
              .map((emp) => (
                <option key={emp.id} value={emp.name}>
                  {emp.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Leave Type
          </label>
          <select
            value={reqType}
            onChange={(e) => setReqType(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-sky-500 bg-white"
          >
            {leaveTypes.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              required
              value={reqStart}
              onChange={(e) => setReqStart(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-sky-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              required
              value={reqEnd}
              onChange={(e) => setReqEnd(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-sky-500"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-3 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-[#4a90e2] hover:bg-[#3b7dc9] text-white rounded-md font-medium"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  </div>
);
