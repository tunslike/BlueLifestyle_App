import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
         TouchableOpacity, 
         Dimensions,
         View } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS, icons } from '../../constants'
const { width, height } = Dimensions.get("window");

const AddToCartButton = ({title, icon, onPress}) => {
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
        marginRight:10
      },
    loginBtn: {
      position: 'absolute',
    height: wp(14),
    bottom: hp(3),
    width: wp(88),
      zIndex:10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.StandardardBankBlue ,
        borderRadius:10,
        marginHorizontal: hp(3)
    }
})

export default AddToCartButton;