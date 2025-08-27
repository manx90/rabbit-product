import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productPageReducer from './slices/productPageSlice';
import favoritesReducer from './slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    productPage: productPageReducer,
    favorites: favoritesReducer,
  },
});
