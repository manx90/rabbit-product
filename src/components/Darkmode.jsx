'use client';

import { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';

import { Toggle } from '@/components/ui/toggle';

export default function Darkmode() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div>
      <Toggle
        variant='outline'
        className='group size-9 border-gray-500 data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted'
        pressed={theme === 'dark'}
        onPressedChange={() =>
          setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
        }
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {/* Note: After dark mode implementation, rely on dark: prefix rather than group-data-[state=on]: */}
        <MoonIcon
          size={16}
          className='shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100'
          aria-hidden='true'
        />
        <SunIcon
          size={16}
          className='absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0'
          aria-hidden='true'
        />
      </Toggle>
    </div>
  );
}
