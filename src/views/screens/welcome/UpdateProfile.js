import React, {useContext, useState, useEffect} from 'react';
import { 
  SafeAreaView,
  StyleSheet, 
  Text,
  Image, 
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Alert,
  Keyboard
} from 'react-native'
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { COLORS, dummyData,
         images, icons, 
         verticalScale, 
         horizontalScale, 
         moderateScale, APIBaseUrl, ApIHeaderOptions} from '../../../constants';
import {DropDown, MessageBox, NewLoader, LoginInput } from '../../components';
import { AuthContext } from '../../../context/AuthContext';
const { width, height } = Dimensions.get("window");

const UpdateProfile = ({navigation}) => {

    // CALL AUTH CONTEXT
    const {userID } = useContext(AuthContext)

  const [errorMessage, setErrorMessage] = useState(null);
  const [company, setCompany] = useState('');
  const [department, setDepartment] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  //function to update profile
  const UpdateProfileData = () => {

    setErrorMessage(null)
    Keyboard.dismiss();

    const data = {
      company: company,
      username: userID,
      department: department,
      phone: phoneNumber
    };

    try {

      setIsLoading(true)

      console.log('********************* Making API Request ***********************')

      axios.post(APIBaseUrl.developmentUrl + 'accounts/staff/updateProfile', data, ApIHeaderOptions.headers)
      .then(response => {
  
        setIsLoading(false)
  
          if(response.data.errorCode == '000') {
  
               //set data
               console.log(response.data)
               navigation.navigate('CompleteProfile', {message:response.data.statusMessage})
  
          }else {
  
              console.log(response.data.statusMessage)
              //show error message
              setErrorMessage(response.data.statusMessage);
  
              //set loading off
              setIsLoading(false)
  
              return;
          }
      })
      .catch(error => {
        console.log(error);
      });

      
    } catch (error) {
      setErrorMessage(error)
    }

  }
  //end of function

    // RUN EFFECT HOOK
    useEffect(() => {

      //log out user
    
  
   }, []);
  // END OF EFFECT HOOK

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
    <StatusBar barStyle="dark-content"  />

    {isLoading && 
      <NewLoader title="Authenticating user, please wait..." />
    }
  
    {errorMessage &&
      <MessageBox status="error" message={errorMessage} />
    }
    
    <SafeAreaView>    
      <View style={styles.subContainer}>
          <Image style={styles.img} source={images.shield} />
      </View>
      <View style={styles.imgContainer}>
        <Image source={images.profileUpdate} style={{
          height: 250, width, resizeMode: 'contain'
        }} />
        <Text style={styles.loginTitle}>
       Tell Us a Little More
        </Text>
        <Text style={styles.loginDesc}>We need the details below to serve you better</Text>
      </View>


      <LoginInput 
      value={phoneNumber}
      onChange={(text) => setPhoneNumber(text)}
      pwd={false}
      placeholder="Enter your phone number"
      icon={icons.phone_fill}
      maxlength={11}
      onFocus={() => setErrorMessage(null)}
    />

        <DropDown 
          value={company}
          isFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          placeholder={!isFocus ? 'Select Company' : '...'}
          onChange={item => {
            setCompany(item.value);
            setIsFocus(false);
            }}
          data={dummyData.Company}  
          icon={icons.company}
          />

        <DropDown 
          value={department}
          isFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          placeholder={!isFocus ? 'Select Department' : '...'}
          onChange={item => {
            setDepartment(item.value);
            setIsFocus(false);
            }}
          data={dummyData.Department}  
          icon={icons.user}
          />

      <View>
      {/*
          <TouchableOpacity 
            onPress={() => UpdateProfileData()}
            style={styles.loginBtn}>
                <Text style={styles.loginText}>Update Profile</Text>
                <Image source={icons.arrow} 
                  style={{height:22, width: 22,
                  tintColor: COLORS.white, resizeMode: 'contain'}}
                />
          </TouchableOpacity>
      */}
      </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  
  loginText: {
    fontSize: moderateScale(15),
    fontFamily: "Benton Sans",
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
      paddingVertical: 18,
      marginHorizontal:25,
      marginTop:verticalScale(40)
  },
  loginDesc :{
    fontSize: 15,
    fontFamily: "Benton Sans",
    color: COLORS.darkGray,
    fontWeight: 'normal',
    marginHorizontal: 25,
    marginVertical:verticalScale(8),
    marginBottom: verticalScale(30)
  },
  loginTitle : {
    width:350,
    fontSize: moderateScale(25),
    fontFamily: "Benton Sans",
    color: COLORS.StandardardBankBlue,
    fontWeight: 'bold',
    marginHorizontal:horizontalScale(20),

  },
  imgContainer : {
    marginVertical:verticalScale(-10)
  },
  subContainer: {
    marginHorizontal: horizontalScale(25),
    marginBottom:verticalScale(10),
    marginTop:verticalScale(70)
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

export default UpdateProfile;