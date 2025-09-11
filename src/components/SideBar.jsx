import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '@/hooks/useCategories';

export default function SideBar({ Menubar, setMenubar }) {
  const [Subside, setSubside] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  const { data: categories, isLoading, error } = useCategories();
  console.log(categories);

  const handleAccordion = (catId) => {
    setOpenCategory((prev) => (prev === catId ? null : catId));
  };

  return (
    <div
      className='fixed right-0 top-0 z-50 mt-[58px] flex h-screen w-[80%] flex-col bg-white shadow-2xl transition-all duration-700 ease-in-out dark:bg-[#18181b]'
      style={{
        transform: Menubar ? 'translateX(0)' : 'translateX(100%)',
      }}
    >
      {isLoading ? (
        <div className='flex h-full items-center justify-center'>
          <div className='flex flex-col items-center gap-4'>
            <div className='h-10 w-10 animate-spin rounded-full border-4 border-[#0095FF] border-t-transparent'></div>
            <span className='font-Lato text-sm tracking-wide text-gray-500'>
              جاري تحميل الأقسام...
            </span>
          </div>
        </div>
      ) : error ? (
        <div className='flex h-full items-center justify-center'>
          <div className='flex flex-col items-center gap-4 text-center'>
            <div className='animate-bounce text-5xl text-red-500'>⚠️</div>
            <span className='font-Lato text-lg font-semibold text-red-500'>
              حدث خطأ في تحميل الأقسام
            </span>
            <span className='font-Lato text-sm text-gray-500'>
              {error.message}
            </span>
          </div>
        </div>
      ) : Array.isArray(categories) && categories.length > 0 ? (
        categories.map((val, idx) => (
          <div
            key={val.id || idx}
            className='group overflow-hidden rounded-md transition-shadow duration-300 hover:shadow-lg'
          >
            <button
              onClick={() => {
                handleAccordion(val.id);
              }}
              className={`flex w-full flex-row-reverse items-center justify-between border-b border-[#E6F0FA] bg-gradient-to-l from-[#f7fbff] via-white to-[#f7fbff] p-5 text-right font-Lato transition-colors duration-300 focus:outline-none dark:border-[#1a2630] dark:from-[#1a2630] dark:via-[#18181b] dark:to-[#1a2630] ${
                openCategory === val.id
                  ? 'bg-[#f0f8ff] shadow-inner dark:bg-[#1a2630]'
                  : 'hover:bg-[#e6f4ff] dark:hover:bg-[#232326]'
              }`}
              style={{
                boxShadow:
                  openCategory === val.id
                    ? '0 4px 16px 0 rgba(0, 149, 255, 0.12)'
                    : undefined,
              }}
            >
              <span className='my-auto font-Lato text-[17px] font-medium text-black transition-colors duration-200 group-hover:text-[#0095FF] dark:text-white dark:group-hover:text-[#0095FF]'>
                {val.name || 'قسم'}
              </span>
              <span
                className={`inline-block transition-transform duration-300 ${
                  openCategory === val.id
                    ? 'rotate-90 text-[#0095FF]'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 18 18'
                  fill='none'
                  className='mr-2'
                >
                  <path
                    d='M12 16.5001L4.50003 9.00006L12 1.50006L13.3313 2.83131L7.16253 9.00006L13.3313 15.1688L12 16.5001Z'
                    fill={openCategory === val.id ? '#0095FF' : 'currentColor'}
                  />
                </svg>
              </span>
            </button>
            {/* Accordion content: subcategories */}
            {openCategory === val.id && (
              <div className='animate-fadeIn border-b border-[#E6F0FA] bg-gradient-to-l from-[#f7fbff] via-[#fdfefe] to-[#fff] dark:border-[#1a2630] dark:from-[#1a2630] dark:via-[#232326] dark:to-[#18181b]'>
                {val.subCategories && val.subCategories.length > 0 ? (
                  val.subCategories.map((sub, subIdx) => (
                    <Link
                      key={sub.id}
                      onClick={() => {
                        setMenubar(false);
                      }}
                      to={`/category/${val.id}/${sub.id}`}
                      className='relative block px-10 py-3 text-right font-Lato text-[15px] text-gray-700 transition-all duration-200 hover:bg-[#d0eaff] hover:pl-12 dark:text-gray-200 dark:hover:bg-[#232326]'
                    >
                      <span className='relative z-10'>
                        {sub.name || 'قسم فرعي'}
                      </span>
                      {subIdx === 0 && (
                        <span className='absolute left-4 top-1/2 h-2 w-2 -translate-y-1/2 animate-ping rounded-full bg-[#0095FF] opacity-70'></span>
                      )}
                    </Link>
                  ))
                ) : (
                  <Link
                    to={`/category/${val.id}`}
                    className='relative block px-10 py-3 text-right font-Lato text-[15px] text-gray-700 transition-all duration-200 hover:bg-[#d0eaff] hover:pl-12 dark:text-gray-200 dark:hover:bg-[#232326]'
                  >
                    <span className='relative z-10'>عرض جميع المنتجات</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className='flex h-full items-center justify-center font-Lato text-lg text-gray-400 dark:text-gray-500'>
          لا توجد أقسام متاحة حاليا
        </div>
      )}

      <SubSide Subside={Subside} />
    </div>
  );
}

function SubSide({ Subside }) {
  return (
    <div
      className='flex flex-col rounded-t-lg bg-[#f9fcff] text-right shadow-md transition-all duration-300 ease-in-out dark:bg-[#18181b]'
      style={{
        display: Subside ? 'flex' : 'none',
        opacity: Subside ? 1 : 0,
        transform: Subside ? 'translateX(0)' : 'translateX(-100%)',
        transitionProperty: 'opacity, transform',
      }}
    >
      <a
        href=''
        className='my-auto border-b border-[#EFEFEF] px-10 py-5 font-Lato text-[16px] text-black hover:bg-[#e6f4ff] dark:text-gray-200 dark:hover:bg-[#232326]'
      >
        العربية
      </a>
      <a
        href=''
        className='my-auto px-10 py-5 font-Lato text-[16px] text-black hover:bg-[#e6f4ff] dark:text-gray-200 dark:hover:bg-[#232326]'
      >
        English
      </a>
    </div>
  );
}
