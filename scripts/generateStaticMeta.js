/**
 * Script to generate static meta tags for all products
 * This should be run to update the static meta tags
 */

import fs from 'fs';
import path from 'path';

// This script would fetch all products from your API and generate static meta tags
// For now, I'll create a simple example

const generateStaticMetaTags = () => {
  // This is where you would fetch all products from your API
  // For example:
  // const products = await fetch(`${process.env.VITE_RABBIT_PI_BASE_URL}/api/products`).then(r => r.json());

  // For now, let's create a simple mapping
  const productMetaData = {
    269: {
      name: 'ترنج ولادي AS05',
      description:
        'ترنج ولادي لونين مسكر بدون سجاب اكمام زم و بنطلون زم قماشة قطنية مناسبة للخريف و الربيع',
      price: 50,
      image: 'product_269_image.jpg', // Replace with actual image filename
      currency: '₪',
    },
    // Add more products here
  };

  // Generate the static meta tags file
  const staticMetaContent = `/**
 * Static meta tags for products
 * Generated automatically - do not edit manually
 */

export const PRODUCT_META_DATA = ${JSON.stringify(productMetaData, null, 2)};

export const getStaticProductMeta = (productId) => {
  return PRODUCT_META_DATA[productId] || null;
};
`;

  // Write to file
  const outputPath = path.join(
    process.cwd(),
    'src',
    'utils',
    'staticMetaTags.js'
  );
  fs.writeFileSync(outputPath, staticMetaContent);

  console.log('Static meta tags generated successfully!');
  console.log('Products included:', Object.keys(productMetaData).length);
};

// Run the script
generateStaticMetaTags();
