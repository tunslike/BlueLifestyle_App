import React, {useRef, useState} from 'react';
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
 import { COLORS, icons, images, animation } from '../../../constants';
 import { Button } from '../../components';
 

 const { width, height } = Dimensions.get("window");

const CrecheCompleteBookingScreen = ({navigation}) => {
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
                Thank you for booking with the Creche Facility.
            </Text>
            <Text style={styles.success_title}>
            Please note that your booking was successful with details below.
            </Text>
            <Text style={styles.success_title}>Booking ID: STBCRH03903</Text>
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
        fontSize: 16,
        fontFamily: "Benton Sans",
        color: COLORS.DeepBlue,
        fontWeight: 'bold',
        marginRight:20
      },
    loginBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white ,
        borderRadius:10,
        paddingHorizontal: 20,
        paddingVertical: 18,
        marginTop:90,
    },
    booking_details: {
        width: 300,
        height: 300,
        backgroundColor: COLORS.white,
        padding:30,
        borderRadius: 30,
        marginHorizontal:30
    },
    succes_header: {
        marginHorizontal: 25,
        marginTop: -70
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

export default CrecheCompleteBookingScreen;
