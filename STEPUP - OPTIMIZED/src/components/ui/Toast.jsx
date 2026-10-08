import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="bg-[#111111] text-[#F7F5F0] px-4 py-3 border border-[#333333] shadow-2xl flex items-center gap-2.5 max-w-sm">
        <CheckCircle2 className="w-4 h-4 text-[#D8CFC2] shrink-0" />
        <span className="text-xs font-medium tracking-wide">
          {toastMessage}
        </span>
      </div>
    </div>
  );
};
