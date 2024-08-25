import { StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

interface CustomSafeAreaViewProps {
    children: React.ReactNode,
    style?: ViewStyle
}
const CustomSafeAreaView: FC<CustomSafeAreaViewProps> = ({ children, style }) => {
    return (
        <SafeAreaView style={[styles.container, style]}>
            <View style={[styles.container, style]}>
                {children}
            </View>
        </SafeAreaView>
    )
}

export default CustomSafeAreaView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})