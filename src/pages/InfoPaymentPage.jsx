// import React from "react";
import Header from '@/components/Header';
import PaymentBox from '@/components/PaymentBox';
import InputPhone from '@/components/inputPhone';
import { Row } from './../lib/css/Product';
export default function InfoPaymentPage({ openInfo, setOpenInfo }) {
  return (
    <div
      className={`fixed left-0 top-0 z-50 h-full w-full bg-black/50 transition-all duration-300 ${
        open
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
      onClick={() => setOpen(false)}
    >
      <Inputs />
      <PaymentBox fix={false} />
    </div>
  );
}

function Inputs() {
  return (
    <div className='mx-auto max-w-2xl bg-white p-6 dark:bg-gray-900'>
      <div className='mb-6'>
        <h2 className='mb-2 text-right text-2xl font-bold text-gray-800 dark:text-white'>
          معلومات التوصيل
        </h2>
        <p className='text-right text-sm text-gray-600 dark:text-gray-400'>
          يرجى ملء جميع الحقول المطلوبة لإتمام عملية التوصيل
        </p>
      </div>

      <form className='space-y-6'>
        <Row className='w-full gap-4'>
          <div className='flex w-full flex-col gap-3'>
            <label
              htmlFor='name'
              className='text-right font-Lato font-medium text-gray-700 dark:text-gray-300'
            >
              الاسم الكامل *
            </label>
            <input
              type='text'
              placeholder='ادخل الاسم الكامل'
              name='name'
              id='name'
              className='rounded-lg border border-gray-300 bg-white p-3 text-right font-Lato shadow-sm transition-all duration-200 placeholder:text-gray-400 hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800'
            />
          </div>
          <div className='flex w-full flex-col gap-3'>
            <InputPhone />
          </div>
        </Row>

        <div className='flex flex-col gap-3'>
          <label
            htmlFor='city'
            className='text-right font-Lato font-medium text-gray-700 dark:text-gray-300'
          >
            المدينة *
          </label>
          <input
            type='text'
            placeholder='اختر المدينة'
            name='city'
            id='city'
            className='rounded-lg border border-gray-300 bg-white p-3 text-right font-Lato shadow-sm transition-all duration-200 placeholder:text-gray-400 hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800'
          />
        </div>

        <div className='flex flex-col gap-3'>
          <label
            htmlFor='village'
            className='text-right font-Lato font-medium text-gray-700 dark:text-gray-300'
          >
            القرية
          </label>
          <input
            type='text'
            placeholder='ادخل اسم القرية (اختياري)'
            name='village'
            id='village'
            className='rounded-lg border border-gray-300 bg-white p-3 text-right font-Lato shadow-sm transition-all duration-200 placeholder:text-gray-400 hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800'
          />
          <div className='mt-1 flex items-start gap-2'>
            <svg
              className='mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
            <span className='text-right font-Lato text-sm leading-relaxed text-amber-600 dark:text-amber-400'>
              ملاحظة: إدخال اسم القرية يساعد في تسريع عملية التوصيل
            </span>
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <label
            htmlFor='address'
            className='text-right font-Lato font-medium text-gray-700 dark:text-gray-300'
          >
            العنوان التفصيلي *
          </label>
          <textarea
            placeholder='مثال: شارع فلسطين، بناية رقم 10، الطابق الثاني، شقة رقم 5'
            name='address'
            id='address'
            rows='3'
            className='resize-none rounded-lg border border-gray-300 bg-white p-3 text-right font-Lato shadow-sm transition-all duration-200 placeholder:text-gray-400 hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800'
          />
          <div className='mt-1 flex items-start gap-2'>
            <svg
              className='mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                clipRule='evenodd'
              />
            </svg>
            <span className='text-right font-Lato text-sm leading-relaxed text-blue-600 dark:text-blue-400'>
              كلما كان العنوان أكثر تفصيلاً، كلما كان التوصيل أسرع وأدق
            </span>
          </div>
        </div>

        <div className='rounded-lg border-l-4 border-blue-500 bg-gray-50 p-4 dark:bg-gray-800'>
          <div className='mb-2 flex items-center gap-2'>
            <svg
              className='h-5 w-5 text-blue-500'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                clipRule='evenodd'
              />
            </svg>
            <span className='text-right font-Lato font-medium text-gray-700 dark:text-gray-300'>
              أمان معلوماتك
            </span>
          </div>
          <p className='text-right font-Lato text-sm leading-relaxed text-gray-600 dark:text-gray-400'>
            جميع المعلومات التي تدخلها محمية ومشفرة ولن يتم مشاركتها مع أطراف
            ثالثة
          </p>
        </div>
      </form>
    </div>
  );
}

function Alerts() {
  return (
    <div className='mb-8 mt-8 flex flex-col gap-4 p-[16px]'>
      <span className='text-end font-Lato text-[#000]'>
        : سياساتنا في العمل
      </span>
      <span className='max-w-[450px] text-right font-Lato text-[#535353]'>
        : الدفع والتوصيل
      </span>
      <span className='max-w-[450px] text-right font-Lato text-[12px] text-[#535353]'>
        ببساطة نقوم بايصال المنتج لغاية منزلك وتقوم بدفع الثمن لموظف التوصيل
      </span>
      <span className='max-w-[450px] text-right font-Lato text-[#535353]'>
        : التبديل
      </span>
      <span className='max-w-[450px] text-right font-Lato text-[12px] text-[#535353]'>
        ببساطة نقوم بإيصال الطلب إليك و تقوم بتسلم الطرد المراد تبديله ل موظف
        التوصيل{' '}
      </span>
      <span className='max-w-[450px] text-right font-Lato text-[#535353]'>
        : الغاء الطلب
      </span>
      <span className='max-w-[450px] text-right font-Lato text-[12px] text-[#535353]'>
        ببساطة التواصل معنا عبر الواتساب لإلغاء الطلب{' '}
      </span>
    </div>
  );
}
