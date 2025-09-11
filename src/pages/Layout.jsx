import Footer from '@/components/footer';
import Header from '@/components/Header';
import { useState } from 'react';
import Cart from '../components/Cart';

const Layout = ({ children }) => {
  const [openInfo, setOpenInfo] = useState(false);
  return (
    <div className='custom-scrollbar flex h-auto flex-col overflow-y-auto'>
      <header className='fixed left-0 right-0 top-0 z-50 shadow-md dark:bg-slate-900'>
        <Header openInfo={openInfo} setOpenInfo={setOpenInfo} />
      </header>
      <main className='mt-[70px] md:mt-[70px]'>{children}</main>
      <Cart openInfo={openInfo} setOpenInfo={setOpenInfo} />
      <Footer />
    </div>
  );
};

export default Layout;
