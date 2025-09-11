import { Link } from 'react-router-dom';
import { useCategories } from '@/hooks/useCategories';

const SecondaryHeader = () => {
  const { data: categories = [], isLoading, error } = useCategories();

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .category-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
      <div className='relative hidden overflow-hidden border-b border-gray-200 bg-gradient-to-r from-white via-blue-50 to-white shadow-sm dark:border-gray-700 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 lg:flex'>
        {/* Decorative background pattern */}
        <div className='absolute inset-0 opacity-5 dark:opacity-10'>
          <div className='absolute left-0 top-0 h-full w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'></div>
        </div>

        <div className='container relative z-10 mx-auto px-4'>
          <div
            className='mx-auto flex max-w-screen-xl flex-row-reverse flex-wrap items-center justify-center gap-6 py-3'
            style={{ height: '65px' }}
          >
            {/* الفلترة والمفضلة */}
            {/* <div className='ml-4 flex items-center gap-4'>
            <Link
              to='/search'
              className='text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
            >
              الفلترة
            </Link>
            <Link
              to='/favorites'
              className='text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
            >
              المفضلة
            </Link>
          </div> */}

            {/* <span className='text-gray-500 dark:text-gray-400'>|</span> */}

            {/* <Link
            to='/'
            className='text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
          >
            الرئيسية
          </Link> */}

            {/* التصنيفات */}
            <div className='flex flex-wrap items-center justify-center gap-2'>
              {isLoading ? (
                <div className='flex items-center gap-3 rounded-full bg-blue-50 px-4 py-2 dark:bg-blue-900/20'>
                  <div className='h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent'></div>
                  <span className='text-sm font-medium text-blue-600 dark:text-blue-400'>
                    جاري تحميل الأقسام...
                  </span>
                </div>
              ) : error ? (
                <div className='flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 dark:bg-red-900/20'>
                  <svg
                    className='h-4 w-4 text-red-500'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span className='text-sm font-medium text-red-600 dark:text-red-400'>
                    خطأ في تحميل الأقسام
                  </span>
                </div>
              ) : (
                categories.map((category, index) => (
                  <Link
                    key={category.id || category._id}
                    to={`/category/${category.id || category._id}`}
                    className='group relative rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:scale-105 hover:bg-blue-100 hover:text-blue-700 hover:shadow-md dark:text-gray-200 dark:hover:bg-blue-900/30 dark:hover:text-blue-300'
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards',
                    }}
                  >
                    <span className='relative z-10 text-xl'>{category.name}</span>
                    <div className='absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-10'></div>
                    <div className='absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 transform bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-3/4'></div>
                  </Link>
                ))
              )}
            </div>

            {/* روابط إضافية */}
            {/* <div className='ml-4 flex items-center justify-between gap-4'>
            <a
              href='/privacy'
              className='text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
            >
              سياسة الخصوصية
            </a>
            <a
              href='/about'
              className='text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
            >
              من نحن
            </a>
            <a
              href='/contact'
              className='text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
            >
              اتصل بنا
            </a>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondaryHeader;
