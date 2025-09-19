/**
 * Utility functions for generating dynamic meta tags
 */

/**
 * Get product data from URL parameters
 * @param {string} url - Current URL
 * @returns {Object} Product data or null
 */
export const getProductFromUrl = async (url) => {
  try {
    // Extract product ID from URL
    const productIdMatch = url.match(/\/product\/(\d+)/);
    if (!productIdMatch) return null;

    const productId = productIdMatch[1];

    // Fetch product data from your API
    const response = await fetch(
      `${import.meta.env.VITE_RABBIT_PI_BASE_URL}/api/products/${productId}`
    );
    if (!response.ok) return null;

    const product = await response.json();
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

/**
 * Generate meta tags for product page
 * @param {Object} product - Product data
 * @returns {Object} Meta tags object
 */
export const generateProductMetaTags = (product) => {
  if (!product) return null;

  const productTitle = product.name || 'منتج';
  const productDescription =
    product.description ||
    `اكتشف ${productTitle} في متجر الأرانب. أفضل الأسعار والجودة المضمونة`;
  const productPrice = product.price || product.sizeDetails?.[0]?.price || 0;
  const productImage =
    product.imgCover || product.colors?.[0]?.imgColor || 'product.png';
  const imageUrl = `${import.meta.env.VITE_RABBIT_PI_BASE_URL}/uploads/${productImage}`;

  return {
    title: `${productTitle} - Rabbit Store | متجر الأرانب`,
    description: productDescription,
    keywords: `${productTitle}, منتج, تسوق, متجر الأرانب, ${productPrice} جنيه`,
    ogTitle: `${productTitle} - Rabbit Store`,
    ogDescription: productDescription,
    ogImage: imageUrl,
    ogType: 'product',
    twitterTitle: `${productTitle} - Rabbit Store`,
    twitterDescription: productDescription,
    twitterImage: imageUrl,
    productPrice: productPrice,
    productImage: imageUrl,
  };
};

/**
 * Generate meta tags for category page
 * @param {string} categoryName - Category name
 * @returns {Object} Meta tags object
 */
export const generateCategoryMetaTags = (categoryName) => {
  const categoryTitle = `${categoryName} - Rabbit Store | متجر الأرانب`;
  const categoryDescription = `اكتشف أفضل منتجات ${categoryName} في متجر الأرانب. مجموعة واسعة من المنتجات بأسعار مميزة`;

  return {
    title: categoryTitle,
    description: categoryDescription,
    keywords: `${categoryName}, منتجات, تسوق, متجر الأرانب, فئة`,
    ogTitle: categoryTitle,
    ogDescription: categoryDescription,
    ogImage: '/herosec.jpg',
    ogType: 'website',
    twitterTitle: categoryTitle,
    twitterDescription: categoryDescription,
    twitterImage: '/herosec.jpg',
  };
};

/**
 * Generate default meta tags for home page
 * @returns {Object} Meta tags object
 */
export const generateDefaultMetaTags = () => {
  return {
    title: 'Rabbit Store - متجر الأرانب',
    description: 'متجر الأرانب - أفضل المنتجات بأسعار مميزة',
    keywords: 'متجر, منتجات, أرانب, تسوق, online shopping',
    ogTitle: 'Rabbit Store - متجر الأرانب',
    ogDescription: 'متجر الأرانب - أفضل المنتجات بأسعار مميزة',
    ogImage: '/herosec.jpg',
    ogType: 'website',
    twitterTitle: 'Rabbit Store - متجر الأرانب',
    twitterDescription: 'متجر الأرانب - أفضل المنتجات بأسعار مميزة',
    twitterImage: '/herosec.jpg',
  };
};
