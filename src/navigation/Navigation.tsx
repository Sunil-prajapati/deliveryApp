import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '@features/auth/SplashScreen';
import { navigationRef } from '@utils/NavigationUtils';
import DeliveryLogin from '@features/auth/DeliveryLogin';
import CustomerLogin from '@features/auth/CustomerLogin';

const Stack = createStackNavigator();

const Navigation: FC = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen options={{ animationEnabled: true }} name="DeliveryLogin" component={DeliveryLogin} />
                <Stack.Screen name="CustomerLogin" options={{ animationEnabled: true }} component={CustomerLogin} />


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;
