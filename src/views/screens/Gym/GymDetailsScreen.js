import React, {useRef, useState} from 'react';
import { 
        StyleSheet, 
        Text, 
        View,
        ImageBackground,
        Dimensions,
        Image,
        ScrollView,
        StatusBar,
        Keyboard,
        Alert
 } from 'react-native';
 import axios from 'axios';
 import { useSelector } from 'react-redux';
 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
 import { SafeAreaProvider } from 'react-native-safe-area-context';
 import DateTimePickerModal from "react-native-modal-datetime-picker";
 import { COLORS, icons, images, APIBaseUrl, ApIHeaderOptions } from '../../../constants';
 import { HeaderBarBlank, 
          ProviderFeature, 
          MenuItemHeader,
          CrecheInput,
          Button, MessageBox, NewLoader
        } from '../../components';
         
 const { width, height } = Dimensions.get("window");

// INIT APP
const GymDetailsScreen = ({route, navigation}) => {

  const token = useSelector((state) => state.user.idtkn)
  const userData = useSelector((state) => state.user.userData)

  const { 
    facilityID,
    providerID, 
    gymSessionID, 
    gymSessionName, 
    gymCapacity, 
    gymInstructor, 
    gymStartDate, 
    gymEndDate,gymPhoneNumber, gymRating, gymScheduledDate} = route.params

  // SET USER INPUT STATES
  const [username, setUsername] = useState('');
  const [sessionDate, setSessionDate] = useState('')
  const [gymDetails, setGymDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);
  const [orderNumber, setOrderNumber] = useState('')

  const RequestGymBooking = () => {
    try {      
      const data = {
        userID: userData.userID,
        gymSessionID: gymSessionID,
        gymSessionName: gymSessionName,
        "entity": 1,
        contactNumber: userData.phone,
        facilityID : facilityID,
        providerID : providerID,
        "orderDetails": [
          {
            scheduledDate: gymScheduledDate,
            additional_details : gymDetails
          }
        ]
      }
  
        setIsLoading(true)
  
        console.log('********************* Booking Gym Session ***********************')
  
        axios.post(APIBaseUrl.developmentUrl + 'orders/order/CreateGym', data,{
          headers: {
            'JWTToken': token
          }
        })
        .then(response => {
    
          setIsLoading(false)
    
            if(response.data.errorCode == '000') {
    
                 //set data
                 console.log(response.data)
                 navigation.navigate('GymComplete', {message:response.data.statusMessage, orderNumber: response.data.orderNo})
    
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
      setIsLoading(false)
      console.log(error)
    }
  }

  //FUNCTION TO SUBMIT GYM SESSION REQUEST
  const BookGymSession = () => {
    
    setErrorMessage(null)
    Keyboard.dismiss();

    Alert.alert('Blue Lifestyle Gym', 'Do you want to book now?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => RequestGymBooking()},
    ]);

  }//END OF FUNCTION


  // FUNCTION TO RENDER HEADER
    function renderHeaderContent() {
      return (
        <ImageBackground
        source={images.gym4}
        style={styles.headerBg}
      >
          <HeaderBarBlank 
            onPress={() => navigation.goBack()}
            icon={icons.back_arrow}
          />
          <View style={styles.vendorRating}>
          <Image source={icons.rating} 
          style={{
              tintColor: COLORS.SecondaryGreen, 
              height: 15, width: 15, resizeMode: 'contain', marginRight: 5
          }}
            />
            <Text style={styles.ratingText}>{gymRating}</Text>
          </View>
        </ImageBackground>
      )
    }
  // END OF FUNCTION

  // FUNCTION TO RENDER BODY CONTENT
    function renderBodyContent() {
      return (
          <View style={styles.bodyContainer}>
              <View
                style={styles.vendorBox}
              >
                <Text style={styles.vendorTileName}>{gymSessionName}</Text>
                <Text style={styles.sessionType}>{`${gymStartDate} - ${gymEndDate}`}</Text>
                
                <View style={styles.vendorFeatures}>
                    <ProviderFeature
                      title={`Opens: ${gymStartDate}`}
                      icon={icons.time}
                    />
                    <ProviderFeature
                      title={`Slots: ${gymCapacity}`}
                      icon={icons.people}
                    />
                    <ProviderFeature
                      title="Feedback"
                      icon={icons.feedback}
                    />
                    <ProviderFeature
                    title={gymInstructor}
                    icon={icons.creche_quardian}
                  />
                  <ProviderFeature
                  title={gymPhoneNumber}
                  icon={icons.phone_fill}
                    />
    
                </View>
            
              </View>
          
                {/* Load body for menu items */}

                <View style={styles.menuListView}>

                <ScrollView>
                    <MenuItemHeader title="Book Now to Reserve a Slot" />
                    <Text style={styles.descText}>Please provide the details below to book a slot</Text>

                    <CrecheInput 
                      button={false}
                      icon={icons.user}
                      placeholder="Enter your Full Name"
                      onChange={(text) => setUsername(text)}
                      value={userData.firstName + " " + userData.lastName}
                    />
                    <CrecheInput 
                    button={false}
                    icon={icons.calendar}
                    placeholder="Booking Date"
                    onChange={(text) => setSessionDate(text)}
                    value={gymScheduledDate}
                  />
                    <CrecheInput 
                    button={false}
                    icon={icons.gym_details}
                    placeholder="Provide Additional Details (optional)"
                    onChange={(text) => setGymDetails(text)}
                    value={gymDetails}
                    multiline={true}
                  />

                  <View>
                      <Button 
                          title="Book Now" 
                          icon={icons.check_yes} 
                          onPress={() => BookGymSession()}
                          /*onPress={() => navigation.navigate('CrecheComplete')}*/
                          />
                  </View>

                </ScrollView>
                    
                </View>

                {/* End of Load body for menu items */}
          </View>
      )
    }

  return (

    <KeyboardAwareScrollView 
     enableOnAndroid={true}
     keyboardShouldPersistTaps={"handled"}
     extraScrollHeight={-300}
     contentContainerStyle={{
      flexGrow: 1,
      justifyContent: 'center'
     }}>
          <SafeAreaProvider style={styles.container}>
          <StatusBar style="auto" />

          {isLoading && 
            <NewLoader title="Processing your booking request, please wait..." />
          }
        
          {errorMessage &&
            <MessageBox status="error" message={errorMessage} />
          }

              {/* Render Header */}
              {renderHeaderContent()}


              {/* Render Body */}  
              {renderBodyContent()}

          </SafeAreaProvider>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
    sessionType: {
        fontSize:13,
        fontFamily: "Roboto",
        color: COLORS.darkGray,
        fontWeight: 'bold',
        marginTop:3,
        marginLeft:1
    },
  descText: {
    fontSize:13,
        fontFamily: "Roboto",
        color: COLORS.darkGray,
        marginTop:5,
        marginBottom: 10,
  },
    crecheTxt: {
        fontSize:14,
        fontFamily: "Roboto",
        color: COLORS.darkGray,
    },
    crecheSetup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
  menuListView: {
    borderTopColor: COLORS.lineDividerGray,
    borderTopWidth: 1,
    width,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical:20,
    borderTopStyle: 'solid',
  },  
  featureBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 8,
    borderColor: COLORS.ArrowGray,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    paddingVertical:2,
    paddingHorizontal:8
},
  vendorFeatures: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical:15,
    flexWrap:'wrap',
    rowGap: 10
  },
  vendorDesc: {
    fontSize:14,
    fontFamily: "Roboto",
    color: COLORS.darkGray,
    fontWeight: 'normal',
    marginVertical: 2,
    lineHeight:20,
  },
  vendorTileName : {
    fontSize: 17,
    fontFamily: "Roboto",
    color: COLORS.StatureBlue,
    fontWeight: 'bold',
  },
  vendorBox: {
    marginVertical: 5,
    marginHorizontal: 20,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: "Roboto",
    color: COLORS.StandardardBankBlue,
    fontWeight: 'normal',
},
vendorRating: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingVertical:8,
    paddingHorizontal:15,
    marginTop:5
},
  bodyContainer: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    borderTopRightRadius: 25,
    marginTop: -20,
    width,
    paddingVertical:10
  },
  headerBg: {
    height:180,
    width
  },
  container: {
    flex: 1
  }
})

export default GymDetailsScreen;