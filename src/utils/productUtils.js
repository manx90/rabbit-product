/**
 * Utility functions for product-related calculations and logic
 */

/**
 * Calculate price display based on size details
 * @param {Array} sizeDetails - Array of size detail objects
 * @param {number} price - Base price
 * @returns {string|number} Price display string or number
 */
export const calculatePriceDisplay = (sizeDetails, price) => {
  if (!sizeDetails.length) return price ?? 0;

  const prices = sizeDetails.map((s) => s.price).filter((p) => p != null);
  if (!prices.length) return price ?? 0;

  const unique = [...new Set(prices)];
  if (unique.length === 1) return unique[0];

  return `${Math.min(...prices)}-${Math.max(...prices)}`;
};

/**
 * Get default price from size details or base price
 * @param {Array} sizeDetails - Array of size detail objects
 * @param {number} price - Base price
 * @returns {number} Default price
 */
export const getDefaultPrice = (sizeDetails, price) => {
  return sizeDetails.length ? sizeDetails[0].price : (price ?? 0);
};

/**
 * Get main image from imgCover or first color image
 * @param {string} imgCover - Cover image
 * @param {Array} colors - Array of color objects
 * @returns {string} Main image path
 */
export const getMainImage = (imgCover, colors) => {
  return imgCover || colors[0]?.imgColor || 'product.png';
};

/**
 * Get colors with availability information for selected size
 * @param {Array} colors - Array of color objects
 * @param {Array} sizeDetails - Array of size detail objects
 * @param {string} selectedSize - Currently selected size
 * @returns {Array} Colors with availability info
 */
export const getColorsWithAvailability = (
  colors,
  sizeDetails,
  selectedSize
) => {
  if (!selectedSize) {
    return colors.map((color) => ({
      ...color,
      isAvailable: true,
      quantity: 0,
    }));
  }

  const sd = sizeDetails.find((s) => s.sizeName === selectedSize);
  if (!sd?.quantities) {
    return colors.map((color) => ({
      ...color,
      isAvailable: true,
      quantity: 0,
    }));
  }

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
};

/**
 * Get sizes with availability information for selected color
 * @param {Array} sizes - Array of size names
 * @param {Array} sizeDetails - Array of size detail objects
 * @param {string} selectedColor - Currently selected color
 * @returns {Array} Sizes with availability info
 */
export const getSizesWithAvailability = (sizes, sizeDetails, selectedColor) => {
  if (!selectedColor) {
    return sizes.map((size) => ({ size, isAvailable: true, quantity: 0 }));
  }

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
};

/**
 * Get maximum quantity for selected size and color combination
 * @param {Array} sizeDetails - Array of size detail objects
 * @param {string} selectedSize - Currently selected size
 * @param {string} selectedColor - Currently selected color
 * @returns {number} Maximum available quantity
 */
export const getMaxQuantity = (sizeDetails, selectedSize, selectedColor) => {
  const sd = sizeDetails.find((s) => s.sizeName === selectedSize);
  const q = sd?.quantities?.find(
    (q) => q.colorName.trim() === selectedColor.trim()
  );
  return q?.quantity || 0;
};

/**
 * Find matching color name in size details
 * @param {Array} sizeDetails - Array of size detail objects
 * @param {string} selectedSize - Currently selected size
 * @param {string} colorName - Color name to match
 * @returns {string} Matched color name
 */
export const findMatchingColorName = (sizeDetails, selectedSize, colorName) => {
  const sd = sizeDetails.find((s) => s.sizeName === selectedSize);
  const found = sd?.quantities?.find(
    (q) => q.colorName.trim() === colorName.trim()
  );
  return found ? found.colorName : colorName;
};

/**
 * Get available sizes and colors for cart item
 * @param {Array} sizeDetails - Array of size detail objects
 * @param {Array} colors - Array of color objects
 * @returns {Object} Object with availableSizes and availableColors arrays
 */
export const getAvailableOptions = (sizeDetails, colors) => {
  return {
    availableSizes: sizeDetails.map((s) => s.sizeName),
    availableColors: colors.map((c) => c.name),
  };
};

/**
 * Shallow equality check for arrays using a key function
 * @param {Array} a - First array
 * @param {Array} b - Second array
 * @param {Function} keyFn - Function to generate keys for comparison
 * @returns {boolean} Whether arrays are equal
 */
export const shallowEqualBy = (a = [], b = [], keyFn) => {
  if (a === b) return true;
  if (!a || !b || a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (keyFn(a[i]) !== keyFn(b[i])) return false;
  }

  return true;
};
