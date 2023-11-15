import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    Image } from 'react-native'

import { COLORS, icons } from '../../constants'

const TabIcon = ({focused, icon, title}) => {
  if(focused) {
    return (
        <View style={styles.isFocusedTab}>
            <Image source={icon} 
                style={{
                    height: 22,
                    width: 22,
                    resizeMode: 'contain',
                    tintColor: COLORS.StandardardBankBlue
                }}
            />
            <Text
                style={styles.focusText}
            >{title}</Text>
        </View>
    )
  }else {
    return (
        <View style={styles.notFocusedTab}>
            <Image source={icon} 
                style={{
                    height: 22,
                    width: 22,
                    resizeMode: 'contain',
                    tintColor: COLORS.white
                }}
            />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    focusText: {
        color: COLORS.StandardardBankBlue,
        fontSize: 14,
        fontFamily: "Benton Sans",
        fontWeight: 'bold',
        marginLeft:7,
    },
    notFocusedTab: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 90,
        width: 50
    },
    isFocusedTab: {
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical:5,
        borderRadius:15,
        marginLeft:20
    }
});

export default TabIcon;