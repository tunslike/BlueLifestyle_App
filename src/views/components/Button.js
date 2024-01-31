import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
         TouchableOpacity, 
         View } from 'react-native'

import { COLORS, icons } from '../../constants'

const Button = ({title, icon, onPress, addStyles}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[styles.loginBtn, {...addStyles}]}>
          <Text style={styles.loginText}>{title}</Text>
          <Image source={icon} 
            style={{height:22, width: 22,
            tintColor: COLORS.white, resizeMode: 'contain'}}
          />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    loginText: {
        fontSize: 15,
        fontFamily: "Roboto",
        color: COLORS.white,
        fontWeight: 'bold',
        marginRight:20
      },
    loginBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.StandardardBankBlue ,
        borderRadius:10,
        paddingHorizontal: 20,
        paddingVertical: 18,
        marginTop:30,
    }
})

export default Button;