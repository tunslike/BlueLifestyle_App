import React from 'react';
import { StyleSheet, 
    Text, 
    View,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import { COLORS, icons } from '../../constants';

const { width, height } = Dimensions.get("window");

// INIT APP
const ToggleButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.togglebtnLeft}>
            <Image source={icons.eatIn} 
            style={{
                marginLeft:35,marginRight:5,height:15, width: 15, resizeMode: 'contain', tintColor: COLORS.white
            }}
        />
        <Text style={styles.toggleTextLeft}>Take Out</Text>
       
        
      </TouchableOpacity>
      <TouchableOpacity style={styles.togglebtnRight}>
      <Image source={icons.takeout} 
      style={{
       marginLeft:35, marginRight:5,height:20, width: 20, resizeMode: 'contain', tintColor: COLORS.StatureBlue
      }}
  />
         <Text style={styles.toggleTextRight}>Eat-In</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal:20,
        marginTop:25,
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