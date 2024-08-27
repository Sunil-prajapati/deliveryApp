import { StyleSheet, View } from 'react-native'
import React from 'react'
import { adData, categories } from '@utils/dummyData'
import AdCarousal from './AdCarousal'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import CategoryContainer from './CategoryContainer'

const Content = () => {
    return (
        <View style={styles.container}>
            <AdCarousal adData={adData} />
            <CustomText variant='h5' fontFamily={Fonts.SemiBold}>
                Grocery and kitchen
            </CustomText>
            <CategoryContainer data={categories} />
            <CustomText variant='h5' fontFamily={Fonts.SemiBold}>
                Best sellers
            </CustomText>
            <CategoryContainer data={categories} />
            <CustomText variant='h5' fontFamily={Fonts.SemiBold}>
                snacks and drinks
            </CustomText>
            <CategoryContainer data={categories} />
        </View>
    )
}
export default Content

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    }
})