import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS, icons, verticalScale, horizontalScale, moderateScale } from '../../constants';


// init app
const LogoutButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={icons.logout}
        style={{
            height: 33, width: 33, 
            resizeMode: 'contain', 
            tintColor: COLORS.white,
            marginTop: wp(0.5)
        }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        height: wp(13),
        width: wp(13),
        backgroundColor: COLORS.SecondaryPlum,
        paddingVertical: verticalScale(8),
        paddingHorizontal: horizontalScale(5),
        borderRadius: 28,
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 120 : 85,
        right: 20,
        zIndex: 10,
        alignItems: 'center'
    }
})

export default LogoutButton;