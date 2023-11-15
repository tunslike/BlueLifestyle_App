import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
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
        fontSize: 20,
        fontFamily: "Benton Sans",
        color: COLORS.StatureBlue,
        fontWeight: 'bold',
    },
    
})

export default MenuItemHeader;