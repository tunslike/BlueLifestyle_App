import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,
        Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS, icons, verticalScale, horizontalScale, moderateScale } from '../../constants';



const HistoryFacilityItem = ({icon, title, onPress, type, }) => {
    
  return (
    <TouchableOpacity
        onPress={onPress}
    >
    {type == 'food' && 
        <View style={styles.container_restuarant}>
        <Image
            source={icon}
            style={{
                height: 30, width: 30, resizeMode: 'contain', tintColor: COLORS.StandardardBankBlue
            }}
        />
       <View style={styles.textArea}>
            <Text style={styles.mainTitle}>RESTAURANT ORDERS</Text>

       </View>
       <View style={styles.viewBtn}>
            <Text style={styles.btnText}>View History</Text>
       </View>
        </View>
    } 
    
    {type == 'creche' && 
    <View style={styles.container_creche}>
    <Image
        source={icon}
        style={{
            height: 30, width: 30, resizeMode: 'contain', tintColor: COLORS.WarningTextColor
        }}
    />
   <View style={styles.textArea}>
        <Text style={[styles.mainTitle, {color: (type == 'creche') ? COLORS.WarningTextColor : null}]}>CRECHE ORDERS</Text>
   </View>
   <View style={styles.viewBtn}>
        <Text style={styles.btnText}>View History</Text>
   </View>
    </View>
} 

{type == 'gym' && 
<View style={styles.container_gym}>
<Image
    source={icon}
    style={{
        height: 30, width: 30, resizeMode: 'contain', tintColor: COLORS.AlertGreenbg
    }}
/>
<View style={styles.textArea}>
    <Text style={[styles.mainTitle, {color: (type == 'gym') ? COLORS.AlertGreenbg : null}]}>GYM ORDERS</Text>
</View>
<View style={styles.viewBtn}>
    <Text style={styles.btnText}>View History</Text>
</View>
</View>
} 
</TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btnText: {
        fontSize: moderateScale(12),
        fontFamily: "Roboto",
        color: COLORS.StatureBlue,
        fontWeight: 'normal', 
    },
    viewBtn: {
        borderRadius: 14,
        paddingVertical: verticalScale(5),
        paddingHorizontal: horizontalScale(12),
        backgroundColor: COLORS.white,
    },
    subTitle: {
        fontSize: moderateScale(12),
        fontFamily: "Roboto",
        color: COLORS.StatureBlue,
        fontWeight: 'normal', 
    },
    mainTitle: {
        fontSize: moderateScale(13),
        fontFamily: "Roboto",
        color: COLORS.StandardardBankBlue,
        fontWeight: 'bold', 
    },
    textArea: {
     flex: 1,
    },
    container_restuarant: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: COLORS.InfoAlertBorder,
        backgroundColor: COLORS.InfoAlertbg,
        marginHorizontal: horizontalScale(20),
        marginTop: verticalScale(20),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: Platform.OS === 'ios' ? wp(5) : wp(4),
        borderRadius: moderateScale(15),
        columnGap: 15
      },
      container_creche: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: COLORS.WarningBorder,
        backgroundColor: COLORS.Warningbg,
        marginHorizontal: horizontalScale(20),
        marginTop: verticalScale(20),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: Platform.OS === 'ios' ? wp(5) : wp(4),
        borderRadius: moderateScale(15),
        columnGap: 15
      },
      container_gym: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#bfe5eb',
        backgroundColor: '#d1ecf1',
        marginHorizontal: horizontalScale(20),
        marginTop: verticalScale(20),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: Platform.OS === 'ios' ? wp(5) : wp(4),
        borderRadius: moderateScale(15),
        columnGap: 15
      },
})

export default HistoryFacilityItem;