import { StyleSheet, Animated as RNAnimated, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import NoticeAnimation from '@features/dashboard/NoticeAnimation';
import { NoticeHeight } from '@utils/Scaling';
import { useAuthStore } from '@state/authStorage';
import Visuals from './Visuals';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CollapsibleContainer, CollapsibleHeaderContainer, CollapsibleScrollView, withCollapsibleContext } from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';
import StickSearchBar from './StickSearchBar';
import Content from '@components/dashboard/Content';
import CustomText from '@components/ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { Fonts } from '@utils/Constants';

const NOTICE_HEIGHT = -(NoticeHeight + 24);

const ProductDashboard = () => {
	const { user } = useAuthStore();
	const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;

	const slideUp = () => {
		RNAnimated.timing(noticePosition, {
			toValue: NOTICE_HEIGHT,
			duration: 1200,
			useNativeDriver: false,
		}).start();
	};

	const slideDown = () => {
		RNAnimated.timing(noticePosition, {
			toValue: 0,
			duration: 1200,
			useNativeDriver: false,
		}).start();
	};

	useEffect(() => {
		slideDown();
		const timeoutId = setTimeout(() => {
			slideUp();
		}, 3500);
		return () => clearTimeout(timeoutId);
	}, []);

	return (
		<NoticeAnimation noticePosition={noticePosition}>
			<>
				<Visuals />
				<SafeAreaView />
				<CollapsibleContainer style={styles.panelContainer}>
					<CollapsibleHeaderContainer containerStyle={styles.transparent}>
						<AnimatedHeader showNotice={() => {
							slideDown()
							const timeoutId = setTimeout(() => {
								slideUp()
							}, 3500)
							return () => clearTimeout(timeoutId)
						}} />
						<StickSearchBar />
					</CollapsibleHeaderContainer>
					<CollapsibleScrollView
						nestedScrollEnabled
						style={styles.panelContainer}
						showsVerticalScrollIndicator={false}
					>
						<Content />
						<View style={{ backgroundColor: "#F8F8F8", padding: 20 }}>
							<CustomText fontSize={RFValue(32)} fontFamily={Fonts.Bold} style={{ opacity: 0.2 }}>
								India's last minute app 🥭
							</CustomText>
							<CustomText fontFamily={Fonts.Bold} style={{ marginTop: 10, paddingBottom: 100, opacity: 0.2 }}>
								Developed By ☠️ Sunil Prajapati
							</CustomText>
						</View>
					</CollapsibleScrollView>
				</CollapsibleContainer>
			</>
		</NoticeAnimation>
	);
};

export default withCollapsibleContext(ProductDashboard);

const styles = StyleSheet.create({
	panelContainer: {
		flex: 1
	},
	transparent: {
		backgroundColor: 'transparent',
	}
});
