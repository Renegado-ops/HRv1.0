import React from 'react';
import { ArrowLeft, Pencil, Info } from 'lucide-react';
import { Employee } from '../types';
import { ITRHRvBrand } from '../components/Brand';

interface Props {
  activeEmployee: Employee | undefined;
  onBack: () => void;
}

export const EmployeeDetail: React.FC<Props> = ({ activeEmployee, onBack }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center border-b pb-4">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-sky-600 hover:text-sky-800 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Employees</span>
      </button>
      <h2 className="text-2xl font-normal text-slate-700">
        {activeEmployee?.name}
      </h2>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full border-4 border-slate-100 flex items-center justify-center mb-3">
            <ITRHRvBrand variant="login" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            {activeEmployee?.name}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Hire date: {activeEmployee?.hireDate || '2024-01-15'}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h4 className="text-sm font-semibold text-slate-700">
              Current Leave Year
            </h4>
            <button className="text-sky-600 hover:text-sky-800 text-xs font-medium flex items-center space-x-1">
              <span>Edit</span>
              <Pencil className="w-3 h-3" />
            </button>
          </div>
          <p className="text-[11px] text-gray-400">
            January 01, 2026 — December 31, 2026
          </p>

          <div className="space-y-3 text-xs">
            <div className="border-b pb-2 space-y-1">
              <div className="flex justify-between font-medium text-slate-700">
                <span>Vacation allowance (default)</span>
                <span>14.0 days</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Vacation taken</span>
                <span>-0.0 days</span>
              </div>
              <div className="flex justify-between font-bold text-slate-800 pt-1">
                <span>Remaining</span>
                <span>14.0 days</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-medium text-slate-700">
                <span>Permiso Remunerado allowance</span>
                <span>3.0 days</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Permiso Remunerado taken</span>
                <span>-0.0 days</span>
              </div>
              <div className="flex justify-between font-bold text-slate-800 pt-1">
                <span>Remaining</span>
                <span>3.0 days</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm text-xs text-gray-400 leading-relaxed text-center">
          Looking for Next Leave Year? Use the left/right arrows at the top of
          the previous panel.
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-base font-semibold text-slate-700">
              Personal Information
            </h3>
            <button className="text-sky-600 hover:text-sky-800 text-xs font-medium flex items-center space-x-1">
              <span>Edit</span>
              <Pencil className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-4 text-xs items-center">
            <div className="flex items-center space-x-1 text-slate-600 font-medium">
              <span>Employee ID</span>
              <Info className="w-3 h-3 text-sky-500 cursor-pointer" />
            </div>
            <div className="md:col-span-2 bg-slate-50 border rounded px-3 py-1.5 text-slate-700">
              EMP-2026-00{activeEmployee?.id}
            </div>

            <div className="flex items-center space-x-1 text-slate-600 font-medium">
              <span>Name</span>
              <Info className="w-3 h-3 text-sky-500 cursor-pointer" />
            </div>
            <div className="md:col-span-2 bg-slate-50 border rounded px-3 py-1.5 text-slate-700">
              {activeEmployee?.name}
            </div>

            <div className="flex items-center space-x-1 text-slate-600 font-medium">
              <span>Email</span>
              <Info className="w-3 h-3 text-sky-500 cursor-pointer" />
            </div>
            <div className="md:col-span-2 bg-slate-50 border rounded px-3 py-1.5 text-slate-700">
              {activeEmployee?.email}
            </div>

            <div className="flex items-center space-x-1 text-slate-600 font-medium">
              <span>Work Phone</span>
              <Info className="w-3 h-3 text-sky-500 cursor-pointer" />
            </div>
            <div className="md:col-span-2 bg-slate-50 border rounded px-3 py-1.5 text-slate-400">
              +1 (802) 555-0192
            </div>

            <div className="flex items-center space-x-1 text-slate-600 font-medium">
              <span>Home Address</span>
              <Info className="w-3 h-3 text-sky-500 cursor-pointer" />
            </div>
            <div className="md:col-span-2 bg-slate-50 border rounded p-2 text-slate-400 h-16">
              123 Corporate Ave, Suite 400
            </div>

            <div className="flex items-center space-x-1 text-slate-600 font-medium">
              <span>Time Off Approver</span>
              <Info className="w-3 h-3 text-sky-500 cursor-pointer" />
            </div>
            <div className="md:col-span-2 bg-slate-50 border rounded px-3 py-1.5 text-slate-700">
              Alex Morgan (from team)
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-base font-semibold text-slate-700">
              Current Schedule
            </h3>
            <button className="text-sky-600 hover:text-sky-800 text-xs font-medium flex items-center space-x-1">
              <span>Edit</span>
              <Pencil className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-2">
              <p className="font-semibold text-slate-700">
                Scheduling & Booking
              </p>
              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-sky-500"
                />
                <span>Specify the daily working hours for the work week</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-sky-500"
                />
                <span>
                  Leave is booked by the hour, instead of in half day increments
                </span>
              </label>
            </div>

            <div className="pt-2">
              <p className="font-semibold text-slate-700 mb-2">
                Weekly Work Schedule
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-center text-xs">
                  <thead>
                    <tr className="text-gray-500 border-b">
                      <th className="p-2 text-left"></th>
                      <th className="p-2">Monday</th>
                      <th className="p-2">Tuesday</th>
                      <th className="p-2">Wednesday</th>
                      <th className="p-2">Thursday</th>
                      <th className="p-2">Friday</th>
                      <th className="p-2 text-gray-300">Saturday</th>
                      <th className="p-2 text-gray-300">Sunday</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="p-2 text-left font-medium text-slate-700">
                        Morning
                      </td>
                      {[
                        '9:00am',
                        '9:00am',
                        '9:00am',
                        '9:00am',
                        '9:00am',
                        '-',
                        '-',
                      ].map((time, idx) => (
                        <td
                          key={idx}
                          className="p-2 bg-slate-50 border rounded text-[11px] text-slate-600"
                        >
                          {time}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-2 text-left font-medium text-slate-700">
                        Afternoon
                      </td>
                      {[
                        '6:30pm',
                        '6:30pm',
                        '6:30pm',
                        '6:30pm',
                        '3:00pm',
                        '-',
                        '-',
                      ].map((time, idx) => (
                        <td
                          key={idx}
                          className="p-2 bg-slate-50 border rounded text-[11px] text-slate-600"
                        >
                          {time}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-center font-bold text-slate-700 text-sm mt-4">
                40 hours / 5 days = 8h:00m per workday
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <h3 className="text-base font-semibold text-slate-700 mb-3">
            Upcoming requests
          </h3>
          <p className="text-xs text-gray-400 italic">
            No upcoming requests for this employee.
          </p>
        </div>
      </div>
    </div>
  </div>
);
