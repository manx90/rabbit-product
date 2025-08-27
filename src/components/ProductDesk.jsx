import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useCart } from '@/hooks/useCartRedux';

export default function ProductDesk({ item }) {
  const { removeItem, changeQty } = useCart();

  // Get first color info (from sizeDetails[0].quantities[0] and colors[0])
  const firstQuantity = item.sizeDetails?.[0]?.quantities?.[0];
  const firstColorName = firstQuantity?.colorName?.trim();
  const firstColorObj =
    item.colors?.find((c) => c.name?.trim() === firstColorName) ||
    item.colors?.[0];
  const firstColorImg = firstColorObj?.imgColor;

  // Get the correct color image for the colorName in the cart item
  const colorObj = item.colors?.find(
    (c) => c.name?.trim() === item.colorName?.trim()
  );
  const colorImg = colorObj?.imgColor;

  const handleQtyChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) value = 1;
    if (value > item.quantity) value = item.quantity;
    changeQty(item.productId, item.sizeName, item.colorName, value);
  };

  return (
    <div className='flex w-full flex-col items-center justify-between gap-4 rounded-xl border-b border-gray-100 bg-white p-4 shadow-md transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:shadow-lg dark:hover:shadow-blue-900/40 sm:flex-row sm:gap-0'>
      {/* Left: Delete icon and quantity */}
      <div className='flex w-full flex-row items-center justify-between gap-3 sm:w-auto sm:flex-col sm:justify-center sm:gap-4'>
        <div className='flex flex-col items-center gap-2'>
          <DeleteForeverIcon
            onClick={() =>
              removeItem(item.productId, item.sizeName, item.colorName)
            }
            style={{
              color: '#FF3737',
              cursor: 'pointer',
              fontSize: 30,
            }}
          />
        </div>
        <div dir='rtl' className='flex flex-row items-center gap-2 md:flex-col'>
          <span className='mb-0 text-xs text-gray-500 dark:text-gray-400 md:order-none md:mb-1 md:hidden'>
            الكمية المحددة :
          </span>
          <input
            type='number'
            min={1}
            max={item.quantity}
            value={item.qty}
            onChange={handleQtyChange}
            className='w-16 rounded-lg border border-gray-400 bg-white px-2 py-1 text-center font-Lato text-[15px] text-gray-700 shadow-sm transition-all focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-blue-800'
          />
          <span className='mt-1 block text-xs font-bold text-red-500'>
            الكمية المتوفرة: {item.quantity}
          </span>
        </div>
      </div>

      {/* Right: Product image, info, and attributes */}
      <div className='flex w-full max-w-full flex-1 flex-row-reverse items-center gap-4 sm:max-w-[350px]'>
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className='h-20 w-20 flex-shrink-0 rounded-lg border border-gray-200 object-cover shadow-md dark:border-gray-700 dark:shadow-blue-900/20 sm:h-24 sm:w-24'
          />
        )}

        <div className='flex w-full flex-col text-right'>
          <span className='max-w-full truncate font-Lato text-[15px] font-semibold text-[#535353] dark:text-gray-200 sm:text-[16px]'>
            {item.name}
          </span>
          <span className='mt-1 font-Lato text-[18px] text-[#0095FF] dark:text-blue-400 sm:text-[20px]'>
            {(item.price || 0).toFixed(2)}
          </span>

          <div className='mt-2 flex flex-wrap items-center justify-end gap-3'>
            {/* Color swatch with image and name */}
            {colorObj && (
              <div dir='rtl' className='flex items-center gap-1'>
                {colorImg && (
                  <img
                    src={colorImg}
                    alt={item.colorName}
                    className='inline-block h-6 w-6 rounded-full border border-gray-300 object-cover shadow dark:border-gray-600'
                  />
                )}
                <span className='text-xs font-bold text-gray-700 dark:text-gray-200'>
                  {item.colorName}
                </span>
                {/* Size badge */}
                {item.sizeName && (
                  <span className='ml-2 rounded-full border-2 border-white bg-gradient-to-r from-blue-500 to-blue-700 px-3 py-1 text-xs font-bold text-white shadow-md transition-all duration-200 dark:border-gray-800 dark:from-blue-700 dark:to-blue-900'>
                    {item.sizeName}
                  </span>
                )}
              </div>
            )}
            {/* SubCategory badge */}
            {item.subCategory?.name && (
              <div dir='rtl' className='flex items-center gap-1'>
                {/* <span className="text-xs text-gray-500 dark:text-gray-400">
									التصنيف الفرعي:
								</span> */}
                <span className='rounded-full border border-blue-200 bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:border-blue-700 dark:bg-blue-900/40 dark:text-blue-200'>
                  {item.subCategory.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
