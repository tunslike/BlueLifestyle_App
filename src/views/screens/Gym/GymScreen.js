import React, {useState, useEffect} from 'react';
import {  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Dimensions,
  StatusBar,
  Image, FlatList} from 'react-native';
  import axios from 'axios';
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

 const [activeDay, setActiveDay] = useState(true)
 const [errorMessage, setErrorMessage] = useState(null)

 const [loader, setLoader] = useState(false)
 const [gymData, setGYMData] = useState('');
 const [regularGym, setRegularGym] = useState([]);
 const [weeklyGym, setWeeklyGym] = useState([]);
 const [currentDay, getCurrentDay] = useState(null);

 const [monday, setMonday] = useState(false);
 const [tuesday, setTuesday] = useState(false);
 const [wednesday, setWednesday] = useState(false);
 const [thursday, setThursday] = useState(false);
 const [friday, setFriday] = useState(false);
 const [saturday, setSaturday] = useState(false);
 const [sunday, setSunday] = useState(false);

   // FUNCTION TO LOAD RESTURANT MENUS
   const FetchGymProvidersWeekly = () => {

     //show loader
     setLoader(true);

     const dataRegular = {
        gymSessionType: 'Regular'
     }

     //
     axios.post(APIBaseUrl.developmentUrl + 'services/service/FetchGymSessions', dataRegular, ApIHeaderOptions.headers)
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
     axios.post(APIBaseUrl.developmentUrl + 'services/service/FetchGymSessions', dataWeekly, ApIHeaderOptions.headers)
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

  //function to get the current day
  const setCurrentDay = () => {

    setMonday(false)
    setTuesday(false)
    setWednesday(false)
    setThursday(false)
    setFriday(false)
    setSaturday(false)
    setSunday(false)

    var d = new Date();
    var dayName = d.toString().split(' ')[0];

    if(dayName == ' Mon') {
      setMonday(true);
    }else if(dayName == 'Tue') {
      setTuesday(true) 
    }else if(dayName == 'Wed') {
      setWednesday(true)
    }else if(dayName == 'Thu') {
      setThursday(true)
    }else if(dayName == 'Fri') {
      setFriday(true)
    }else if(dayName == 'Sat') {
      setSaturday(true)
    }else if(dayName == 'Sun'){
      setSunday(true)
    }
  }
  // end of function to get current day


  // FUNCTION TO SPOOL DATA FOR EACH DAY
  const FetchGymSessionDaily = (day) => {

    if(!day) {
      return;
    }

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
      break;
      case 2: 
        setTuesday(true);
      break;
      case 3: 
        setWednesday(true);
      break;
      case 4: 
        setThursday(true);
      break;
      case 5: 
        setFriday(true);
      break;
      case 6: 
        setSaturday(true);
      break;
      case 7: 
        setSunday(true);
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

    let dailyDate = "'" + utilities.getCurrentDateMMDDYYYY() + "'";

    console.log(dailyDate)
    return;

     //show loader
     setLoader(true);

     const dataRegular = {
        scheduled_Date: dailyDate
      }

   //
   axios.post(APIBaseUrl.developmentUrl + 'Service/FetchGymSessions', dataRegular, ApIHeaderOptions.headers)
   .then(response => {

       if(response.data.errorCode == '000') {

            //set data
            setRegularGym(response.data.gymServiceData)

       }else {

           //show error message
           setErrorMessage(response.data.statusMessage);

       }
   })
   .catch(error => {
     console.log(error);
   });


  } 

  //END OF FUNCTION

//USE EFFECT
useEffect(() => {

  setCurrentDay();

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
          height: 20, width: 20, marginLeft:7, tintColor: COLORS.darkGray, resizeMode: 'contain'
        }}
      />
  </View>

  <View style={styles.week_specials}>

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
            image={images.gym1}
            title={item.gymSession_Name}
            trainer={item.gymInstructorName}
            subTitle={`${item.session_Start_Time} Every Wednesday`}
            onPress={() => navigation.navigate('GymDetails', {gymSessionID: item.gymSessionId,
              gymSessionName: item.gymSession_Name, gymCapacity: (item.gymSession_Capacity == '') ? '30' : item.gymSession_Capacity,
              gymInstructor: item.gymInstructorName, gymStartDate: item.session_Start_Time,
              gymEndDate: item.session_End_Time, gymPhoneNumber: item.gymInstructorContact,
              gymRating: item.provider_performance_ratings, providerID: item.providerId})}
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
    height: 20, width: 20, marginLeft:7, tintColor: COLORS.darkGray, resizeMode: 'contain'
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
                              capacity={`30 Slots Available`}
                              onPress={() => navigation.navigate('GymDetails', {gymSessionID: item.gymSessionId,
                              gymSessionName: item.gymSession_Name, gymCapacity: (item.gymSession_Capacity == '') ? '30' : item.gymSession_Capacity,
                              gymInstructor: item.gymInstructorName, gymStartDate: item.session_Start_Time,
                              gymEndDate: item.session_End_Time, gymPhoneNumber: item.gymInstructorContact,
                              gymRating: item.provider_performance_ratings, providerID: item.providerId})}
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
    fontFamily: "Benton Sans",
    fontWeight: 'normal', 
  },
  slotDays: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
   orderBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  orderText: {
    color: COLORS.darkGray,
    fontSize: 13,
    fontFamily: "Benton Sans",
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
      marginHorizontal: 25,
      marginBottom:20
  },
  dailyTitle : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 25,
    marginBottom:20,
    marginTop: 30,
},
  providerList: {

  },
  detailsBox : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }, 
  mainTitle: {
    fontSize: 17,
    fontFamily: "Benton Sans",
    color: COLORS.StatureBlue,
    fontWeight: 'bold', 
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
    fontFamily: "Benton Sans",
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
    fontFamily: "Benton Sans",
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
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
  }
})

export default GymScreen;