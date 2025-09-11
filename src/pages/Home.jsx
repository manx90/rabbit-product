import SecondaryHeader from '@/components/SeconderyHeader';
import SideBar from '@/components/SideBar';
import { useCollection } from '@/hooks/useCollection';
import React, { useState } from 'react';
import Category from '../components/category';
import { ProductSlider } from '../components/ProductSlider';

export default function Home() {
  const { data: Collections, isLoading, error } = useCollection();
  console.log(Collections);
  const [Menubar] = useState(false);

  return (
    <div className='mt-12 md:mt-0'>
      <SecondaryHeader />
      {!Menubar && (
        <>
          {/* <Announcement /> */}
          <NoteScrolling />

          {isLoading ? (
            <div className='flex min-h-[200px] items-center justify-center'>
              <span className='text-gray-500'>جاري تحميل البيانات...</span>
            </div>
          ) : error ? (
            <div className='flex min-h-[200px] items-center justify-center'>
              <span className='text-red-500'>{error}</span>
            </div>
          ) : (
            Collections?.data?.map((collection) => {
              const collectionProducts = collection.products || [];

              // If collection has subcategories, show them
              if (
                collection.subCategories &&
                collection.subCategories.length > 0
              ) {
                return collection.subCategories.map((subCat) => (
                  <div className='mb-8 lg:mx-12' key={`subcat-${subCat.id}`}>
                    <Category
                      name={subCat.name}
                      idSub={subCat.id}
                      idCat={collection.categories?.[0]?.id || 'غير معروف'}
                      all={true}
                    />
                    {collectionProducts.length > 0 ? (
                      <ProductSlider
                        products={collectionProducts}
                        subCategoryId={subCat.id}
                        subCategoryName={subCat.name}
                        categoryId={
                          collection.categories?.[0]?.id || 'غير معروف'
                        }
                        categoryName={
                          collection.categories?.[0]?.name || 'غير معروف'
                        }
                      />
                    ) : (
                      <div className='flex min-h-[200px] items-center justify-center'>
                        <span className='text-gray-500'>
                          لا توجد منتجات في هذه الفئة
                        </span>
                      </div>
                    )}
                  </div>
                ));
              }

              // If collection has no subcategories but has categories, show the category directly
              if (collection.categories && collection.categories.length > 0) {
                return collection.categories.map((category) => (
                  <div className='mb-8 lg:mx-12' key={`cat-${category.id}`}>
                    <Category
                      name={category.name}
                      idSub={null}
                      idCat={category.id}
                      all={true}
                    />
                    {collectionProducts.length > 0 ? (
                      <ProductSlider
                        products={collectionProducts}
                        subCategoryId={null}
                        subCategoryName={category.name}
                        categoryId={category.id}
                        categoryName={category.name}
                      />
                    ) : (
                      <div className='flex min-h-[200px] items-center justify-center'>
                        <span className='text-gray-500'>
                          لا توجد منتجات في هذه الفئة
                        </span>
                      </div>
                    )}
                  </div>
                ));
              }

              // If collection has neither subcategories nor categories, show collection name
              return (
                <div
                  className='mb-8 lg:mx-12'
                  key={`collection-${collection.id}`}
                >
                  <Category
                    name={collection.name}
                    idSub={null}
                    idCat={collection.id}
                    all={true}
                  />
                  {collectionProducts.length > 0 ? (
                    <ProductSlider
                      products={collectionProducts}
                      subCategoryId={null}
                      subCategoryName={collection.name}
                      categoryId={collection.id}
                      categoryName={collection.name}
                    />
                  ) : (
                    <div className='flex min-h-[200px] items-center justify-center'>
                      <span className='text-gray-500'>
                        لا توجد منتجات في هذه الفئة
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </>
      )}
      <SideBar Menubar={Menubar} />
    </div>
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
              className={`absolute left-0 top-0 size-full transition-opacity duration-700 ease-in-out ${
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
