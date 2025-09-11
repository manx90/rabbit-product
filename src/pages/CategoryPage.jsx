import { Product } from '@/components/ProductSlider';
import { useCategoryProducts } from '@/hooks/useCategoryProducts';
import { useSubcategories } from '@/hooks/useSubcategories';
import { Link, useParams } from 'react-router-dom';
import { Announcement } from './Home';

export default function CategoryPage() {
  const { categoryId, subcategoryId } = useParams();

  // Use React Query hooks instead of useEffect
  const {
    data: subcategories = [],
    isLoading: subcategoriesLoading,
    error: subcategoriesError,
  } = useSubcategories(categoryId);

  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
  } = useCategoryProducts(categoryId, subcategoryId);
  console.log(products);
  // Show loading state
  const isLoading = subcategoriesLoading || productsLoading;
  const error = subcategoriesError || productsError;

  // Debug logging
  console.log('CategoryPage Debug:', {
    categoryId,
    subcategoryId,
    products,
    productsLoading,
    productsError,
    subcategories,
    subcategoriesLoading,
    subcategoriesError,
  });

  return (
    <>
      {/* <Announcement /> */}

      <div className='lg:mx-24'>
        <div dir='rtl' className='px-4'>
          <div className='custom-scrollbar flex flex-row gap-2 overflow-x-auto px-4 py-2 lg:justify-center lg:px-0'>
            {subcategories.map((subcategory) => (
              <Link
                key={`${categoryId}-${subcategory.id}`}
                to={`/category/${categoryId}/${subcategory.id}`}
                className={`min-w-fit max-w-fit self-auto rounded-[12px] border px-4 py-2 text-[13px] transition-colors ${
                  subcategoryId === String(subcategory.id)
                    ? 'border-blue-500 bg-blue-50 text-blue-500'
                    : 'border-gray-300 hover:border-blue-500 hover:text-blue-500'
                }`}
              >
                {subcategory.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Products */}
        <div
          // dir="rtl"
          className='m-auto grid w-fit grid-cols-2 items-center justify-center gap-2 p-1 md:flex md:flex-wrap'
        >
          {isLoading ? (
            <div className='w-full text-center'>جاري تحميل المنتجات...</div>
          ) : error ? (
            <div className='w-full text-center text-red-500'>
              {error?.message || 'فشل في جلب المنتجات.'}
            </div>
          ) : products.length === 0 ? (
            <div className='w-full text-center'>
              لا توجد منتجات في هذا القسم.
            </div>
          ) : (
            products.map((product, index) => {
              // Fix imgCover if it contains duplicated base URL
              let fixedImgCover = product.imgCover;
              if (
                typeof fixedImgCover === 'string' &&
                fixedImgCover.startsWith(
                  `${import.meta.env.VITE_RABBIT_PI_BASE_URL}/uploads`
                )
              ) {
                fixedImgCover = fixedImgCover.replace(
                  `${import.meta.env.VITE_RABBIT_PI_BASE_URL}/uploads`,
                  ''
                );
              }

              // Fix colors imgColor URLs as well
              const fixedColors =
                product.colors?.map((color) => ({
                  ...color,
                  imgColor: color.imgColor?.startsWith(
                    `${import.meta.env.VITE_RABBIT_PI_BASE_URL}/uploads`
                  )
                    ? color.imgColor.replace(
                        `${import.meta.env.VITE_RABBIT_PI_BASE_URL}/uploads`,
                        ''
                      )
                    : color.imgColor,
                })) || [];

              return (
                <Product
                  key={product.id || index}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  imgCover={fixedImgCover}
                  colors={fixedColors}
                  sizeDetails={product.sizeDetails}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
