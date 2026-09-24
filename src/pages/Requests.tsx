import React from 'react';
import { Plus, Check, XCircle } from 'lucide-react';
import { LeaveRequest } from '../types';

interface Props {
  requestFilter: string;
  setRequestFilter: (v: string) => void;
  filteredRequests: LeaveRequest[];
  updateRequestStatus: (id: string, status: string) => void;
  onOpenCreateModal: () => void;
}

export const Requests: React.FC<Props> = ({
  requestFilter,
  setRequestFilter,
  filteredRequests,
  updateRequestStatus,
  onOpenCreateModal,
}) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <select
          value={requestFilter}
          onChange={(e) => setRequestFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
        >
          <option value="All Pending">All Pending Requests</option>
          <option value="Approved">Approved Requests</option>
          <option value="Rejected">Rejected Requests</option>
          <option value="All">All Requests</option>
        </select>
      </div>

      <button
        onClick={onOpenCreateModal}
        className="bg-[#4a90e2] hover:bg-[#3b7dc9] text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition flex items-center space-x-2"
      >
        <Plus className="w-4 h-4" />
        <span>Create new request</span>
      </button>
    </div>

    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <span className="text-sm font-semibold text-slate-700">
          {requestFilter} ({filteredRequests.length})
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold text-gray-500 uppercase border-b border-slate-100">
            <tr>
              <th className="p-3.5 pl-6">Employee</th>
              <th className="p-3.5">Type</th>
              <th className="p-3.5">Dates & Duration</th>
              <th className="p-3.5">Approver</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right pr-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-3.5 pl-6 font-medium text-slate-800">
                    {req.employeeName}
                  </td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                      <span>{req.type}</span>
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-600 text-xs">
                    <span className="font-medium text-slate-700">
                      {req.startDate}
                    </span>{' '}
                    to{' '}
                    <span className="font-medium text-slate-700">
                      {req.endDate}
                    </span>
                    <span className="text-gray-400 ml-2">
                      ({req.days} {req.days === 1 ? 'day' : 'days'})
                    </span>
                  </td>
                  <td className="p-3.5 text-xs text-slate-500">
                    {req.approver || 'Alex Morgan'}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        req.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-700'
                          : req.status === 'Rejected'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right pr-6 space-x-1">
                    {req.status === 'Pending' ? (
                      <>
                        <button
                          onClick={() =>
                            updateRequestStatus(req.id, 'Approved')
                          }
                          title="Approve request"
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            updateRequestStatus(req.id, 'Rejected')
                          }
                          title="Reject request"
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-gray-400 font-normal">
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-gray-400 text-xs"
                >
                  No leave requests found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
