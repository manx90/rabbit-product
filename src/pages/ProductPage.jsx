/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-quotes */
/* eslint-disable tailwindcss/enforces-shorthand */
import { ProductSlider } from '@/components/ProductSlider';
import { useToastContext } from '@/components/ui/toast';
import WhatsAppButton from '@/components/whatsApp';
import { useCart } from '@/hooks/useCartRedux';
import { useCategoryProducts } from '@/hooks/useCategoryProducts';
import { useProductPage } from '@/hooks/useProductPageRedux';
import { Column, Row } from '@/lib/css/Product';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MdAddShoppingCart } from 'react-icons/md';
import { RxSize } from 'react-icons/rx';
export default function ProductPage() {
  const {
    product,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    handleQuantityChange,
    loading,
    error,
  } = useProductPage();

  const { addItem } = useCart();
  const { addToast } = useToastContext();
  const [MainImage, setMainImage] = useState();

  const handleColorSelect = (colorName) => {
    setSelectedColor(colorName);
    setMainImage(null);
  };

  const handleAddToCart = () => {
    if (!product || !selectedColor || !selectedSize) {
      addToast({
        title: 'خطأ في الاختيار',
        description: 'يرجى اختيار اللون والحجم',
      });
      return;
    }

    // Find the selected color object
    const selectedColorObj = product.colors?.find(
      (c) => c.name === selectedColor
    );

    // Find the selected size details
    const selectedSizeDetail = product.sizeDetails?.find(
      (s) => s.sizeName === selectedSize
    );

    if (!selectedSizeDetail) {
      addToast({
        title: 'خطأ في المقاس',
        description: 'حجم غير صحيح',
      });
      return;
    }

    // Get available quantity for the selected size and color
    let availableQuantity = 1;
    if (selectedSizeDetail && selectedSizeDetail.quantities) {
      const found = selectedSizeDetail.quantities.find(
        (q) => q.colorName.trim() === selectedColor.trim()
      );
      if (found) {
        availableQuantity = found.quantity;
      }
    }

    // Get available sizes and colors arrays like ProductSlider does
    const availableSizes =
      product.sizeDetails?.map((size) => size.sizeName) || [];
    const availableColors = product.colors?.map((color) => color.name) || [];

    // Create cart item with same structure as ProductSlider
    const cartItem = {
      ...product, // Spread all product data first
      productId: product.id,
      sizeName: selectedSize,
      colorName: selectedColor,
      quantity: availableQuantity, // Use available stock, not user quantity
      qty: quantity, // User's selected quantity
      image: selectedColorObj?.imgColor || product.imgCover,
      price: selectedSizeDetail.price,
      availableSizes,
      availableColors,
    };

    addItem(cartItem);
    addToast({
      title: 'تمت الإضافة!',
      description: `تم إضافة المنتج (${product.name}) إلى السلة بنجاح.`,
    });
  };

  if (error) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <p className='text-red-500'>{error}</p>
        <p className='mt-2 text-gray-600'>Redirecting to home page...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <p className='text-gray-500'>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  // Generate dynamic meta tags for the product
  const productTitle = product?.name || 'منتج';
  const productDescription =
    product?.description ||
    `اكتشف ${productTitle} في متجر الأرانب. أفضل الأسعار والجودة المضمونة`;
  const productPrice = product?.price || product?.sizeDetails?.[0]?.price || 0;
  const productImage =
    product?.imgCover || product?.colors?.[0]?.imgColor || 'product.png';
  const productUrl = `${window.location.origin}/product/${product?.id}`;
  const imageUrl = `${import.meta.env.VITE_RABBIT_PI_BASE_URL}/uploads/${productImage}`;

  return (
    <div>
      <Helmet>
        {/* Product page specific meta tags */}
        <title>{productTitle} - Rabbit Store | متجر الأرانب</title>
        <meta name='description' content={productDescription} />
        <meta
          name='keywords'
          content={`${productTitle}, منتج, تسوق, متجر الأرانب, ${productPrice} جنيه`}
        />

        {/* Open Graph tags for product */}
        <meta property='og:title' content={`${productTitle} - Rabbit Store`} />
        <meta property='og:description' content={productDescription} />
        <meta property='og:url' content={productUrl} />
        <meta property='og:type' content='product' />
        <meta property='og:image' content={imageUrl} />
        <meta property='og:image:width' content='800' />
        <meta property='og:image:height' content='800' />
        <meta property='og:image:alt' content={productTitle} />
        <meta property='product:price:amount' content={productPrice} />
        <meta property='product:price:currency' content='EGP' />

        {/* Twitter tags for product */}
        <meta name='twitter:title' content={`${productTitle} - Rabbit Store`} />
        <meta name='twitter:description' content={productDescription} />
        <meta name='twitter:image' content={imageUrl} />
        <meta name='twitter:image:alt' content={productTitle} />

        {/* Structured data for product */}
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: productTitle,
            description: productDescription,
            image: imageUrl,
            url: productUrl,
            brand: {
              '@type': 'Brand',
              name: 'Rabbit Store',
            },
            offers: {
              '@type': 'Offer',
              price: productPrice,
              priceCurrency: 'EGP',
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: 'Rabbit Store',
              },
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.5',
              reviewCount: '100',
            },
          })}
        </script>
      </Helmet>
      <div className='relative m-[16px] flex flex-col justify-center gap-2 lg:mt-16'>
        <Description
          MainImage={MainImage}
          setMainImage={setMainImage}
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          quantity={quantity}
          onColorSelect={handleColorSelect}
          onSizeSelect={setSelectedSize}
          onQuantityChange={handleQuantityChange}
          onAddToCart={handleAddToCart}
        />
      </div>
      <LikeProduct product={product} />
      <WhatsAppButton product={product} />
      <VideoDraggable link={product.videoLink} />
    </div>
  );
}
function Photos({ product, selectedColor }) {
  const selectedColorObj = product.colors?.find(
    (c) => c.name === selectedColor
  );
  const mainImage =
    selectedColorObj?.imgColor || product.imgCover || product.images?.[0];

  const colorImages =
    product.colors?.map((c) => c.imgColor).filter(Boolean) || [];
  const productImages = product.images || [];
  const allThumbnails = [...new Set([...productImages, ...colorImages])];

  // State for current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get current image to display
  const currentImage = allThumbnails[currentImageIndex] || mainImage;

  // Navigation functions
  const goToNext = (e) => {
    if (e) {
      e.preventDefault(); // Prevent form submission
      e.stopPropagation(); // Stop event bubbling
    }
    setCurrentImageIndex((prev) =>
      prev === allThumbnails.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrevious = (e) => {
    if (e) {
      e.preventDefault(); // Prevent form submission
      e.stopPropagation(); // Stop event bubbling
    }
    setCurrentImageIndex((prev) =>
      prev === 0 ? allThumbnails.length - 1 : prev - 1
    );
  };

  // Touch/swipe functionality
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    // Don't prevent default here to allow button clicks
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    // Don't prevent default here to allow button clicks
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e) => {
    // Don't prevent default here to allow button clicks
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext(e);
    }
    if (isRightSwipe) {
      goToPrevious(e);
    }
  };

  const handleColorImageClick = (colorImage) => {
    const imageIndex = allThumbnails.findIndex((img) => img === colorImage);
    if (imageIndex !== -1) {
      setCurrentImageIndex(imageIndex);
    }
  };

  useEffect(() => {
    window.updateCarouselImage = handleColorImageClick;
    return () => {
      delete window.updateCarouselImage;
    };
  }, [allThumbnails]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious(e);
      } else if (e.key === 'ArrowRight') {
        goToNext(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className='relative w-full lg:w-1/2'>
      <div
        className='relative h-[400px] w-full overflow-hidden rounded-2xl bg-white shadow-lg lg:h-[600px]'
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={(e) => e.preventDefault()}
      >
        <img
          src={`${import.meta.env.VITE_RABBIT_PI_BASE_URL}/uploads/${currentImage}`}
          alt={`${product.name} - صورة ${currentImageIndex + 1}`}
          className='h-full w-full object-contain p-4 transition-all duration-300'
        />

        {allThumbnails.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              onTouchEnd={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className='group absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full bg-white/80 text-gray-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white active:scale-95 active:bg-white/90'
              aria-label='الصورة السابقة'
              style={{
                touchAction: 'manipulation',
              }}
            >
              <svg
                className='h-6 w-6 transition-colors group-hover:text-blue-600 group-active:text-blue-700'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>

            <button
              onClick={goToNext}
              onTouchEnd={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className='group absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full bg-white/80 text-gray-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white active:scale-95 active:bg-white/90'
              aria-label='الصورة التالية'
              style={{
                touchAction: 'manipulation',
              }}
            >
              <svg
                className='h-6 w-6 transition-colors group-hover:text-blue-600 group-active:text-blue-700'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>
          </>
        )}

        {/* Swipe Indicator (only on mobile) */}
        {/* {allThumbnails.length > 1 && (
					<div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
						اسحب للتنقل
					</div>
				)} */}
      </div>
    </div>
  );
}
function Description({
  product,
  selectedColor,
  selectedSize,
  quantity,
  onColorSelect,
  onSizeSelect,
  onQuantityChange,
  onAddToCart,
  setMainImage,
  MainImage,
}) {
  const [openDimensions, setOpenDimensions] = useState(false);
  // Ref to access Photos component functions
  const photosRef = useRef(null);
  // Find the selected sizeDetail
  const selectedSizeDetail = product.sizeDetails?.find(
    (s) => s.sizeName === selectedSize
  );
  const currentPrice = selectedSizeDetail?.price || 0;
  const discount = 20; // You might want to add this to your product data
  const discountedPrice = currentPrice * (1 - discount / 100);

  // Find the quantity for the selected color in the selected size
  const colorQuantity =
    selectedSizeDetail?.quantities?.find((q) => q.colorName === selectedColor)
      ?.quantity || 0;

  // Check if product has different prices for different sizes
  const hasDifferentPrices = () => {
    if (!product.sizeDetails || product.sizeDetails.length <= 1) {
      return false;
    }
    const firstPrice = product.sizeDetails[0]?.price;
    return product.sizeDetails.some((size) => size.price !== firstPrice);
  };

  return (
    <div className='relative mx-2 mt-16 md:mx-0 lg:mt-0'>
      <form dir='rtl' className='mx-auto flex flex-col gap-8 lg:flex-row'>
        <Column className='w-full gap-4'>
          <Row className='w-full flex-col lg:flex-row lg:gap-8'>
            <Photos
              product={product}
              selectedColor={selectedColor}
              MainImage={MainImage}
              setMainImage={setMainImage}
              ref={photosRef}
            />

            <Column className='gap-8'>
              <Column className='gap-4'>
                <Row className='items-center justify-between'>
                  <span
                    dir='rtl'
                    className='ml-auto font-Lato text-2xl font-bold text-slate-800 dark:text-white lg:text-2xl'
                  >
                    {product.name}
                  </span>
                </Row>

                <span
                  dir='rtl'
                  className='ml-auto text-[16px] text-[#3e3e3e] dark:text-gray-400'
                >
                  {product.description}
                </span>
                <span
                  dir='rtl'
                  className='flex gap-2 rounded-lg font-NotoSerif text-4xl font-semibold tracking-wider text-slate-800 drop-shadow-lg dark:text-white'
                >
                  <span className='font-Lato text-[18px] font-semibold text-[#2c2c2c] dark:text-white'>
                    السعر :
                  </span>
                  <img
                    src='/Layer_1.svg'
                    alt='شيكل'
                    className='h-4 w-4 self-end drop-shadow'
                  />
                  {currentPrice}
                </span>
              </Column>
              {hasDifferentPrices() && (
                <div className='ml-auto flex w-fit flex-row-reverse items-end gap-2 rounded-lg border border-[#FFD6D6] bg-[#FFF0F0] px-4 py-2 shadow-sm'>
                  <svg
                    dir='rtl'
                    className='mr-auto h-5 w-5 animate-bounce text-[#DF4444]'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z'
                    />
                  </svg>
                  <span
                    dir='rtl'
                    className='text-right font-Lato text-[15px] font-semibold text-[#DF4444] md:text-[17px]'
                  >
                    ملاحظة:{' '}
                    <span className='font-normal'>السعر يختلف حسب الحجم</span>
                  </span>
                </div>
              )}

              <div className='flex flex-col gap-4 lg:gap-8'>
                <fieldset className='m-0 flex flex-row flex-wrap items-center gap-3 border-0 p-0'>
                  <span className='mb-2 ml-2 mt-3 max-w-[450px] text-right text-black dark:text-white'>
                    القياس :
                  </span>

                  {product.sizeDetails?.map((sizeDetail) => {
                    // Check if this size has any available colors
                    const hasAvailableColors =
                      sizeDetail.quantities?.some((q) => q.quantity > 0) ||
                      false;

                    return (
                      <label
                        key={sizeDetail.sizeName}
                        className={`relative flex h-[44px] min-w-[60px] items-center justify-center rounded-lg border-2 px-4 py-2 font-Lato text-[18px] shadow-sm transition-all duration-200 ${
                          !hasAvailableColors
                            ? 'cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400 opacity-50'
                            : selectedSize === sizeDetail.sizeName
                              ? 'cursor-pointer border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-200'
                              : 'cursor-pointer border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                        } `}
                        style={{
                          userSelect: 'none',
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();

                          // Only allow selection if size has available colors
                          if (!hasAvailableColors) {
                            return;
                          }

                          onSizeSelect(sizeDetail.sizeName);
                        }}
                      >
                        <input
                          type='radio'
                          name='size'
                          value={sizeDetail.sizeName}
                          checked={selectedSize === sizeDetail.sizeName}
                          disabled={!hasAvailableColors}
                          onChange={() => onSizeSelect(sizeDetail.sizeName)}
                          className='absolute h-0 w-0 opacity-0'
                          tabIndex={0}
                          aria-label={sizeDetail.sizeName}
                        />
                        <span className='pointer-events-none'>
                          {sizeDetail.sizeName}
                        </span>
                        {selectedSize === sizeDetail.sizeName && (
                          <span className='absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-xs text-white shadow-md'>
                            ✓
                          </span>
                        )}
                      </label>
                    );
                  })}
                  {product.imgSizeChart && product.imgMeasure && (
                    <button
                      type='button'
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenDimensions(true);
                      }}
                      className='flex w-fit items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 shadow-sm transition-all duration-200 hover:bg-blue-100 hover:text-blue-700 hover:shadow-md dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 dark:hover:text-blue-300'
                    >
                      <RxSize className='h-4 w-4' />
                      <span>اضغط هنا لمعرفة مقاسك</span>
                    </button>
                  )}
                </fieldset>

                <fieldset className='m-0 flex flex-row flex-wrap items-center justify-start gap-2 border-0 p-0'>
                  <span className='mb-2 ml-2 mt-2 max-w-[450px] text-right text-black dark:text-white'>
                    اللون :
                  </span>

                  {product.colors?.map((color) => {
                    // Check if this specific color has quantity for the selected size
                    const selectedSizeDetail = product.sizeDetails?.find(
                      (s) => s.sizeName === selectedSize
                    );
                    const colorQuantityForSize =
                      selectedSizeDetail?.quantities?.find(
                        (q) => q.colorName === color.name
                      )?.quantity || 0;
                    const isColorAvailable = colorQuantityForSize > 0;

                    return (
                      <div
                        key={color.name}
                        className='flex flex-col items-center gap-1'
                      >
                        <div
                          className={`relative flex h-14 w-14 items-center justify-center rounded-lg border-[1px] object-cover p-1 transition ${
                            !isColorAvailable
                              ? 'cursor-not-allowed border-gray-300 opacity-50'
                              : selectedColor === color.name
                                ? 'cursor-pointer border-blue-400'
                                : 'cursor-pointer border-[#535353]'
                          }`}
                          style={{
                            boxSizing: 'border-box',
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            // Only allow selection if color is available
                            if (!isColorAvailable) {
                              return;
                            }

                            // Change selected color
                            onColorSelect(color.name);

                            // Update carousel to show this color image
                            if (window.updateCarouselImage) {
                              window.updateCarouselImage(color.imgColor);
                            }
                          }}
                        >
                          <input
                            type='radio'
                            name='color'
                            value={color.name}
                            checked={selectedColor === color.name}
                            disabled={!isColorAvailable}
                            onChange={() => onColorSelect(color.name)}
                            className='absolute h-0 w-0 opacity-0'
                            aria-label={color.name}
                          />
                          <img
                            src={`${import.meta.env.VITE_RABBIT_PI_BASE_URL}/uploads/${color.imgColor}`}
                            // src={color.imgColor}
                            alt={color.name}
                            className='h-full w-full rounded-md object-cover'
                          />
                          {!isColorAvailable && (
                            <div className='absolute inset-0 flex items-center justify-center rounded-md bg-black/60'>
                              <div className='relative'>
                                <span className='block px-1 text-center text-xs font-bold text-white'>
                                  غير متوفر
                                </span>
                                <div className='absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-red-500'></div>
                              </div>
                            </div>
                          )}
                          {selectedColor === color.name && (
                            <div className='absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-blue-400'>
                              <svg
                                width='16'
                                height='16'
                                viewBox='0 0 16 16'
                                fill='none'
                              >
                                <path
                                  d='M4 8.5L7 11.5L12 5.5'
                                  stroke='white'
                                  strokeWidth='2'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <span className='max-w-[56px] truncate text-center text-xs text-black dark:text-white'>
                          {color.name}
                        </span>
                      </div>
                    );
                  })}
                </fieldset>
                {selectedColor ? (
                  <div className='my-2 flex flex-row items-center gap-2'>
                    <span
                      dir='rtl'
                      className='text-[18px] font-medium text-black dark:text-white'
                    >
                      المتوفر :
                    </span>
                    <div
                      dir='rtl'
                      className='flex min-w-[48px] items-center justify-center rounded-full border border-green-400 bg-green-100 px-4 py-1'
                    >
                      <span
                        dir='rtl'
                        className='text-[20px] font-bold tracking-widest text-green-600'
                      >
                        {colorQuantity} قطع
                      </span>
                    </div>
                    <span className='mr-2 flex items-center gap-1 text-[14px] text-black dark:text-white'></span>
                  </div>
                ) : (
                  <div className='my-2 flex flex-row items-center gap-2'>
                    <span
                      dir='rtl'
                      className='text-[18px] font-medium text-red-600 dark:text-red-400'
                    >
                      يرجى اختيار لون متوفر
                    </span>
                  </div>
                )}

                <div className='flex flex-row items-center justify-center gap-2'>
                  <div
                    className={`flex h-[44px] w-1/2 max-w-[150px] flex-row-reverse items-center justify-between rounded-lg border border-[#E0E0E0] shadow-sm ${
                      selectedColor ? 'bg-[#FAFAFA]' : 'bg-gray-100 opacity-50'
                    }`}
                  >
                    <button
                      type='button'
                      onClick={() => onQuantityChange(quantity + 1)}
                      className='flex h-10 w-10 items-center justify-center rounded-lg p-[4px] py-3 text-xl font-bold text-[#0095FF] transition hover:bg-[#E6F4FF]'
                      aria-label='زيادة الكمية'
                      tabIndex={0}
                      disabled={!selectedColor}
                    >
                      +
                    </button>
                    <input
                      type='text'
                      name='quantity'
                      inputMode='numeric'
                      pattern='[0-9]*'
                      min={1}
                      max={colorQuantity}
                      value={quantity}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        const num = parseInt(val, 10);
                        if (!isNaN(num)) onQuantityChange(num);
                      }}
                      className='w-8 select-none border-none bg-transparent text-center font-Lato text-lg font-semibold text-[#232323] focus:outline-none'
                      aria-label='الكمية'
                      disabled={!selectedColor}
                    />
                    <button
                      type='button'
                      onClick={() =>
                        onQuantityChange(quantity > 1 ? quantity - 1 : 1)
                      }
                      className='flex h-10 w-10 items-center justify-center rounded-lg text-xl font-bold text-[#DF4444] transition hover:bg-[#FFF0F0]'
                      aria-label='إنقاص الكمية'
                      disabled={quantity <= 1 || !selectedColor}
                      tabIndex={0}
                    >
                      -
                    </button>
                  </div>
                  <button
                    type='button'
                    onClick={onAddToCart}
                    className={`group flex h-[44px] w-1/2 flex-row-reverse items-center justify-center gap-[4px] rounded-lg border-2 border-solid p-[4px] py-3 shadow transition-colors ${
                      selectedColor
                        ? 'border-[#ecebebf0] bg-[#fefefe] hover:bg-blue-50 dark:border-blue-800 dark:bg-gradient-to-r dark:from-blue-900 dark:to-blue-700 dark:hover:bg-blue-800/80'
                        : 'cursor-not-allowed border-gray-300 bg-gray-100 opacity-50'
                    }`}
                    disabled={!selectedColor}
                  >
                    <span
                      className={`font-Lato transition-colors ${
                        selectedColor
                          ? 'text-black dark:text-white dark:group-hover:text-white'
                          : 'text-gray-500'
                      }`}
                    >
                      أضف الى السلة
                    </span>
                    <MdAddShoppingCart
                      className={`h-5 w-5 transition-colors ${
                        selectedColor
                          ? 'text-blue-600 group-hover:fill-blue-600 dark:fill-white dark:text-white dark:group-hover:fill-white'
                          : 'text-gray-500'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </Column>
          </Row>
          {product.imgSizeChart && product.imgMeasure && (
            <Dimensions
              product={product}
              openDimensions={openDimensions}
              setOpenDimensions={setOpenDimensions}
            />
          )}
        </Column>
        {/* for name and photos and disc */}
      </form>
      <Column
        dir='rtl'
        className='mx-auto mt-4 justify-center gap-10 border-y border-gray-200 p-4 dark:border-gray-700 lg:flex-row'
      >
        <div className='mx-auto flex w-64 flex-col items-center justify-center'>
          <img src='/okOrder.svg' alt='' className='text-blue h-20 w-20' />
          <Row>
            <span className='py-3 text-[20px] font-semibold text-[#535353] dark:text-white'>
              الدفع والتوصيل:
            </span>
          </Row>
          <span className='text-center text-[14px] text-gray-500 dark:text-gray-300'>
            ببساطة نقوم بايصال المنتج لغاية منزلك وتقوم بدفع الثمن لموظف
            التوصيل.
          </span>
        </div>
        <div className='mx-auto flex w-64 flex-col items-center justify-center'>
          <img src='/return.svg' alt='' className='h-20 w-20' />
          <span className='py-3 text-[20px] font-semibold text-[#535353] dark:text-white'>
            التبديل:
          </span>
          <span className='text-center text-[14px] text-gray-500 dark:text-gray-300'>
            تواصل معنا عبر رسائل الواتس اب لإتمام عملية التبديل و نقوم بايصال
            المنتج ل باب منزلك مع دفع أجرة التوصيل .
          </span>
        </div>
        <div className='mx-auto flex w-64 flex-col items-center justify-center'>
          <img src='/offOrder.svg' alt='' className='h-20 w-20' />
          <span className='py-3 text-[20px] font-semibold text-[#535353] dark:text-white'>
            الغاء الطلب:
          </span>
          <span className='text-center text-[14px] text-gray-500 dark:text-gray-300'>
            بعد إتمام طلبك و اردت إلغاء الطلب تواصل معنا عبر الواتس
            اب ل إلغاء الطلب
          </span>
        </div>
      </Column>
    </div>
  );
}

function LikeProduct({ product }) {
  const limit = 10;
  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
  } = useCategoryProducts(product.category.id, product.subCategory.id, limit);

  // Fix image URLs to prevent duplication
  const fixedProducts = products.map((product) => {
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

    return {
      ...product,
      imgCover: fixedImgCover,
      colors: fixedColors,
    };
  });

  return (
    <Column className='mr-4'>
      <span
        dir='rtl'
        className='text-2xl font-medium text-black dark:text-white lg:text-[16px]'
      >
        المنتجات المشابهة
      </span>
      <ProductSlider
        products={fixedProducts}
        subCategoryId={product.subCategory.id}
        categoryId={product.category.id}
        likeProduct={true}
      />
    </Column>
  );
}

function Dimensions({ product, openDimensions = true, setOpenDimensions }) {
  if (!product.imgSizeChart && !product.imgMeasure) return null;
  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black/50 transition-all duration-300 ${
        openDimensions
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenDimensions(false);
      }}
    >
      <div
        className='relative h-[90vh] max-h-[600px] w-[90%] max-w-[400px] overflow-hidden rounded-t-3xl border-0 border-gray-200 bg-white p-4 shadow-2xl dark:border-gray-800 dark:bg-gray-900 md:rounded-3xl md:border'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpenDimensions(false);
          }}
          className='absolute left-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-800'
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

        <div
          dir='rtl'
          className='flex h-full flex-col items-center justify-center gap-4'
        >
          {product.imgSizeChart && (
            <img
              src={product.imgSizeChart}
              alt='جدول المقاسات'
              className='max-h-[45%] max-w-full object-contain'
            />
          )}
          {product.imgMeasure && (
            <img
              src={product.imgMeasure}
              alt='دليل القياسات'
              className='max-h-[45%] max-w-full object-contain'
            />
          )}
        </div>
      </div>
    </div>
  );
}

function VideoDraggable({
  link = 'https://www.youtube.com/embed/gyMwXuJrbJQ',
}) {
  if (link === null) {
    return;
  }
  const [position, setPosition] = useState({ x: 0, y: 96 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    document.body.style.overflow = 'hidden';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    e.stopPropagation();
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.overflow = '';
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
    document.body.style.overflow = 'hidden';
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    document.body.style.overflow = '';
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, {
        passive: false,
      });
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      });
      document.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.body.style.overflow = '';
    };
  }, [isDragging, dragStart]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed z-50 h-auto w-auto cursor-move select-none rounded-lg ${
        isDragging ? 'opacity-80' : ''
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        transition: isDragging ? 'none' : 'transform 0.2s ease',
        touchAction: 'none',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className='absolute -right-2 -top-2 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100'
      >
        <svg
          className='h-4 w-4 text-gray-600'
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

      {/* YouTube video */}
      <div
        className='relative h-40 w-28 overflow-hidden rounded-lg'
        style={{ pointerEvents: 'none' }}
      >
        <iframe
          className='absolute left-0 top-0 h-40 w-28'
          src={`${link}?autoplay=1&mute=1&loop=1&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1`}
          title='YouTube video'
          allow='autoplay; encrypted-media'
          muted
        ></iframe>
      </div>
    </div>
  );
}
