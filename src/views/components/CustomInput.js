import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput,
    Image,
    Keyboard,
    TouchableOpacity, Platform } from 'react-native';
    import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS } from '../../constants';

const CustomInput = ({label, onFocus, onPress, icon, errorStyle,
                    value, onChange, placeholder,maxlength, }) => {
  return (
    <View style={styles.container}>
            
<Text style={styles.labelStyle}>{label}</Text>
            <TextInput
                value={value}
                onChangeText={onChange}
                style={[styles.inputStyle,{...errorStyle}]}
                placeholder={placeholder}
                placeholderTextColor={COLORS.darkGray}
                keyboardType="default"
                autoCapitalize='none'
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                returnKeyType='next'
                maxLength={maxlength}
                onFocus={onFocus}
            />
    </View>
  )
}

const styles = StyleSheet.create({
    labelStyle: {
            fontFamily: "Roboto",
            fontWeight:'bold',
            fontSize:14,
            color: COLORS.StandardardBankBlue,
            width:100,
    },
    inputStyle: {
        fontFamily: "Roboto",
        fontWeight:'600',
        fontSize:14,
        color: COLORS.darkblue,
        marginLeft:15,
        flex: 1
    },
    container : {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 1,
        marginHorizontal:5,
        borderBottomColor: COLORS.lineDividerGray,
        paddingBottom: 2,
        paddingBottom: Platform.OS === 'ios' ? hp(1.7) : null,
        marginTop: Platform.OS === 'ios' ? hp(2.7) :wp(1)
    },
    container_multiline : {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        marginHorizontal:5,
        borderBottomColor: COLORS.textGrey,
        paddingBottom: 3,
        marginTop:10
    }
})

export default CustomInput;