import {appAxios} from './apiInterceptors';

export const createOrder = async (items: any, totalPrice: number) => {
  try {
    const response = await appAxios.post('/order', {
      items: items,
      branch: '66c749f05a12120db90931e1',
      totalPrice: totalPrice,
    });
    return response?.data;
  } catch (error) {
    console.log(error, 'create order error');
    return null;
  }
};
