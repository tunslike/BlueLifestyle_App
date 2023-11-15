import React, { useRef } from 'react';
import { Animated, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS, images, icons, SIZES, FONTS } from '../../../constants';

const WelcomeScreen = ({navigation}) => {

  const fadeanim = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        resizeMode="cover"
        style={styles.welcomebg}
        source={images.buildingbg}>
          <View style={styles.shieldDiv}>
                <Image style={styles.img} source={images.shield} />
          </View>
          <View style={styles.fontdiv}>
              <Text style={styles.mainTitle}>
                  STANBIC TOWERS FACILITY MANAGEMENT
              </Text>
              <Text style={styles.mainDesc}>
               Accessing facilities with better experience
              </Text>
          </View>
          <View>
              <TouchableOpacity 
              onPress={() => navigation.navigate('Slider')}
              style={styles.actionBtn}>
                <Text style={styles.actionTxt}>Get Started here</Text>
                <Image source={icons.arrow} 
                 style={{
                  height:28, 
                  width:28, 
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
    fontSize: 17,
    fontFamily: "Benton Sans",
    color: COLORS.white,
    fontWeight: '600',
  },
  actionBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
     width: '90%',
     marginHorizontal:20,
     padding:20,
     borderRadius:14,
     alignItems: 'center',
     marginTop: 90,
     borderColor: COLORS.textGrey,
     borderWidth:1,
  },
  mainDesc : {
    marginTop:20,
    fontFamily: "Benton Sans",
    color: COLORS.lightBlue,
    fontSize:17,
    fontWeight: 'normal'
  },
  fontdiv: {
    paddingHorizontal:20,
    marginTop:50,
  },
  mainTitle: {
    width:350,
    fontSize: 28,
    fontFamily: "Benton Sans",
    color: COLORS.white,
    fontWeight: 'bold',
    lineHeight:40
  },
  shieldDiv:{
    paddingVertical: 80,
    paddingHorizontal: 20
  },
  img: {
    height:80,
    width:80
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