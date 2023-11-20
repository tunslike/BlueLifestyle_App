import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import { COLORS, icons } from '../../constants';

const { width, height } = Dimensions.get("window");

// INIT MENU
const OrderItem = ({image, name, details, price, discount, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
    <View style={styles.menuBox}>
      <Image source={image} style={{
        height: 60, width: 60, resizeMode: 'contain',
        borderRadius: 10, marginRight: 20,
      }} />
      <View style={styles.menuDetails}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.textDesc}>{details}</Text>
        <View style={styles.boxFooter}>

            <Text style={styles.price}>₦ {price}</Text>

                <View style={styles.orderQuantity}>
                <TouchableOpacity style={styles.itemicon}>
                <Image 
                    source={icons.removeItem}
                    style={{
                        height:15, width: 15, resizeMode: 'contain', tintColor: COLORS.SecondaryGreen
                    }}
                />
            </TouchableOpacity>
            <Text style={styles.QtyText}>1</Text>
            <TouchableOpacity style={styles.itemicon}>
                    <Image 
                    source={icons.additem}
                    style={{
                        height:15, width: 15, resizeMode: 'contain', tintColor: COLORS.SecondaryGreen
                    }}
                />
            </TouchableOpacity>
                </View>

        </View>
        
      </View>
    </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    QtyText: {
        fontSize: 18,
        fontFamily: "Benton Sans",
        color: COLORS.StatureBlue,
        fontWeight: 'bold',
    },
    orderQuantity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:100
    },
    boxFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    price: {
        fontSize: 15,
        marginTop:5,
        fontFamily: "Benton Sans",
        color: COLORS.StatureBlue,
        fontWeight: 'bold',
    },
    itemicon: {
    backgroundColor: COLORS.addItem,
    padding:5,
    borderRadius: 10,
    },
    menuDetails: {
        width:'78%',
    },
    textDesc: {
        fontSize: 14,
        fontFamily: "Benton Sans",
        color: COLORS.darkGray,
        fontWeight: 'normal',
        paddingRight:5
    },
    nameText: {
        fontSize: 15,
        fontFamily: "Benton Sans",
        color: COLORS.StandardardBankBlue,
        fontWeight: 'normal',
    },
    menuBox: {
        width,
        paddingBottom:20,
        borderBottomColor: COLORS.lineDividerGray,
        borderBottomWidth:1,
        borderBottomStyle: 'solid',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop:20,
        paddingHorizontal:20
    }
})

export default OrderItem;