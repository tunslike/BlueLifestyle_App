import React from 'react';
import { StyleSheet, Text, View, Image,
        Platform } from 'react-native';
import { COLORS } from '../../constants';

// INIT FUNCTION
const ProviderFeature = ({icon, title}) => {
  return (
        <View style={styles.featureBox}>
            <Image source={icon} 
                style={{
                    width: 15, marginRight:3, height: 15, tintColor: COLORS.SecondaryGreen, resizeMode: 'contain'
                }}
            />
            <Text style={styles.featureText}>{title}</Text>
        </View>
  )
}

const styles = StyleSheet.create({
    featureText: {

            fontSize: 13,
            fontFamily: "Roboto",
            color: COLORS.darkGray,
            fontWeight: 'normal',
    },
    featureBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: 8,
        borderColor: COLORS.ArrowGray,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: Platform.OS === 'ios' ? 14 : 10,
        paddingVertical: Platform.OS === 'ios' ? 5.6 : 2,
        paddingHorizontal:8,
        marginRight: 12
    },
})

export default ProviderFeature;