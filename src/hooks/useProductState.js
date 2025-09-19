import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  calculatePriceDisplay,
  getDefaultPrice,
  getMainImage,
  getColorsWithAvailability,
  getSizesWithAvailability,
  getMaxQuantity,
  findMatchingColorName,
  getAvailableOptions,
} from '../utils/productUtils';

/**
 * Custom hook for managing product state and calculations
 * @param {Object} productData - Product data object
 * @returns {Object} Product state and handlers
 */
export const useProductState = ({
  price,
  sizeDetails = [],
  colors = [],
  imgCover,
  name,
  id,
}) => {
  // Image state
  const mainImage = useMemo(
    () => getMainImage(imgCover, colors),
    [imgCover, colors]
  );

  const [photo, setPhoto] = useState(mainImage);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => setPhoto(mainImage), [mainImage]);

  // Price calculations
  const priceDisplay = useMemo(
    () => calculatePriceDisplay(sizeDetails, price),
    [sizeDetails, price]
  );

  const defaultPrice = useMemo(
    () => getDefaultPrice(sizeDetails, price),
    [sizeDetails, price]
  );

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);

  // Selection state
  const initialColor = useMemo(() => colors[0]?.name || '', [colors]);
  const initialSize = useMemo(
    () => sizeDetails[0]?.sizeName || '',
    [sizeDetails]
  );

  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [quantity, setQuantity] = useState(1);

  // Derived data
  const sizes = useMemo(
    () => sizeDetails.map((s) => s.sizeName),
    [sizeDetails]
  );

  const colorsWithAvailability = useMemo(
    () => getColorsWithAvailability(colors, sizeDetails, selectedSize),
    [colors, sizeDetails, selectedSize]
  );

  const sizesWithAvailability = useMemo(
    () => getSizesWithAvailability(sizes, sizeDetails, selectedColor),
    [sizes, sizeDetails, selectedColor]
  );

  const maxQty = useMemo(
    () => getMaxQuantity(sizeDetails, selectedSize, selectedColor),
    [sizeDetails, selectedSize, selectedColor]
  );

  const isCurrentCombinationAvailable = useMemo(() => maxQty > 0, [maxQty]);

  // Handlers
  const handleColorSelect = useCallback(
    (color) => {
      const matched = findMatchingColorName(
        sizeDetails,
        selectedSize,
        color.name
      );
      setSelectedColor(matched);
      setImageLoaded(false);
      setPhoto(color.imgColor);
      setQuantity(1);
    },
    [sizeDetails, selectedSize]
  );

  const handleSizeSelect = useCallback((size) => {
    setSelectedSize(size);
    setQuantity(1);
  }, []);

  const handleImageLoad = useCallback(() => setImageLoaded(true), []);
  const handleImageError = useCallback(() => setImageLoaded(true), []);

  // Auto-select available options when current selection becomes unavailable
  useEffect(() => {
    if (selectedSize) {
      const currentSizeInfo = sizesWithAvailability.find(
        (s) => s.size === selectedSize
      );
      if (currentSizeInfo && !currentSizeInfo.isAvailable) {
        const availableSize = sizesWithAvailability.find((s) => s.isAvailable);
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

  return {
    // State
    photo,
    imageLoaded,
    modalOpen,
    selectedColor,
    selectedSize,
    quantity,

    // Computed values
    priceDisplay,
    defaultPrice,
    colorsWithAvailability,
    sizesWithAvailability,
    maxQty,
    isCurrentCombinationAvailable,

    // Handlers
    setModalOpen,
    setQuantity,
    handleColorSelect,
    handleSizeSelect,
    handleImageLoad,
    handleImageError,
  };
};

/**
 * Custom hook for handling cart operations
 * @param {Object} productData - Product data object
 * @param {Object} productState - Product state from useProductState
 * @param {Function} addItem - Cart add item function
 * @param {Function} addToast - Toast notification function
 * @returns {Object} Cart handlers
 */
export const useProductCart = (
  { id, name, sizeDetails, colors },
  { selectedSize, selectedColor, quantity, photo, defaultPrice },
  addItem,
  addToast
) => {
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

    const { availableSizes, availableColors } = getAvailableOptions(
      sizeDetails,
      colors
    );

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

  return { handleAddToCart };
};
