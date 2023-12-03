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
  Alert 
} from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS,images, icons, ApplicationName } from '../../../constants' 
import { FacilityCard, LogoutButton } from '../../components';
import { AuthContext } from '../../../context/AuthContext';
import { horizontalScale, verticalScale, moderateScale } from '../../../constants';
const { width, height } = Dimensions.get("window");

const DashboardScreen = ({navigation}) => {

  //get state
  const userUD = useSelector((state) => state.user.userID);
  const fName = useSelector((state) => state.user.firstName)

  const {firstName, 
          ExitAuthenticatedUser, 
          company, department
        } = useContext(AuthContext);

  // SET STATES
  const [greetings, setGreetings] = useState('');
  

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

    //USE EFFECT
    useEffect(() => {

      //fetch facilities
      //this.FetchFacilities();
    
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
            <Text style={styles.greetings}>{greetings}</Text>
            <Text style={styles.titleName}>Hi, {fName.trim()}</Text>

            <View style={styles.officeDetails}>
                <Image source={icons.office} style={{
                  height: 15, width: 15, resizeMode: 'contain',
                  tintColor: COLORS.gentleBlue, marginRight: 5,
                }} />
                <Text style={styles.business}>{company} | {department}</Text>
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
                <FacilityCard 
                  image={images.dash_rest_img}
                  title="Restuarant"
                  capacity="90"
                  openingTime="8.00am"
                  onPress={() => navigation.navigate('Restaurant')}
                />
                <FacilityCard 
                  image={images.creche_dash_img}
                  title="Creche"
                  capacity="45"
                  openingTime="6.00am" 
                  onPress={() => navigation.navigate('Creche')}         
                />
                <FacilityCard 
                    image={images.gym_dash_img}
                    title="Gym" 
                    capacity="30"
                    openingTime="7.00am"         
                    onPress={() => navigation.navigate('Gym')} 
              />
            </ScrollView>
          </View>

      </View> 

    )
  }

  return (
    <SafeAreaView style={styles.container}>
      
       <LogoutButton onPress={() => LogoutAuthenticatedUser()} />

        <StatusBar barStyle="light-content" />

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
    fontFamily: "Benton Sans",
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
    marginTop: -20,
    width,
    marginRight:20,
    paddingVertical:20
  },
  business : {
    fontSize: 13,
    fontFamily: "Benton Sans",
    color: COLORS.gentleBlue,
    fontWeight: 'normal',
    marginLeft:5
  },
  greetings: {
    fontSize: 15,
    fontFamily: "Benton Sans",
    color: COLORS.lightBlue,
    fontWeight: 'normal',
  },
  titleName: {
    fontSize: 28,
    fontFamily: "Benton Sans",
    color: COLORS.white,
    fontWeight: 'bold',
  },
  officeDetails: {
    marginVertical:7,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  profileDisplay: {
    marginHorizontal:20,
    marginVertical: 15
  },
  headerToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(30),
    marginHorizontal:20
  },
  headerbg: {
    width,
    height: 220,
    backgroundColor: COLORS.StandardardBankBlue,
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