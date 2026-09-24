import React from 'react';
import { ITRHRvBrand } from '../components/Brand';
import { Eye, EyeOff } from 'lucide-react';

interface Props {
  loginEmail: string;
  setLoginEmail: (v: string) => void;
  loginPassword: string;
  setLoginPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  handleLoginSubmit: (e: React.FormEvent) => void;
  openForgotModal: () => void;
}

export const Login: React.FC<Props> = ({
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  showPassword,
  setShowPassword,
  handleLoginSubmit,
  openForgotModal,
}) => (
  <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center p-4 font-sans relative">
    <div className="bg-white rounded-[28px] shadow-2xl p-8 max-w-sm w-full border border-slate-100 flex flex-col items-center text-slate-800 space-y-6">
      <ITRHRvBrand variant="login" />
      <h2 className="text-2xl font-bold text-slate-800 w-full text-left pt-2">
        Log in
      </h2>

      <form onSubmit={handleLoginSubmit} className="w-full space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Username or Email <span className="text-sky-500">•</span>
          </label>
          <input
            type="text"
            required
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Password <span className="text-sky-500">•</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-xs font-medium text-slate-700 pr-10 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold py-3 rounded-full text-sm shadow-md transition mt-2"
        >
          Sign In
        </button>

        <div className="text-center pt-1">
          <button
            type="button"
            onClick={openForgotModal}
            className="text-[#0066ff] text-xs font-medium hover:underline cursor-pointer"
          >
            Forgot your password?
          </button>
        </div>
      </form>

      <p className="text-slate-400 text-xs font-normal pt-4">v1.0</p>
    </div>
  </div>
);
