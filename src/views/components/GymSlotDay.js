import React, {useState} from 'react'
import { StyleSheet, 
         Text, 
         Image, 
         TouchableOpacity, 
         View } from 'react-native';
import { COLORS, icons, images } from '../../constants'

const GymSlotDay = ({title, onPress, active}) => {

  return (
    <TouchableOpacity 
        onPress={onPress}
        style={active ? styles.box_selected : styles.box}>
      <Text style={active ? styles.title_selected : styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    title_selected: {
        color: COLORS.white,
        fontSize: 13,
        fontFamily: "Benton Sans",
        fontWeight: 'normal',
    },
    title: {
        color: COLORS.StandardardBankBlue,
        fontSize: 13,
        fontFamily: "Benton Sans",
        fontWeight: 'normal',
    },
    box: {
        marginRight: 8,
        borderColor: COLORS.ArrowGray,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 13,
        paddingVertical:4,
        paddingHorizontal:10,
        marginRight: 8,
    },
    box_selected: {
        backgroundColor: COLORS.StandardardBankBlue,
        marginRight: 8,
        borderRadius: 13,
        paddingVertical:5,
        paddingHorizontal:11,
        marginRight: 10,
    }
})

export default GymSlotDay;