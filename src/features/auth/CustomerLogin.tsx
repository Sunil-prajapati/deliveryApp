import { Alert, Animated, Image, Keyboard, StyleSheet, View } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import { resetAndNavigate } from '@utils/NavigationUtils';
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts, lightColors } from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import CustomButton from '@components/ui/CustomButton';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient'

const bottomColors = [...lightColors].reverse()
const CustomerLogin: FC = () => {
	const [gestureSequence, setGestureSequence] = useState<string[]>([])
	const [phoneNumber, setPhoneNumber] = useState<string>('')
	const [loading, setLoading] = useState(false)
	const keyboardOffsetHeight = useKeyboardOffsetHeight()

	const animatedValue = useRef(new Animated.Value(0)).current

	useEffect(() => {
		if (keyboardOffsetHeight === 0) {
			Animated.timing(animatedValue, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}).start()
		} else {
			Animated.timing(animatedValue, {
				toValue: -keyboardOffsetHeight * 0.84,
				duration: 1000,
				useNativeDriver: true,
			}).start()
		}
	}, [keyboardOffsetHeight])


	const handleGesture = ({ nativeEvent }: any) => {
		if (nativeEvent.state === State.END) {
			const { translationX, translationY } = nativeEvent;
			let direction = ''
			if (Math.abs(translationX) > Math.abs(translationY)) {
				direction = translationX > 0 ? 'right' : 'left'
			} else {
				direction = translationY > 0 ? 'down' : 'up'
			}
			const newSequence = [...gestureSequence, direction].slice(-5)
			setGestureSequence(newSequence)
			if (newSequence.join(' ') === 'up up down left right') {
				setGestureSequence([])
				resetAndNavigate('DeliveryLogin')
			}
		}
	}

	const handleAuth = async () => {

		Keyboard.dismiss()
		setLoading(true)
		try {
			resetAndNavigate('ProductDashboard')
		} catch (error) {
			Alert.alert('Login failed')
		}
		finally {
			setLoading(false)
		}
		// await Auth.signInWithPhoneNumber(phoneNumber)
		setLoading(false)
		resetAndNavigate('DeliveryLogin')
	}
	return (
		<GestureHandlerRootView style={styles.container}>
			<View style={styles.container}>
				<CustomSafeAreaView>
					<ProductSlider />
					<PanGestureHandler onHandlerStateChange={handleGesture}>
						<Animated.ScrollView
							bounces={false}
							keyboardDismissMode="on-drag"
							keyboardShouldPersistTaps="handled"
							contentContainerStyle={styles.subContainer}
							style={{ transform: [{ translateY: animatedValue }] }}
						>
							<LinearGradient colors={bottomColors} style={styles.gradient} />
							<View style={styles.content}>
								<Image source={require('@assets/images/logo.png')} style={styles.logo} />
								<CustomText variant='h2' fontFamily={Fonts.Bold}>
									India's last minute app
								</CustomText>
								<CustomText variant='h5' fontFamily={Fonts.SemiBold} style={styles.text}>
									Login or signup
								</CustomText>
								<CustomInput
									onChangeText={(text: string) => { setPhoneNumber(text) }}
									onClear={() => setPhoneNumber('')}
									maxLength={10}
									value={phoneNumber}
									left={<CustomText
										style={styles.phoneText}
										variant='h6'
										fontFamily={Fonts.SemiBold}
									>
										+91
									</CustomText>}
									placeholder="Enter mobile number"
									inputMode='numeric'
								/>
								<CustomButton
									loading={loading}
									onPress={handleAuth}
									disabled={phoneNumber?.length != 10}
									title="Continue"
								/>
							</View>
						</Animated.ScrollView>
					</PanGestureHandler>
				</CustomSafeAreaView>
				{/* <View style={styles.footer}>
					<SafeAreaView>
						<CustomText fontSize={RFValue(6)}>
							By continuing, you agree to our Terms & Conditions and Privacy Policy.
						</CustomText>
					</SafeAreaView>
				</View> */}
			</View>
		</GestureHandlerRootView>
	)
}

export default CustomerLogin;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	subContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginBottom: 20
	},
	content: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		backgroundColor: 'white',
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	logo: {
		height: 50,
		width: 50,
		borderRadius: 20,
		marginVertical: 10,
	},
	text: {
		marginTop: 2,
		marginBottom: 25,
		opacity: 0.8,
	},
	phoneText: {
		marginLeft: 10,
	},
	footer: {
		borderTopWidth: 0.4,
		borderTopColor: Colors.border,
		paddingBottom: 1,
		zIndex: 2,
		position: 'absolute',
		bottom: 0,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f8f9fc',
	},
	gradient: {
		paddingTop: 60,
		width: '100%',
	}
})