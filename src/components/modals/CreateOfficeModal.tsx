import React from 'react';
import { X } from 'lucide-react';

interface Props {
  officeName: string;
  setOfficeName: (v: string) => void;
  officeLocation: string;
  setOfficeLocation: (v: string) => void;
  officeTimezone: string;
  setOfficeTimezone: (v: string) => void;
  officeType: string;
  setOfficeType: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const CreateOfficeModal: React.FC<Props> = ({
  officeName,
  setOfficeName,
  officeLocation,
  setOfficeLocation,
  officeTimezone,
  setOfficeTimezone,
  officeType,
  setOfficeType,
  onSubmit,
  onClose,
}) => (
  <div
    className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
      <div className="flex justify-between items-center border-b pb-3">
        <h3 className="text-lg font-semibold text-slate-700">Add New Office</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Office Name
          </label>
          <input
            type="text"
            required
            value={officeName}
            onChange={(e) => setOfficeName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-sky-500"
            placeholder="Ej. Santo Domingo Branch"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Location / Address
          </label>
          <input
            type="text"
            required
            value={officeLocation}
            onChange={(e) => setOfficeLocation(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-sky-500"
            placeholder="Ej. Santo Domingo, Dominican Republic"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Timezone
            </label>
            <select
              value={officeTimezone}
              onChange={(e) => setOfficeTimezone(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-sky-500 bg-white"
            >
              <option value="AST (UTC-4)">AST (UTC-4)</option>
              <option value="EST (UTC-5)">EST (UTC-5)</option>
              <option value="PST (UTC-8)">PST (UTC-8)</option>
              <option value="CET (UTC+1)">CET (UTC+1)</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Office Type
            </label>
            <select
              value={officeType}
              onChange={(e) => setOfficeType(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-sky-500 bg-white"
            >
              <option value="Regional">Regional</option>
              <option value="Main Office">Main Office</option>
              <option value="Remote">Remote</option>
            </select>
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
            Save Office
          </button>
        </div>
      </form>
    </div>
  </div>
);
