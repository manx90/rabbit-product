import { useToastContext } from '@/components/ui/toast';
import { useCart } from '@/hooks/useCartRedux';
import {
  ButtonCard,
  Column,
  ImgProductSlider,
  ProductSlider as ProductSliderStyled,
  Product as ProductStyled,
  Row,
  ScrollColorImg,
  Span,
} from '@/lib/css/Product';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCircleLeft } from 'react-icons/fa6';
import { MdAddShoppingCart } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

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
            navigate(`/category/${categoryId}/${subCategoryId}`);
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
const shallowEqualBy = (a = [], b = [], keyFn) => {
  if (a === b) return true;
  if (!a || !b || a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (keyFn(a[i]) !== keyFn(b[i])) return false;
  }
  return true;
};

export const Product = memo(
  function Product({
    price,
    sizeDetails = [],
    colors = [],
    imgCover,
    name,
    id,
  }) {
    const mainImage = useMemo(
      () => imgCover || colors[0]?.imgColor || 'product.png',
      [imgCover, colors]
    );

    const [photo, setPhoto] = useState(mainImage);
    const [imageLoaded, setImageLoaded] = useState(false);
    useEffect(() => setPhoto(mainImage), [mainImage]);

    const { addItem } = useCart();
    const { addToast } = useToastContext
      ? useToastContext()
      : { addToast: () => {} };

    const priceDisplay = useMemo(() => {
      if (!sizeDetails.length) return price ?? 0;
      const prices = sizeDetails.map((s) => s.price).filter((p) => p != null);
      if (!prices.length) return price ?? 0;
      const unique = [...new Set(prices)];
      if (unique.length === 1) return unique[0];
      return `${Math.min(...prices)}-${Math.max(...prices)}`;
    }, [sizeDetails, price]);

    const defaultPrice = useMemo(
      () => (sizeDetails.length ? sizeDetails[0].price : (price ?? 0)),
      [sizeDetails, price]
    );

    const [modalOpen, setModalOpen] = useState(false);
    const initialColor = useMemo(() => colors[0]?.name || '', [colors]);
    const initialSize = useMemo(
      () => sizeDetails[0]?.sizeName || '',
      [sizeDetails]
    );
    const [selectedColor, setSelectedColor] = useState(initialColor);
    const [selectedSize, setSelectedSize] = useState(initialSize);
    const [quantity, setQuantity] = useState(1);

    const sizes = useMemo(
      () => sizeDetails.map((s) => s.sizeName),
      [sizeDetails]
    );

    // Get colors with availability info for selected size
    const colorsWithAvailability = useMemo(() => {
      if (!selectedSize)
        return colors.map((color) => ({
          ...color,
          isAvailable: true,
          quantity: 0,
        }));
      const sd = sizeDetails.find((s) => s.sizeName === selectedSize);
      if (!sd?.quantities)
        return colors.map((color) => ({
          ...color,
          isAvailable: true,
          quantity: 0,
        }));

      return colors.map((color) => {
        const q = sd.quantities.find(
          (q) => q.colorName.trim() === color.name.trim()
        );
        return {
          ...color,
          isAvailable: q && q.quantity > 0,
          quantity: q?.quantity || 0,
        };
      });
    }, [colors, sizeDetails, selectedSize]);

    // Get sizes with availability info for selected color
    const sizesWithAvailability = useMemo(() => {
      if (!selectedColor)
        return sizes.map((size) => ({ size, isAvailable: true, quantity: 0 }));

      return sizes.map((size) => {
        const sd = sizeDetails.find((s) => s.sizeName === size);
        if (!sd?.quantities) return { size, isAvailable: false, quantity: 0 };

        const q = sd.quantities.find(
          (q) => q.colorName.trim() === selectedColor.trim()
        );
        return {
          size,
          isAvailable: q && q.quantity > 0,
          quantity: q?.quantity || 0,
        };
      });
    }, [sizes, sizeDetails, selectedColor]);

    const maxQty = useMemo(() => {
      const sd = sizeDetails.find((s) => s.sizeName === selectedSize);
      const q = sd?.quantities?.find(
        (q) => q.colorName.trim() === selectedColor.trim()
      );
      return q?.quantity || 0;
    }, [sizeDetails, selectedSize, selectedColor]);

    // Check if current combination is available
    const isCurrentCombinationAvailable = useMemo(() => {
      return maxQty > 0;
    }, [maxQty]);

    const handleColorSelect = useCallback(
      (color) => {
        const sd = sizeDetails.find((s) => s.sizeName === selectedSize);
        let matched = color.name;
        const found = sd?.quantities?.find(
          (q) => q.colorName.trim() === color.name.trim()
        );
        if (found) matched = found.colorName;
        setSelectedColor(matched);
        setImageLoaded(false);
        setPhoto(color.imgColor);

        // Reset quantity to 1 when color changes
        setQuantity(1);
      },
      [sizeDetails, selectedSize]
    );

    const handleSizeSelect = useCallback((size) => {
      setSelectedSize(size);
      // Reset quantity to 1 when size changes
      setQuantity(1);
    }, []);

    // Auto-select available options when current selection becomes unavailable
    useEffect(() => {
      if (selectedSize) {
        const currentSizeInfo = sizesWithAvailability.find(
          (s) => s.size === selectedSize
        );
        if (currentSizeInfo && !currentSizeInfo.isAvailable) {
          const availableSize = sizesWithAvailability.find(
            (s) => s.isAvailable
          );
          if (availableSize) {
            setSelectedSize(availableSize.size);
            setQuantity(1);
          }
        }
      }
    }, [selectedSize, sizesWithAvailability]);

    useEffect(() => {
      if (selectedColor) {
        const currentColorInfo = colorsWithAvailability.find(
          (c) => c.name === selectedColor
        );
        if (currentColorInfo && !currentColorInfo.isAvailable) {
          const availableColor = colorsWithAvailability.find(
            (c) => c.isAvailable
          );
          if (availableColor) {
            setSelectedColor(availableColor.name);
            setPhoto(availableColor.imgColor);
            setQuantity(1);
          }
        }
      }
    }, [selectedColor, colorsWithAvailability]);

    const handleAddToCart = useCallback(() => {
      const sd = sizeDetails.find((s) => s.sizeName === selectedSize);
      let matched = selectedColor;
      let availableQuantity = 1;
      const found = sd?.quantities?.find(
        (q) => q.colorName.trim() === selectedColor.trim()
      );
      if (found) {
        matched = found.colorName;
        availableQuantity = found.quantity;
      }

      const availableSizes = sizeDetails.map((s) => s.sizeName);
      const availableColors = colors.map((c) => c.name);

      addItem({
        productId: id,
        name,
        sizeName: selectedSize,
        colorName: matched,
        quantity: availableQuantity,
        qty: quantity,
        image: photo,
        price: defaultPrice,
        availableSizes,
        availableColors,
      });
      addToast({
        title: 'تمت الإضافة!',
        description: `تم إضافة المنتج (${name}) إلى السلة بنجاح.`,
      });
      setModalOpen(false);
    }, [
      id,
      name,
      selectedSize,
      selectedColor,
      quantity,
      photo,
      defaultPrice,
      sizeDetails,
      colors,
      addItem,
      addToast,
    ]);

    const handleImageLoad = useCallback(() => setImageLoaded(true), []);
    const handleImageError = useCallback(() => setImageLoaded(true), []);

    return (
      <ProductStyled>
        <Column>
          <Link to={`/product/${id}`} className='flex justify-center'>
            <ImgProductSlider
              src={`${import.meta.env.VITE_RABBIT_PI_BASE_URL}/uploads/${photo}`}
              alt={name}
              imageloaded={imageLoaded.toString()}
              loading='lazy'
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </Link>
          <ScrollColorImg>
            {colors.map((color) => {
              const imageUrl = color.imgColor;
              const isSelected = photo === imageUrl;
              return (
                <ColorOption
                  key={color.name}
                  color={color}
                  imageUrl={`${import.meta.env.VITE_RABBIT_PI_BASE_URL}/uploads/${imageUrl}`}
                  isSelected={isSelected}
                  productName={name}
                  onColorSelect={handleColorSelect}
                />
              );
            })}
          </ScrollColorImg>
        </Column>

        <Column>
          <Span
            className='w-full overflow-hidden text-ellipsis whitespace-nowrap text-right font-Lato text-[18px] font-normal leading-normal text-black dark:text-white md:text-[20px]'
            dir='rtl'
          >
            {name}
          </Span>
          <Row dir='rtl' className='gap-1'>
            <img src='/Layer_1.svg' alt='' className='mb-[2px] w-3 self-end' />
            <span className='font-NotoSerif text-[25px] font-semibold text-gray-800 drop-shadow dark:text-white'>
              {priceDisplay}
            </span>
          </Row>
          <ButtonCard
            type='button'
            onClick={(e) => {
              e.preventDefault();
              setModalOpen(true);
            }}
            className='group'
          >
            <span className='font-Lato text-black transition-colors dark:text-white dark:group-hover:text-white'>
              أضف الى السلة
            </span>
            <MdAddShoppingCart className='h-5 w-5 text-blue-600 transition-colors group-hover:fill-blue-600 dark:fill-white dark:text-white dark:group-hover:fill-white' />
          </ButtonCard>
        </Column>

        {/* Modal */}
        {modalOpen && (
          <ProductModal
            product={{ id, name, price }}
            photo={photo}
            priceDisplay={priceDisplay}
            colors={colorsWithAvailability}
            sizes={sizesWithAvailability}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            quantity={quantity}
            maxQty={maxQty}
            isCurrentCombinationAvailable={isCurrentCombinationAvailable}
            getImagePath={(imageName) =>
              `${import.meta.env.VITE_RABBIT_PI_BASE_URL}/uploads/${imageName}`
            }
            onColorSelect={handleColorSelect}
            onSizeSelect={handleSizeSelect}
            onQuantityChange={setQuantity}
            onAddToCart={handleAddToCart}
            onClose={() => setModalOpen(false)}
          />
        )}
      </ProductStyled>
    );
  },
  (prev, next) => {
    if (prev.id !== next.id) return false;
    if (prev.price !== next.price) return false;
    if (prev.imgCover !== next.imgCover) return false;

    // compare arrays by stable keys
    const colorsEqual = shallowEqualBy(
      prev.colors,
      next.colors,
      (c) => `${c.name}|${c.imgColor}`
    );
    if (!colorsEqual) return false;

    const sizesEqual = shallowEqualBy(
      prev.sizeDetails,
      next.sizeDetails,
      (s) => `${s.sizeName}|${s.price}|${s.quantities?.length ?? 0}`
    );
    if (!sizesEqual) return false;

    return true; // props effectively same → skip re-render
  }
);

// Separate ColorOption component to reduce re-renders
const ColorOption = memo(function ColorOption({
  color,
  imageUrl,
  isSelected,
  productName,
  onColorSelect,
}) {
  return (
    <img
      src={imageUrl}
      className={`mx-auto aspect-square h-10 w-10 cursor-pointer rounded-full object-cover ${
        isSelected
          ? 'border-2 border-blue-500 shadow-md'
          : 'border border-gray-200'
      }`}
      alt={`${productName} - Color ${color.name}`}
      loading='lazy'
      onClick={() => onColorSelect(color)}
    />
  );
});

// Separate modal component to reduce main component complexity
const ProductModal = memo(function ProductModal({
  product,
  photo,
  priceDisplay,
  colors,
  sizes,
  selectedColor,
  selectedSize,
  quantity,
  maxQty,
  isCurrentCombinationAvailable,
  getImagePath,
  onColorSelect,
  onSizeSelect,
  onQuantityChange,
  onAddToCart,
  onClose,
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
    },
  });

  const watchedQuantity = watch('quantity');
  const watchedColor = watch('color');
  const watchedSize = watch('size');

  // Update parent state when form values change
  useEffect(() => {
    if (watchedColor && watchedColor !== selectedColor) {
      onColorSelect(colors.find((c) => c.name === watchedColor));
    }
  }, [watchedColor, selectedColor, onColorSelect, colors]);

  useEffect(() => {
    if (watchedSize && watchedSize !== selectedSize) {
      onSizeSelect(watchedSize);
    }
  }, [watchedSize, selectedSize, onSizeSelect]);

  useEffect(() => {
    if (watchedQuantity && watchedQuantity !== quantity) {
      onQuantityChange(watchedQuantity);
    }
  }, [watchedQuantity, quantity, onQuantityChange]);

  const onSubmit = (data) => {
    if (!isCurrentCombinationAvailable || maxQty === 0) {
      return;
    }
    console.log(data);
    onAddToCart();
  };

  const handleColorSelect = (color) => {
    if (!color.isAvailable) return; // Don't allow selection of unavailable colors
    setValue('color', color.name);
    onColorSelect(color);
  };

  const handleSizeSelect = (sizeInfo) => {
    if (!sizeInfo.isAvailable) return; // Don't allow selection of unavailable sizes
    setValue('size', sizeInfo.size);
    onSizeSelect(sizeInfo.size);
  };

  const handleQuantityChange = (newQuantity) => {
    const validQuantity = Math.max(1, Math.min(maxQty, newQuantity));
    setValue('quantity', validQuantity);
    onQuantityChange(validQuantity);
  };

  return (
    <>
      <div
        className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm dark:bg-black/70'
        onClick={onClose}
        onMouseDown={onClose}
      >
        <div
          dir='rtl'
          className='animate-fade-in relative mx-4 flex max-h-[90vh] flex-col gap-4 overflow-y-auto rounded-2xl bg-white p-2 shadow-2xl dark:bg-gray-900 sm:p-4 md:p-6 lg:mx-0 lg:min-w-[400px]'
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <button
            type='button'
            className='group absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-800'
            onClick={onClose}
            aria-label='إغلاق'
          >
            <svg
              className='h-5 w-5 transition-transform duration-200 group-hover:scale-110'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            <div className='flex flex-col items-center gap-2'>
              <img
                src={`${import.meta.env.VITE_RABBIT_PI_BASE_URL}/uploads/${photo}`}
                alt={product.name}
                className='h-24 w-24 rounded-lg border border-gray-200 object-contain shadow dark:border-gray-700'
              />
              <span className='text-lg font-bold text-gray-800 dark:text-gray-100'>
                {product.name}
              </span>
              <Row className='items-center gap-1'>
                <img src='/Layer_1.svg' alt='shekel' className='mt-2 h-3 w-3' />
                <span className='gap-1 font-NotoSerif text-2xl text-slate-200'>
                  {priceDisplay}
                </span>
              </Row>
            </div>

            <div className='flex flex-row gap-2'>
              <label className='font-medium text-gray-700 dark:text-gray-200'>
                اللون:
              </label>
              <div className='flex flex-row-reverse flex-wrap justify-end gap-2'>
                {colors.map((color, idx) => (
                  <button
                    type='button'
                    key={color.name || idx}
                    disabled={!color.isAvailable}
                    className={`relative flex items-center gap-1 rounded-lg border px-2 py-1 transition-all ${
                      !color.isAvailable
                        ? 'cursor-not-allowed border-gray-300 bg-gray-100 opacity-50 dark:border-gray-600 dark:bg-gray-800'
                        : watchedColor === color.name
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/40'
                          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                    }`}
                    onClick={() => handleColorSelect(color)}
                  >
                    <img
                      src={getImagePath(color.imgColor)}
                      alt={color.name}
                      className={`h-6 w-6 rounded-full border border-gray-300 object-cover dark:border-gray-600 ${
                        !color.isAvailable ? 'grayscale' : ''
                      }`}
                    />
                    <span
                      className={`text-xs font-bold ${
                        !color.isAvailable
                          ? 'text-gray-400 line-through dark:text-gray-500'
                          : 'text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      {color.name}
                    </span>
                    {!color.isAvailable && (
                      <span className='absolute -right-1 -top-1 text-xs font-bold text-red-500'>
                        ✕
                      </span>
                    )}
                  </button>
                ))}
              </div>
              {errors.color && (
                <span className='text-xs text-red-500'>
                  {errors.color.message}
                </span>
              )}
            </div>

            <div className='flex flex-row gap-2'>
              <label className='font-medium text-gray-700 dark:text-gray-200'>
                المقاس:
              </label>
              <div className='flex flex-row-reverse flex-wrap justify-end gap-2'>
                {sizes.map((sizeInfo, idx) => (
                  <button
                    type='button'
                    key={sizeInfo.size || idx}
                    disabled={!sizeInfo.isAvailable}
                    className={`relative rounded-lg border px-3 py-1 text-sm font-bold transition-all ${
                      !sizeInfo.isAvailable
                        ? 'cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400 line-through opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-500'
                        : watchedSize === sizeInfo.size
                          ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300 dark:border-gray-700 dark:text-gray-200'
                    }`}
                    onClick={() => handleSizeSelect(sizeInfo)}
                  >
                    {sizeInfo.size}
                    {!sizeInfo.isAvailable && (
                      <span className='absolute -right-1 -top-1 text-xs font-bold text-red-500'>
                        ✕
                      </span>
                    )}
                  </button>
                ))}
              </div>
              {errors.size && (
                <span className='text-xs text-red-500'>
                  {errors.size.message}
                </span>
              )}
            </div>

            <div className='flex flex-row gap-2'>
              <label className='font-medium text-gray-700 dark:text-gray-200'>
                الكمية:
              </label>
              <div className='flex items-center justify-end gap-2'>
                <button
                  type='button'
                  disabled={
                    !isCurrentCombinationAvailable ||
                    maxQty === 0 ||
                    watchedQuantity <= 1
                  }
                  className={`flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-xl font-bold text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 ${
                    !isCurrentCombinationAvailable ||
                    maxQty === 0 ||
                    watchedQuantity <= 1
                      ? 'cursor-not-allowed opacity-50'
                      : ''
                  }`}
                  onClick={() => handleQuantityChange(watchedQuantity - 1)}
                >
                  -
                </button>
                <input
                  {...register('quantity', {
                    required: 'الكمية مطلوبة',
                    min: {
                      value: 1,
                      message: 'الكمية يجب أن تكون 1 على الأقل',
                    },
                    max: {
                      value: maxQty || 1,
                      message: `الكمية لا يمكن أن تتجاوز ${maxQty || 0}`,
                    },
                    valueAsNumber: true,
                  })}
                  type='text'
                  min={1}
                  max={maxQty || 1}
                  disabled={!isCurrentCombinationAvailable || maxQty === 0}
                  className={`w-16 rounded-lg border border-gray-400 bg-white px-2 py-1 text-center font-Lato text-[15px] text-gray-700 shadow-sm transition-all focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-blue-800 ${
                    !isCurrentCombinationAvailable || maxQty === 0
                      ? 'cursor-not-allowed opacity-50'
                      : ''
                  }`}
                />
                <button
                  type='button'
                  disabled={
                    !isCurrentCombinationAvailable ||
                    maxQty === 0 ||
                    watchedQuantity >= maxQty
                  }
                  className={`flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-xl font-bold text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 ${
                    !isCurrentCombinationAvailable ||
                    maxQty === 0 ||
                    watchedQuantity >= maxQty
                      ? 'cursor-not-allowed opacity-50'
                      : ''
                  }`}
                  onClick={() => handleQuantityChange(watchedQuantity + 1)}
                >
                  +
                </button>
                <span className='text-xs text-gray-500 dark:text-gray-400'>
                  المتوفر: {maxQty}
                </span>
              </div>
              {errors.quantity && (
                <span className='text-xs text-red-500'>
                  {errors.quantity.message}
                </span>
              )}
            </div>

            <div className='mt-4 flex flex-row-reverse gap-2'>
              <button
                type='button'
                onClick={onClose}
                className='min-h-[44px] w-1/2 rounded-lg border border-gray-300 bg-gray-100 p-1 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-700'
              >
                متابعة التسوق
              </button>
              <button
                type='submit'
                disabled={!isCurrentCombinationAvailable || maxQty === 0}
                className={`flex min-h-[44px] w-1/2 items-center justify-center gap-2 rounded-lg p-1 text-sm font-bold text-white shadow-md transition-all duration-200 ${
                  !isCurrentCombinationAvailable || maxQty === 0
                    ? 'cursor-not-allowed bg-gray-400'
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                }`}
              >
                {!isCurrentCombinationAvailable || maxQty === 0
                  ? 'غير متوفر'
                  : 'أضف الى السلة'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className='fixed inset-0 z-40' onClick={onClose}></div>
    </>
  );
});
