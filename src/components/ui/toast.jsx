/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext(null);
export const useToastContext = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToastContext لازم يكون داخل ToastProvider');
  return ctx;
};
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const addToast = ({ title, description }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, description }]);
    setTimeout(() => removeToast(id), 4000);
  };
  const removeToast = (id) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className='fixed right-4 bottom-4 z-50 space-y-2'>
        {toasts.map((t) => (
          <div
            key={t.id}
            onClick={() => removeToast(t.id)}
            className='animate-fade-in relative flex min-w-[220px] max-w-xs items-start gap-2 rounded-lg border-l-4 border-green-500 bg-white p-4 pr-6 shadow-lg transition-all duration-300 dark:bg-gray-800'
            style={{
              boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)',
            }}
          >
            <span className='mt-1 text-xl text-green-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4.5 12.75l6 6 9-13.5'
                />
              </svg>
            </span>
            <div className='flex-1'>
              <strong className='mb-1 block text-base text-green-700 dark:text-green-300'>
                {t.title}
              </strong>
              <p className='text-sm text-gray-700 dark:text-gray-200'>
                {t.description}
              </p>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className='absolute left-2 top-2 text-lg font-bold text-gray-400 hover:text-red-500'
              aria-label='إغلاق التنبيه'
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
