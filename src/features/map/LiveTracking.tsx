import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {useAuthStore} from '@state/authStorage';
import {getOrderById} from '@service/orderService';
import {Colors, Fonts} from '@utils/Constants';
import LiveHeader from './LiveHeader';
import LiveMap from './LiveMap';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import DeliveryDetails from './DeliveryDetails';
import withLiveStatus from './withLiveStatus';

const LiveTracking: FC = () => {
  const {currentOrder, setCurrentOrder} = useAuthStore();

  const fetchOrderDetails = async () => {
    const data = await getOrderById(currentOrder?._id as any);
    setCurrentOrder(data);
  };
  useEffect(() => {
    fetchOrderDetails();
  }, []);

  let msg = 'packing your order';
  let time = 'Arriving in 10 minutes..';
  if (currentOrder && currentOrder?.status == 'confirmed') {
    msg = 'Delivering your order';
    time = 'Arriving in 8 minutes..';
  } else if (currentOrder?.status == 'arriving') {
    msg = 'Order picked up';
    time = 'Arriving in 6 minutes..';
  } else if (currentOrder?.status == 'delivered') {
    msg = 'Order Delivered';
    time = 'Fastest Delivery ⭐️';
  }
  return (
    <View style={styles.container}>
      <LiveHeader type="Customer" title={msg} time={time} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <LiveMap />
        <View style={styles.flexRow}>
          <View style={styles.iconContainer}>
            <Icon
              name={currentOrder?.deliveryPartner ? 'call' : 'pricetags'}
              color={Colors.disabled}
              size={RFValue(20)}
            />
          </View>
          <View style={{width: '82%'}}>
            <CustomText
              numberOfLines={1}
              variant="h7"
              fontFamily={Fonts.SemiBold}>
              {currentOrder?.deliveryPartner?.name ||
                'We will soon assign delivery partner'}
            </CustomText>

            {currentOrder?.deliveryPartner && (
              <CustomText variant="h7" fontFamily={Fonts.Medium}>
                {currentOrder?.deliveryPartner?.phone}
              </CustomText>
            )}

            <CustomText variant="h9" fontFamily={Fonts.Medium}>
              {currentOrder?.deliveryPartner
                ? 'For delivery instruction you can contact here'
                : msg}
            </CustomText>
          </View>
        </View>
        <DeliveryDetails details={currentOrder?.customer} />
      </ScrollView>
    </View>
  );
};

export default withLiveStatus(LiveTracking);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  scrollContent: {
    paddingBottom: 150,
    backgroundColor: Colors.backgroundSecondary,
    padding: 15,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    borderRadius: 15,
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
