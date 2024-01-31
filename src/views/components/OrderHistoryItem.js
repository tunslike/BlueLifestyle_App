import React from 'react';
import { StyleSheet, 
          Text, 
          Image, 
          View,
        TouchableOpacity
        } from 'react-native'
import { COLORS, icons, images } from '../../constants'


const OrderHistoryItem = ({status, message, orderNo, orderDate}) => {
  return (
    <View style={styles.itemBody}>
      <View style={styles.itemDetails}>
            <Image 
                source={images.blank_food}
                style={{
                    height: 70, width: 50, resizeMode: 'contain'
                }}
            />
            <View>
                <Text style={styles.textHeader}>Order No: {orderNo}</Text>
                <Text style={styles.textSubDetails}>Order Date: {orderDate}</Text>
            </View>
      </View>
      <TouchableOpacity
         style={(status == 0) ? styles.pendingStatusBtn : styles.completedStatusBtn}
      >
         <Text style={[styles.pendingStatusText, {color : (status == 0) ? COLORS.WarningTextColor : COLORS.SuccessTextColor}]}>{message}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    pendingStatusBtn: {
        borderColor: COLORS.WarningBorder,
        backgroundColor: COLORS.Warningbg,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 3,
    },
    completedStatusBtn: {
        borderColor: COLORS.SuccessBorder,
        backgroundColor: COLORS.SuccessBg,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 3,
    },
    pendingStatusText: {
        fontSize: 12,
        fontFamily: "Benton Sans",
        fontWeight: 'normal'
    },
    completedStatusText: {
        fontSize: 12,
        fontFamily: "Benton Sans",
        fontWeight: 'normal'
    },
    textHeader: {
        color: COLORS.StandardardBankBlue,
        fontSize: 13,
        fontFamily: "Benton Sans",
        fontWeight: 'bold'
    },
    textSubDetails: {
        color: COLORS.SecondaryOrange,
        fontSize: 12,
        fontFamily: "Benton Sans",
        fontWeight: 'normal'
    },
    itemDetails: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        columnGap: 15,
    },
    itemBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: COLORS.lineDividerGray,
        borderBottomWidth:1,
        borderBottomStyle: 'solid',
        paddingBottom:5,
        paddingRight:10,
        marginBottom: 5,
    }
})

export default OrderHistoryItem;