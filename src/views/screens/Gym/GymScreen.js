import React, {useState, useEffect} from 'react';
import {  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Dimensions,
  StatusBar,
  Image, FlatList, Platform} from 'react-native';
  import axios from 'axios';
  import moment from 'moment';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import { useSelector } from 'react-redux';
  import { COLORS, 
           icons, 
           images, 
           APIBaseUrl, 
           utilities,
           ApIHeaderOptions } from '../../../constants';
  import { HeaderBar, GymSpecials, GymSlot, GymSlotDay, MessageBox, NewLoader } from '../../components';

  const { width, height } = Dimensions.get("window");


  // init app screen
const GymScreen = ({navigation}) => {

  const token = useSelector((state) => state.user.idtkn)

 const [activeDay, setActiveDay] = useState(true)
 const [errorMessage, setErrorMessage] = useState(null)

 const [loader, setLoader] = useState(false)
 const [gymData, setGYMData] = useState('');
 const [regularGym, setRegularGym] = useState([]);
 const [weeklyGym, setWeeklyGym] = useState([]);
 const [todayDay, setTodayDay] = useState(null);
 const [dayOfWeek, setDayOfWeek] = useState(new Date())

 const [monday, setMonday] = useState(false);
 const [tuesday, setTuesday] = useState(false);
 const [wednesday, setWednesday] = useState(false);
 const [thursday, setThursday] = useState(false);
 const [friday, setFriday] = useState(false);
 const [saturday, setSaturday] = useState(false);
 const [sunday, setSunday] = useState(false);

 const [currentDate, setCurrentDate] = useState(moment())

   // FUNCTION TO LOAD RESTURANT MENUS
   const FetchGymProvidersWeekly = (formattedDate) => {

    var day_week = moment().isoWeekday();
    var day_name = ''

    switch(day_week) {
        case 1: 
            day_name = "Monday";
        break;
        case 2: 
            day_name = "Tuesday";
        break;
        case 3: 
            day_name = "Wednesday";
        break;
        case 4: 
            day_name = "Thursday";
        break;
        case 5: 
            day_name = "Friday";
        break;
        case 6: 
            day_name = "Saturday";
        break;
        case 7: 
            day_name = "Sunday";
        break;
    }

     //show loader
     setLoader(true);

     const dataRegular = {
      scheduled_Date: day_name,
        gymSessionType: 'Regular'
     }

     //
     axios.post(APIBaseUrl.developmentUrl + 'services/service/FetchGymSessions', dataRegular, {
      headers: {
        'JWTToken': token
      }
    })
     .then(response => {
 
         if(response.data.errorCode == '000') {

          setLoader(false);
 
              //set data
              setRegularGym(response.data.gymServiceData)
 
         }else {

             //show error message
             setErrorMessage(response.data.statusMessage);
             setLoader(false);

         }
     })
     .catch(error => {
       console.log(error);
     });
   
  }
  // END OF FUNCTION

  // FUNCTION TO LOAD RESTURANT MENUS
  const FetchGymProvidersRegular = () => {

    console.log('*****************//////////////////*****************')
    console.log('Fetching Gym Data Weekly')
    console.log('*****************//////////////////*****************')

     //show loader
     setLoader(true);

     const dataWeekly = {
        gymSessionType: 'Weekly Special'
     }

     //
     axios.post(APIBaseUrl.developmentUrl + 'services/service/FetchGymSessions', dataWeekly, 
     {
      headers: {
        'JWTToken': token
      }
    }
     )
     .then(response => {
 
         if(response.data.errorCode == '000') {

              //set data
              setWeeklyGym(response.data.gymServiceData)
 
         }else {

             //show error message
             setErrorMessage(response.data.statusMessage);
             setLoader(false)

         }
     })
     .catch(error => {
       console.log(error);
     });
   
  }
  // END OF FUNCTION

  // format weekly date
  const formatWeeklyDate = (date) => {
   
    return date;
  }
  // end of function 

  //function to get the current day
  const setCurrentDay = () => {

    let formatDate = null

    setMonday(false)
    setTuesday(false)
    setWednesday(false)
    setThursday(false)
    setFriday(false)
    setSaturday(false)
    setSunday(false)

    var d = new Date();
    var dayName = d.toString().split(' ')[0];

  
    if(dayName == 'Mon') {
      setMonday(true);
      formatDate = transformDate(dayOfWeek, 1)
    }else if(dayName == 'Tue') {
      setTuesday(true) 
      formatDate = transformDate(dayOfWeek, 2)
    }else if(dayName == 'Wed') {
      setWednesday(true)
      formatDate = transformDate(dayOfWeek, 3)
    }else if(dayName == 'Thu') {
      setThursday(true)
      formatDate = transformDate(dayOfWeek, 4)
    }else if(dayName == 'Fri') {
      setFriday(true)
      formatDate = transformDate(dayOfWeek, 5)
    }else if(dayName == 'Sat') {
      setSaturday(true)
      formatDate = transformDate(dayOfWeek, 6)
    }else if(dayName == 'Sun'){
      setSunday(true)
      formatDate = transformDate(dayOfWeek, 0)
    }

    return formatDate;
  }
  // end of function to get current day

  const transformDate = (date, day) => {
    const offset = date.getDay() - day
    
    const d = new Date(date)
    d.setDate(d.getDate() - offset)
    return d.toISOString().split('T')[0]
  }

  // FUNCTION TO SPOOL DATA FOR EACH DAY
  const FetchGymSessionDaily = (day) => {

    setLoader(false)

    if(!day) {
      return;
    }

    let dailyDate = null;
    let dayName = '';

    setMonday(false)
    setTuesday(false)
    setWednesday(false)
    setThursday(false)
    setFriday(false)
    setSaturday(false)
    setSunday(false)

    switch(day) {

      case 1: 
        setMonday(true);
        dailyDate = transformDate(dayOfWeek, 1)
        dayName = 'Monday'
      break;
      case 2: 
        setTuesday(true);
        dailyDate = transformDate(dayOfWeek, 2)
        dayName = 'Tuesday'
      break;
      case 3: 
        setWednesday(true);
        dailyDate = transformDate(dayOfWeek, 3)
        dayName = 'Wednesday'
      break;
      case 4: 
        setThursday(true);
        dailyDate = transformDate(dayOfWeek, 4)
        dayName = 'Thursday'
      break;
      case 5: 
        setFriday(true);
        dailyDate = transformDate(dayOfWeek, 5)
        dayName = 'Friday'
      break;
      case 6: 
        setSaturday(true);
        dailyDate = transformDate(dayOfWeek, 6)
        dayName = 'Saturday'
      break;
      case 7: 
        setSunday(true);
        dailyDate = transformDate(dayOfWeek, 0)
        dayName = 'Sunday'
      break;
      default: 
          setMonday(false)
          setTuesday(false)
          setWednesday(false)
          setThursday(false)
          setFriday(false)
          setSaturday(false)
          setSunday(false)
      break;

    }

     //show loader
     setLoader(true);

     const dataRegular = {
        scheduled_Date: dayName,
        gymSessionType: 'Regular',
      }

      console.log(dataRegular)

      //show loader
     setLoader(true);

   //make call
   axios.post(APIBaseUrl.developmentUrl + 'services/service/FetchGymSessions', dataRegular, {
    headers: {
      'JWTToken': token
    }
  })
   .then(response => {

      //show loader
      setLoader(false);

      //console.log(response.data.gymServiceData)

       if(response.data.errorCode == '000') {

            //set data
            setRegularGym(response.data.gymServiceData)

       }else {

          setRegularGym(response.data.gymServiceData)
           //show error message
           setErrorMessage(response.data.statusMessage);

       }
   })
   .catch(error => {
     console.log(error);
     //show loader
     setLoader(false);
   });

  } 

  function FindDayofWeek(dateValue) {

    var day_name = '';

    switch(dateValue) {
      case 1: 
          day_name = "Monday";
      break;
      case 2: 
          day_name = "Tuesday";
      break;
      case 3: 
          day_name = "Wednesday";
      break;
      case 4: 
          day_name = "Thursday";
      break;
      case 5: 
          day_name = "Friday";
      break;
      case 6: 
          day_name = "Saturday";
      break;
      case 7: 
          day_name = "Sunday";
      break;
    }

    return day_name;

  }

  // FUNCTION TO SHOW WEEKLY SESSIONS
  const showWeeklySessionDetails = (item) => {

     var day_week = moment().isoWeekday();

     var dayName = FindDayofWeek(day_week);
     var scheduledDay = item.scheduled_Date;

     let slotCount = item.gym_available_slot;

     if(compareValue = dayName.localeCompare(scheduledDay)) {
    
      Alert.alert("Blue Lifestyle Gym", "Sorry, you can only book today's session!")
      return;
     }

     if(slotCount < 1) {
      Alert.alert("Blue Lifestyle Gym", "Sorry, no more available slot!")
      return;
   }

      navigation.navigate('GymDetails', {gymSessionID: item.gymSessionId, gymSessionImg:utilities.WeeklySpecialImageMatch(item.gymSession_Name),
      gymSessionName: item.gymSession_Name, gymCapacity: item.gym_available_slot, gymSessionDuration: item.session_Duration,
      gymInstructor: item.gymInstructorName, gymStartDate: item.session_Start_Time, gymScheduledDate: item.scheduled_Date,
      gymEndDate: item.session_End_Time, gymPhoneNumber: item.gymInstructorContact,
      gymRating: item.provider_performance_ratings, providerID: item.providerId,
      facilityID: item.facilityId})
  }

  
 // FUNCTION TO SHOW REGULAR SESSIONS
  const showRegularSessionDetails = (item) => {

    var day_week = moment().isoWeekday();

    var dayName = FindDayofWeek(day_week);
    var scheduledDay = item.scheduled_Date;

    if(compareValue = dayName.localeCompare(scheduledDay)) {
   
     Alert.alert("Blue Lifestyle Gym", "Sorry, you can only book today's session!")
     return;

    }

    let slotCount = item.gym_available_slot;

    if(slotCount < 1) {
      Alert.alert("Blue Lifestyle Gym", "Sorry, no more available slot!")
      return;
   }

    //cleanr time
    var newEndTime = item.session_End_Time.toLowerCase().trim();
    var currentTime = formatAMPM(new Date);

    var beginningTime = moment(newEndTime, 'h:mma');
    var endTime = moment(currentTime, 'h:mma');
  
    if(beginningTime.isBefore(endTime) == true) {
      Alert.alert("Blue Lifestyle Gym","Sorry, selected session is over!")
      return;
    }else{

        navigation.navigate('GymDetails', {gymSessionID: item.gymSessionId, gymSessionImg:images.regular_workout,
        gymSessionName: item.gymSession_Name, gymCapacity: item.gym_available_slot, gymSessionDuration: item.session_Duration,
        gymInstructor: item.gymInstructorName, gymStartDate: item.session_Start_Time, providerName: item.provider_name,
        gymEndDate: item.session_End_Time, gymPhoneNumber: item.gymInstructorContact, gymScheduledDate: item.scheduled_Date,
        gymRating: item.provider_performance_ratings, providerID: item.providerId,
        facilityID: item.facilityId})
    }
  }

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

//USE EFFECT
useEffect(() => {

  

  let formattedDate = setCurrentDay();

  FetchGymProvidersRegular();
  FetchGymProvidersWeekly();

}, []);

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
          <Text style={styles.titleName}>Keep Fit, Stay healthy!</Text>

          <View style={styles.detailsBox}>
          <View style={styles.officeDetails}>
            <Image source={icons.gym} style={{
              height: 21, width: 21, resizeMode: 'contain',
              tintColor: COLORS.gentleBlue, marginRight: 3,
            }} />
            <Text style={styles.business}>GYM</Text>
          </View>
            <View style={styles.officeDetails}>
              <Image source={icons.people} style={{
                height: 21, width: 21, resizeMode: 'contain',
                tintColor: COLORS.gentleBlue
              }} />
              <Text style={styles.business}>30</Text>
            </View>
      </View> 
        </View>
        </View>
    )
  }

  // Top Flat List Component
  const TopWeeklySpecialComponent = () => {
    return (
      <View>
    {/* RENDER WEEKLY SPECIALS */}
      <View style={styles.vendorTitle}>
      <Text style={styles.mainTitle}>Weekly Specials</Text>
      <Image source={icons.specials} 
        style={{
          height: 20, width: 20, marginLeft:7, marginTop:20, tintColor: COLORS.darkGray, resizeMode: 'contain'
        }}
      />
  </View>

  <View style={styles.week_specials}>

  {(weeklyGym == '') &&
    <View style={styles.orderStatusDiv}>
      <Image 
      source={icons.info}
      style={{
        height:32, width: 32, tintColor: COLORS.WarningTextColor,
        resizeMode: 'contain'
      }}
      />
      <Text style={styles.infoText}>Sorry, there are no weekly specials! Please check back</Text>
    </View>
  }


  <FlatList 
  data={weeklyGym}
  horizontal
  keyboardDismissMode="on-drag"
  keyExtractor={item => `${item.gymSessionId}`} 
  showsVerticalScrollIndicator={false}
  renderItem={
      ({ item }) => {
          return (
            <GymSpecials 
            image={utilities.WeeklySpecialImageMatch(item.gymSession_Name)}
            title={item.gymSession_Name}
            slot={(item.gym_available_slot < 1) ? 'Out of Slot' : item.gym_available_slot + " Slots"}
            trainer={item.gymInstructorName}
            subTitle={`Every: ${item.scheduled_Date}`}
            time={item.session_Start_Time.toLowerCase()}
            onPress={() => showWeeklySessionDetails(item)}
        />
          )
      }
  }
/> 
{/*

  <GymSpecials 
  image={images.gym2}
  title="Men Body Building"
  trainer="Mr John Usman"
  subTitle="6am Every Monday"
  />
*/}
</View>

<View style={styles.dailyTitle}>
<Text style={styles.mainTitle}>Regular Slots</Text>
<Image source={icons.gym} 
  style={{
    height: 20, width: 20, marginLeft:7, marginTop:20, tintColor: COLORS.darkGray, resizeMode: 'contain'
  }}
/>
</View>

<View style={styles.slotDays}>
  <GymSlotDay onPress={() => FetchGymSessionDaily(1)} active={monday} title="Mon" />
  <GymSlotDay onPress={() => FetchGymSessionDaily(2)} active={tuesday} title="Tue" />
  <GymSlotDay onPress={() => FetchGymSessionDaily(3)} active={wednesday} title="Wed" />
  <GymSlotDay onPress={() => FetchGymSessionDaily(4)} active={thursday} title="Thu" />
  <GymSlotDay onPress={() => FetchGymSessionDaily(5)} active={friday} title="Fri" />
  <GymSlotDay onPress={() => FetchGymSessionDaily(6)} active={saturday} title="Sat" />
  <GymSlotDay onPress={() => FetchGymSessionDaily(7)} active={sunday} title="Sun" />
</View>


    {/* RENDER WEEKLY SPECIALS */}

      </View>
    )
  }
  // End of Flat list

  // Function to show no data available
  const ShowNoDailyData = () => {
    return (
      <View style={styles.noDataContainer}>
        <Image 
          source={icons.info}
          style={{
            height: 18, width: 18, resizeMode: 'contain',
            tintColor: COLORS.StandardardBankBlue
          }}
        />
         <Text style={styles.noDataText}>No slot available for selected day!</Text>
      </View>
    )
  }
  // end of function 

  // function to render body
  function renderBodyContent() {
    return (
      <View style={styles.bodyContainer}>
  
      {/* RENDER WEEKLY SPECIALS */}

   

 {/* RENDER WEEKLY SPECIALS */}     

   

      <View style={styles.gym_schedule}>

      <View style={styles.gymlisting}>
            <FlatList 
                ListEmptyComponent={ShowNoDailyData}
                ListHeaderComponent={TopWeeklySpecialComponent}
                data={regularGym}
                keyboardDismissMode="on-drag"
                keyExtractor={item => `${item.gymSessionId}`} 
                showsVerticalScrollIndicator={false}
                renderItem={
                    ({ item }) => {
                        return (
                          <GymSlot 
                              timeSlot={`${item.session_Start_Time} - ${item.session_End_Time}`}
                              capacity={`${item.gym_available_slot} Slots Available`}
                              onPress={() => showRegularSessionDetails(item)}
                          />  
                        )
                    }
                }
      /> 

{/*
          <GymSlot 
              timeSlot="12:00pm - 01:00pm"
              capacity="15 Slots Available"
              onPress={() => navigation.navigate('GymDetails')}
          />
            <GymSlot 
              timeSlot="01:00pm - 02:00pm"
              capacity="13 Slots Available"
              onPress={() => navigation.navigate('GymDetails')}
          />
          <GymSlot 
          timeSlot="02:00pm - 03:00pm"
          capacity="12 Slots Available"
          onPress={() => navigation.navigate('GymDetails')}
          />
          <GymSlot 
          timeSlot="03:00pm - 04:00pm"
          capacity="15 Slots Available"
          onPress={() => navigation.navigate('GymDetails')}
          />
          <GymSlot 
          timeSlot="04:00pm - 05:00pm"
          capacity="10 Slots Available"
          onPress={() => navigation.navigate('GymDetails')}
    /> */}
      </View>
    
      </View>


        {/* END OF RENDER PROVIDERS */}
      
      </View>
    )
  }

  // return function
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" />

    {loader && 
      <NewLoader title="Processing your request, please wait..." />
    }

     {/* Render Header */}
     {renderHeaderContent()}

     {/* Render Body */}
     {renderBodyContent()}
    
    
</SafeAreaView>
  )
}

const styles = StyleSheet.create({

  noDataContainer: {
    borderColor: COLORS.InfoAlertBorder,
    borderWidth:1,
    borderStyle: 'solid',
    backgroundColor: COLORS.InfoAlertbg,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: 10,
    alignItems: 'center'
  },

  noDataText: {
    color: COLORS.StandardardBankBlue,
    fontSize: 13,
    fontFamily: "Roboto",
    fontWeight: 'normal', 
  },
  slotDays: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 25,
    paddingHorizontal:5
  },
  gymlisting: {
    marginHorizontal:15
  }, 
week_specials: {
 flexDirection: 'row',
 marginHorizontal:10,
 columnGap:10
},
orderStatusDiv: {
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: COLORS.WarningBorder,
  backgroundColor: COLORS.Warningbg,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: wp(5),
  borderRadius: wp(5),
  columnGap: 15
},
   orderBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  orderText: {
    color: COLORS.darkGray,
    fontSize: 13,
    fontFamily: "Roboto",
    fontWeight: 'normal', 
  },
  orderHistory: {
    marginTop: 5,
    marginHorizontal:25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  vendorTitle : {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginHorizontal: 10,
      marginBottom:20
  },
  dailyTitle : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom:20,
    marginTop: 30,
},
infoText: {
  fontSize: wp(3.7),
  fontFamily: "Roboto",
  color: COLORS.StatureBlue,
  fontWeight: 'normal', 
  lineHeight: 25,
  width:wp(70)
},
  detailsBox : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }, 
  mainTitle: {
    fontSize: 20,
    fontFamily: "Roboto",
    color: COLORS.StatureBlue,
    fontWeight: 'bold', 
    marginTop:20
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
    fontSize: 15,
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

export default GymScreen;