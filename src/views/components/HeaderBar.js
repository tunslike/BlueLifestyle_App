import React from 'react';
import { 
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    View } from 'react-native';
import { icons, COLORS } from '../../constants';


const HeaderBar = ({onPress, icon, iconStyle, notificationStyle}) => {
  return (
    <View style={styles.headerToolbar}>
        <TouchableOpacity
            onPress={onPress}
        >
        <Image
            source={icon}
            style={{
                ...iconStyle
            }}
        />
        </TouchableOpacity>

        <TouchableOpacity
            onPress={console.log()}
        >
            <Image source={icons.notification} style={{
               ...notificationStyle
            }} />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    headerToolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        marginHorizontal:15
      },
})

export default HeaderBar;