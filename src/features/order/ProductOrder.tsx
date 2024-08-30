import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import CustomHeader from '@components/ui/CustomHeader';
import {Colors, Fonts} from '@utils/Constants';
import OrderList from './OrderList';
import {useCartStore} from '@state/cartStore';
import BillDetails from './BillDetails';
import CustomText from '@components/ui/CustomText';
import {hocStyles} from '@styles/GlobalStyles';
import {useAuthStore} from '@state/authStorage';
import {RFValue} from 'react-native-responsive-fontsize';
import ArrowButton from '@components/ui/ArrowButton';
import {navigate} from '@utils/NavigationUtils';
import {createOrder} from '@service/orderService';
const ProductOrder: FC = () => {
  const {getTotalPrice, cart, clearCart} = useCartStore();
  const {user, setCurrentOrder, currentOrder} = useAuthStore();
  const totalItemPrice = getTotalPrice();
  const [loading, setLoading] = useState<boolean>(false);

  const handlePlaceOrder = async () => {
    if (currentOrder !== null) {
      Alert.alert('Let your first order to be delivered');
      return;
    }

    const formattedData = cart.map(item => ({
      id: item?._id,
      item: item?._id,
      count: item?.count,
    }));
    if (formattedData.length == 0) {
      Alert.alert('Please add any items to place order');
      return;
    }
    setLoading(true);
    const data = await createOrder(formattedData, totalItemPrice);
    if (data && data !== null && data !== undefined) {
      setCurrentOrder(data);
      clearCart();
      navigate('OrderSuccess', {...data});
    } else {
      Alert.alert('There was any error to place order');
      setLoading(false);
      return;
    }
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <CustomHeader title="Checkout" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OrderList />
        <BillDetails totalItemPrice={totalItemPrice} />
        <View style={styles.flexRow}>
          <View>
            <CustomText variant="h8" fontFamily={Fonts.SemiBold}>
              Cancellation Policy
            </CustomText>
            <CustomText
              variant="h9"
              style={styles.cancelText}
              fontFamily={Fonts.SemiBold}>
              Orders can not be cancelled once packed for delivery, in case of
              delay we will provide refund!
            </CustomText>
          </View>
        </View>
      </ScrollView>
      <View style={hocStyles.cartContainer}>
        <View style={styles.absoluteContainer}>
          <View style={styles.addressContainer}>
            <View style={styles.row}>
              <Image
                source={require('@assets/icons/home.png')}
                style={{width: 20, height: 20}}
              />
              <View style={{width: '75%'}}>
                <CustomText variant="h8" fontFamily={Fonts.Medium}>
                  Delivery to Home
                </CustomText>
                <CustomText
                  variant="h9"
                  numberOfLines={2}
                  style={{opacity: 0.6}}>
                  {user?.address}
                </CustomText>
              </View>
            </View>
            <TouchableOpacity>
              <CustomText
                variant="h8"
                style={{color: Colors.secondary}}
                fontFamily={Fonts.Medium}>
                Change
              </CustomText>
            </TouchableOpacity>
          </View>
          <View style={styles.paymentGateway}>
            <View style={{width: '30%'}}>
              <CustomText fontSize={RFValue(6)} fontFamily={Fonts.Regular}>
                💵 PAY USING
              </CustomText>
              <CustomText
                fontFamily={Fonts.Regular}
                variant="h9"
                style={{marginTop: 2}}>
                Cash on delivery
              </CustomText>
            </View>
            <View style={{width: '70%'}}>
              <ArrowButton
                loading={loading}
                price={totalItemPrice}
                title="Place order"
                onPress={async () => {
                  await handlePlaceOrder();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    backgroundColor: Colors.backgroundSecondary,
    paddingBottom: 150,
  },
  flexRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  cancelText: {
    marginTop: 4,
    opacity: 0.6,
  },
  absoluteContainer: {
    marginVertical: 15,
    marginBottom: Platform.OS === 'ios' ? 30 : 10,
  },
  addressContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  paymentGateway: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 14,
  },
});
