import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
         TouchableOpacity, 
         View } from 'react-native';
import { COLORS, icons, images } from '../../constants'

const GymSlot = ({timeSlot, capacity, onPress}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
    style={styles.slotBody}>
    <Image source={icons.time3} 
        style={{
          width: 28, height: 28, 
          resizeMode: 'contain', tintColor: COLORS.StandardardBankBlue
        }}
    />
    <View style={styles.slotMainheader}>
        <Text style={styles.slotText}>{timeSlot}</Text>
        <Text style={styles.slotCaptext}>{capacity}</Text>
    </View>
    <Image 
      source={icons.arrow}
      style={{
        width: 25, height: 25, 
        resizeMode: 'contain', tintColor: COLORS.StandardardBankBlue
      }}
    />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  slotCaptext: {
    color: COLORS.SecondaryOrange,
    fontSize: 13,
    fontFamily: "Roboto",
    fontWeight: 'normal'
  },
  slotText: {
    color: COLORS.StandardardBankBlue,
    fontSize: 14,
    fontFamily: "Roboto",
    fontWeight: 'normal', 
  },
    slotMainheader: {
        flex: 1, paddingHorizontal:13
    },
    slotBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: COLORS.lineDividerGray,
        borderBottomWidth:1,
        borderBottomStyle: 'solid',
        paddingBottom:13,
        paddingRight:10,
        marginBottom: 19,
    }
})

export default GymSlot;