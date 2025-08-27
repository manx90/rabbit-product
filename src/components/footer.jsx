import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';

import { Column, Row } from '@/lib/css/Product';

export default function Footer() {
  return (
    <div className='flex flex-col gap-[12px] bg-[#000000] px-[16px] pb-[12px] pt-[40px]'>
      <Column className='items-center gap-4'>
        <img className='w-56' src='/LogoTwo.svg' alt='' />
        <Row>
          <FaFacebook className='h-8 w-8 cursor-pointer text-white transition-all duration-200 hover:scale-110 hover:text-blue-500' />
          <FaInstagram className='h-8 w-8 cursor-pointer text-white transition-all duration-200 hover:scale-110 hover:text-pink-500' />
          <FaTiktok className='h-8 w-8 cursor-pointer text-white transition-all duration-200 hover:scale-110 hover:text-white' />
          <FaWhatsapp className='h-8 w-8 cursor-pointer text-white transition-all duration-200 hover:scale-110 hover:text-green-500' />
        </Row>

        <Row
          dir='rtl'
          className='duration-400 group mt-4 cursor-pointer justify-center transition-all hover:scale-[1.009]'
        >
          <IoLocationSharp className='my-auto hidden h-8 w-8 cursor-pointer group-hover:text-yellow-500 md:flex' />
          <span className='text-right font-Lato text-[16px] text-[#FAFAFA] md:text-[20px]'>
            موقعنا:
          </span>
          <span className='text-right font-Lato text-[16px] text-[#FAFAFA] md:text-[20px]'>
            جنين _ شارع الحسبة _ مركز النفاع التجاري الجديد _ أبو غالي سنتر
          </span>
        </Row>
      </Column>
      {/* <span className="font-Lato text-right justify-self-end text-[14px] text-[#FAFAFA]">
				:موقعنا
			</span>
			<span className="font-Lato text-right text-[14px] text-[#FAFAFA]">
				جنين _ شارع الحسبة _ مركز النفاع التجاري
				الجديد _ أبو غالي سنتر
			</span> */}

      <div className='flex flex-row-reverse justify-center border-t border-white/10 pt-4'>
        <span className='align-right px-[6px] py-[4px] text-center font-Lato text-[12px] text-[#FAFAFA] opacity-50'>
          {' '}
          © جميع الحقوق محفوظة 2025
        </span>
      </div>
    </div>
  );
}
