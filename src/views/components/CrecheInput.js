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

const CrecheInput = ({button, onFocus, onPress, icon, value, onChange, placeholder,maxlength, multiline}) => {
  return (
    <View style={multiline ? styles.container_multiline : styles.container}>
            {button == true && 
                <TouchableOpacity
                    onPress={onPress}
                >
                    <Image source={icon} 
                    style={{
                        height:20, 
                        width: 20, 
                        resizeMode: 'cover', 
                        tintColor:COLORS.StandardardBankBlue
                    }}/>
                </TouchableOpacity>
            }

            {button == false && 
                    <Image source={icon} 
                    style={{
                        height:20, 
                        width: 20, 
                        resizeMode: 'cover', 
                        tintColor:COLORS.StandardardBankBlue,
                        marginTop:(multiline) ? 10 : null
                    }}  />
    
            }

            <TextInput
                value={value}
                onChangeText={onChange}
                style={multiline ? styles.multilineText : styles.inputStyle}
                placeholder={placeholder}
                placeholderTextColor={COLORS.darkGray}
                keyboardType="default"
                autoCapitalize='none'
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                returnKeyType='next'
                maxLength={maxlength}
                multiline={multiline ? true : false}
                onFocus={onFocus}
            />
    </View>
  )
}

export default CrecheInput

const styles = StyleSheet.create({
    multilineText: {
        minHeight: 130,
        fontFamily: "Benton Sans",
        fontWeight:'600',
        fontSize:14,
        color: COLORS.darkblue,
        marginLeft:15,
        flex: 1,
        textAlignVertical: 'top'
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
        borderBottomColor: COLORS.textGrey,
        paddingBottom: 3,
        marginTop:5
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