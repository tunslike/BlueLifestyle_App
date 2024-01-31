import React, {useState} from 'react';
import { StyleSheet, 
    Text, 
    View,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS, icons } from '../../constants';
import { TouchableHighlight } from '@gorhom/bottom-sheet';
const { width, height } = Dimensions.get("window");

// INIT APP
const ToggleButton = ({deliveryMethod}) => {

 const [active, setActive] = useState(1);

 deliveryMethod(active);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => setActive(1)}
      style={[styles.togglebtnLeft, {backgroundColor: (active == 1) ? COLORS.SecondaryGreen : COLORS.lineDividerGray}]}>
            <Image source={icons.eatIn} 
            style={{
                marginLeft:35,marginRight:5,height:15, width: 15, 
                resizeMode: 'contain', tintColor: (active == 1) ? COLORS.white : COLORS.StatureBlue
            }}
        />
        <Text style={[styles.toggleTextLeft, {color: (active == 1) ? COLORS.white : COLORS.StatureBlue}]}>Take Out</Text>
       
        
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => setActive(2)}
        style={[styles.togglebtnRight, {backgroundColor: (active == 2) ? COLORS.SecondaryGreen : COLORS.lineDividerGray}]}>
      <Image source={icons.takeout} 
      style={{
       marginLeft:35, marginRight:5,height:20, width: 20, 
       resizeMode: 'contain', tintColor: (active == 2) ? COLORS.white : COLORS.StatureBlue
      }}
  />
         <Text style={[styles.toggleTextRight, {color: (active == 2) ? COLORS.white : COLORS.StatureBlue}]}>Eat-In</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    toggleContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal:20,
        marginTop:10,
        marginBottom:19,
        
    },
    togglebtnRight : {
        padding: 15,
        borderTopRightRadius: 13,
        borderBottomRightRadius: 13,
        backgroundColor: COLORS.lineDividerGray,
        width: "50%",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    toggleTextLeft: {
        alignSelf: 'center',
        fontSize: 15,
        fontFamily: "Benton Sans",
        color: COLORS.StandardardBankBlue,
        fontWeight: 'bold',
        color: COLORS.white,
        
    },
    toggleTextRight: {
        alignSelf: 'center',
        fontSize: 15,
        fontFamily: "Benton Sans",
        color: COLORS.StandardardBankBlue,
        fontWeight: 'bold',
        color: COLORS.StatureBlue,
    },
    togglebtnLeft : {
        width: "50%",
        padding: 15,
        borderTopLeftRadius: 13,
        borderBottomLeftRadius: 13,
        backgroundColor: COLORS.SecondaryGreen,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }

})

export default ToggleButton;