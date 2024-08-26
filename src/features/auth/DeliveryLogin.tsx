import { Alert, StyleSheet, View } from 'react-native'
import React, { FC, useState } from 'react'
import { resetAndNavigate } from '@utils/NavigationUtils'
import { deliveryLogin } from '@service/authService'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import { ScrollView } from 'react-native-gesture-handler'
import { screenHeight } from '@utils/Scaling'
import LottieView from 'lottie-react-native'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import CustomInput from '@components/ui/CustomInput'
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomButton from '@components/ui/CustomButton'


const DeliveryLogin: FC = () => {
    const [loginDetails, setLoginDetails] = useState({ email: '', password: '', loading: false });

    const handleLogin = async () => {
        setLoginDetails({ ...loginDetails, loading: true })
        try {
            await deliveryLogin(loginDetails)
            resetAndNavigate('DeliveryDashboard')
        } catch (error) {
            Alert.alert("Login failed")
        }
        finally {
            setLoginDetails({ ...loginDetails, loading: false })
        }

    }
    return (
        <CustomSafeAreaView>
            <ScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag'>
                <View style={styles.container}>
                    <View style={styles.lottieContainer}>
                        <LottieView autoPlay loop style={styles.lottie} source={require('@assets/animations/delivery_man.json')} />
                    </View>
                    <CustomText variant='h3' fontFamily={Fonts.Bold}>
                        Delivery Partner Portal
                    </CustomText>
                    <CustomText variant='h6' style={styles.text} fontFamily={Fonts.SemiBold}>
                        Faster than Flash 🏃‍♂️‍➡️
                    </CustomText>
                    <CustomInput
                        onChangeText={(email: string) => setLoginDetails({ ...loginDetails, email })}
                        value={loginDetails?.email.toLocaleLowerCase()}
                        left={<Icon
                            name='mail'
                            color="#F8890E"
                            style={{ marginLeft: 10 }}
                            size={RFValue(18)}
                        />}
                        placeholder='Email'
                        inputMode='email'
                        right={false}
                    />
                    <CustomInput
                        onChangeText={(password: string) => setLoginDetails({ ...loginDetails, password })}
                        value={loginDetails?.password}
                        left={<Icon
                            name='key-sharp'
                            color="#F8890E"
                            style={{ marginLeft: 10 }}
                            size={RFValue(18)}
                        />}
                        placeholder='Password'
                        secureTextEntry
                        right={false}
                    />
                    <CustomButton
                        disabled={loginDetails?.email.length < 3 || loginDetails?.password.length < 4}
                        title="Login"
                        onPress={handleLogin}
                        loading={loginDetails?.loading}
                    />
                </View>
            </ScrollView>
        </CustomSafeAreaView>
    )
}

export default DeliveryLogin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center'
    },
    lottie: {
        width: '100%',
        height: '100%'
    },
    lottieContainer: {
        height: screenHeight * 0.12,
        width: '100%',
    },
    text: {
        marginTop: 2,
        marginBottom: 25,
        opacity: 0.8
    }
})