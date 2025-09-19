/**
 * Simple server to serve different HTML for different routes
 * This solves the rich preview issue by serving static HTML with proper meta tags
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('dist'));

// Product data - replace with your actual product data
const products = {
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

// Read the base HTML template
const baseHtml = fs.readFileSync(
  path.join(__dirname, 'dist', 'index.html'),
  'utf8'
);

// Generate HTML for a specific product
const generateProductHtml = (product, productId) => {
  const productUrl = `https://rabbit.ps/product/${productId}`;
  const imageUrl = `https://rabbit.ps/uploads/${product.image}`;

  let html = baseHtml
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
    .replace('content="https://rabbit.ps/herosec.jpg"', `content="${imageUrl}"`)
    .replace('content="website"', 'content="product"')
    .replace(
      'content="Rabbit Store - متجر الأرانب"',
      `content="${product.name} - Rabbit Store"`
    )
    .replace(
      'content="متجر الأرانب - أفضل المنتجات بأسعار مميزة"',
      `content="${product.description}"`
    )
    .replace(
      'content="https://rabbit.ps/herosec.jpg"',
      `content="${imageUrl}"`
    );

  // Add product-specific meta tags
  const productMetaTags = `
    <meta property="product:price:amount" content="${product.price}" />
    <meta property="product:price:currency" content="${product.currency}" />
    <meta property="og:url" content="${productUrl}" />
    <link rel="canonical" href="${productUrl}" />
  `;

  // Insert the meta tags before the closing head tag
  html = html.replace('</head>', `    ${productMetaTags}\n  </head>`);

  return html;
};

// Route for product pages
app.get('/product/:id', (req, res) => {
  const productId = req.params.id;
  const product = products[productId];

  if (product) {
    const productHtml = generateProductHtml(product, productId);
    res.send(productHtml);
  } else {
    // Fallback to default HTML
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});

// Route for category pages
app.get('/category/:id', (req, res) => {
  // For now, serve default HTML
  // You can add category-specific logic here
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Catch all other routes and serve the default HTML
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `Product pages available at: http://localhost:${PORT}/product/[id]`
  );
  console.log(`Products configured: ${Object.keys(products).join(', ')}`);
});
