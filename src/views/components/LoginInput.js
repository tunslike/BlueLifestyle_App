import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput,
    Image,
    Keyboard,
    TouchableOpacity, } from 'react-native';


import {COLORS, icons} from '../../constants'

const LoginInput = ({pwd, value, setSecureText, visibleOnPress, onChange, placeholder, maxlength, icon, eye_type}) => {
  return (
    <View style={styles.container}>
        <Image source={icon} 
        style={{
            height:23, 
            width: 23, 
            resizeMode: 'cover', 
            tintColor:COLORS.StandardardBankBlue}}  />
        <TextInput
            value={value}
            onChange={onChange}
            style={styles.inputStyle}
            placeholder={placeholder}
            placeholderTextColor={COLORS.darkGray}
            keyboardType="default"
            autoCapitalize='none'
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={setSecureText}
            returnKeyType='next'
            maxLength={maxlength}
        />

        {pwd == true &&
        <TouchableOpacity
            onPress={visibleOnPress}
        >
            <Image 
            source={eye_type}
            style={{
                height:22, width:22, resizeMode: 'contain',
                tintColor: COLORS.darkGray
            }}
            />
        </TouchableOpacity>
           
        }
       
    </View>
  )
}

const styles = StyleSheet.create({
    inputStyle: {
        fontFamily: "Benton Sans",
        fontWeight:'600',
        fontSize:15,
        color: COLORS.darkblue,
        marginLeft:15,
        flex: 1
    },
    container : {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 25,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.textGrey,
        paddingBottom: 3,
        marginTop:10
    }
})

export default LoginInput;