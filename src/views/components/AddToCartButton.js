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

const AddToCartButton = ({title, icon, count, onPress}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={styles.loginBtn}>
          <Text style={styles.loginText}>{title}</Text>
          <View style={styles.couter}>
              <Text style={styles.txtCount}>{count} Items</Text>
          </View>
          <Image source={icon} 
            style={{height:22, width: 22, marginLeft: 5,
            tintColor: COLORS.white, resizeMode: 'contain'}}
          />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  txtCount: {
    fontSize: 12,
    fontFamily: "Benton Sans",
    color: COLORS.StandardardBankBlue,
    fontWeight: 'bold',
  },
    couter: {
      backgroundColor: COLORS.white,
      paddingVertical: 2.5,
      paddingHorizontal:7,
      borderRadius:15,
      flexDirection: 'row',
      justifyContent: 'flex-start'
    },
    loginText: {
        fontSize: 16,
        fontFamily: "Benton Sans",
        color: COLORS.white,
        fontWeight: 'bold',
        marginRight:10
      },
    loginBtn: {
        height: wp(13),
        width: wp(88),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.StandardardBankBlue ,
        borderRadius:10,
        marginHorizontal: hp(3)
    }
})

export default AddToCartButton;