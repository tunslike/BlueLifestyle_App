import React, {useContext, useState, useEffect, useMemo} from 'react';
import { 
  SafeAreaView,
  StyleSheet, 
  Text,
  Image, 
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  Platform
} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { COLORS, images, icons} from '../../../constants';
import { LoginInput, MessageBox, NewLoader, CustomBottomSheet } from '../../components';
import { AuthContext } from '../../../context/AuthContext';
const { width, height } = Dimensions.get("window");


const LoginScreen = ({navigation}) => {

  // CALL AUTH CONTEXT
  const {ValidateUserLogin, 
         isLoading, 
         errorMessage,
         company,
         department,
         setErrorMessage
        } = useContext(AuthContext)

  // SET STATES
  //const [companyName, setCompanyName] = useState(company);
  //const [departmentName, setDepartmentName] = useState(department);

  const [isVisible, setIsVisible] = React.useState(true);

  // SET USER INPUT STATES
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  

  //Function to login
  const AuthenticateUser = async () => {
    
    ValidateUserLogin(username, pwd);

  }
  // end of function

  //USE EFFECT
  useEffect(() => {

    

}, []);

  return (
    <KeyboardAwareScrollView 
        enableOnAndroid={true}
        keyboardShouldPersistTaps={"handled"}
        extraScrollHeight={-300}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: COLORS.white
        }}
     >    
    <SafeAreaView>    
    <StatusBar barStyle="dark-content"  />
  
    {errorMessage &&
      <MessageBox status="error" message={errorMessage} />
    }
    
    {isLoading && 
      <NewLoader title="Authenticating user, please wait..." />
    }

      <View style={styles.subContainer}>
          <Image style={styles.img} source={images.shield} />
      </View>
      <View style={styles.imgContainer}>
        <Image source={images.resturant_image} style={{
          height: wp(50), width, resizeMode: 'contain'
        }} />
        <Text style={styles.loginTitle}>
        Let's Get You Started
        </Text>
        <Text style={styles.loginDesc}>Just a few details to get you on your way</Text>
      </View>

      <View>

          <LoginInput 
            value={username}
            onChange={(text) => setUsername(text)}
            pwd={false}
            placeholder="Enter your SAP ID"
            icon={icons.user}
            maxlength={7}
            onFocus={() => setErrorMessage(null)}
          />
          <LoginInput 
            value={pwd}
            onChange={(text) => setPwd(text)}
            pwd={true}
            setSecureText={isVisible}
            placeholder="Enter your password"
            icon={icons.pwd}
            eye_type={isVisible == true ? icons.eye_off : icons.eye_on}
            visibleOnPress={() => setIsVisible(!isVisible)}
            onFocus={() => setErrorMessage(null)}
          />
      </View>

      <View>
          <TouchableOpacity 
            onPress={() => AuthenticateUser()}
            style={styles.loginBtn}>
                <Text style={styles.loginText}>Sign In</Text>
                <Image source={icons.arrow} 
                  style={{height:22, width: 22,
                  tintColor: COLORS.white, resizeMode: 'contain'}}
                />
          </TouchableOpacity>
      </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  loginText: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: COLORS.white,
    fontWeight: 'bold',
    marginRight:20
  },
  loginBtn: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.StandardardBankBlue ,
      borderRadius:10,
      paddingHorizontal: 20,
      paddingVertical: wp(5.2),
      marginHorizontal:wp(8),
      marginTop:(height > 600) ? hp(7) : hp(4)
  },
  loginDesc :{
    fontSize: wp(3.4),
    fontFamily: "Roboto",
    color: COLORS.darkGray,
    fontWeight: 'normal',
    marginHorizontal: wp(7),
    marginVertical:hp(0.7),
  },
  loginTitle : {
    fontSize: wp(6),
    fontFamily: "Roboto",
    color: COLORS.StandardardBankBlue,
    fontWeight: 'bold',
    marginHorizontal:wp(7),
    marginTop:hp(3),
  },
  imgContainer : {
    marginVertical:hp(1),
    marginTop: wp(10),
    marginBottom: wp(7)
  },
  subContainer: {
    marginHorizontal: hp(2),
    marginTop:hp('7%')
  },
  container : {
    flex: 1,
    color: COLORS.white,
  },
  img: {
    height:60,
    width:60
  },
})

export default LoginScreen;