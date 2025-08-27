import { useSelector, useDispatch } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  clearFavorites,
  updateCartItemFavoriteStatus,
  selectFavorites,
  selectFavoritesCount,
  selectIsFavorite,
} from '../store/slices/favoritesSlice';

export const useFavorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const favoritesCount = useSelector(selectFavoritesCount);

  return {
    favorites,
    favoritesCount,
    addToFavorites: (product) => dispatch(addToFavorites(product)),
    removeFromFavorites: (productId, sizeName, colorName) =>
      dispatch(
        removeFromFavorites({
          productId,
          sizeName,
          colorName,
        })
      ),
    toggleFavorite: (product) => dispatch(toggleFavorite(product)),
    clearFavorites: () => dispatch(clearFavorites()),
    updateCartItemFavoriteStatus: (
      productId,
      sizeName,
      colorName,
      isFavorite
    ) =>
      dispatch(
        updateCartItemFavoriteStatus({
          productId,
          sizeName,
          colorName,
          isFavorite,
        })
      ),
    isFavorite: (productId, sizeName, colorName) =>
      useSelector((state) =>
        selectIsFavorite(state, productId, sizeName, colorName)
      ),
  };
};
