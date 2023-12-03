import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, icons, verticalScale, horizontalScale, moderateScale } from '../../constants';


// init app
const LogoutButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={icons.logout}
        style={{
            height: 33, width: 33, resizeMode: 'contain', tintColor: COLORS.white
        }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        height: verticalScale(50),
        width: horizontalScale(50),
        backgroundColor: COLORS.SecondaryPlum,
        paddingVertical: verticalScale(8),
        paddingHorizontal: horizontalScale(5),
        borderRadius: 28,
        position: 'absolute',
        bottom: 85,
        right: 20,
        zIndex: 10,
        alignItems: 'center'
    }
})

export default LogoutButton;