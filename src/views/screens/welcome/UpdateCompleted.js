import React, {useEffect, useContext} from 'react';
import { 
        StyleSheet, 
        Text, 
        View,
        TouchableOpacity,
        Dimensions,
        Image,
        ScrollView,
        StatusBar,
        KeyboardAvoidingView
 } from 'react-native';
 import LottieView from 'lottie-react-native';
 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
 import { SafeAreaProvider } from 'react-native-safe-area-context';
 import { COLORS, 
          icons, 
          images, 
          animation, 
          verticalScale, 
          horizontalScale, 
          moderateScale } from '../../../constants';
import { AuthContext } from '../../../context/AuthContext';          


 const { width, height } = Dimensions.get("window");

// init app
 const UpdateCompleted = ({navigation, route}) => {

// get user otken
 const {userToken, loginToken} = useContext(AuthContext);

 const SetUserLoginToken = () => {
    userToken = loginToken;

    console.log(userToken);
 }


//USE EFFECT
useEffect(() => {
    console.log(userToken)
}, []);

// GET PARAMS
const {message} = route.params

  return (
    <SafeAreaProvider style={styles.container}>
    <StatusBar style="auto" />

        <LottieView 
            source={animation.lottie_success}
            autoPlay
            style={{
                width,
                height:400
            }}
        />

        <View style={styles.succes_header}>
            <Text style={styles.success_title}>
                Profile Update
            </Text>
            <Text style={styles.success_title}>
             {message}
            </Text>
        
        </View>

    <View>
    
    </View>
        
            <View style={{marginHorizontal:25}}>
                <TouchableOpacity 
                onPress={() => SetUserLoginToken()}
                style={styles.loginBtn}>
                    <Text style={styles.loginText}>Continue to Dashboard</Text>
                    <Image source={icons.check_yes}
                    style={{height:22, width: 22,
                    tintColor: COLORS.DeepBlue, resizeMode: 'contain'}}
                    />
            </TouchableOpacity>
            </View>

    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({ 
    loginText: {
        fontSize: moderateScale(16),
        fontFamily: "Benton Sans",
        color: COLORS.DeepBlue,
        fontWeight: 'bold',
        marginRight:moderateScale(20)
      },
    loginBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white ,
        borderRadius:moderateScale(10),
        paddingHorizontal: horizontalScale(20),
        paddingVertical: verticalScale(18),
        marginTop:verticalScale(90),
    },
    booking_details: {
        width: horizontalScale(300),
        height: verticalScale(300),
        backgroundColor: COLORS.white,
        padding:moderateScale(30),
        borderRadius: moderateScale(30),
        marginHorizontal:moderateScale(30)
    },
    succes_header: {
        marginHorizontal: horizontalScale(25),
        marginTop: verticalScale(-70)
    },
    success_title: {
        marginBottom: 15,
        fontSize: 20,
        fontFamily: "Benton Sans",
        color: COLORS.white,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        lineHeight: 30
    },
    container: {
        backgroundColor: COLORS.SecondaryGreen,
        flex: 1
      }});

export default UpdateCompleted;
