import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  getProductFromUrl,
  generateProductMetaTags,
  generateCategoryMetaTags,
  generateDefaultMetaTags,
} from '../utils/metaTags';

/**
 * Dynamic Meta Tags Component
 * Updates meta tags based on current route
 */
export const DynamicMetaTags = () => {
  const location = useLocation();
  const [metaTags, setMetaTags] = useState(generateDefaultMetaTags());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateMetaTags = async () => {
      setLoading(true);

      try {
        const currentUrl = window.location.href;

        // Check if it's a product page
        if (location.pathname.startsWith('/product/')) {
          const product = await getProductFromUrl(currentUrl);
          if (product) {
            const productMeta = generateProductMetaTags(product);
            setMetaTags(productMeta);
          } else {
            setMetaTags(generateDefaultMetaTags());
          }
        }
        // Check if it's a category page
        else if (location.pathname.startsWith('/category/')) {
          const categoryName = location.pathname.split('/').pop() || 'فئة';
          const categoryMeta = generateCategoryMetaTags(categoryName);
          setMetaTags(categoryMeta);
        }
        // Default to home page meta tags
        else {
          setMetaTags(generateDefaultMetaTags());
        }
      } catch (error) {
        console.error('Error updating meta tags:', error);
        setMetaTags(generateDefaultMetaTags());
      } finally {
        setLoading(false);
      }
    };

    updateMetaTags();
  }, [location.pathname]);

  if (loading) {
    return (
      <Helmet>
        <title>Loading...</title>
      </Helmet>
    );
  }

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{metaTags.title}</title>
      <meta name='description' content={metaTags.description} />
      <meta name='keywords' content={metaTags.keywords} />

      {/* Open Graph tags */}
      <meta property='og:title' content={metaTags.ogTitle} />
      <meta property='og:description' content={metaTags.ogDescription} />
      <meta property='og:type' content={metaTags.ogType} />
      <meta property='og:site_name' content='Rabbit Store' />
      <meta property='og:locale' content='ar_AR' />
      <meta property='og:url' content={window.location.href} />
      <meta property='og:image' content={metaTags.ogImage} />
      <meta property='og:image:width' content='800' />
      <meta property='og:image:height' content='800' />
      <meta property='og:image:alt' content={metaTags.ogTitle} />

      {/* Product-specific meta tags */}
      {metaTags.productPrice && (
        <>
          <meta
            property='product:price:amount'
            content={metaTags.productPrice}
          />
          <meta property='product:price:currency' content='EGP' />
        </>
      )}

      {/* Twitter Card tags */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@rabbitstore' />
      <meta name='twitter:title' content={metaTags.twitterTitle} />
      <meta name='twitter:description' content={metaTags.twitterDescription} />
      <meta name='twitter:image' content={metaTags.twitterImage} />
      <meta name='twitter:image:alt' content={metaTags.twitterTitle} />

      {/* Additional meta tags */}
      <meta name='theme-color' content='#3B82F6' />
      <meta name='robots' content='index, follow' />
      <link rel='canonical' href={window.location.href} />

      {/* Structured data for products */}
      {metaTags.productPrice && (
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: metaTags.ogTitle.replace(' - Rabbit Store', ''),
            description: metaTags.ogDescription,
            image: metaTags.ogImage,
            url: window.location.href,
            brand: {
              '@type': 'Brand',
              name: 'Rabbit Store',
            },
            offers: {
              '@type': 'Offer',
              price: metaTags.productPrice,
              priceCurrency: 'EGP',
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: 'Rabbit Store',
              },
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.5',
              reviewCount: '100',
            },
          })}
        </script>
      )}
    </Helmet>
  );
};
