import React from 'react';
import { ArrowLeft, Download, AlignLeft, List, UserCheck } from 'lucide-react';
import { LeaveRequest, Employee } from '../types';

interface Props {
  selectedReport: string | null;
  setSelectedReport: (r: string | null) => void;
  downloadReportCSV: (title: string) => void;
  requests: LeaveRequest[];
  employees: Employee[];
}

export const Reports: React.FC<Props> = ({
  selectedReport,
  setSelectedReport,
  downloadReportCSV,
  requests,
  employees,
}) => (
  <div className="space-y-6">
    {selectedReport && (
      <button
        onClick={() => setSelectedReport(null)}
        className="flex items-center space-x-2 text-sky-600 hover:text-sky-800 text-sm font-medium transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Reports</span>
      </button>
    )}

    {!selectedReport ? (
      <>
        <h2 className="text-2xl font-normal text-slate-700">Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: AlignLeft,
              title: 'Leave Reports',
              desc: 'Who took how much time off when?',
            },
            {
              icon: List,
              title: 'Allowance Reports',
              desc: 'Taken and remaining allowance per employee',
            },
            {
              icon: UserCheck,
              title: 'Working Hours Reports',
              desc: 'When were people at work and overtime totals',
            },
          ].map((rep, i) => {
            const Icon = rep.icon;
            return (
              <div
                key={i}
                onClick={() => setSelectedReport(rep.title)}
                className="bg-white p-6 rounded-lg border border-slate-200 flex flex-col items-center text-center shadow-sm hover:shadow-md transition cursor-pointer space-y-3"
              >
                <Icon className="w-12 h-12 text-[#1ba0d7]" />
                <h3 className="text-[#1ba0d7] font-semibold text-lg">
                  {rep.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {rep.desc}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadReportCSV(rep.title);
                  }}
                  className="mt-2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded-full flex items-center space-x-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            );
          })}
        </div>
      </>
    ) : (
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {selectedReport}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Live preview and export panel for 2026 data.
            </p>
          </div>

          <button
            onClick={() => downloadReportCSV(selectedReport)}
            className="bg-[#1ba0d7] hover:bg-[#188db8] text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV</span>
          </button>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden p-4">
          {selectedReport === 'Leave Reports' && (
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs font-semibold text-gray-500 uppercase border-b border-slate-100">
                <tr>
                  <th className="p-3">Employee</th>
                  <th className="p-3">Leave Type</th>
                  <th className="p-3">Start Date</th>
                  <th className="p-3">End Date</th>
                  <th className="p-3">Days</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requests.map((r) => (
                  <tr key={r.id}>
                    <td className="p-3 font-medium text-slate-800">
                      {r.employeeName}
                    </td>
                    <td className="p-3">{r.type}</td>
                    <td className="p-3">{r.startDate}</td>
                    <td className="p-3">{r.endDate}</td>
                    <td className="p-3 font-semibold">{r.days} d</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          r.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    )}
  </div>
);
