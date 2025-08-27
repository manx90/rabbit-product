import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedColor: '',
  selectedSize: '',
  quantity: 1,
};

const productPageSlice = createSlice({
  name: 'productPage',
  initialState,
  reducers: {
    setSelectedColor: (state, action) => {
      state.selectedColor = action.payload;
    },

    setSelectedSize: (state, action) => {
      state.selectedSize = action.payload;
    },

    setSelectedSizeWithColorValidation: (state, action) => {
      const { sizeName, product } = action.payload;
      state.selectedSize = sizeName;

      // Check if current color is available in the new size
      const sizeDetail = product.sizeDetails?.find(
        (s) => s.sizeName === sizeName
      );
      const currentColorAvailable = sizeDetail?.quantities?.find(
        (q) => q.colorName === state.selectedColor && q.quantity > 0
      );

      // If current color is not available, find first available color
      if (!currentColorAvailable) {
        const availableColor = sizeDetail?.quantities?.find(
          (q) => q.quantity > 0
        );
        if (availableColor) {
          state.selectedColor = availableColor.colorName;
        } else {
          // No colors available in this size, clear color selection
          state.selectedColor = '';
        }
      }
    },

    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },

    handleQuantityChange: (state, action) => {
      const { newQuantity, maxQuantity } = action.payload;
      if (newQuantity >= 1 && newQuantity <= maxQuantity) {
        state.quantity = newQuantity;
      }
    },

    initializeDefaults: (state, action) => {
      const { product } = action.payload;

      // Helper function to find first available color for a given size
      const findFirstAvailableColor = (sizeName) => {
        const sizeDetail = product.sizeDetails?.find(
          (s) => s.sizeName === sizeName
        );
        if (!sizeDetail?.quantities) return null;

        const availableColor = sizeDetail.quantities.find(
          (q) => q.quantity > 0
        );
        return availableColor?.colorName || null;
      };

      // Helper function to find first available size
      const findFirstAvailableSize = () => {
        for (const sizeDetail of product.sizeDetails || []) {
          if (sizeDetail.quantities?.some((q) => q.quantity > 0)) {
            return sizeDetail.sizeName;
          }
        }
        return null;
      };

      // Initialize size first if not set
      if (!state.selectedSize && product.sizeDetails?.length > 0) {
        const availableSize = findFirstAvailableSize();
        if (availableSize) {
          state.selectedSize = availableSize;
        }
      }

      // Initialize color if not set and we have a selected size
      if (
        !state.selectedColor &&
        state.selectedSize &&
        product.colors?.length > 0
      ) {
        const availableColor = findFirstAvailableColor(state.selectedSize);
        if (availableColor) {
          state.selectedColor = availableColor;
        }
      }

      // If we still don't have a color but have a size, try to find any available color
      if (
        !state.selectedColor &&
        state.selectedSize &&
        product.colors?.length > 0
      ) {
        for (const color of product.colors) {
          const availableColor = findFirstAvailableColor(state.selectedSize);
          if (availableColor) {
            state.selectedColor = availableColor;
            break;
          }
        }
      }
    },

    resetState: () => initialState,
  },
});

export const {
  setSelectedColor,
  setSelectedSize,
  setSelectedSizeWithColorValidation,
  setQuantity,
  handleQuantityChange,
  initializeDefaults,
  resetState,
} = productPageSlice.actions;

// Selectors
export const selectSelectedColor = (state) => state.productPage.selectedColor;
export const selectSelectedSize = (state) => state.productPage.selectedSize;
export const selectQuantity = (state) => state.productPage.quantity;

export default productPageSlice.reducer;
