/**
 * Script to generate static HTML files for product pages
 * This creates individual HTML files for each product with proper meta tags
 */

import fs from 'fs';
import path from 'path';

// Read the base index.html
const baseHtml = fs.readFileSync(
  path.join(process.cwd(), 'index.html'),
  'utf8'
);

// Product data - you should replace this with actual data from your API
const products = [
  {
    id: 269,
    name: 'ترنج ولادي AS05',
    description:
      'ترنج ولادي لونين مسكر بدون سجاب اكمام زم و بنطلون زم قماشة قطنية مناسبة للخريف و الربيع',
    price: 50,
    image: 'product_269_image.jpg', // Replace with actual image filename
    currency: '₪',
  },
  // Add more products here
];

const generateProductPage = (product) => {
  const productUrl = `https://rabbit.ps/product/${product.id}`;
  const imageUrl = `https://rabbit.ps/uploads/${product.image}`;

  // Replace meta tags in the base HTML
  let productHtml = baseHtml
    .replace(
      '<title>Rabbit Store - متجر الأرانب</title>',
      `<title>${product.name} - Rabbit Store | متجر الأرانب</title>`
    )
    .replace(
      'content="متجر الأرانب - أفضل المنتجات بأسعار مميزة"',
      `content="${product.description}"`
    )
    .replace(
      'content="Rabbit Store - متجر الأرانب"',
      `content="${product.name} - Rabbit Store"`
    )
    .replace('content="/herosec.jpg"', `content="${imageUrl}"`)
    .replace('content="website"', 'content="product"')
    .replace('content="summary_large_image"', 'content="summary_large_image"')
    .replace('content="@rabbitstore"', 'content="@rabbitstore"')
    .replace(
      'content="Rabbit Store - متجر الأرانب"',
      `content="${product.name} - Rabbit Store"`
    )
    .replace(
      'content="متجر الأرانب - أفضل المنتجات بأسعار مميزة"',
      `content="${product.description}"`
    )
    .replace('content="/herosec.jpg"', `content="${imageUrl}"`);

  // Add product-specific meta tags
  const productMetaTags = `
    <meta property="product:price:amount" content="${product.price}" />
    <meta property="product:price:currency" content="${product.currency}" />
    <meta property="og:url" content="${productUrl}" />
    <link rel="canonical" href="${productUrl}" />
  `;

  // Insert the meta tags before the closing head tag
  productHtml = productHtml.replace(
    '</head>',
    `    ${productMetaTags}\n  </head>`
  );

  return productHtml;
};

// Generate HTML files for each product
const generateAllProductPages = () => {
  const distDir = path.join(process.cwd(), 'dist');

  // Create product directory
  const productDir = path.join(distDir, 'product');
  if (!fs.existsSync(productDir)) {
    fs.mkdirSync(productDir, { recursive: true });
  }

  products.forEach((product) => {
    const productHtml = generateProductPage(product);
    const outputPath = path.join(productDir, `${product.id}.html`);
    fs.writeFileSync(outputPath, productHtml);
    console.log(`Generated HTML for product ${product.id}: ${product.name}`);
  });

  console.log(`\nGenerated ${products.length} product pages successfully!`);
  console.log('Product pages are now available at:');
  products.forEach((product) => {
    console.log(`  https://rabbit.ps/product/${product.id}.html`);
  });
};

// Run the script
generateAllProductPages();
