import SideBar from '@/components/SideBar';
import { useCart } from '@/hooks/useCartRedux';
import { Column } from '@/lib/css/Product';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge, { badgeClasses } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Darkmode from './Darkmode';
import SearchBox from './SearchBox';
import { useCategories } from '@/hooks/useCategories';

export default function Header({ openInfo, setOpenInfo }) {
  const [Menubar, setMenubar] = useState(false);
  const [isDark, setIsDark] = useState(false);

  return (
    <Column>
      <div className='flex flex-col bg-white  shadow-sm transition-all dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:shadow-lg'>
        <div className='align-center flex justify-between border-b border-[#D9D9D9] p-[16px] py-[4px] dark:border-gray-700/70 dark:text-white lg:px-32 h-16'>
          <Link to='/'>
            <img
              src={isDark ? '/LogoTwo.svg' : '/logoOne.svg'}
              alt='Rabbit Products Logo'
              className='md:w-42 mr-4 w-32 drop-shadow-md dark:invert lg:w-52'
            />
          </Link>
          <div className='hidden w-full items-center justify-center gap-[12px] md:flex'>
            <SearchBox className='w-2/4' />
          </div>
          <div className='flex items-center justify-center gap-[12px]'>
            <IconButtonWithBadge
              openInfo={openInfo}
              setOpenInfo={setOpenInfo}
            />
            <Darkmode />
            {!Menubar ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                onClick={() => setMenubar(!Menubar)}
                className='lg:hidden'
              >
                <mask
                  id='mask0_1920_6087'
                  style={{ maskType: 'alpha' }}
                  maskUnits='userSpaceOnUse'
                  x='0'
                  y='0'
                  width='24'
                  height='24'
                >
                  <rect width='24' height='24' fill='#D9D9D9' />
                </mask>
                <g mask='url(#mask0_1920_6087)'>
                  <path
                    d='M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z'
                    fill='#535353'
                    className='dark:fill-white'
                  />
                </g>
              </svg>
            ) : (
              <CloseIcon
                onClick={() => setMenubar(!Menubar)}
                className='dark:text-white'
              />
            )}
          </div>
        </div>
        <SideBar Menubar={Menubar} setMenubar={setMenubar} />
      </div>
      <div className='mb-2 flex w-full gap-[12px] px-2 md:hidden'>
        <SearchBox ctrl={false} className='w-full bg-white dark:bg-gray-800' />
      </div>
    </Column>
  );
}

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
    /* Light mode */
    background-color: #0095ff;
    color: #fff;
    /* Dark mode */
    @media (prefers-color-scheme: dark) {
      background-color: #232323;
      color: #fff;
      border: 1px solid #444;
    }
  }
`;
function IconButtonWithBadge({ setOpenInfo }) {
  const { totalQty } = useCart();
  return (
    <IconButton className='top-[2px] dark:text-white'>
      <ShoppingCartIcon
        fontSize='medium'
        className='dark:text-white'
        onClick={() => {
          setOpenInfo(true);
        }}
      />
      <CartBadge badgeContent={totalQty} color='primary' overlap='circular' />
    </IconButton>
  );
}
