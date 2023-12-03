import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import LottieView from 'lottie-react-native';
const { width, height } = Dimensions.get("window");
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
                height:verticalScale(130),
                marginTop: verticalScale(-100)
            }}
        />
        <Text style={styles.loaderText}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    loaderText: {
        color: COLORS.white,
        fontSize: moderateScale(15),
        fontFamily: "Benton Sans",
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop:verticalScale(-40)
    },
    container : {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center'
    }
})

export default NewLoader;

