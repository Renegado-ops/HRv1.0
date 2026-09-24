import React from 'react';
import { X } from 'lucide-react';
import { Employee } from '../../types';

interface Props {
  teamName: string;
  setTeamName: (v: string) => void;
  teamLead: string;
  setTeamLead: (v: string) => void;
  teamDescription: string;
  setTeamDescription: (v: string) => void;
  employees: Employee[];
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const CreateTeamModal: React.FC<Props> = ({
  teamName,
  setTeamName,
  teamLead,
  setTeamLead,
  teamDescription,
  setTeamDescription,
  employees,
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
          Create New Team
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Team Name
          </label>
          <input
            type="text"
            required
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-sky-500"
            placeholder="Ej. Legal & Compliance"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Team Lead
          </label>
          <select
            value={teamLead}
            onChange={(e) => setTeamLead(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-sky-500 bg-white"
          >
            <option value="">Select Team Lead...</option>
            {employees
              .filter((e) => e.status === 'Active')
              .map((emp) => (
                <option key={emp.id} value={emp.name}>
                  {emp.name} ({emp.role})
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            rows={3}
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-sky-500"
            placeholder="Brief description of the department..."
          />
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
            Save Team
          </button>
        </div>
      </form>
    </div>
  </div>
);
