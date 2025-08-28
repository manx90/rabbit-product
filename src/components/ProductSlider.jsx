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

export default function ProductSlider({
  products = [],
  subCategoryId,
  categoryId,
  likeProduct = false,
}) {
  const navigate = useNavigate();
  return (
    <ProductSliderStyled>
      {products?.map((product, index) => (
        <Product key={product.id || index} product={product} />
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
}

// Memoize the Product component to prevent unnecessary re-renders
export const Product = memo(function Product({ product }) {
  // Memoize image path calculation
  const mainImage = useMemo(() => {
    return (
      product.imgCover ||
      (product.colors && product.colors[0]?.imgColor) ||
      'product.png'
    );
  }, [product.imgCover, product.colors]);

  const [photo, setPhoto] = useState(mainImage);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { addItem } = useCart();
  const { addToast } = useToastContext
    ? useToastContext()
    : { addToast: () => {} };

  // Memoize price display calculation to prevent recalculation on every render
  const priceDisplay = useMemo(() => {
    if (!product?.sizeDetails || product.sizeDetails.length === 0) {
      return product?.price || 0;
    }

    // Get all prices from size details
    const prices = product.sizeDetails
      .map((size) => size.price)
      .filter((price) => price != null);

    if (prices.length === 0) {
      return product?.price || 0;
    }

    // Check if all prices are the same
    const uniquePrices = [...new Set(prices)];

    if (uniquePrices.length === 1) {
      // All sizes have same price
      return uniquePrices[0];
    } else {
      // Different prices - show range
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      return `${minPrice}-${maxPrice}`;
    }
  }, [product?.sizeDetails, product?.price]);

  // Memoize default price calculation
  const defaultPrice = useMemo(() => {
    return product?.sizeDetails && product.sizeDetails.length > 0
      ? product.sizeDetails[0].price
      : product?.price || 0;
  }, [product?.sizeDetails, product?.price]);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);

  // Memoize initial color and size values
  const initialColor = useMemo(
    () => product.colors?.[0]?.name || '',
    [product.colors]
  );
  const initialSize = useMemo(
    () => product.sizeDetails?.[0]?.sizeName || '',
    [product.sizeDetails]
  );

  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [quantity, setQuantity] = useState(1);

  // Memoize sizes and colors arrays
  const sizes = useMemo(
    () => product.sizeDetails?.map((s) => s.sizeName) || [],
    [product.sizeDetails]
  );
  const colors = useMemo(() => product.colors || [], [product.colors]);

  // Memoize max quantity calculation
  const maxQty = useMemo(() => {
    const sizeDetail = product.sizeDetails?.find(
      (s) => s.sizeName === selectedSize
    );
    if (!sizeDetail) return 10;
    const q = sizeDetail.quantities?.find((q) => q.colorName === selectedColor);
    return q?.quantity || 10;
  }, [product.sizeDetails, selectedSize, selectedColor]);

  // Memoize parsed quantity to avoid recalculation
  const parsedQuantity = useMemo(() => {
    return typeof product.quantity === 'string'
      ? parseInt(product.quantity.trim(), 10)
      : product.quantity;
  }, [product.quantity]);

  // Memoize getImagePath function
  const getImagePath = useCallback((imageName) => {
    return imageName;
  }, []);

  // Optimize color selection handler
  const handleColorSelect = useCallback(
    (color) => {
      const sizeDetail = product.sizeDetails?.find(
        (s) => s.sizeName === selectedSize
      );
      let matchedColorName = color.name;
      if (sizeDetail && sizeDetail.quantities) {
        const found = sizeDetail.quantities.find(
          (q) => q.colorName.trim() === color.name.trim()
        );
        if (found) matchedColorName = found.colorName;
      }
      setSelectedColor(matchedColorName);
      setImageLoaded(false);
      setPhoto(getImagePath(color.imgColor));
    },
    [product.sizeDetails, selectedSize, getImagePath]
  );

  // Optimize add to cart handler
  const handleAddToCart = useCallback(() => {
    const sizeDetail = product.sizeDetails?.find(
      (s) => s.sizeName === selectedSize
    );
    let matchedColorName = selectedColor;
    let availableQuantity = 1;
    if (sizeDetail && sizeDetail.quantities) {
      const found = sizeDetail.quantities.find(
        (q) => q.colorName.trim() === selectedColor.trim()
      );
      if (found) {
        matchedColorName = found.colorName;
        availableQuantity = found.quantity;
      }
    }
    // Extract available sizes and colors
    const availableSizes =
      product.sizeDetails?.map((size) => size.sizeName) || [];
    const availableColors = product.colors?.map((color) => color.name) || [];

    addItem({
      ...product,
      productId: product.id,
      sizeName: selectedSize,
      colorName: matchedColorName,
      quantity: availableQuantity,
      qty: quantity,
      image: photo,
      price: defaultPrice,
      availableSizes,
      availableColors,
    });
    addToast({
      title: 'تمت الإضافة!',
      description: `تم إضافة المنتج (${product.name}) إلى السلة بنجاح.`,
    });
    setModalOpen(false);
  }, [
    product,
    selectedSize,
    selectedColor,
    quantity,
    photo,
    defaultPrice,
    addItem,
    addToast,
  ]);

  // Memoize image load handlers
  const handleImageLoad = useCallback(() => setImageLoaded(true), []);
  const handleImageError = useCallback(() => setImageLoaded(true), []);

  return (
    <ProductStyled>
      <Column>
        <Link to={`/product/${product.id}`} className='flex justify-center'>
          {/* {!imageLoaded && <ImageLoading />} */}
          <ImgProductSlider
            src={photo}
            alt={product.name}
            imageloaded={imageLoaded.toString()}
            loading='lazy'
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </Link>
        <ScrollColorImg>
          {colors.map((color, index) => {
            const imageUrl = getImagePath(color.imgColor);
            const isSelected = photo === imageUrl;
            return (
              <ColorOption
                key={color.name}
                color={color}
                imageUrl={imageUrl}
                isSelected={isSelected}
                productName={product.name}
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
          {product.name}
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
          product={product}
          photo={photo}
          priceDisplay={priceDisplay}
          colors={colors}
          sizes={sizes}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          quantity={quantity}
          maxQty={maxQty}
          getImagePath={getImagePath}
          onColorSelect={handleColorSelect}
          onSizeSelect={setSelectedSize}
          onQuantityChange={setQuantity}
          onAddToCart={handleAddToCart}
          onClose={() => setModalOpen(false)}
        />
      )}
    </ProductStyled>
  );
});

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
    console.log(data);
    onAddToCart();
  };

  const handleColorSelect = (color) => {
    setValue('color', color.name);
    onColorSelect(color);
  };

  const handleSizeSelect = (size) => {
    setValue('size', size);
    onSizeSelect(size);
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
                src={photo}
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
                    className={`flex items-center gap-1 rounded-lg border px-2 py-1 transition-all ${
                      watchedColor === color.name
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/40'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                    onClick={() => handleColorSelect(color)}
                  >
                    <img
                      src={getImagePath(color.imgColor)}
                      alt={color.name}
                      className='h-6 w-6 rounded-full border border-gray-300 object-cover dark:border-gray-600'
                    />
                    <span className='text-xs font-bold text-gray-700 dark:text-gray-200'>
                      {color.name}
                    </span>
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
                {sizes.map((size, idx) => (
                  <button
                    type='button'
                    key={size || idx}
                    className={`rounded-lg border px-3 py-1 text-sm font-bold transition-all ${
                      watchedSize === size
                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200'
                        : 'border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-200'
                    }`}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
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
                  className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-xl font-bold text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200'
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
                      value: maxQty,
                      message: `الكمية لا يمكن أن تتجاوز ${maxQty}`,
                    },
                    valueAsNumber: true,
                  })}
                  type='text'
                  min={1}
                  max={maxQty}
                  className='w-16 rounded-lg border border-gray-400 bg-white px-2 py-1 text-center font-Lato text-[15px] text-gray-700 shadow-sm transition-all focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-blue-800'
                />
                <button
                  type='button'
                  className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-xl font-bold text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200'
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
                className='flex min-h-[44px] w-1/2 items-center justify-center gap-2 rounded-lg bg-blue-600 p-1 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg'
              >
                أضف الى السلة
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className='fixed inset-0 z-40' onClick={onClose}></div>
    </>
  );
});
