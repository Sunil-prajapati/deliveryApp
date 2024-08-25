import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import Icons from 'react-native-vector-icons/Ionicons'
interface InputProps {
    left: React.ReactNode;
    onClear?: () => void;
    right?: boolean;
    maxLength: number;
}
const CustomInput: FC<InputProps & React.ComponentProps<typeof TextInput>> = ({
    onClear,
    left,
    right = true,
    maxLength = 10,
    ...props
}) => {
    return (
        <View style={styles.flexRow}>
            {left}
            <TextInput
                {...props}
                style={styles.inputContainer}
                placeholderTextColor='#ccc'
                maxLength={maxLength}

            />
            <View style={styles.icon}>
                {props.value?.length != 0 && right &&
                    <TouchableOpacity onPress={onClear}>
                        <Icons name="close-circle-sharp" size={RFValue(16)} color='#ccc' />
                    </TouchableOpacity>
                }

            </View>
        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    text: {
        width: '10%',
        marginLeft: 10,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 0.5,
        width: '100%',
        marginVertical: 10,
        backgroundColor: 'white',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: Colors.border,
        borderColor: Colors.border,
        shadowOpacity: 0.5,
        shadowRadius: 2,
        paddingHorizontal: 7,
    },
    inputContainer: {
        width: '70%',
        fontFamily: Fonts.SemiBold,
        fontSize: RFValue(12),
        paddingVertical: 14,
        paddingBottom: 15,
        height: '100%',
        color: Colors.text,
        bottom: -1,
    },
    icon: {
        width: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    }
})