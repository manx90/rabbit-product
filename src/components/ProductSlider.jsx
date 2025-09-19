import {
  ProductSlider as ProductSliderStyled,
  Product as ProductStyled,
  Column,
} from '@/lib/css/Product';
import { memo } from 'react';
import { FaCircleLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { Product } from './Product';

export const ProductSlider = memo(function ProductSlider({
  products = [],
  subCategoryId,
  categoryId,
  likeProduct = false,
}) {
  const navigate = useNavigate();
  return (
    <ProductSliderStyled>
      {products?.map((p) => (
        <Product
          key={p.id ?? p._id ?? p.slug}
          id={p.id}
          name={p.name}
          price={p.price}
          imgCover={p.imgCover}
          colors={p.colors}
          sizeDetails={p.sizeDetails}
        />
      ))}

      {!likeProduct && (
        <ProductStyled
          onClick={() => {
            navigate(`/category/${categoryId}`);
          }}
          className='group flex min-w-[160px] cursor-pointer flex-row border-2 border-blue-500 hover:border-blue-500 dark:hover:border-blue-500'
        >
          <Column className='mx-auto my-auto items-center justify-center'>
            <span className='text-Xl text-gray-500 transition-all duration-300 group-hover:text-blue-500 dark:text-gray-400 dark:group-hover:text-blue-500'>
              مشاهدة الكل
            </span>
            <FaCircleLeft className='h-8 w-8 transition-all duration-300 group-hover:text-blue-500' />
          </Column>
        </ProductStyled>
      )}
    </ProductSliderStyled>
  );
});
