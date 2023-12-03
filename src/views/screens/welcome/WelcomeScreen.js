import React, { useRef } from 'react';
import { Animated, 
         Image, 
         ImageBackground, 
         StatusBar,
         StyleSheet, 
         Text, 
         TouchableOpacity, 
         View } from 'react-native';
import { 
         COLORS, 
         images, 
         icons, 
         verticalScale,
         horizontalScale,
         moderateScale} from '../../../constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const WelcomeScreen = ({navigation}) => {


  const fadeanim = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        resizeMode="cover"
        style={styles.welcomebg}
        source={images.towersBuilding}>
          <View style={styles.shieldDiv}>
                <Image style={styles.img} source={images.shield} />
          </View>
          <View style={styles.fontdiv}>
              <Text style={styles.mainTitle}>
                  STANBIC TOWERS FACILITY MANAGEMENT
              </Text>
              <Text style={styles.mainDesc}>
               Access facility with better booking experience
              </Text>
          </View>
          <View>
              <TouchableOpacity 
             onPress={() => navigation.navigate('Slider')}

              style={styles.actionBtn}>
                <Text style={styles.actionTxt}>Get Started here</Text>
                <Image source={icons.arrow} 
                 style={{
                  height:hp(5), 
                  width:wp(7), 
                  resizeMode: 'contain', 
                  tintColor: COLORS.white,
                  marginLeft: 30,
                 }}
                />
              </TouchableOpacity>
          </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  actionTxt: {
    fontSize: wp(4),
    fontFamily: "Benton Sans",
    color: COLORS.white,
    fontWeight: '900',
  },
  actionBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
     marginHorizontal:wp(7),
     padding:wp(2.5),
     borderRadius:wp(3),
     alignItems: 'center',
     marginTop: hp(18),
     borderColor: COLORS.textGrey,
     borderWidth:1,
     backgroundColor:'rgba(0, 51, 161, 0.6)',
  },
  mainDesc : {
    marginTop:wp(3),
    fontFamily: "Benton Sans",
    color: COLORS.lineDividerGray,
    fontSize:wp(3.7),
    fontWeight: 'normal'
  },
  fontdiv: {
    paddingHorizontal:wp(5),
    marginTop:hp(4),
  },
  mainTitle: {
    fontSize: wp(6),
    fontFamily: "Benton Sans",
    color: COLORS.white,
    fontWeight: 'bold',
    lineHeight:hp(4.7),
    width: wp(80)
  },
  shieldDiv:{
    paddingVertical: wp(20),
    paddingHorizontal: hp('3%')
  },
  img: {
    height:60,
    width:60
  },
  welcomebg : {
    flex: 1,
    resizeMode: 'contain'
  },
  container: {
    flex: 1
  }
})

export default WelcomeScreen