import React, {useRef, useState, useEffect} from 'react';
import { 
        StyleSheet, 
        Text, 
        View,
        ImageBackground,
        TouchableOpacity,
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
          Button, MessageBox, NewLoader,
        } from '../../components';

 const { width, height } = Dimensions.get("window");


// INIT APP COMPONENT
const CrecheProviderScreen = ({route, navigation}) => {

  const userData = useSelector((state) => state.user.userData)
  const token = useSelector((state) => state.user.idtkn)

  // GET ROUTE PARAMS
  const { 
          facilityID,
          providerId, 
          crecheSessionID,
          crecheSessionName,
          sessionStart, 
          capacity, 
          teacher, 
          contactPhone, 
          rating, 
          sessionName, childName, parentPhone} = route.params

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  // SET USER INPUT STATES
  //const [childName, setChildName] = useState(null);
  //const [parentPhone, setParentPhone] = useState(null);
  const [emergencyNo, setEmergencyNo] = useState(null);
  const [pickUpTime, setPickUpTime] = useState(null);
  const [dropOffDate, setDropOffDate] = useState(null);

  const [showMessage, setShowMessage] = useState(0);

  //component states
  const [calendarMode, setCalendarMode] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  //show date picker
  const showDatePicker = (mode) => {
    setDatePickerVisibility(true);
    setCalendarMode(mode)
  };

  //hide date pickers
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // handle confirm 
  const handleConfirm = (date) => {
    if(calendarMode == "date") {
      setDropOffDate(FormatDate(date))
    }else if(calendarMode == "time"){
      setPickUpTime(FormatTime(date))
    }
    
    hideDatePicker();
  };

  // Function to format time
  const FormatTime = (data) => {
    let dateTimeString =
      data.getHours() +
      ':' +
      data.getMinutes();
    return dateTimeString; // It will look something like this 3-5-2021 16:23
  };

  // function to format to date
  const FormatDate = (data) => {
    let dateTimeString =
      data.getDate() +
      '-' +
      (data.getMonth() + 1) +
      '-' +
      data.getFullYear();
  
    return dateTimeString; // It will look something like this 3-5-2021 16:23
  };


  //FUNCTION TO SUBMIT GYM SESSION REQUEST
  const BookCrecheSession = () => {

    setErrorMessage(null)
    Keyboard.dismiss();

      //validate input
      if(!childName || !parentPhone || !dropOffDate || !pickUpTime) {
        setErrorMessage('Please complete all fields!')
        //setTimeout(hideErrorMessage, 3000);
        return;
    }


    Alert.alert('Blue Lifestyle Creche', 'Do you want to book now?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => RequestCrecheSession()},
    ]);

  }//END OF FUNCTION

  //function to book creche session
  const RequestCrecheSession = () => {

    const data = {
      userID: userData.userID,
      crecheSessionID: crecheSessionID,
      crecheSessionName: crecheSessionName,
      entity: 1,
      contactNumber: parentPhone,
      emergencyNumber: parentPhone,
      providerID: providerId,
      facilityID: facilityID,
      orderDetails: [
        {
          childFirstName: childName,
          childLastName: childName,
          dateDropOff: dropOffDate,
          timeDropOff: pickUpTime
        }
      ]
    };

    console.log(new Date(dropOffDate))
    console.log(dropOffDate)

    setIsLoading(true)

    try {

        console.log('********************* Booking Creche Session ***********************')
    
        axios.post(APIBaseUrl.developmentUrl + 'orders/order/CreateCreche', data, {
          headers: {
            'JWTToken': token
          }
        })
        .then(response => {
    
          setIsLoading(false)
    
            if(response.data.errorCode == '000') {
    
                //set data
                console.log(response.data)
                navigation.navigate('CrecheComplete', {message:response.data.statusMessage, orderNumber: response.data.orderNo, pageType:2})
    
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
          console.log(error);
        });
      
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }

  }
  //end of booking function

//functiont to turn of message
const hideNotificationMessage = () => {
  setShowMessage(0);
}

//functiont to turn of message
const hideErrorMessage = () => {
  setErrorMessage(null);
}

  // FUNCTION TO RENDER HEADER
    function renderHeaderContent() {
      return (
        <ImageBackground
        source={images.creche_dash_img}
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
            <Text style={styles.ratingText}>4.5 (10)</Text>
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
                <Text style={styles.vendorTileName}>Kids Creche Season</Text>
                
                <View style={styles.vendorFeatures}>
                    <ProviderFeature
                      title={`Opens: ${sessionStart}`}
                      icon={icons.time}
                    />
                    <ProviderFeature
                      title={`Slots: ${capacity}`}
                      icon={icons.people}
                    />
                    <ProviderFeature
                      title="Feedback"
                      icon={icons.feedback}
                    />
                    <ProviderFeature
                    title={teacher}
                    icon={icons.creche_quardian}
                  />
                  <ProviderFeature
                  title={contactPhone}
                  icon={icons.phone_fill}
                    />
    
                </View>
            
              </View>
          
                {/* Load body for menu items */}

                <View style={styles.menuListView}>

                <ScrollView>
                    <MenuItemHeader title="Reserve a Spot Now" />
                    <Text style={styles.descText}>Please provide the details below to book a slot</Text>

                    <CrecheInput 
                      button={false}
                      icon={icons.child}
                      placeholder="Enter Child Full Name"
                      value={childName}
                      onFocus={() => setErrorMessage(null)}
                    />
                    <CrecheInput 
                    button={false}
                    icon={icons.phone_fill}
                    placeholder="Enter Parent Number"
                    value={parentPhone}
                    onFocus={() => setErrorMessage(null)}
                    maxlength={11}
                  />

                  <CrecheInput 
                  button={false}
                    icon={icons.emergencyPhone}
                    placeholder="Enter Emergency Number"
                    value={parentPhone}
                    onFocus={() => setErrorMessage(null)}
                    maxlength={11}
                  />

                  <CrecheInput 
                    button={true}
                    onPress={() => showDatePicker("date")}
                    icon={icons.calendar}
                    placeholder="Tap left icon to select Date"
                    onChange={(text) => setDropOffDate(text)}
                    value={dropOffDate}
                    onFocus={() => setErrorMessage(null)}
                  />

                  <CrecheInput 
                    button={true}
                    onPress={() => showDatePicker("time")}
                    icon={icons.time}
                    placeholder="Tap left icon to select time"
                    onChange={(text) => setPickUpTime(text)}
                    value={pickUpTime}
                  />

                  <View>
                      <Button 
                          title="Book Now" 
                          icon={icons.check_yes} 
                          onPress={() => BookCrecheSession()}
                          />
                  </View>

                </ScrollView>
                    
                </View>

                {/* End of Load body for menu items */}
          </View>
      )
    }

    // Function to include date component
    function IncludeDateComponent() {
        return (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode={calendarMode}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
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

          {errorMessage &&
            <MessageBox status="error" message={errorMessage} />
          }

          {isLoading && 
            <NewLoader title="Processing your request, please wait..." />
          }

              {/* Render Header */}
              {renderHeaderContent()}


              {/* Render Body */}  
              {renderBodyContent()}

              {/* Include Date Components */}
              {IncludeDateComponent()}

          </SafeAreaProvider>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
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
    fontSize: 20,
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

export default CrecheProviderScreen;