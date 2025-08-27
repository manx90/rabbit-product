import SecondaryHeader from '@/components/SeconderyHeader';
import SideBar from '@/components/SideBar';
import { useHomeProducts } from '@/features/Home/useProduct';
import React, { useState } from 'react';
import Category from '../components/category';
import ProductSlider from '../components/ProductSlider';

const demoStories = [
  {
    id: 1,
    user: {
      name: 'Alice',
      avatar:
        'https://api.rabbit.ps/uploads/products/حمالة_صدر_كتف_عريض_01/colors/eef7fb9a-949f-4998-98f7-454c271a4435.jpg',
    },
    content: {
      type: 'image',
      url: 'https://api.rabbit.ps/uploads/products/حمالة_صدر_كتف_عريض_01/colors/eef7fb9a-949f-4998-98f7-454c271a4435.jpg',
    },
    liked: false,
  },
  {
    id: 2,
    user: {
      name: 'Bob',
      avatar:
        'https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg',
    },
    content: {
      type: 'image',
      url: 'https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg',
    },
    liked: false,
  },
  {
    id: 3,
    user: {
      name: 'Carol',
      avatar:
        'https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg',
    },
    content: {
      type: 'image',
      url: 'https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg',
    },
    liked: false,
  },
  {
    id: 5,
    user: {
      name: 'Carol',
      avatar:
        'https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg',
    },
    content: {
      type: 'image',
      url: './1600.jpg',
    },
    liked: false,
  },
  {
    id: 4,
    user: {
      name: 'Carol',
      avatar:
        'https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg',
    },
    content: {
      type: 'image',
      url: 'https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg',
    },
    liked: false,
  },
  {
    id: 4,
    user: {
      name: 'Carol',
      avatar:
        'https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg',
    },
    content: {
      type: 'image',
      url: 'https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg',
    },
    liked: false,
  },
  {
    id: 6,
    user: {
      name: 'Carol',
      avatar:
        'https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg',
    },
    content: {
      type: 'image',
      url: 'https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg',
    },
    liked: false,
  },
  {
    id: 7,
    user: {
      name: 'Carol',
      avatar:
        'https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg',
    },
    content: {
      type: 'image',
      url: 'https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg',
    },
    liked: false,
  },
];

export default function Home() {
  const [Menubar, setMenubar] = useState(false);
  const { product: products, isLoading: loading, error } = useHomeProducts();
  const [stories, setStories] = useState(demoStories);
  const [openStory, setOpenStory] = useState(null);

  // Group products by category
  // Group products by both category and subcategory for each product
  // Group products by subcategory, and include categoryId and subCategoryId for each group
  const groupedProducts = products.reduce((acc, product) => {
    const categoryId = product.category?.id || 'غير مصنف';
    const categoryName = product.category?.name || 'غير مصنف';
    const subCategoryId =
      product.subCategory?.id || product.subCategoryId || 'غير مصنف';
    const subCategoryName =
      product.subCategory?.name || product.subCategory || 'غير مصنف';

    // Use subCategoryId as the key if available, otherwise subCategoryName
    const groupKey =
      subCategoryId !== 'غير مصنف' ? subCategoryId : subCategoryName;

    if (!acc[groupKey]) {
      acc[groupKey] = {
        categoryId,
        categoryName,
        subCategoryId,
        subCategoryName,
        products: [],
      };
    }
    acc[groupKey].products.push(product);
    // Removed invalid debug statement
    return acc;
  }, {});

  const handleOpenStory = (story) => setOpenStory(story);
  const handleCloseStory = () => setOpenStory(null);
  const handleLike = (id) => {
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, liked: !s.liked } : s))
    );
    if (openStory && openStory.id === id) {
      setOpenStory((prev) => ({
        ...prev,
        liked: !prev.liked,
      }));
    }
  };

  return (
    <>
      <SecondaryHeader />
      {!Menubar && (
        <>
          <Announcement />
          <NoteScrolling />

          {loading ? (
            <div className='flex min-h-[200px] items-center justify-center'>
              <span className='text-gray-500'>جاري تحميل المنتجات...</span>
            </div>
          ) : error ? (
            <div className='flex min-h-[200px] items-center justify-center'>
              <span className='text-red-500'>{error}</span>
            </div>
          ) : (
            Object.entries(groupedProducts).map(([groupKey, group]) => (
              <React.Fragment key={groupKey}>
                <div className='mb-8 lg:mx-12'>
                  <Category
                    name={group.subCategoryName}
                    idSub={group.subCategoryId}
                    idCat={group.categoryId}
                    all={true}
                  />
                  <ProductSlider
                    products={group.products}
                    subCategoryId={group.subCategoryId}
                    subCategoryName={group.subCategoryName}
                    categoryId={group.categoryId}
                    categoryName={group.categoryName}
                  />
                </div>
              </React.Fragment>
            ))
          )}
        </>
      )}
      <SideBar Menubar={Menubar} />
    </>
  );
}

export function Announcement() {
  return (
    <div className='bg-[#E04444] px-4 py-2 mt-10 md:mt-0 text-center font-Lato text-sm text-white'>
      التوصيل مجانا ولفترة محدودة لجميع انحاء الضفة
    </div>
  );
}

function NoteScrolling() {
  const images = ['/1600.jpg', '/whitehero.jpg'];
  const [current, setCurrent] = React.useState(0);

  const goTo = (idx) => setCurrent(idx);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const next = () => setCurrent((prev) => (prev + 1) % images.length);

  const handleWheel = (e) => {
    if (e.deltaX > 0 || e.deltaY > 0) {
      // Scrolling right or down - go to next
      next();
    } else if (e.deltaX < 0 || e.deltaY < 0) {
      // Scrolling left or up - go to previous
      prev();
    }
  };

  const handleTouchStart = (e) => {
    const touchStartX = e.touches[0].clientX;

    const handleTouchMove = (e) => {
      const touchCurrentX = e.touches[0].clientX;
      const diff = touchStartX - touchCurrentX;

      if (Math.abs(diff) > 50) {
        // minimum swipe distance
        if (diff > 0) {
          // Swiped left - go to next
          next();
        } else {
          // Swiped right - go to previous
          prev();
        }
        // Remove listeners after action
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      }
    };

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div className='flex w-full items-center justify-center px-4 py-2 xl:px-32'>
      <div className='relative w-full'>
        <div className='flex h-48 w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-r from-white/80 to-purple-100 shadow-xl sm:h-64 md:h-80 lg:h-[32rem]'>
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Promotion Banner ${idx + 1}`}
              className={`absolute left-0 top-0 h-full w-full transition-opacity duration-700 ease-in-out ${
                current === idx ? 'z-10 opacity-100' : 'z-0 opacity-0'
              }`}
              loading='lazy'
              onTouchStart={handleTouchStart}
              onWheel={handleWheel}
            />
          ))}
        </div>
        {/* Navigation Arrows */}
        <button
          className='absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md hover:bg-white'
          onClick={prev}
          aria-label='Previous slide'
        >
          <svg
            width='24'
            height='24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'
          >
            <path d='M15 19l-7-7 7-7' />
          </svg>
        </button>
        <button
          className='absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md hover:bg-white'
          onClick={next}
          aria-label='Next slide'
        >
          <svg
            width='24'
            height='24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'
          >
            <path d='M9 5l7 7-7 7' />
          </svg>
        </button>
        {/* Dots */}
        <div className='absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2'>
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                current === idx
                  ? 'scale-125 border-purple-500 bg-purple-500'
                  : 'border-gray-300 bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
