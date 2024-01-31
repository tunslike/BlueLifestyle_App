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

import {COLORS, icons} from '../../constants'

const LoginInput = ({pwd, value, onFocus, setSecureText, visibleOnPress, onChange, placeholder, maxlength, icon, eye_type}) => {
  return (
    <View style={styles.container}>
        <Image source={icon} 
        style={{
            height:wp(5), 
            width: wp(5), 
            resizeMode: 'cover', 
            tintColor:COLORS.StandardardBankBlue}}  />
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
            secureTextEntry={setSecureText}
            returnKeyType='next'
            maxLength={maxlength}
            onFocus={onFocus}
        />

        {pwd == true &&
        <TouchableOpacity
            onPress={visibleOnPress}
        >
            <Image 
            source={eye_type}
            style={{
                height:wp(5), width:wp(5), resizeMode: 'contain',
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
        fontFamily: "Roboto",
        fontWeight:'500',
        fontSize: Platform.OS === 'ios' ? hp(1.85) : wp(3.7),
        color: COLORS.darkblue,
        marginLeft:wp(3),
        flex: 1
    },
    container : {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 25,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.textGrey,
        paddingBottom: Platform.OS === 'ios' ? hp(1.7) : wp(0.4),
        marginTop: Platform.OS === 'ios' ? hp(2.7) :wp(2)
    }
})

export default LoginInput;