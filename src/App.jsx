import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Layout from './pages/Layout';
import { store } from './store/store';
const CategoryPage = lazy(() => import('./pages/CategoryPage.jsx'));
const ProductPage = lazy(() => import('./pages/ProductPage.jsx'));
const FavoritePage = lazy(() => import('./pages/FavoritePage.jsx'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Helmet>
            {/* Default meta tags */}
            <title>Rabbit Store - متجر الأرانب</title>
            <meta
              name='description'
              content='متجر الأرانب - أفضل المنتجات بأسعار مميزة'
            />
            <meta
              name='keywords'
              content='متجر, منتجات, أرانب, تسوق, online shopping'
            />

            {/* Open Graph default tags */}
            <meta property='og:type' content='website' />
            <meta property='og:site_name' content='Rabbit Store' />
            <meta property='og:locale' content='ar_AR' />

            {/* Twitter default tags */}
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:site' content='@rabbitstore' />

            {/* Additional meta tags */}
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1.0'
            />
            <meta name='theme-color' content='#3B82F6' />
            <link rel='canonical' href={window.location.href} />
          </Helmet>
          <ScrollToTop />
          <Suspense fallback={<Loading />}>
            <Layout>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Favorites' element={<FavoritePage />} />
                <Route
                  path='/category/:categoryId'
                  element={<CategoryPage />}
                />
                <Route
                  path='/category/:categoryId/:subcategoryId'
                  element={<CategoryPage />}
                />
                <Route path='/product/:id' element={<ProductPage />} />
              </Routes>
            </Layout>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
