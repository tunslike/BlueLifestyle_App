import React, {useRef, useState} from 'react';
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
        KeyboardAvoidingView
 } from 'react-native';
 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
 import { SafeAreaProvider } from 'react-native-safe-area-context';
 import DateTimePickerModal from "react-native-modal-datetime-picker";
 import { COLORS, icons, images } from '../../../constants';
 import { HeaderBarBlank, 
          ProviderFeature, 
          MenuItemHeader,
          CrecheInput,
          Button
        } from '../../components';

 const { width, height } = Dimensions.get("window");


// INIT APP
const CrecheProviderScreen = ({navigation}) => {


  // SET USER INPUT STATES
  const [childName, setChildName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [emergencyNo, setEmergencyNo] = useState('');
  const [pickUpTime, setPickUpTime] = useState('');
  const [dropOffDate, setDropOffDate] = useState('');
  const [calendarMode, setCalendarMode] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = (mode) => {
    setDatePickerVisibility(true);
    setCalendarMode(mode)
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

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

  const FormatDate = (data) => {
    let dateTimeString =
      data.getDate() +
      '-' +
      (data.getMonth() + 1) +
      '-' +
      data.getFullYear();
  
    return dateTimeString; // It will look something like this 3-5-2021 16:23
  };


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
                      title="Opens: 8am"
                      icon={icons.time}
                    />
                    <ProviderFeature
                      title="Slots: 45"
                      icon={icons.people}
                    />
                    <ProviderFeature
                      title="Feedback"
                      icon={icons.feedback}
                    />
                    <ProviderFeature
                    title="Mrs. Tobi Egunjobi"
                    icon={icons.creche_quardian}
                  />
                  <ProviderFeature
                  title="090 578 0393"
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
                      onChange={(text) => setChildName(text)}
                      value={childName}
                    />
                    <CrecheInput 
                    button={false}
                    icon={icons.phone_fill}
                    placeholder="Enter Parent Number"
                    onChange={(text) => setParentPhone(text)}
                    value={parentPhone}
                  />

                  <CrecheInput 
                  button={false}
                    icon={icons.emergencyPhone}
                    placeholder="Enter Emergency Number"
                    onChange={(text) => setEmergencyNo(text)}
                    value={emergencyNo}
                  />

                  <CrecheInput 
                    button={true}
                    onPress={() => showDatePicker("date")}
                    icon={icons.calendar}
                    placeholder="Select Drop-off Date"
                    onChange={(text) => setDropOffDate(text)}
                    value={dropOffDate}
                  />

                  <CrecheInput 
                    button={true}
                    onPress={() => showDatePicker("time")}
                    icon={icons.time}
                    placeholder="Select Drop-off Time"
                    onChange={(text) => setPickUpTime(text)}
                    value={pickUpTime}
                  />

                  <View>
                      <Button 
                          title="Book Now" 
                          icon={icons.check_yes} 
                          onPress={() => navigation.navigate('CrecheComplete')}
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
    fontSize:14,
        fontFamily: "Benton Sans",
        color: COLORS.darkGray,
        marginTop:5,
        marginBottom: 10,
  },
    crecheTxt: {
        fontSize:14,
        fontFamily: "Benton Sans",
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
    rowGap: 15
  },
  vendorDesc: {
    fontSize:14,
    fontFamily: "Benton Sans",
    color: COLORS.darkGray,
    fontWeight: 'normal',
    marginVertical: 2,
    lineHeight:20,
  },
  vendorTileName : {
    fontSize: 20,
    fontFamily: "Benton Sans",
    color: COLORS.StatureBlue,
    fontWeight: 'bold',
  },
  vendorBox: {
    marginVertical: 5,
    marginHorizontal: 20,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: "Benton Sans",
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