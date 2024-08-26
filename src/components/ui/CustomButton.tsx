import { ActivityIndicator, StyleSheet, TouchableOpacity, } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '@utils/Constants';
import CustomText from './CustomText';

interface ButtonProps {
    onPress: () => void;
    title: string;
    disabled: boolean;
    loading?: boolean;
}
const CustomButton: FC<ButtonProps> = ({ onPress, title, disabled, loading }) => {
    return (
        <TouchableOpacity
            style={[styles.btn, { backgroundColor: disabled ? Colors.disabled : Colors.secondary }]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ?
                <ActivityIndicator size='small' color='white' />
                : <CustomText
                    variant='h6'
                    style={styles.text}
                    textColor={styles.text.color}
                    fontFamily={Fonts.SemiBold}
                >
                    {title}
                </CustomText>
            }
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginVertical: 15,
        borderRadius: 10,
        width: '100%',
    },
    text: {
        color: '#ffffff',
    }
})