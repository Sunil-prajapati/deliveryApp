import {appAxios} from './apiInterceptors';

export const createOrder = async (items: any, totalPrice: number) => {
  try {
    const response = await appAxios.post('/order', {
      items: items,
      branch: '66d02a339b2a527b40cb997f',
      totalPrice: totalPrice,
    });
    return response?.data;
  } catch (error) {
    console.log(error, 'create order error');
    return null;
  }
};

export const getOrderById = async (id: string) => {
  try {
    const response = await appAxios.get(`/order${id}`);
    return response?.data;
  } catch (error) {
    console.log(error, 'fetch order by id order error');
    return null;
  }
};
