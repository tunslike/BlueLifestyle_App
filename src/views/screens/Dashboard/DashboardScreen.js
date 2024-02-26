import React, {useState, useContext, useEffect} from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  Image,
  Alert,
  TouchableOpacity, Platform
} from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS,images, 
        icons, 
        ApplicationName, 
        APIBaseUrl, ApIHeaderOptions, utilities, FacilityIDs } from '../../../constants' 
import { FacilityCard, LogoutButton, NewLoader, MessageBox } from '../../components';
import { AuthContext } from '../../../context/AuthContext';
import { horizontalScale, verticalScale, moderateScale } from '../../../constants';
const { width, height } = Dimensions.get("window");
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const DashboardScreen = ({navigation}) => {

  //get state
  const userID = useSelector((state) => state.user.userID);
  const fName = useSelector((state) => state.user.firstName)
  const token = useSelector((state) => state.user.idtkn)

  const userData = useSelector((state) => state.user.userData)

  const {firstName, 
          ExitAuthenticatedUser, 
          company, department
        } = useContext(AuthContext);

  // SET STATES
  const [greetings, setGreetings] = useState('');
  const [profile, setProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [facilities, setFacilities] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  

  // function to load facilities
  const LogoutAuthenticatedUser = () => {
    Alert.alert(ApplicationName.AppName, 'Do you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => {
        LogoutExistingUser();
      }},
    ]);
  }
// end of function

// function to load providers
const LogoutExistingUser = () => {

  //show loader
  setIsLoading(true);

  console.log('Logging out staff using the toke :->' + token)

  const data = {
    username: userID
  };
  
  axios.post(APIBaseUrl.developmentUrl + 'accounts/staff/logout',data,{
    headers: {
      'JWTToken': token
    }
  })
  .then(response => {

    setIsLoading(false)

      if(response.data.errorCode == '000') {

        console.log('User successfully logged out');
        ExitAuthenticatedUser();

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

}
// end of function

// function to load facilities
const FetchFacilities = () => {
  console.log('Making API Request | Fetching facilities.....')

  //show loader
  setIsLoading(true);

  axios.post(APIBaseUrl.productionUrl + 'services/Facilities/FetchFacilities', ApIHeaderOptions.headers)
  .then(response => {

    console.log('API Response is ready.....')

    setIsLoading(false)

      if(response.data.errorCode == '000') {

           //set data
           setFacilities(response.data.facilityRequests)

           console.log(facilities)
      

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
    setIsLoading(false)
    setErrorMessage('Service error: Unable to fetch facility list! Please retry')
    console.log(error);
  });

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

    //USE EFFECT
    useEffect(() => {

      //FetchFacilities();
      console.log('usertoken = ' +  token)

      //Validate user profile update
      ValidateProfile();

      //check greetings
      this.checkTimeGreetings();

  }, []);

     //check time
     checkTimeGreetings = () => {

      var today = new Date()
      var curHr = today.getHours()

      if (curHr < 12) {
        setGreetings('Good Morning')
      } else if (curHr < 18) {
        setGreetings('Good Afternoon')
      } else {
        setGreetings('Good Evening')
      }
  }


  // Render Header Function
  function renderHeaderContent() {
    
    return (
      <View style={styles.headerbg}>

        <View style={styles.headerToolbar}>
            <Image style={styles.img} source={images.shield} />
            <Image source={icons.notification} style={{
              height:32, width: 32, tintColor: COLORS.lightBlue, resizeMode: 'contain'
            }} />
        </View>
        <View style={styles.profileDisplay}>
        <Text style={styles.titleName}>Hi, {fName.trim()}</Text>
            <Text style={styles.greetings}>{greetings}</Text>
  

            <View style={styles.officeDetails}>
              
                {
                  /**
                   * <Image source={icons.office} style={{
                    height: 15, width: 15, resizeMode: 'contain',
                    tintColor: COLORS.gentleBlue, marginRight: 5,
                  }} />
                   *    {profile == false &&
                  <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                      <Text style={styles.business_update}>Update Company and Profile</Text>
                  </TouchableOpacity>
                }
                   */
                }
             
                {profile == true &&
                  <Text style={styles.business}>{company} | {department}</Text>
                }
            </View> 
        </View>
      </View>
    )
  }

  // Render Body
  function renderBodyContent() {
    return (
      <View style={styles.bodyContainer}>
          <Text style={styles.mainTitle}>What would you like to do today?</Text>
          <View>
            <ScrollView>

            {/** 
            {facilities.map(item => {
              return (
                <View key={item.key}>
                  <FacilityCard 
                  image={images.dash_rest_img}
                  title={item.facilityType}
                  capacity="90"
                  openingTime={item.openingTime}
                  onPress={() => navigation.navigate('Restaurant', {facilityId: item.facilityId})}
                />
              </View>
              )     
            })}
      */}
                <FacilityCard 
                  image={images.dash_rest_img}
                  title="Restaurant"
                  capacity="101"
                  openingTime="9.00am"
                  onPress={() => navigation.navigate('Restaurant', {facility_ID: FacilityIDs.RestaurantFacilityID })}
                />
                <FacilityCard 
                  image={images.creche_dash_img}
                  title="Creche"
                  capacity="25"
                  openingTime="6.00am" 
                  onPress={() => navigation.navigate('Creche', {facility_ID: FacilityIDs.CrecheFacilityID })}         
                />
                <FacilityCard 
                    image={images.gym_dash_img}
                    title="Gym" 
                    capacity="30"
                    openingTime="7.00am"         
                    onPress={() => navigation.navigate('Gym', {facility_ID: FacilityIDs.GymFacilityID })}  />
          
            </ScrollView>
          </View>

      </View> 

    )
  }

  return (
    <SafeAreaView style={styles.container}>

    {errorMessage &&
      <MessageBox status="error" message={errorMessage} />
    }

    {isLoading && 
      <NewLoader title="Processing your request, please wait..." />
    }
       
       <LogoutButton onPress={() => LogoutAuthenticatedUser()} />
        <StatusBar 
         translucent 
         backgroundColor={COLORS.StandardardBankBlue} barStyle="default" />

         {/* Render Header */}
         {renderHeaderContent()}


         {/* Render Body */}
         {renderBodyContent()}
        
    </SafeAreaView>


  )
}

export default DashboardScreen;

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 20,
    fontFamily: "Roboto",
    color: COLORS.StatureBlue,
    fontWeight: 'bold',
    width: 250,
    lineHeight:28,
    marginBottom: 15,
    marginHorizontal:20
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    borderTopRightRadius: 20,
    marginTop: Platform.OS === 'ios' ? wp(3) : null,
    width,
    marginRight:20,
    paddingVertical:20
  },
  business : {
    fontSize: 13,
    fontFamily: "Roboto",
    color: COLORS.gentleBlue,
    fontWeight: 'normal',
    marginLeft:5
  },

  business_update : {
    fontSize: 13,
    fontFamily: "Roboto",
    color: COLORS.gentleBlue,
    fontWeight: 'normal',
    marginLeft:5,
    textDecorationLine: 'underline'
  },
  greetings: {
    fontSize: 15,
    fontFamily: "Roboto",
    color: COLORS.lightBlue,
    fontWeight: 'normal',
  },
  titleName: {
    fontSize: 28,
    fontFamily: "Roboto",
    color: COLORS.white,
    fontWeight: 'bold',
  },
  officeDetails: {
    marginVertical:7,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop:10
  },
  profileDisplay: {
    marginHorizontal:20,
    marginVertical: 30
  },
  headerToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(40),
    marginHorizontal:20
  },
  headerbg: {
    width,
    height: 220,
    backgroundColor: COLORS.StandardardBankBlue,
    marginTop: Platform.OS === 'ios' ? wp(-15) : null,
    paddingTop: Platform.OS === 'ios' ? wp(6) : null
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
  },
  img: {
    height:40,
    width:40
  }
})