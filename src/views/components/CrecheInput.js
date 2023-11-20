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

const CrecheInput = ({button, onPress, icon, value, onChange, placeholder,maxlength}) => {
  return (
    <View style={styles.container}>
            {button == true && 
                <TouchableOpacity
                    onPress={onPress}
                >
                    <Image source={icon} 
                    style={{
                        height:20, 
                        width: 20, 
                        resizeMode: 'cover', 
                        tintColor:COLORS.StandardardBankBlue}}  />
                </TouchableOpacity>
            }

            {button == false && 
                    <Image source={icon} 
                    style={{
                        height:20, 
                        width: 20, 
                        resizeMode: 'cover', 
                        tintColor:COLORS.StandardardBankBlue}}  />
    
            }

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
                returnKeyType='next'
                maxLength={maxlength}
            />
    </View>
  )
}

export default CrecheInput

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
        borderBottomWidth: 1,
        marginHorizontal:5,
        borderBottomColor: COLORS.textGrey,
        paddingBottom: 3,
        marginTop:10
    }
})