import React from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface Props {
  forgotEmail: string;
  setForgotEmail: (val: string) => void;
  isForgotSent: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const ForgotPasswordModal: React.FC<Props> = ({
  forgotEmail,
  setForgotEmail,
  isForgotSent,
  onSubmit,
  onClose,
}) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-4 border border-slate-100 relative">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
      >
        <X className="w-5 h-5" />
      </button>

      {!isForgotSent ? (
        <>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800">Reset Password</h3>
            <p className="text-xs text-slate-500">
              Enter your email address and we'll send you a new temporary
              password.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Email Address <span className="text-sky-500">•</span>
              </label>
              <input
                type="email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="user@company.com"
              />
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-full transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-medium py-2.5 rounded-full text-xs shadow transition flex items-center justify-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="text-center py-4 space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Email Sent!</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            A new temporary password has been sent to <br />
            <span className="font-semibold text-slate-700">{forgotEmail}</span>.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-medium py-2.5 rounded-full text-xs shadow transition mt-2"
          >
            Back to Login
          </button>
        </div>
      )}
    </div>
  </div>
);
