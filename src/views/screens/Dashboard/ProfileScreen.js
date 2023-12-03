import React, {useState, useEffect} from 'react';
import {  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  Image, 
  TouchableOpacity} from 'react-native';
  import { useSelector } from 'react-redux';
  import { COLORS, icons, images, verticalScale, horizontalScale, moderateScale } from '../../../constants';
  import { HeaderBar, CustomInput, Button } from '../../components';

  const { width, height } = Dimensions.get("window");

  // init app screen
const ProfileScreen = ({navigation}) => {

  //GET FROM STORE
  const userData = useSelector((state) => state.user.userData)

  const [errorMessage, setErrorMessage] = useState(null);
  const [company, setCompany] = useState('');
  const [department, setDepartment] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false)



  // RUN EFFECT HOOK
    useEffect(() => {
  
    
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

      <View style={styles.vendorTitle}>
          <Text style={styles.mainTitle}>Personal Details</Text>
          <Image source={icons.user} 
            style={{
              height: 15, width: 15, marginLeft:7, tintColor: COLORS.darkGray, resizeMode: 'contain'
            }}
          />
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
        label="Phone:"
        icon={icons.user}
        value={userData.phone}
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
        label="Company:"
        icon={icons.user}
        value={userData.company}
        />
        <CustomInput 
        label="Department:"
        icon={icons.user}
        value={userData.department}
        />

        <View style={{height:20}}></View>
        </View>

        <View style={{ marginHorizontal:25}}>
          <Button title="Update Profile"
          icon={icons.check_yes} />

          <TouchableOpacity style={styles.mainLogout}>
              <Text style={styles.mainLogoutText}>Log Out</Text>
              <Image source={icons.logout} 
                style={{
                  height:20, width: 20, resizeMode: 'contain', tintColor: COLORS.white
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

     {/* Render Header */}
     {renderHeaderContent()}


     {/* Render Body */}
     {renderBodyContent()}
    
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainLogoutText: {
    fontSize: 14,
    fontFamily: "Benton Sans",
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
    fontFamily: "Benton Sans",
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
    fontFamily: "Benton Sans",
    color: COLORS.StatureBlue,
    fontWeight: 'normal', 
    lineHeight: 20
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
    paddingVertical:20
  },
  business : {
    fontSize: 14,
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

export default ProfileScreen;