import React, { useEffect, useRef, useState } from 'react';

export default function StoryModal({ story, onClose, onLike }) {
  const [progress, setProgress] = useState(0);
  const timerRef = useRef();
  const DURATION = 5000; // 5 seconds

  useEffect(() => {
    setProgress(0);
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timerRef.current);
          onClose();
          return 100;
        }
        return p + 2;
      });
    }, DURATION / 50);
    return () => clearInterval(timerRef.current);
  }, [story, onClose]);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95'>
      {/* Progress Bar */}
      <div className='absolute left-0 top-0 h-1.5 w-full'>
        <div
          className='h-full rounded bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 transition-all'
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* Top Controls */}
      <div className='absolute left-0 top-0 z-10 flex w-full items-center justify-between px-6 pt-6'>
        <div className='flex items-center gap-3 rounded-full bg-black/40 px-3 py-2'>
          <div className='rounded-full bg-gradient-to-tr from-pink-500 via-yellow-400 to-purple-500 p-[2.5px]'>
            <img
              src={story.user.avatar}
              alt={story.user.name}
              className='h-12 w-12 rounded-full border-2 border-white object-cover'
            />
          </div>
          <span className='text-lg font-semibold text-white drop-shadow'>
            {story.user.name}
          </span>
        </div>
        <button
          onClick={onClose}
          className='ml-2 rounded-full bg-black/40 p-2 text-2xl font-bold text-white hover:bg-black/70 focus:outline-none'
          aria-label='Close'
        >
          &times;
        </button>
      </div>
      {/* Story Content */}
      <div className='flex h-full w-full flex-1 items-center justify-center px-10'>
        {story.content.type === 'image' ? (
          <img
            src={story.content.url}
            alt='story'
            className='max-h-[95vh] rounded-xl border-2 border-white shadow-2xl'
            style={{ objectPosition: 'center' }}
          />
        ) : (
          <video
            src={story.content.url}
            controls
            autoPlay
            className='h-[95vh] max-h-[95vh] w-[95vw] max-w-[1200px] rounded-xl border-2 border-white object-cover shadow-2xl'
            style={{ objectPosition: 'center' }}
          />
        )}
      </div>
      {/* Bottom Controls */}
      <div className='absolute bottom-0 left-0 z-10 flex w-full flex-col items-center pb-8'>
        <button
          onClick={() => onLike(story.id)}
          className={`flex items-center gap-2 rounded-full px-8 py-3 text-lg font-semibold shadow-lg transition-all focus:outline-none ${
            story.liked
              ? 'scale-110 bg-pink-500 text-white'
              : 'bg-white/80 text-pink-600 hover:bg-pink-100'
          }`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill={story.liked ? 'currentColor' : 'none'}
            viewBox='0 0 24 24'
            stroke='currentColor'
            className={`h-7 w-7 ${story.liked ? 'animate-pulse' : ''}`}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z'
            />
          </svg>
          {story.liked ? 'Liked' : 'Like'}
        </button>
        <div
          className='mt-6 h-1 w-16 cursor-pointer rounded-full bg-gray-400 opacity-70'
          onClick={onClose}
          title='Close'
        />
      </div>
    </div>
  );
}
