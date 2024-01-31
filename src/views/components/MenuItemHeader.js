import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS } from '../../constants';


const MenuItemHeader = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: wp(5),
        fontFamily: "Roboto",
        color: COLORS.StatureBlue,
        fontWeight: 'bold',
    },
    
})

export default MenuItemHeader;