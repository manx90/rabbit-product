import { Optos } from '@/api/optosApi';
import { useCart } from '@/hooks/useCartRedux';
import { useFavorites } from '@/hooks/useFavorites';
import useOrder from '@/hooks/useOrder';
import { Input } from '@/lib/css/Cart';
import { Column, Row } from '@/lib/css/Product';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaHeart, FaMoneyCheck, FaRegHeart } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import SelectingCart from './selectingCart';
export default function Cart({ openInfo, setOpenInfo }) {
  const { items, updateItemQuantity, toggleItemFavorite, removeItemByIndex } =
    useCart();
  const { toggleFavorite, favorites } = useFavorites();

  const isItemInFavorites = (item) => {
    return favorites.some(
      (fav) =>
        fav.productId === item.productId &&
        fav.sizeName === item.sizeName &&
        fav.colorName === item.colorName
    );
  };

  const handleFavoriteToggle = (item, index) => {
    toggleItemFavorite(index);
    toggleFavorite(item);
  };

  useEffect(() => {
    document.body.style.overflow = openInfo ? 'hidden' : 'auto';
  }, [openInfo]);

  const [isPayment, setIsPayment] = useState(false);

  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black/50 transition-all duration-300 ${
        openInfo
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
      onClick={() => setOpenInfo(false)}
    >
      <Column
        dir='rtl'
        className='inset-0 mx-auto h-[90vh] max-h-[600px] w-[90%] max-w-[400px] self-auto overflow-auto rounded-3xl border-0 border-gray-200 bg-white p-0 shadow-2xl dark:border-gray-800 dark:bg-gray-900 md:rounded-3xl md:border'
        onClick={(e) => e.stopPropagation()}
      >
        {!isPayment ? (
          <>
            <div className='sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-200 dark:bg-blue-900/30'>
                    <svg
                      className='h-4 w-4 text-blue-700 dark:text-blue-400'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z' />
                    </svg>
                  </div>
                </div>
                <button
                  onClick={() => setOpenInfo(false)}
                  className='flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-800'
                >
                  <svg
                    className='h-5 w-5 text-gray-600 dark:text-gray-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className='flex flex-1 flex-col overflow-hidden'>
              {items.length === 0 ? (
                <div className='flex flex-1 flex-col items-center justify-center px-4 py-8'>
                  <div className='mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800'>
                    <svg
                      className='h-8 w-8 text-gray-500 dark:text-gray-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={1.5}
                        d='M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z'
                      />
                    </svg>
                  </div>
                  <h3 className='mb-2 text-base font-medium text-gray-900 dark:text-white'>
                    عربة التسوق فارغة
                  </h3>
                  <p className='mb-4 text-center text-xs text-gray-600 dark:text-gray-400'>
                    أضف بعض المنتجات للبدء
                  </p>
                  <button
                    onClick={() => setOpenInfo(false)}
                    className='rounded-lg bg-blue-700 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-800'
                  >
                    متابعة التسوق
                  </button>
                </div>
              ) : (
                <>
                  <div className='flex-1 overflow-y-auto px-3 py-2'>
                    <div className='space-y-2'>
                      {items.map((item, index) => (
                        <div key={index} className='group'>
                          <Row className='gap-2 rounded-lg border border-gray-200 bg-white p-2 transition-all duration-200 hover:border-gray-300 hover:shadow-sm dark:border-gray-700/50 dark:bg-gray-800/50 dark:hover:border-gray-600'>
                            <div className='relative flex flex-shrink-0 items-center justify-center'>
                              <img
                                src={item.image}
                                alt={item.name}
                                className='my-auto h-8 w-8 rounded-md bg-gray-200 object-contain dark:bg-gray-700'
                              />
                              <div className='absolute -right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-700 text-[10px] text-xs font-bold text-white'>
                                {item.qty}
                              </div>
                            </div>

                            <Row className='flex min-w-0 flex-1 items-center justify-between'>
                              <Row>
                                <Column>
                                  <span className='mb-1 line-clamp-2 text-xl font-medium leading-tight text-gray-900 dark:text-white'>
                                    {item.name}
                                  </span>
                                  <Row>
                                    <span className='mb-1 line-clamp-2 text-xs font-medium leading-tight text-gray-900 dark:text-slate-400'>
                                      {item.category.name}
                                    </span>
                                  </Row>
                                </Column>
                                <Row className='h-fit gap-1'>
                                  <span className='mb-1 line-clamp-2 rounded-full border border-gray-300 bg-blue-50 p-1 px-2 text-xs font-medium leading-tight text-blue-700 dark:border-gray-600 dark:bg-blue-900/30 dark:text-blue-300'>
                                    {item.sizeName}
                                  </span>

                                  <span className='mb-1 line-clamp-2 rounded-full border border-gray-300 bg-blue-50 p-1 px-2 text-xs font-medium leading-tight text-blue-700 dark:border-gray-600 dark:bg-blue-900/30 dark:text-blue-300'>
                                    {item.colorName}
                                  </span>
                                </Row>
                              </Row>

                              {/* Quantity Controls */}
                              <Column className='mb-2'>
                                <div className='flex items-center'>
                                  <button
                                    onClick={() =>
                                      updateItemQuantity(
                                        index,
                                        Math.max(1, item.qty - 1)
                                      )
                                    }
                                    className='flex h-6 w-6 items-center justify-center rounded-md bg-gray-200 text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                  >
                                    <svg
                                      className='h-3 w-3'
                                      fill='none'
                                      stroke='currentColor'
                                      viewBox='0 0 24 24'
                                    >
                                      <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M20 12H4'
                                      />
                                    </svg>
                                  </button>
                                  <span className='mx-auto w-8 text-center text-xs font-medium text-gray-900 dark:text-white'>
                                    {item.qty}
                                  </span>
                                  <button
                                    onClick={() =>
                                      updateItemQuantity(index, item.qty + 1)
                                    }
                                    className='flex h-6 w-6 items-center justify-center rounded-md bg-gray-200 text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                  >
                                    <svg
                                      className='h-3 w-3'
                                      fill='none'
                                      stroke='currentColor'
                                      viewBox='0 0 24 24'
                                    >
                                      <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M12 4v16m8-8H4'
                                      />
                                    </svg>
                                  </button>
                                </div>
                                <Row
                                  dir='ltr'
                                  className='justify-center space-x-2'
                                >
                                  <button
                                    onClick={() => removeItemByIndex(index)}
                                    className='rounded p-1 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20'
                                    title='حذف من السلة'
                                  >
                                    <MdDeleteForever className='h-5 w-5 text-red-500' />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleFavoriteToggle(item, index)
                                    }
                                    className='rounded p-1'
                                    title={
                                      isItemInFavorites(item)
                                        ? 'إزالة من المفضلة'
                                        : 'إضافة إلى المفضلة'
                                    }
                                  >
                                    {isItemInFavorites(item) ? (
                                      <FaHeart className='h-5 w-5 text-red-500' />
                                    ) : (
                                      <FaRegHeart className='h-5 w-5 text-red-500' />
                                    )}
                                  </button>
                                </Row>
                              </Column>
                            </Row>
                          </Row>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='border-t border-gray-200 bg-white px-3 py-3 dark:border-gray-800 dark:bg-gray-900'>
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <span className='text-xs text-gray-600 dark:text-gray-400'>
                          المجموع (
                          {items.reduce((sum, item) => sum + item.qty, 0)} منتج)
                        </span>
                        <span className='text-sm font-semibold text-gray-900 dark:text-white'>
                          $
                          {items
                            .reduce(
                              (sum, item) => sum + item.price * item.qty,
                              0
                            )
                            .toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() => setIsPayment(true)}
                        className='flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-3 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-400 dark:disabled:bg-gray-700'
                      >
                        <span className='text-sm'>الدفع</span>
                        <FaMoneyCheck className='h-4 w-4' />
                      </button>

                      <button
                        onClick={() => setOpenInfo(false)}
                        className='w-full py-1.5 text-xs font-medium text-blue-700 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
                      >
                        متابعة التسوق
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <CartPayment setIsPayment={setIsPayment} />
        )}
      </Column>
    </div>
  );
}
function CartPayment({ setIsPayment }) {
  const methods = useForm({
    defaultValues: {
      consignee_city: '', // مهم
      consignee_area: '',
      consignee_name: '',
      consignee_phone: '',
      consignee_address: '',
    },
  });
  const { items } = useCart();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;
  var consignee_city = watch('consignee_city');
  const { data: cities = [] } = useQuery({
    queryKey: ['cities'],
    queryFn: () => Optos.getCity().then((res) => res[0].data),
  });

  const { data: areas = [], refetch: refetchAreas } = useQuery({
    queryKey: ['areas', consignee_city],
    queryFn: () => Optos.gitArea(consignee_city).then((res) => res[0].data),
  });
  useEffect(() => {
    refetchAreas();
  }, [consignee_city]);

  const onSubmit = (data) => {
    const itemsData = items.map((item) => ({
      colorName: item.colorName,
      sizeName: item.sizeName,
      quantity: item.qty,
      productId: item.productId,
    }));
    const Data = { ...data, items: itemsData };
    const { Res } = useOrder(Data);
    Res();
    setIsPayment(false);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <Column className='mt-2 flex flex-col gap-4 overflow-auto px-8 pt-4'>
          <Column>
            <label>اسم المستخدم</label>
            <Input
              type='text'
              placeholder='اسم المستخدم'
              {...register('consignee_name', {
                required: true,
                pattern: {
                  value: /^[a-zA-Zء-ي\s]+$/,
                  message: 'اسم المستخدم يجب أن يكون حروف',
                },
                setValueAs: (value) => {
                  value = value.trim();
                  return value;
                },
              })}
            />
          </Column>

          <Column>
            <Row>
              <label>رقم الهاتف</label>
            </Row>
            <Input
              type='text'
              placeholder='رقم الهاتف'
              {...register('consignee_phone', {
                required: true,
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'رقم الهاتف يجب أن يكون 10 أرقام',
                },
              })}
            />

            {errors.consignee_phone && (
              <p className='text-xs text-red-500'>
                {errors.consignee_phone.message}
              </p>
            )}
          </Column>

          <Column>
            <label>المدينة</label>
            <SelectingCart
              items={cities}
              placeholder='المدينة'
              registerName='consignee_city'
            />

            <label>المنطقة</label>
            <SelectingCart
              items={areas}
              disabled={!consignee_city}
              placeholder='المنطقة'
              registerName='consignee_area'
            />
          </Column>

          <Column>
            <label>العنوان تفصيلي</label>
            <Input
              type='text'
              placeholder='العنوان'
              {...register('consignee_address')}
            />
          </Column>
        </Column>
        <Column className='flex flex-col gap-4 px-8'>
          <button
            type='submit'
            className='mx-auto flex w-full transform items-center justify-center gap-2 rounded-xl border border-blue-600 bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-blue-700 hover:to-blue-800 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-400 dark:border-blue-500 dark:disabled:bg-gray-700'
          >
            <FaMoneyCheck className='h-5 w-5' />
            <span className='text-base'>إرسال الطلب</span>
          </button>
          <button
            onClick={() => setIsPayment(false)}
            className='w-full py-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-400'
          >
            العودة للسلة
          </button>
        </Column>
      </form>
    </FormProvider>
  );
}
