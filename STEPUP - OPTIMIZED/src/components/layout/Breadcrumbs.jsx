import React from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ items }) => {
  const { navigate } = useApp();

  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 py-3 px-4 sm:px-0 overflow-x-auto" aria-label="Breadcrumb">
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center gap-1 hover:text-indigo-600 font-medium transition-colors cursor-pointer shrink-0"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {isLast || !item.path ? (
              <span className="font-semibold text-slate-800 truncate max-w-[200px]">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => navigate(item.path)}
                className="hover:text-indigo-600 font-medium transition-colors cursor-pointer shrink-0"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
