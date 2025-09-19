import { useToastContext } from '@/components/ui/toast';
import { useCart } from '@/hooks/useCartRedux';
import {
  ButtonCard,
  Column,
  ImgProductSlider,
  Product as ProductStyled,
  Row,
  ScrollColorImg,
  Span,
} from '@/lib/css/Product';
import { memo } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ProductModal } from './ProductModal';
import { ColorOption } from './ColorOption';
import { useProductState, useProductCart } from '../hooks/useProductState';
import { shallowEqualBy } from '../utils/productUtils';

export const Product = memo(
  function Product({
    price,
    sizeDetails = [],
    colors = [],
    imgCover,
    name,
    id,
  }) {
    // Use custom hooks for state management
    const productState = useProductState({
      price,
      sizeDetails,
      colors,
      imgCover,
      name,
      id,
    });

    const {
      photo,
      imageLoaded,
      modalOpen,
      selectedColor,
      selectedSize,
      quantity,
      priceDisplay,
      defaultPrice,
      colorsWithAvailability,
      sizesWithAvailability,
      maxQty,
      isCurrentCombinationAvailable,
      setModalOpen,
      setQuantity,
      handleColorSelect,
      handleSizeSelect,
      handleImageLoad,
      handleImageError,
    } = productState;

    // Cart functionality
    const { addItem } = useCart();
    const { addToast } = useToastContext
      ? useToastContext()
      : { addToast: () => {} };

    const { handleAddToCart } = useProductCart(
      { id, name, sizeDetails, colors },
      { selectedSize, selectedColor, quantity, photo, defaultPrice },
      addItem,
      addToast
    );

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
