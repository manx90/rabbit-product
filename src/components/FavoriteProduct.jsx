import React from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { useCart } from '@/hooks/useCartRedux';
import { MdDeleteForever } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';

export default function FavoriteProduct({ product }) {
  const { removeFromFavorites } = useFavorites();
  const { addItem } = useCart();

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(product.productId, product.sizeName, product.colorName);
  };

  const handleAddToCart = () => {
    addItem({
      ...product,
      qty: 1,
    });
  };
  return (
    <div className='flex flex-row justify-between rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800'>
      <div className='flex flex-col justify-between'>
        <button
          onClick={handleRemoveFromFavorites}
          className='mb-2 rounded p-1 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20'
          title='إزالة من المفضلة'
        >
          <MdDeleteForever className='h-5 w-5 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300' />
        </button>
        <button
          onClick={handleAddToCart}
          className='rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700'
        >
          أضف إلى السلة
        </button>
      </div>
      <div className='flex flex-col items-end justify-between'>
        <span className='max-w-[140px] text-right text-sm font-medium text-gray-900 dark:text-white'>
          {product.name || 'اسم المنتج'}
        </span>
        <div className='mt-2 flex flex-row-reverse items-center gap-2'>
          <span className='text-lg font-bold text-blue-600 dark:text-blue-400'>
            ${product.price || '0.00'}
          </span>
          <span className='text-xs text-gray-500 dark:text-gray-400'>
            {product.sizeName} - {product.colorName}
          </span>
        </div>
        <div className='mt-2 flex items-center'>
          <FaHeart className='mr-1 h-4 w-4 text-red-500' />
          <span className='text-xs text-gray-500 dark:text-gray-400'>
            في المفضلة
          </span>
        </div>
      </div>
      <img
        src={product.image || '/product.png'}
        className='h-20 w-20 rounded-lg object-cover'
        alt={product.name || 'صورة المنتج'}
      />
    </div>
  );
}
