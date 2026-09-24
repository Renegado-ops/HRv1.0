import React from 'react';
import { Search, Plus, Building2, MapPin, Globe2, Trash2 } from 'lucide-react';
import { Office } from '../types';

interface Props {
  officeSearchQuery: string;
  setOfficeSearchQuery: (v: string) => void;
  filteredOffices: Office[];
  deleteOffice: (id: string) => void;
  onOpenCreateModal: () => void;
}

export const Offices: React.FC<Props> = ({
  officeSearchQuery,
  setOfficeSearchQuery,
  filteredOffices,
  deleteOffice,
  onOpenCreateModal,
}) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div className="relative w-72">
        <input
          type="text"
          placeholder="Search office or location..."
          value={officeSearchQuery}
          onChange={(e) => setOfficeSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm pl-9 focus:outline-none focus:border-sky-500 bg-white shadow-sm"
        />
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
      </div>

      <button
        onClick={onOpenCreateModal}
        className="bg-[#4a90e2] hover:bg-[#3b7dc9] text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition flex items-center space-x-2"
      >
        <Plus className="w-4 h-4" />
        <span>New Office</span>
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredOffices.map((office) => (
        <div
          key={office.id}
          className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
        >
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-[#1ba0d7]" />
                <span>{office.name}</span>
              </h3>
              <button
                onClick={() => deleteOffice(office.id)}
                title="Delete Office"
                className="text-gray-300 hover:text-rose-500 transition p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 text-xs text-gray-500 mt-3">
              <p className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span>{office.location}</span>
              </p>
              <p className="flex items-center space-x-1.5">
                <Globe2 className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span>Timezone: {office.timezone}</span>
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                Type
              </span>
              <span
                className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                  office.type === 'Main Office'
                    ? 'bg-amber-100 text-amber-800'
                    : office.type === 'Remote'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-sky-100 text-sky-800'
                }`}
              >
                {office.type}
              </span>
            </div>
            <div className="text-right">
              <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                Employees
              </span>
              <span className="font-semibold text-slate-700">
                {office.employeesCount} assigned
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
