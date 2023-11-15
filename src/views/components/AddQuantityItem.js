import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    TouchableOpacity
 } from 'react-native'

 import { COLORS, icons } from '../../constants'

const AddQuantityItem = () => {
  return (
    <View style={styles.orderQuantity}>
        <TouchableOpacity style={styles.itemicon}>
            <Image 
                source={icons.removeItem}
                style={{
                    height:20, width: 20, resizeMode: 'contain', tintColor: COLORS.SecondaryGreen
                }}
            />
        </TouchableOpacity>
        <Text style={styles.QtyText}>1</Text>
        <TouchableOpacity style={styles.itemicon}>
                <Image 
                source={icons.additem}
                style={{
                    height:20, width: 20, resizeMode: 'contain', tintColor: COLORS.SecondaryGreen
                }}
            />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    itemicon: {
        backgroundColor: COLORS.addItem,
        padding:7,
        borderRadius: 10,
        },
    QtyText: {
        fontSize: 20,
        fontFamily: "Benton Sans",
        color: COLORS.StatureBlue,
        fontWeight: 'bold',
    },

    orderQuantity: {
        width: 170,
        backgroundColor: '#f7f7f7',
        borderRadius: 20,
        padding:8,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 30,
    },
})

export default AddQuantityItem;