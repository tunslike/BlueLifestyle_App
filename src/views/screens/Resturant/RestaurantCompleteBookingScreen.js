import React, {useRef, useState} from 'react';
import { 
        StyleSheet, 
        Text, 
        View,
        TouchableOpacity,
        Dimensions,
        Image,
        StatusBar,
        Platform
 } from 'react-native';
 import LottieView from 'lottie-react-native';
 import { SafeAreaProvider } from 'react-native-safe-area-context';
 import { COLORS, 
          icons, 
          images, 
          animation, 
          verticalScale, 
          horizontalScale, 
          moderateScale } from '../../../constants';

 const { width, height } = Dimensions.get("window");

const RestaurantCompleteBookingScreen = ({route, navigation}) => {


    const { orderNumber } = route.params

  return (
    <SafeAreaProvider style={styles.container}>
    <StatusBar style="auto" />

        <LottieView 
            source={animation.lottie_success}
            autoPlay
            style={{
                width,
                height:400,
                alignSelf: Platform.OS === 'ios' ? 'center' : null,
                marginTop: 10
            }}
        />

        <View style={styles.succes_header}>
            <Text style={styles.success_title}>
                Thank you for order with the Restaurant
            </Text>
            <Text style={styles.success_title}>
            Please note that your order was successful with details below.
            </Text>
            <Text style={styles.success_title}>Booking ID: {orderNumber}</Text>
        </View>

    <View>
    
    </View>
        
            <View style={{marginHorizontal:25}}>
                <TouchableOpacity 
                onPress={() => navigation.navigate('Tab')}
                style={styles.loginBtn}>
                    <Text style={styles.loginText}>Completed</Text>
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
        marginTop: verticalScale(-30)
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

export default RestaurantCompleteBookingScreen;
