import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from './useProduct';
import { 
  setSelectedColor,
  setSelectedSize,
  setQuantity,
  handleQuantityChange as handleQtyChange,
  initializeDefaults,
  resetState,
  selectSelectedColor,
  selectSelectedSize,
  selectQuantity 
} from '../store/slices/productPageSlice';
import { useEffect } from 'react';

// Utility to prefix image URLs
function prefixImgUrl(url) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${import.meta.env.VITE_RABBIT_PI_BASE_URL}/uploads/${url}`;
}

export const useProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const selectedColor = useSelector(selectSelectedColor);
  const selectedSize = useSelector(selectSelectedSize);
  const quantity = useSelector(selectQuantity);

  // Use React Query hook instead of useEffect
  const {
    data: product,
    isLoading: loading,
    error: queryError,
  } = useProduct(id);

  // Handle error state
  const error = queryError?.message || null;

  // Reset state when component unmounts or ID changes
  useEffect(() => {
    dispatch(resetState());
  }, [id, dispatch]);

  // Initialize defaults when product loads
  useEffect(() => {
    if (product) {
      dispatch(initializeDefaults({ product }));
    }
  }, [product, dispatch]);

  // Navigate to home if invalid product ID
  if (id && isNaN(parseInt(id))) {
    setTimeout(() => {
      navigate(`/`);
    }, 2000);
    
    const errorMessage = "Invalid product ID";
    return {
      product: null,
      loading: false,
      error: errorMessage,
      selectedColor,
      selectedSize,
      quantity,
      setSelectedColor: (color) => dispatch(setSelectedColor(color)),
      setSelectedSize: (size) => dispatch(setSelectedSize(size)),
      setQuantity: (qty) => dispatch(setQuantity(qty)),
      handleQuantityChange: (newQuantity) => {
        const colorQuantity = getColorQuantity(product, selectedSize, selectedColor);
        dispatch(handleQtyChange({ newQuantity, maxQuantity: colorQuantity }));
      },
      colorQuantity: 0,
      prefixImgUrl,
    };
  }

  // Helper function to get color quantity
  const getColorQuantity = (product, selectedSize, selectedColor) => {
    if (!product) return 0;
    
    const selectedSizeDetail = product.sizeDetails?.find(
      (s) => s.sizeName === selectedSize,
    );
    return selectedSizeDetail?.quantities?.find(
      (q) => q.colorName === selectedColor,
    )?.quantity || 0;
  };

  const colorQuantity = getColorQuantity(product, selectedSize, selectedColor);

  const handleQuantityChange = (newQuantity) => {
    dispatch(handleQtyChange({ newQuantity, maxQuantity: colorQuantity }));
  };

  return {
    product,
    loading,
    error,
    selectedColor,
    selectedSize,
    quantity,
    setSelectedColor: (color) => dispatch(setSelectedColor(color)),
    setSelectedSize: (size) => dispatch(setSelectedSize(size)),
    setQuantity: (qty) => dispatch(setQuantity(qty)),
    handleQuantityChange,
    colorQuantity,
    prefixImgUrl,
  };
}; 