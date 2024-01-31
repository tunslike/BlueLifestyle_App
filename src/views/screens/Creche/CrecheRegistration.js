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
        Alert,
 } from 'react-native';
 import axios from 'axios';
 import { useSelector } from 'react-redux';
 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
 import { SafeAreaProvider } from 'react-native-safe-area-context';
 import DateTimePickerModal from "react-native-modal-datetime-picker";
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 import { COLORS, icons, images, APIBaseUrl, ApIHeaderOptions, ApplicationName } from '../../../constants';
 import { HeaderBarBlank, 
          CrecheRegInput,
          Button, MessageBox, NewLoader,
        } from '../../components';

 const { width, height } = Dimensions.get("window");


// INIT APP COMPONENT
const CrecheRegistration = ({route, navigation}) => {

  const userData = useSelector((state) => state.user.userData)
  const token = useSelector((state) => state.user.idtkn)

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  // SET USER INPUT STATES
  const [babyName, setBabyName] = useState(null);
  const [dob, setDOB] = useState(null);
  const [staffName, setStaffName] = useState(null);
  const [contactPhone, setContactPhone] = useState(null);
  const [emailAddress, setEmailAddress] = useState(null);
  const [officeAdd, setOfficeAdd] = useState(null);
  const [specialNeed, setSpecialNeed] = useState(null);
  const [isVacinated, setIsVacinated] = useState(1)
  const [vaccinatedComment, setVaccinatedComment] = useState('')
  const [isConsent, setIsConsent] = useState(1)
  const [consentComment, setConsentComment] = useState('')

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
      setDOB(FormatDate(date))
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
  const CompleteCrecheRegistration = () => {

    setErrorMessage(null)
    Keyboard.dismiss();

      //validate input
      if(!babyName || !dob || !staffName || !contactPhone || !emailAddress || !officeAdd || !specialNeed || isConsent == 0 || isVacinated == 0) {
        setErrorMessage('Please complete all fields!')
        //setTimeout(hideErrorMessage, 3000);
        return;
    }


    Alert.alert('Blue Lifestyle Creche', 'Do you want to submit your registration?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => SubmitCrecheRegistration()},
    ]);

  }//END OF FUNCTION

  //function to book creche session
  const SubmitCrecheRegistration = () => {

    const data = {
      userid: userData.userID,
      dependentName1: babyName,
      dob: dob,
      officeAddress: officeAdd,
      specialNeeds: specialNeed,
      consent: isConsent.toString(),
      consentComment: consentComment,
      staffFullName: staffName,
      isVaccinated: isVacinated.toString(),
      email: emailAddress,
      phone: contactPhone
    };

    console.log(data)

    setIsLoading(true)

    try {

        console.log('********************* Submitting Creche Registration ***********************')
    
        axios.post(APIBaseUrl.developmentUrl + 'accounts/Staff/RegisterCrecheUser', data, {
          headers: {
            'JWTToken': token
          }
        })
        .then(response => {
    
          setIsLoading(false)
    
            if(response.data.errorCode == '000') {
    
                //set data
                console.log(response.data)
                navigation.navigate('CrecheComplete', {message:"Your registration was submitted successfully for review.", orderNumber: "", pageType:1})
    
            }else {
    
                console.log(response.data.statusMessage)
                //show error message
                setErrorMessage(response.data.statusMessage);

                Alert.alert(ApplicationName.AppName, response.data.statusMessage)
    
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

const changeVaccinated = (value) => {
    setIsVacinated(value)
}

const changeIsConsent = (value) => {
    setIsConsent(value)
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
                <Text style={styles.vendorTileName}>New Creche Registration</Text>
            
            
              </View>
          
                {/* Load body for menu items */}

                <View style={styles.menuListView}>

                <ScrollView>
                    <Text style={styles.descText}>Please provide the details below to complete your registration</Text>

                    <CrecheRegInput 
                    label="Baby's Full Name:"
                     onChange={(text) => setBabyName(text)}
                      value={babyName}
                      onFocus={() => setErrorMessage(null)}
                  />

                  <CrecheRegInput 
                  label="Date of Birth"
                  iconOnPress={() => showDatePicker("date")}
                  icon={icons.calendar}
                  placeholder="Tap icon to select date"
                  onChange={(text) => setDOB(text)}
                  value={dob}
                  onFocus={() => setErrorMessage(null)}
                />

                <CrecheRegInput 
                label="Staff (Parent) Full Name:"
                onChange={(text) => setStaffName(text)}
                      value={staffName}
                      onFocus={() => setErrorMessage(null)}
              />

              <CrecheRegInput 
              label="Contact Phone Number:"
              onChange={(text) => setContactPhone(text)}
                      value={contactPhone}
                      onFocus={() => setErrorMessage(null)}
            />

            <CrecheRegInput 
            label="Email Address:"
            onChange={(text) => setEmailAddress(text)}
                    value={emailAddress}
                    onFocus={() => setErrorMessage(null)}
          />

            <CrecheRegInput 
            label="Office Address of Staff (Parent):"
            placeholder="Enter office address"
            multiline={true}
            onChange={(text) => setOfficeAdd(text)}
                      value={officeAdd}
                      onFocus={() => setErrorMessage(null)}
          />

          <CrecheRegInput 
          label="Any special needs of baby:"
          multiline={true}
          placeholder="Enter any special needs of baby"
          onChange={(text) => setSpecialNeed(text)}
          value={specialNeed}
           onFocus={() => setErrorMessage(null)}
        />

        <View style={[styles.radioContainer, {marginTop: 40}]}>
        <Text style={styles.radioText}>
            Is baby fully vaccinated for age?
        </Text>
        <View style={styles.toggle}>
            <TouchableOpacity onPress={() => changeVaccinated(1)} style={(isVacinated == 1) ? styles.toggleYesActive : styles.toggleYesNotActive}>
                <Text style={[styles.toggleTxt,{color: (isVacinated == 1) ? COLORS.white : COLORS.StatureBlue}]}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeVaccinated(0)} style={(isVacinated == 0) ? styles.toggleNoActive : styles.toggleNoNotActive}>
                <Text style={[styles.toggleTxt, {color: (isVacinated == 0) ? COLORS.white : COLORS.StatureBlue}]}>No</Text>
            </TouchableOpacity>
        </View>
        </View>

        {(isVacinated == '0') &&
    
            <CrecheRegInput 
            label="Please provide comments:"
            multiline={true}
            placeholder="Enter comments here"
            onChange={(text) => setConsentComment(text)}
            value={consentComment}
            onFocus={() => setErrorMessage(null)}
        />
        }

        <View style={[styles.radioContainer, {marginTop:25}]}>
        <Text style={[styles.radioText, {width: 250}]}>
            Kindly indicate baby's registration has the consent of both father and mother
        </Text>

        <View style={styles.toggle}>
        <TouchableOpacity onPress={() => changeIsConsent(1)} style={[(isConsent == 1) ? styles.toggleYesActive : styles.toggleYesNotActive, {}]}>
            <Text style={[styles.toggleTxt,{color: (isConsent == 1) ? COLORS.white : COLORS.StatureBlue}]}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeIsConsent(0)} style={(isConsent == 0) ? styles.toggleNoActive : styles.toggleNoNotActive}>
            <Text style={[styles.toggleTxt, {color: (isConsent == 0) ? COLORS.white : COLORS.StatureBlue}]}>No</Text>
        </TouchableOpacity>
    </View>
        
        </View>


        {(isConsent == '0') &&
    
            <CrecheRegInput 
            label="Please provide comments:"
            multiline={true}
            placeholder="Enter comments here"
            onChange={(text) => setVaccinatedComment(text)}
            value={vaccinatedComment}
            onFocus={() => setErrorMessage(null)}
        />
        }

                  {/* 
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
                  */}

                  <View>
                      <Button 
                          title="Register Now" 
                          icon={icons.check_yes} 
                          onPress={() => CompleteCrecheRegistration()}
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
    toggleTxt: {
        fontSize:13,
        fontFamily: "Roboto",
        fontWeight: 'bold'
    },
toggleYesActive: {
    backgroundColor: COLORS.SecondaryGreen,
    paddingHorizontal: 13,
    paddingVertical: 5,
    borderBottomLeftRadius:7,
    borderTopLeftRadius: 7
},
toggleYesNotActive: {
    paddingHorizontal: 13,
    paddingVertical: 5,
    borderColor: COLORS.textGrey,
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7
},
toggleNoActive: {
    backgroundColor: COLORS.SecondaryGreen,
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderBottomRightRadius:7,
    borderTopRightRadius: 7
},
toggleNoNotActive: {
    paddingHorizontal: 13,
    paddingVertical: 4,
    borderColor: COLORS.textGrey,
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopEndRadius: 7,
    borderBottomEndRadius:7
},
    toggle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    radioContainer: {
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    radioText: {
        fontSize:13,
        fontFamily: "Roboto",
        color: COLORS.StatureBlue,
        lineHeight:20,
        fontWeight:'bold'
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

export default CrecheRegistration;