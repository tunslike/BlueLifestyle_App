import React, {useState, useEffect, useContext} from 'react';
import {  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  Image, 
  FlatList, Alert
  } from 'react-native';
  import axios from 'axios';
  import { AuthContext } from '../../../context/AuthContext';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import { useSelector } from 'react-redux';
  import { COLORS, icons, images } from '../../../constants';
  import { HeaderBar, CrecheCard, NewLoader } from '../../components';
  import { APIBaseUrl, ApplicationName, ApIHeaderOptions, verticalScale, horizontalScale, moderateScale } from '../../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

  const { width, height } = Dimensions.get("window");


  // init app screen
const CrecheScreen = ({navigation}) => {

  const userData = useSelector((state) => state.user.userData)
  const token = useSelector((state) => state.user.idtkn)

  const { ExitAuthenticatedUser } = useContext(AuthContext);

  const [loader, setLoader] = useState(false)
  const [crecheData, setCrecheData] = useState('');
  const [crecheDetails, setCrecheDetails] = useState('');
  const [regData, setRegData] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(0)

  // FUNCTION TO LOAD RESTURANT MENUS
  const FetchCrecheProviders = () => {

    console.log('*****************//////////////////*****************')
    console.log('Fetching Creche Providers')
    console.log('*****************//////////////////*****************')

     //show loader
     setLoader(true);

     axios.post(APIBaseUrl.developmentUrl + 'services/service/FetchCrecheDetails', ApIHeaderOptions.headers)
     .then(response => {
 
      setLoader(false)
  
         if(response.data.errorCode == '000') {
 
              //set data
              setCrecheData(response.data.crecheServiceData)
 
         }else {
 
             console.log(response.data.statusMessage)
             //show error message
             setErrorMessage(response.data.statusMessage);

             if(response.data.statusMessage.includes("failed")) {

              Alert.alert(ApplicationName.AppName, 'Session Expired! Please login again')
              ExitAuthenticatedUser();
           }
 
             //set loading off
             setLoader(false)
 
             return;
         }
     })
     .catch(error => {
       console.log(error);
     });
   
  }
  // END OF FUNCTION

  // FUNCTION TO VALIDATE CRECHE REGISTRATION
  const ValidateCrecheRegistration = () => {

    console.log('*****************//////////////////*****************')
    console.log('Validating Creche Registrations')
    console.log('*****************//////////////////*****************')

     //show loader
     setLoader(true); 

     const data = {
      username : userData.userID
     }

     console.log(data)

     axios.post(APIBaseUrl.developmentUrl + 'accounts/Staff/ValidateCrecheUser', data, {
      headers: {
        'JWTToken': token
      }
    })
     .then(response => {
 
      setLoader(false)

      console.log(response.data)
 
         if(response.data.errorCode == '000' && response.data.crecheRegisterData != null) {
          

          if(response.data.crecheRegisterData) {
            console.log('Registration is completed already')
            setRegistrationStatus(2);
            setRegData(response.data.crecheRegisterData)
            setCrecheDetails(response.data.crecheServiceData)
          }

          return;
             
        }else if(response.data.errorCode == '001') {

          setRegistrationStatus(1);

            return
      
        }else if(response.data.errorCode == '002') {
          setRegistrationStatus(3);
          return
      
        }
        else if(response.data.errorCode == '003') {

          if(response.data.crecheRegisterData == null) {
            console.log('Registration is needed')
            setRegistrationStatus(0);
          }

           return;
        
        }else{

            if(response.data.crecheRegisterData == null) {
              console.log('Registration is needed')
              setRegistrationStatus(0);
            }
 
             return;
       }
     })
     .catch(error => {
       console.log(error);
     });
   
  }
  // END OF FUNCTION

  //USE EFFECT
useEffect(() => {

  //fetch providers
  //FetchProviders();

  //setRegistrationStatus(true)

  ValidateCrecheRegistration();

  //FetchCrecheProviders();

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
          <Text style={styles.titleName}>Care With Ease!</Text>

          <View style={styles.detailsBox}>
          <View style={styles.officeDetails}>
            <Image source={icons.kids} style={{
              height: 21, width: 21, resizeMode: 'contain',
              tintColor: COLORS.gentleBlue, marginRight: 3,
            }} />
            <Text style={styles.business}>CRECHE</Text>
          </View>
            <View style={styles.officeDetails}>
              <Image source={icons.people} style={{
                height: 21, width: 21, resizeMode: 'contain',
                tintColor: COLORS.gentleBlue
              }} />
              <Text style={styles.business}>20</Text>
            </View>
      </View> 
    
          <Text style={styles.titleDesc}>Reserve a spot for your kids now</Text>
        
        </View>
        </View>
    )
  }

  // function to render body
  function renderBodyContent() {
    return (
      <View style={styles.bodyContainer}>
      
      {/* START OF RENDER PROVIDERS */}

      <View style={styles.vendorTitle}>
          <Text style={styles.mainTitle}>Reserve a slot for your kid today </Text>
          <Image source={icons.kids} 
            style={{
              height: 20, width: 20, marginLeft:7, tintColor: COLORS.darkGray, resizeMode: 'contain'
            }}
          />
      </View>



{/* REGISTRATION BUTTON STARTS HERE */}
{(registrationStatus == 0) && 
  <TouchableOpacity
    onPress={() => navigation.navigate("CrecheRegistration")}
  >
  <View
    style={{
      marginHorizontal:20,
    }}
  >
    <Text style={styles.regNotice}>Sorry! You do not have an active registration with the creche facility. Hurry now and register to reserve a slot</Text>
  </View>
<View style={styles.container_restuarant}>
        <Image
            source={icons.kids}
            style={{
                height: 30, width: 30, resizeMode: 'contain', tintColor: COLORS.AlertGreenbg
            }}
        />
       <View style={styles.textArea}>
            <Text style={styles.txtRegister}>New Registration</Text>
    
       </View>
       <View style={styles.viewBtn}>
            <Text style={styles.btnText}>Register Now</Text>
       </View>
        </View>
</TouchableOpacity>
}

{(registrationStatus == 1) && 
  <View style={styles.pendingReview}>
  <Image source={icons.info} style={
    {
      height: 25, width: 25, marginRight: 15, resizeMode: 'contain', tintColor: COLORS.WarningTextColor
    }
  } />
    <Text style={styles.pendingtxt}>Sorry, your registration is being reviewed. Kindly contact P&C for further instructions!</Text>
  </View>
} 

{(registrationStatus == 3) && 


<View>
  <View style={styles.rejectedReg}>
  <Image source={icons.cancel} style={
    {
      height: 25, width: 25, marginRight: 15, resizeMode: 'contain', tintColor: COLORS.DangerTextColor
    }
  } />
    <Text style={styles.dangertxt}>Sorry, your registration has been declined, kindly contact P&C for further details!</Text>
  </View>

    <View>
    <TouchableOpacity
        onPress={() => navigation.navigate("CrecheRegistration")}
    >

          <View style={styles.container_restuarant}>
          <Image
              source={icons.kids}
              style={{
                  height: 30, width: 30, resizeMode: 'contain', tintColor: COLORS.AlertGreenbg
              }}
          />
        <View style={styles.textArea}>
              <Text style={styles.txtRegister}>New Registration</Text>

        </View>
        <View style={styles.viewBtn}>
              <Text style={styles.btnText}>Register Now</Text>
        </View>
          </View>

    </TouchableOpacity>
    </View>

  </View>
  
}   

{(registrationStatus == 2) && 

  <View>
  <View style={styles.isActiveStatus}>
      <Image 
        source={icons.check_yes}
        style={{
          height: 20, width: 20, marginRight:15, resizeMode: 'contain', tintColor: COLORS.AlertGreenbg
        }}
      />
      <Text style={styles.activeTxt}>You have an active creche registration! Please contact P&C for more information and instructions</Text>
  </View>

  <View
        style={{
          marginTop: 30
        }}
  >
  <CrecheCard
  rating={crecheDetails.provider_performance_ratings} 
  name="Book a Slot Now"
  image={images.creche_dash_img}
  time={crecheDetails.crecheSessionStartTime}
  slot={crecheDetails.crecheSessionCapacity}
/>
  
</View>
</View>

}


{/* REGISTRATION BUTTON STARTS HERE */}

      
        <View style={{marginHorizontal:8}}>

        <FlatList 
        data={crecheData}
        keyboardDismissMode="on-drag"
        keyExtractor={item => `${item.crecheServiceId}`} 
        showsVerticalScrollIndicator={false}
        renderItem={
            ({ item }) => {
                return (
                  <CrecheCard
                  rating={item.provider_performance_ratings} 
                  onPress={() => navigation.navigate('CrecheProvider', {facilityID: item.facilityId, providerId: item.providerId, 
                                                                          crecheSessionID: item.crecheServiceId, 
                                                    crecheSessionName: item.crecheSessionName, sessionStart: item.crecheSessionStartTime,
                                                    capacity: item.crecheSessionCapacity, teacher: item.crecheTeacherName,
                                                    crecheSessionStartTime:item.crecheSessionStartTime,
                                                    contactPhone: item.crecheTeacherContact, rating: item.provider_performance_ratings,
                                                  sessionName: item.provider_name})}
                  name={item.provider_name}
                  image={images.creche_dash_img}
                  time={item.crecheSessionStartTime}
                  slot={item.crecheSessionCapacity}
              />
                )
            }
        }
    /> 

        {/**
                <CrecheCard 
                    onPress={() => navigation.navigate('CrecheProvider')}
                    name="Kids Morning Session"
                    image={images.creche_dash_img}
                    time="8am"
                    slot="45"
                />
                <CrecheCard 
                    name="Kids Evening Session"
                    image={images.kidsCreche}
                    time="4pm"
                    slot="20"
                />
          */}
        </View>

        {/* END OF RENDER PROVIDERS */}

        {/* START OF RENDER ORDER HISTORY 
            <View style={styles.orderHistory}>
            <View style={styles.orderBox}>
                <Text style={styles.mainTitle}>Order Again?</Text>
                <Image source={icons.order_again} 
                  style={{
                    height: 18, width: 18, marginLeft:7, tintColor: COLORS.darkGray, resizeMode: 'contain'
                  }}
                />
            </View>
                <Text style={styles.orderText}>Your Order History</Text>
            </View>
        {/* END OF RENDER ORDER HISTORY */}
  
      </View>
    )
  }

  // return function
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" />

    {loader && 
      <NewLoader title="Validating registration details, please wait..." />
    }

     {/* Render Header */}
     {renderHeaderContent()}


     {/* Render Body */}
     {renderBodyContent()}
    
    
</SafeAreaView>
  )
}

const styles = StyleSheet.create({

  pendingtxt: {
    color: COLORS.WarningTextColor,
    fontFamily: "Roboto",
    fontWeight: 'bold', 
    lineHeight: 20,
    fontSize:14,
    width:'90%'
  },


  dangertxt: {
    color: COLORS.DangerTextColor,
    fontFamily: "Roboto",
    fontWeight: 'bold', 
    lineHeight: 20,
    fontSize:14,
    width:'90%'
  },

  activeTxt: {
    color: COLORS.AlertGreenbg,
    fontFamily: "Roboto",
    fontWeight: 'bold', 
    lineHeight: 20,
    fontSize:14,
    width:'90%'
  },
  isActiveStatus: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#bfe5eb',
    backgroundColor: '#d1ecf1',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  pendingReview: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.WarningBorder,
    backgroundColor: COLORS.Warningbg,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10
  },

  rejectedReg: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.DangerBorder,
    backgroundColor: COLORS.Dangerbg,
    borderRadius: moderateScale(15),
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  regNotice: {
    fontSize: moderateScale(12.5),
    fontFamily: "Roboto",
    color: COLORS.SecondaryPlum,
    fontWeight: 'normal', 
    lineHeight: 18,
  },
  btnText: {
    fontSize: moderateScale(12),
    fontFamily: "Roboto",
    color: COLORS.AlertGreenbg,
    fontWeight: 'normal', 
},
viewBtn: {
    borderRadius: 14,
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(12),
    backgroundColor: COLORS.white,
},
subTitle: {
    fontSize: moderateScale(12),
    fontFamily: "Roboto",
    color: COLORS.StatureBlue,
    fontWeight: 'normal', 
},
txtRegister: {
    fontSize: moderateScale(15.5),
    fontFamily: "Roboto",
    color: COLORS.AlertGreenbg,
    fontWeight: 'bold', 
},
textArea: {
 flex: 1,
},
container_restuarant: {
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '#bfe5eb',
  backgroundColor: '#d1ecf1',
  marginHorizontal: horizontalScale(20),
  marginTop: verticalScale(20),
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: moderateScale(15),
  borderRadius: moderateScale(15),
  columnGap: 15
  },
    titleDesc: {
        color: COLORS.white,
        fontSize: 13,
        fontFamily: "Roboto",
        fontWeight: 'normal', 
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
      marginHorizontal: 25,
      marginBottom:20,
      marginTop:10
  },
  detailsBox : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

export default CrecheScreen;