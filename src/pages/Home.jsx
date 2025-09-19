import SecondaryHeader from '@/components/SeconderyHeader';
import SideBar from '@/components/SideBar';
import { useCollection } from '@/hooks/useCollection';
import React, { useState } from 'react';
import Category from '../components/category';
import { ProductSlider } from '../components/ProductSlider';
import { NoteScrolling } from '../components/NoteScrolling';
export default function Home() {
  const { data: Collections, isLoading, error } = useCollection();
  console.log(Collections);
  const [Menubar] = useState(false);

  return (
    <div className='mt-12 md:mt-0'>
      <SecondaryHeader />
      {!Menubar && (
        <>
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
