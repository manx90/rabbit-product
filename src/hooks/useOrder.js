import { Order } from '@/api/orderApi';
const useOrder = (data) => {
  const jsonData = {
    consignee_name: data.consignee_name,
    consignee_phone: data.consignee_phone,
    consignee_city: data.consignee_city,
    consignee_area: data.consignee_area,
    consignee_address: data.consignee_address,
    items: data.items,
  };
  const Res = async () => {
    const res = await Order.create(jsonData);
    console.log(res);
    return res;
  };

  return { Res };
};

export default useOrder;
