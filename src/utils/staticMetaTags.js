/**
 * Static meta tags that work with client-side rendering
 * This creates a mapping of product IDs to their meta information
 */

// This should be populated from your backend or a static file
export const PRODUCT_META_DATA = {
  // Example product data - you'll need to populate this with real data
  269: {
    name: 'ترنج ولادي AS05',
    description:
      'ترنج ولادي لونين مسكر بدون سجاب اكمام زم و بنطلون زم قماشة قطنية مناسبة للخريف و الربيع',
    price: 50,
    image: 'product_269_image.jpg', // Replace with actual image filename
    currency: '₪',
  },
  // Add more products as needed
  // 266: { ... },
  // 267: { ... },
};

/**
 * Get static meta data for a product
 * @param {string} productId - Product ID
 * @returns {Object|null} Product meta data or null
 */
export const getStaticProductMeta = (productId) => {
  return PRODUCT_META_DATA[productId] || null;
};

/**
 * Generate static meta tags for product page
 * @param {Object} productMeta - Product meta data
 * @returns {Object} Meta tags object
 */
export const generateStaticProductMetaTags = (productMeta) => {
  if (!productMeta) return null;

  const productTitle = productMeta.name || 'منتج';
  const productDescription =
    productMeta.description ||
    `اكتشف ${productTitle} في متجر الأرانب. أفضل الأسعار والجودة المضمونة`;
  const productPrice = productMeta.price || 0;
  const productImage = productMeta.image || 'product.png';
  const imageUrl = `${import.meta.env.VITE_RABBIT_PI_BASE_URL}/uploads/${productImage}`;

  return {
    title: `${productTitle} - Rabbit Store | متجر الأرانب`,
    description: productDescription,
    keywords: `${productTitle}, منتج, تسوق, متجر الأرانب, ${productPrice} ${productMeta.currency || '₪'}`,
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
