import SecondaryHeader from '@/components/SeconderyHeader';
import SideBar from '@/components/SideBar';
import { useHomeProducts } from '@/features/Home/useProduct';
import React, { useState } from 'react';
import Category from '../components/category';
import { ProductSlider } from '../components/ProductSlider';

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
    <div className='mt-10 bg-[#E04444] px-4 py-2 text-center font-Lato text-sm text-white md:mt-0'>
      التوصيل مجانا ولفترة محدودة لجميع انحاء الضفة
    </div>
  );
}

function NoteScrolling() {
  const images = ['/1600.jpg', '/whitehero.jpg'];
  const [current, setCurrent] = React.useState(0);
  const containerRef = React.useRef(null);
  const wheelLock = React.useRef(false);
  const touchStartX = React.useRef(0);
  const touchLocked = React.useRef(false);

  const next = React.useCallback(
    () => setCurrent((c) => (c + 1) % images.length),
    [images.length]
  );
  const prev = React.useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    [images.length]
  );

  // Wheel: استجب فقط للحركة الأفقية وبمعدل محدود
  const onWheel = React.useCallback(
    (e) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      // تجاهل التمرير العمودي أو الحركة الصغيرة
      if (absX < 30 || absX <= absY) return;
      if (wheelLock.current) return;
      wheelLock.current = true;

      e.preventDefault(); // لا تمرر سكرول أفقي للصفحة
      e.stopPropagation();

      e.deltaX > 0 ? next() : prev();

      // افتح القفل بعد قليل: سلايد واحد لكل حركة
      setTimeout(() => (wheelLock.current = false), 500);
    },
    [next, prev]
  );

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // passive:false لكي يعمل preventDefault
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel, { passive: false });
  }, [onWheel]);

  // Touch: سلايد واحد لكل سحبة
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchLocked.current = false;
  };
  const onTouchMove = (e) => {
    const dx = e.touches[0].clientX - touchStartX.current;
    if (touchLocked.current || Math.abs(dx) < 50) return;
    dx < 0 ? next() : prev();
    touchLocked.current = true;
  };

  return (
    <div className='flex w-full items-center justify-center px-4 py-2 xl:px-32'>
      <div
        ref={containerRef}
        className='relative w-full'
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        <div className='flex h-48 w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-r from-white/80 to-purple-100 shadow-xl sm:h-64 md:h-80 lg:h-[32rem]'>
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Promotion Banner ${idx + 1}`}
              className={`absolute left-0 top-0 h-full w-full transition-opacity duration-700 ease-in-out ${
                current === idx
                  ? 'pointer-events-auto z-10 opacity-100'
                  : 'pointer-events-none z-0 opacity-0'
              }`}
              loading='lazy'
            />
          ))}
        </div>

        {/* الأسهم والنقاط أبقيها كما هي */}
        {/* ... */}
      </div>
    </div>
  );
}
