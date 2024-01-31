import React, {useState} from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    TouchableOpacity
 } from 'react-native'

 import { COLORS, icons, utilities, verticalScale } from '../../constants'

const AddQuantityItem = ({amount, getItemCount}) => {

  const [subTotal, setSubTotal] = useState(amount);
  const [itemCount, setItemCount] = useState(1);

  getItemCount(itemCount);

  // increase counter
  const IncreaseItem = () => {
            setItemCount(itemCount + 1)
    }

  // increase counter
  const DecreaseItem = () => {
        if(itemCount > 1) {
            setItemCount(itemCount - 1);
        }
  }
    
  return (
    <View>
            <View style={styles.orderQuantity}>
            <TouchableOpacity 
            onPress={() => DecreaseItem()}
        style={styles.itemicon}>
            <Image 
                source={icons.removeItem}
                style={{
                    height:20, width: 20, resizeMode: 'contain', tintColor: COLORS.SecondaryGreen
                }}
            />
        </TouchableOpacity>
        <Text style={styles.QtyText}>{itemCount}</Text>
        <TouchableOpacity 
            onPress={() => IncreaseItem()}
        style={styles.itemicon}>
                <Image 
                source={icons.additem}
                style={{
                    height:20, width: 20, resizeMode: 'contain', tintColor: COLORS.SecondaryGreen
                }}
            />
        </TouchableOpacity>
            </View>
            <View style={styles.subTotalBox}>
                <Text style={styles.subTotalText}>
                Sub-total Per Item: ₦ {utilities.formatToCurency(subTotal * itemCount)}
                </Text>
            </View>
    </View>
  )
}

const styles = StyleSheet.create({
    subTotalBox: {
        alignItems: 'center',
        marginTop: verticalScale(10)
    },
    subTotalText: {
        fontSize: 13,
        fontFamily: "Benton Sans",
        color: COLORS.SecondaryPlum,
        fontWeight: 'normal',
    },
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