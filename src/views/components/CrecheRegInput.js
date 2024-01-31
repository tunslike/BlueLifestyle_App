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

const CrecheRegInput = ({label, onFocus, iconOnPress, icon, value, onChange, placeholder,maxlength, multiline}) => {
  return (
    <View style={multiline ? styles.container_multiline : styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
            <Text style={styles.label}>
            {label}
            </Text>
            {(icon) && 
                <TouchableOpacity onPress={iconOnPress}>
                    <Image source={icon} style={{
                        width: 15, height: 15, marginLeft: 5, resizeMode: 'contain', tintColor: COLORS.StatureBlue
                    }} />
                </TouchableOpacity>
              
            }
        </View>
        
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

export default CrecheRegInput

const styles = StyleSheet.create({
    label: {
        fontFamily: "Roboto",
        fontWeight:'bold',
        fontSize:14,
        color: COLORS.StatureBlue
    },  
    multilineText: {
        minHeight: 80,
        fontFamily: "Benton Sans",
        fontWeight:'600',
        fontSize:14,
        color: COLORS.darkblue,
        flex: 1,
        textAlignVertical: 'top'
    },
    inputStyle: {
        fontFamily: "Benton Sans",
        fontWeight:'600',
        fontSize: Platform.OS === 'ios' ? hp(1.85) : wp(3.7),
        color: COLORS.StandardardBankBlue,
        marginLeft:8,
        flex: 1
    },
    container : {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 1,
        marginHorizontal:5,
        borderBottomColor: COLORS.textGrey,
        paddingBottom: Platform.OS === 'ios' ? hp(1.7) : wp(0.4),
        marginTop: Platform.OS === 'ios' ? hp(2.7) :wp(2)
    },
    container_multiline : {
        borderBottomWidth: 1,
        marginHorizontal:5,
        borderBottomColor: COLORS.textGrey,
        paddingBottom: Platform.OS === 'ios' ? hp(1.7) : wp(0.4),
        marginTop: Platform.OS === 'ios' ? hp(2.7) :wp(2)
    }
})