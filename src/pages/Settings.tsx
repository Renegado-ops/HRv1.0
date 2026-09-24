import React from 'react';
import {
  ArrowLeft,
  Settings as GearIcon,
  Users,
  Calendar,
  Clock,
  Sun,
  Globe,
} from 'lucide-react';

interface Props {
  settingsSubView: string | null;
  setSettingsSubView: (v: string | null) => void;
  setActiveTab: (tab: string) => void;
}

export const Settings: React.FC<Props> = ({
  settingsSubView,
  setSettingsSubView,
  setActiveTab,
}) => (
  <div className="space-y-6">
    {settingsSubView && (
      <button
        onClick={() => setSettingsSubView(null)}
        className="flex items-center space-x-2 text-sky-600 hover:text-sky-800 text-sm font-medium transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Settings</span>
      </button>
    )}

    {!settingsSubView && (
      <>
        <h2 className="text-2xl font-normal text-slate-700">Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: GearIcon,
              title: 'General',
              desc: 'Privacy settings for time off and approval options',
            },
            {
              icon: Users,
              title: 'Manage Users',
              desc: 'Assign roles and permissions or disable users',
            },
            {
              icon: Calendar,
              title: 'Leave Types',
              desc: 'Customize leave types and configure allowances',
            },
            {
              icon: Clock,
              title: 'Allowances',
              desc: 'How much time off can employees take?',
            },
            {
              icon: Sun,
              title: 'Public Holidays',
              desc: 'Public holidays and office holidays',
            },
            {
              icon: Globe,
              title: 'Google Workspaces Integration',
              desc: 'User login with Google and shared calendar',
            },
          ].map((opt, i) => {
            const Icon = opt.icon;
            return (
              <div
                key={i}
                onClick={() => {
                  if (opt.title === 'Manage Users') setActiveTab('Employees');
                  else setSettingsSubView(opt.title);
                }}
                className="bg-white p-6 rounded border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col items-center text-center"
              >
                <Icon className="w-12 h-12 text-sky-400 mb-3" />
                <h3 className="text-sky-500 font-medium text-lg mb-1">
                  {opt.title}
                </h3>
                <p className="text-gray-400 text-xs">{opt.desc}</p>
              </div>
            );
          })}
        </div>
      </>
    )}

    {settingsSubView && (
      <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-2">
        <h3 className="text-xl font-medium text-slate-700">
          {settingsSubView}
        </h3>
        <p className="text-xs text-gray-500">
          Configuration panel for {settingsSubView} active in ITR HRv.
        </p>
      </div>
    )}
  </div>
);
