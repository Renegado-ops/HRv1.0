import React, { useState } from 'react';
import { ITRHRvBrand } from './Brand';
import { Search, Bell, X, LogOut, Settings as GearIcon } from 'lucide-react';
import { NotificationItem } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notifications: NotificationItem[];
  handleMarkAllRead: () => void;
  setIsLoggedIn: (status: boolean) => void;
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  notifications,
  handleMarkAllRead,
  setIsLoggedIn,
  onNavigateHome,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    'Dashboard',
    'Requests',
    'Employees',
    'Teams',
    'Offices',
    'Reports',
    'Settings',
  ];

  const toggleNotifMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsNotifOpen(!isNotifOpen);
    setIsProfileOpen(false);
    setIsSearchOpen(false);
  };

  const toggleProfileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProfileOpen(!isProfileOpen);
    setIsNotifOpen(false);
    setIsSearchOpen(false);
  };

  const toggleSearchMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSearchOpen(!isSearchOpen);
    setIsNotifOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <header
      className="bg-[#1ba0d7] text-white px-8 py-3 flex items-center justify-between shadow-sm relative z-30"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center space-x-10">
        <div onClick={onNavigateHome}>
          <ITRHRvBrand variant="header" />
        </div>
        <nav className="flex space-x-2 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveTab(item);
                onNavigateHome();
              }}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === item
                  ? 'bg-black/15 font-semibold text-white'
                  : 'hover:bg-white/10 text-cyan-50'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center space-x-5">
        <div className="relative">
          {isSearchOpen ? (
            <div className="flex items-center bg-white/20 rounded-md px-2.5 py-1 text-sm text-white border border-white/30">
              <input
                type="text"
                placeholder="Quick search..."
                autoFocus
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-white placeholder-cyan-100 text-xs w-44"
              />
              <X
                className="w-4 h-4 cursor-pointer hover:opacity-80 ml-1"
                onClick={() => setIsSearchOpen(false)}
              />
            </div>
          ) : (
            <Search
              className="w-4 h-4 cursor-pointer hover:opacity-80 text-white/90"
              onClick={toggleSearchMenu}
            />
          )}
        </div>

        <div className="relative">
          <button
            onClick={toggleNotifMenu}
            className="relative focus:outline-none flex items-center"
          >
            <Bell className="w-4 h-4 text-white/90 cursor-pointer hover:opacity-80" />
            {notifications.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#2ecc71] text-[10px] text-white rounded-full px-1.5 font-bold">
                {notifications.length}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 mt-3 w-80 bg-white rounded-md shadow-xl border border-slate-200 z-50 text-slate-800 overflow-hidden"
            >
              <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <span className="font-semibold text-xs text-slate-700">
                  Notifications
                </span>
                {notifications.length > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-xs text-sky-600 hover:text-sky-800 font-medium cursor-pointer"
                  >
                    Mark read
                  </button>
                )}
              </div>

              {notifications.length > 0 ? (
                <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-3 hover:bg-slate-50 transition cursor-pointer"
                    >
                      <p className="text-xs font-semibold text-slate-800">
                        {n.title}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {n.desc}
                      </p>
                      <span className="text-[9px] text-gray-400 mt-1 block">
                        {n.time}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-gray-400 font-medium">
                  No new notifications
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
            alt="Avatar"
            onClick={toggleProfileMenu}
            className="w-8 h-8 rounded-full border border-white/40 cursor-pointer hover:ring-2 hover:ring-white/50"
          />
          {isProfileOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 mt-3 w-52 bg-white rounded-lg shadow-xl border border-slate-200 z-50 text-slate-800 p-2 space-y-1"
            >
              <div className="px-3 py-2 border-b border-slate-100 text-xs">
                <p className="font-bold text-slate-800">Alex Morgan</p>
                <p className="text-[10px] text-gray-400">
                  alex.morgan@company.com
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveTab('Settings');
                  setIsProfileOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded flex items-center space-x-2 font-medium"
              >
                <GearIcon className="w-3.5 h-3.5 text-gray-400" />
                <span>Profile Settings</span>
              </button>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded flex items-center space-x-2 font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
