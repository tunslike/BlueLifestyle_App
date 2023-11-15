import React from 'react';
import { 
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    View } from 'react-native';
import { icons, COLORS, images } from '../../constants';


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
        padding:5,
        borderRadius: 50
    },
    headerToolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        marginVertical:15,
        marginHorizontal:15
      },
})

export default HeaderBarBlank;