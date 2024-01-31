import React, {useState, useEffect, useContext} from 'react';
import {  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  Image, Alert, Keyboard,
  TouchableOpacity} from 'react-native';
  import { useSelector } from 'react-redux';
  import axios from 'axios';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import { COLORS, icons, images, ApplicationName, APIBaseUrl, ApIHeaderOptions,
    verticalScale, horizontalScale, moderateScale } from '../../../constants';
  import { HeaderBar, CustomInput, Button, NewLoader, MessageBox } from '../../components';
  import { AuthContext } from '../../../context/AuthContext';

  const { width, height } = Dimensions.get("window");

  // init app screen
const ProfileScreen = ({navigation}) => {

  //GET FROM STORE
  const userData = useSelector((state) => state.user.userData)

  const { ExitAuthenticatedUser } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState(null);
  const [company, setCompany] = useState('');
  const [department, setDepartment] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);
  const [showMessage, setShowMessage] = useState(0);
  const [profile, setProfile] = useState(false);


  const ValidateUpdateProfile = () => {

    setErrorMessage(null)
    Keyboard.dismiss();
    
    if(company.trim == '' || department == '' || phoneNumber == '') {
      setErrorMessage('Please complete all fields!')
      return;
    } 

    Alert.alert('Stanbic Towers Profile', 'Do you want to update your profile?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => UpdateProfileData()},
    ]);
  }

  //function to update profile
  const UpdateProfileData = () => {

    setErrorMessage(null)
    Keyboard.dismiss();

    const data = {
      company: company,
      username: userData.userID,
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
               //show notification
               setShowMessage(1);
               setRequestStatus(true);
               setProfile(true)
  
          }else {
  
              setRequestStatus(false);
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

    // function to load facilities
const LogoutAuthenticatedUser = () => {
      Alert.alert(ApplicationName.AppName, 'Do you want to logout?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => {
          console.log('Logged out');
          ExitAuthenticatedUser();
        }},
      ]);
    }
  // end of function

  // function to check profile
const ValidateProfile = () => {
  if(userData.company == '' || userData.phone == '' || userData.department == '') {
   setProfile(false);
  }else{
   setProfile(true)
  }
}
// end of function


  // RUN EFFECT HOOK
    useEffect(() => {
      ValidateProfile()
    
     }, []);
  // END OF EFFECT HOOK

  // function to render header
  function renderHeaderContent() {
    return (
        <View style={styles.headerbg}>
            <HeaderBar 
              onPress={() => navigation.goBack()}
              icon={icons.back_arrow}
              iconStyle={{
                height: 30, width: 30, resizeMode: 'contain', tintColor: COLORS.white
              }}
              notificationStyle={{
                height:32, width: 32, tintColor: COLORS.lightBlue, resizeMode: 'contain'
              }}
            />
        
        <View style={styles.headerDisplay}>
          <Text style={styles.titleName}>Update Your Profile</Text>

          <View style={styles.detailsBox}>
          <View style={styles.officeDetails}>
            <Image source={icons.user} style={{
              height: 15, width: 15, resizeMode: 'contain',
              tintColor: COLORS.gentleBlue, marginRight: 3,
            }} />
            <Text style={styles.business}>KEEP YOUR INFORMATION UPDATED</Text>
          </View>
  
      </View> 
        </View>
        </View>
    )
  }

  // function to render body
  function renderBodyContent() {
    return (
      <View style={styles.bodyContainer}>

      <ScrollView>

      {/* START OF ORDERS */}

      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      
          <View style={styles.vendorTitle}>
          <Text style={styles.mainTitle}>Personal Details</Text>
          <Image source={icons.user} 
            style={{
              height: 15, width: 15, marginLeft:7, tintColor: COLORS.darkGray, resizeMode: 'contain'
            }}
          />
          </View>

         {!profile &&
          <View style={{flexDirection: 'row', marginTop:13, paddingRight: 10, justifyContent: 'flex-start', alignItems: 'center'}}>
          <Text style={styles.updateError}>Update Required</Text>
          <Image source={icons.info} style={{height: 15, marginLeft: 5, width: 15, resizeMode: 'contain', tintColor: COLORS.SecondaryPlum}} />
         </View>
        } 
       

      </View>
      
        <View style={styles.divider}>

          <CustomInput 
            label="SAP ID:"
            icon={icons.user}
            value={userData.userID}
          />
          <CustomInput 
          label="First Name:"
          icon={icons.user}
          value={userData.firstName}
        />

        <CustomInput 
        label="Last Name:"
        icon={icons.user}
        value={userData.lastName}
      />
      <CustomInput 
        label="Email:"
        icon={icons.user}
        value={userData.email}
      />
      <CustomInput 
        onChange={(text) => setPhoneNumber(text)}
        label="Phone:"
        icon={icons.user}
        value={(!userData.phone) ? phoneNumber : userData.phone}
        errorStyle={(!userData.phone) ? {
          color: COLORS.SecondaryPlum
        } : null }
    />
    <View style={{height:20}}></View>
        </View>

        <View style={styles.vendorTitle}>
        <Text style={styles.mainTitle}>Official Details</Text>
        <Image source={icons.company} 
          style={{
            height: 15, width: 15, marginLeft:7, tintColor: COLORS.darkGray, resizeMode: 'contain'
          }}
        />
        </View>

        <View style={styles.divider}>

        <CustomInput 
        onChange={(text) => setCompany(text)}
        label="Company:"
        icon={icons.user}
        value={(!userData.company) ? company : userData.company}
        errorStyle={(!userData.company) ? {
          color: COLORS.SecondaryPlum
        } : null }
        />

        <CustomInput 
        onChange={(text) => setDepartment(text)}
        label="Department:"
        icon={icons.user}
        value={(!userData.department) ? department : userData.department}
        errorStyle={(!userData.department) ? {
          color: COLORS.SecondaryPlum
        } : null }
        />

        <View style={{height:20}}></View>
        </View>

        <View style={{ marginHorizontal:25}}>
        {/*
          <Button
            onPress={() => ValidateUpdateProfile()} 
            title="Update Profile"
            icon={icons.check_yes} 
            addStyles={{
              backgroundColor: COLORS.SecondaryGreen
            }}
            />
          */}
          <TouchableOpacity 
          onPress={() => LogoutAuthenticatedUser()}
          style={styles.mainLogout}>
              <Text style={styles.mainLogoutText}>Log Out</Text>
              <Image source={icons.logout} 
                style={{
                  height:20, marginLeft:wp(1),
                   width: 20, resizeMode: 'contain', tintColor: COLORS.white
                }}
              />
          </TouchableOpacity>
        </View>
  
        {/* END OF ORDERS */}


      </ScrollView>
      
      </View>
    )
  }

  // return function
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" />

    {isLoading && 
      <NewLoader title="Updating your profile, please wait..." />
    }
  
    {errorMessage &&
      <MessageBox status="error" message={errorMessage} />
    }

    {showMessage == 1 &&
      <MessageBox message="Your profile update was successful!" status="success" />
  }

     {/* Render Header */}
     {renderHeaderContent()}


     {/* Render Body */}
     {renderBodyContent()}
    
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
  updateError: {
    fontSize: 13,
    fontFamily: "Roboto",
    color: COLORS.SecondaryPlum,
    fontWeight: 'normal', 
  },
  mainLogoutText: {
    fontSize: 14,
    fontFamily: "Roboto",
    color: COLORS.white,
    fontWeight: 'bold', 
  },
  mainLogout: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.SecondaryPlum,
    paddingHorizontal:30,
    paddingVertical:10,
    borderRadius: 20,
    width: 130,
    marginBottom: 80,
    marginTop: 20,
    alignSelf: 'center'

  },
  divider: {
    borderBottomColor: COLORS.lineDividerGray,
    borderBottomWidth: 10,
    borderBottomStyle: 'solid',
    padding:15,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    fontFamily: "Roboto",
    color: COLORS.StatureBlue,
    fontWeight: 'normal', 
    lineHeight: 20,
    width: horizontalScale(250)
  },
  orderStatusDiv: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.InfoAlertBorder,
    backgroundColor: COLORS.InfoAlertbg,
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(25),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: moderateScale(15),
    borderRadius: moderateScale(15),
    columnGap: 15
  },
  subTitleBox: {
    marginHorizontal: horizontalScale(25),
  },
  vendorTitle : {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginHorizontal: 25,
      marginTop:10,
  },

  summaryTitle : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop:25,
    marginBottom:18
},

  paymentTitle : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop:40,
},
  providerList: {

  },
  detailsBox : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }, 
  subTitle: {
    fontSize: 14,
    fontFamily: "Roboto",
    color: COLORS.StatureBlue,
    fontWeight: 'normal', 
    lineHeight: 20
  },
  mainTitle: {
    fontSize: 17,
    fontFamily: "Roboto",
    color: COLORS.StatureBlue,
    fontWeight: 'bold', 
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    borderTopRightRadius: 20,
    marginTop: -20,
    width,
    paddingVertical:20
  },
  business : {
    fontSize: 14,
    fontFamily: "Roboto",
    color: COLORS.gentleBlue,
    fontWeight: 'normal',
    marginLeft:5
  },
  officeDetails: {
    marginVertical:5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  titleName: {
    fontSize: 25,
    fontFamily: "Roboto",
    color: COLORS.white,
    fontWeight: 'bold',
  },
  headerDisplay: {
    marginHorizontal:20,
    marginVertical: 30
  },
  headerbg: {
    width,
    height: 220,
    backgroundColor: COLORS.StandardardBankBlue,
    marginTop: Platform.OS === 'ios' ? wp(-15) : null,
    paddingTop: Platform.OS === 'ios' ? wp(4.5) : null
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
  }
})

export default ProfileScreen;