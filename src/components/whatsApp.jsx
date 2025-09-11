import { FaWhatsapp } from '@react-icons/all-files/fa/FaWhatsapp';

const WhatsAppButton = ({ product }) => {
  const message = `مرحباً!\n\nأرغب بالحصول على مزيد من التفاصيل حول هذا المنتج:\n\nالاسم: ${product.name}\nرابط المنتج: ${window.location.href}\n\nشكراً لكم مقدمًا!`;
  const phoneNumber = '972569341491'; // ضع رقم الواتساب المستلم مع كود الدولة بدون +
  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className='fixed bottom-4 right-4 z-50 flex items-center justify-center rounded-full bg-green-500 p-4 text-white shadow-lg transition hover:bg-green-600'
      title='تواصل عبر واتساب'
    >
      <FaWhatsapp />
    </a>
  );
};

export default WhatsAppButton;
