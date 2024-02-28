import React, { useRef, useState, useEffect } from 'react';
import { 
         Image, 
         ImageBackground, 
         StatusBar,
         StyleSheet, 
         Text, 
         Alert,
         TouchableOpacity, 
         View, Platform } from 'react-native';
import Animated, {BounceInLeft,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat
} from 'react-native-reanimated';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
         COLORS, 
         images, 
         icons, 
         verticalScale,
         horizontalScale,
         moderateScale, APIBaseUrl} from '../../../constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const WelcomeScreen = ({navigation}) => {


  const [isUserValid, setIsUserValid] = useState(null);

   // FUNCTION TO LOAD RESTURANT MENUS
   const validAppVersionUpdate = () => {

     axios.post(APIBaseUrl.developmentUrl + 'staff/GetAppVersion', {}, {})
     .then(response => {

          let version = DeviceInfo.getVersion();

          if(version.localeCompare(response.data.version) == 0) {
            console.log('Updated version found!')
          }else {

            if(Platform.OS === 'ios') {

              Alert.alert("Blue Lifestyle Update!", "A new update is available! Please update your app via the Apple Test Flight App")

              }else {
                Alert.alert("Blue Lifestyle Update!", "A new update is available! Please uninstall and install the latest version from Microsoft Intunes")
            }
      
          }
 
     })
     .catch(error => {
       console.log(error);
     });
   
  }
  // END OF FUNCTION

  // FUNCTION TO CHECK LOGGED USER
    const ValidatedAuthenticatedUser = async () => {
      try {
          
          let userData = await AsyncStorage.getItem('userLogged');

          if(userData) {
            console.log('user has logged in before')
            setIsUserValid(userData);
          }else{
            console.log('New User found')
          }
          
          
      } catch (e) {
        console.log(`isLogged in error ${e}`);
      }
   }
  // END OF FUNCTION

//USE EFFECT
  useEffect(() => {

    validAppVersionUpdate();

    ValidatedAuthenticatedUser();

}, []);

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
                  BLUE Lifestyle
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
                  width:wp(5.5), 
                  resizeMode: 'contain', 
                  tintColor: COLORS.white,
                  marginLeft: 20,
                 }}
                />
              </TouchableOpacity>

              {isUserValid && 
                <TouchableOpacity 
                onPress={() => navigation.navigate('Login')}
   
                 style={styles.loginBtn}>
                   <Text style={styles.loginTxt}>Login here</Text>
                   <Image source={icons.pwd} 
                    style={{
                     height:hp(5), 
                     width:wp(5.5), 
                     resizeMode: 'contain', 
                     tintColor: COLORS.StandardardBankBlue,
                     marginLeft: 20,
    
                    }}
                   />
                 </TouchableOpacity>
              
              }
          </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  actionTxt: {
    fontSize: wp(4),
    fontFamily: "Roboto",
    color: COLORS.white,
    fontWeight: '700',
  },
  loginTxt: {
    fontSize: wp(4),
    fontFamily: "Roboto",
    color: COLORS.StandardardBankBlue,
    fontWeight: '700',
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

  loginBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
     marginHorizontal:wp(7),
     padding:wp(2.5),
     borderRadius:wp(3),
     alignItems: 'center',
     marginTop: hp(2),
     borderColor: COLORS.textGrey,
     borderWidth:1,
     backgroundColor:'rgba(255, 255, 255, 0.85)',
  },
  mainDesc : {
    marginTop:wp(3),
    fontFamily: "Roboto",
    color: COLORS.lineDividerGray,
    fontSize:wp(3.5),
    fontWeight: 'normal'
  },
  fontdiv: {
    paddingHorizontal:wp(5),
    marginTop:hp(4),
  },
  mainTitle: {
    fontSize: Platform.OS === 'ios' ? wp(9.5) : wp(9),
    fontFamily: "Roboto",
    color: COLORS.white,
    fontWeight: 'bold',
    lineHeight:hp(4.7),
    width: wp(90),
    marginTop:27
  },
  subMainTitle: {
    fontSize: wp(5),
    fontFamily: "Roboto",
    color: COLORS.white,
    fontWeight: 'bold',
    lineHeight:hp(3.4),
    width: wp(80),
    marginTop:20
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