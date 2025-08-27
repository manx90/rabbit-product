import React from 'react';

export default function StoryBar({ stories, onOpenStory }) {
  // Array of beautiful gradient combinations
  const gradients = [
    'from-rose-400 via-pink-500 to-purple-600',
    'from-cyan-400 via-blue-500 to-indigo-600',
    'from-emerald-400 via-teal-500 to-cyan-600',
    'from-orange-400 via-red-500 to-pink-600',
    'from-violet-400 via-purple-500 to-fuchsia-600',
    'from-yellow-400 via-orange-500 to-red-600',
    'from-indigo-400 via-purple-500 to-pink-600',
    'from-green-400 via-emerald-500 to-teal-600',
  ];

  return (
    <div
      dir='rtl'
      className='custom-scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent flex min-w-0 flex-row gap-4 overflow-x-auto border-b border-gray-100 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900'
    >
      {stories.map((story, index) => {
        const gradientClass = gradients[index % gradients.length];
        const hoverGradientClass = gradients[(index + 1) % gradients.length];

        return (
          <button
            key={story.id}
            onClick={() => onOpenStory(story)}
            className='group flex flex-shrink-0 flex-col items-center transition-all duration-300 hover:scale-105 focus:outline-none'
          >
            <div className='relative'>
              {/* Animated gradient border */}
              <div
                className={`rounded-full bg-gradient-to-tr p-[3px] ${gradientClass} animate-pulse group-hover:animate-none group-hover:bg-gradient-to-tr ${hoverGradientClass} shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:shadow-purple-500/25`}
              >
                <img
                  src={story.user.avatar}
                  alt={story.user.name}
                  className='h-14 w-14 rounded-full object-cover shadow-md transition-all duration-300 group-hover:shadow-lg lg:h-24 lg:w-24'
                />
              </div>
            </div>
            <span className='mt-2 max-w-[60px] truncate text-xs font-medium text-gray-700 transition-colors duration-300 group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-400'>
              {story.user.name}
            </span>
            {/* Hover indicator with matching gradient */}
            <div
              className={`h-1 w-8 bg-gradient-to-r ${gradientClass} mt-1 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
            ></div>
          </button>
        );
      })}
    </div>
  );
}
