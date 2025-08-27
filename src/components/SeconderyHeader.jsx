import { Link } from 'react-router-dom';
const SecondaryHeader = () => {
  const categories = [
    {
      id: 1,
      name: 'ملابس رجالي',
      href: '/products/mens-clothing',
    },
    {
      id: 2,
      name: 'ملابس نسائي',
      href: '/products/womens-clothing',
    },
    {
      id: 3,
      name: 'أطفال',
      href: '/products/kids',
    },
    {
      id: 4,
      name: 'إلكترونيات',
      href: '/products/electronics',
    },
  ];

  return (
    <div className='hidden border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 lg:flex'>
      <div className='container mx-auto px-4'>
        <div
          className='mx-auto flex max-w-screen-xl flex-row-reverse flex-wrap items-center justify-center gap-4 py-2'
          style={{ height: '40px' }}
        >
          {/* الفلترة والمفضلة */}
          <div className='ml-4 flex items-center gap-4'>
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
          </div>

          <span className='text-gray-500 dark:text-gray-400'>|</span>

          <a
            href='/'
            className='text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
          >
            الرئيسية
          </a>

          {/* التصنيفات */}
          <div className='ml-4 flex flex-wrap items-center justify-start gap-4'>
            {categories.map((category) => (
              <a
                key={category.id}
                href={category.href}
                className='text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
              >
                {category.name}
              </a>
            ))}
          </div>

          {/* روابط إضافية */}
          <div className='ml-4 flex items-center justify-between gap-4'>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryHeader;
