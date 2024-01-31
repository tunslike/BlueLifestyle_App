import React from 'react'
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native'
import LottieView from 'lottie-react-native';
const { width, height } = Dimensions.get("window");
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS, animation, verticalScale, horizontalScale, moderateScale } from '../../constants';


const NewLoader = ({visible = true, title}) => {
  return (
    visible && <View style={[styles.container, {height, width}]}>
            <LottieView 
            source={animation.lottie_loader}
            speed={2}
            autoPlay
            style={{
                width,
                height: wp(40),
                alignSelf: 'center',
                marginTop: wp(-3)
            }}
        />
        <Text style={styles.loaderText}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    loaderText: {
        color: COLORS.white,
        fontSize: wp(4),
        fontFamily: "Roboto",
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop:wp(-17)
    },
    container : {
        position: 'absolute',
        zIndex: 40,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center'
    }
})

export default NewLoader;

