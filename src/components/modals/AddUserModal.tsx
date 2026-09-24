import React from 'react';
import { X } from 'lucide-react';

interface Props {
  newUserName: string;
  setNewUserName: (v: string) => void;
  newUserEmail: string;
  setNewUserEmail: (v: string) => void;
  newUserRole: string;
  setNewUserRole: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const AddUserModal: React.FC<Props> = ({
  newUserName,
  setNewUserName,
  newUserEmail,
  setNewUserEmail,
  newUserRole,
  setNewUserRole,
  onSubmit,
  onClose,
}) => (
  <div
    className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
      <div className="flex justify-between items-center border-b pb-3">
        <h3 className="text-lg font-semibold text-slate-700">Add New User</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            required
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-sky-500"
            placeholder="Ej. Laura Gómez"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-sky-500"
            placeholder="laura@company.com"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            value={newUserRole}
            onChange={(e) => setNewUserRole(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-sky-500 bg-white"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Accounting">Accounting</option>
            <option value="Owner">Owner</option>
          </select>
        </div>

        <div className="flex justify-end space-x-2 pt-3 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-[#4a90e2] hover:bg-[#3b7dc9] text-white rounded font-medium"
          >
            Save User
          </button>
        </div>
      </form>
    </div>
  </div>
);
