import React from 'react';
import { 
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    View, Platform } from 'react-native';
import { icons, COLORS, images } from '../../constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { verticalScale, horizontalScale, moderateScale } from '../../constants';


const HeaderBarBlank = ({onPress, icon, iconStyle, notificationStyle}) => {
  return (
    <View style={styles.headerToolbar}>
        <TouchableOpacity
            onPress={onPress}
            style={styles.arrowBg}
        >
        <Image
            source={icon}
            style={{
                height: 22, 
                width: 22, 
                resizeMode: 'contain', 
                tintColor: COLORS.white,
            }}
        />
        </TouchableOpacity>
        <View style={styles.shieldbg}>
            <Image source={images.shield} 
                style={{
                    height:50, width: 50, resizeMode: 'contain'
                }}
            />
        </View>
        <TouchableOpacity
            onPress={console.log()}
            style={styles.arrowBg}
        >
            <Image source={icons.notification} 
            style={{
                height:22, width: 22, 
                tintColor: COLORS.white, resizeMode: 'contain'
            }} />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    arrowBg: {
        backgroundColor: COLORS.darkGrayTransparent,
        padding:moderateScale(5),
        borderRadius: moderateScale(50)
    },
    headerToolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: wp(12.5),
        marginVertical:verticalScale(15),
        marginHorizontal:horizontalScale(15)
      },
})

export default HeaderBarBlank;