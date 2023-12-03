import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput,
    Image,
    Keyboard,
    TouchableOpacity, } from 'react-native';

import { COLORS } from '../../constants';

const CustomInput = ({label, onFocus, onPress, icon, value, onChange, placeholder,maxlength, }) => {
  return (
    <View style={styles.container}>
            
<Text style={styles.labelStyle}>{label}</Text>
            <TextInput
                value={value}
                onChangeText={onChange}
                style={styles.inputStyle}
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
            fontFamily: "Benton Sans",
            fontWeight:'bold',
            fontSize:14,
            color: COLORS.StandardardBankBlue,
            width:100,
    },
    inputStyle: {
        fontFamily: "Benton Sans",
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