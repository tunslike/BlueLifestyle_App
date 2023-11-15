import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
         TouchableOpacity, 
         View } from 'react-native'

import { COLORS, icons } from '../../constants'

const Button = ({title, icon, onPress}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={styles.loginBtn}>
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
        fontSize: 16,
        fontFamily: "Benton Sans",
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
        marginTop:40,
    }
})

export default Button;