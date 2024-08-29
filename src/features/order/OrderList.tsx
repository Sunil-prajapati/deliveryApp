import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import {useCartStore} from '@state/cartStore';
import CustomText from '@components/ui/CustomText';
import {Colors, Fonts} from '@utils/Constants';
import OrderItem from './OrderItem';

const OrderList = () => {
  const cartItems = useCartStore(state => state.cart);
  const totalItems = cartItems?.reduce((acc, item) => acc + item?.count, 0);
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.imageContainer}>
          <Image
            source={require('@assets/icons/clock.png')}
            style={styles.image}
          />
        </View>
        <View>
          <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
            Delivery 9 mins
          </CustomText>
          <CustomText
            style={{opacity: 0.5}}
            variant="h8"
            fontFamily={Fonts.SemiBold}>
            shipment of {totalItems || 0} item
          </CustomText>
        </View>
      </View>
      {cartItems?.map(item => {
        return <OrderItem key={item._id} item={item} />;
      })}
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
  },
  flexRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  image: {
    width: 30,
    height: 30,
  },
  imageContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
  },
});
