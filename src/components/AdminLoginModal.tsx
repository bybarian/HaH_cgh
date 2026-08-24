/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Lock, KeyRound, Eye, EyeOff, X, ShieldCheck, AlertCircle } from 'lucide-react';
import { TranslationData, Language } from '../i18n';

export function AdminLoginModal({
  isOpen,
  onClose,
  onSuccess,
  t,
  lang
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  t: TranslationData;
  lang: Language;
}) {
  const [pin, setPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const isEn = lang === 'en';

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (pin.trim() === 'cgh888') {
      setError(false);
      setPin('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  const handleQuickFill = () => {
    setPin('cgh888');
    setError(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#008d3e]/20 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-[#008d3e]/10 pb-3">
          <div className="flex items-center gap-2.5 text-[#008d3e]">
            <div className="bg-[#008d3e]/10 p-2 rounded-xl text-[#008d3e]">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {isEn ? 'Administrator Access' : '國泰管理端權限驗證'}
              </h3>
              <p className="text-[11px] text-[#2d3a31]/60">
                {isEn ? 'Enter PIN code to configure system & knowledge base' : '請輸入後台 PIN 管理密碼以進入知識庫與 Logo 設定'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setError(false);
              setPin('');
              onClose();
            }}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#2d3a31] flex items-center gap-1.5">
              <KeyRound size={14} className="text-[#008d3e]" />
              <span>{isEn ? 'Admin PIN Code' : '管理員 PIN 密碼'}</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  if (error) setError(false);
                }}
                placeholder={isEn ? 'Enter PIN (e.g. cgh888)' : '請輸入密碼 (例: cgh888)'}
                className={`w-full px-4 py-3 pr-11 border rounded-xl outline-none text-sm transition-all ${
                  error
                    ? 'border-red-400 focus:ring-2 focus:ring-red-300 bg-red-50/40 text-red-900'
                    : 'border-[#008d3e]/25 focus:ring-2 focus:ring-[#8ec31f] bg-[#f4f9f4]/40 text-[#2d3a31]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#008d3e] p-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <p className="text-xs text-red-600 font-semibold flex items-center gap-1 pt-1">
                <AlertCircle size={14} />
                <span>{isEn ? 'Incorrect PIN code. Please try again.' : '密碼輸入錯誤，請重新輸入。'}</span>
              </p>
            )}
          </div>

          {/* Quick default credential hint card */}
          <div className="bg-[#f4f9f4] border border-[#008d3e]/15 p-3 rounded-xl flex items-center justify-between text-xs">
            <div className="text-[#2d3a31]/80">
              <span className="font-semibold text-[#008d3e]">{isEn ? 'Default PIN: ' : '預設管理密碼：'}</span>
              <code className="bg-white px-2 py-0.5 rounded border border-[#008d3e]/20 font-bold font-mono text-[#008d3e]">
                cgh888
              </code>
            </div>
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-xs font-bold text-[#008d3e] hover:text-[#007031] bg-white px-2.5 py-1 rounded-lg border border-[#008d3e]/20 hover:bg-[#8ec31f]/10 transition"
            >
              {isEn ? 'Auto-fill' : '自動帶入'}
            </button>
          </div>

          <div className="flex gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => {
                setError(false);
                setPin('');
                onClose();
              }}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-bold transition"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#008d3e] hover:bg-[#007031] text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5"
            >
              <Lock size={15} />
              <span>{isEn ? 'Verify & Enter' : '驗證並進入後台'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
