import React, {useState, useEffect} from 'react';
import {  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  Image, 
  FlatList
  } from 'react-native';
  import axios from 'axios';
  import { COLORS, icons, images } from '../../../constants';
  import { HeaderBar, CrecheCard, NewLoader } from '../../components';
  import { APIBaseUrl, ApIHeaderOptions } from '../../../constants';

  const { width, height } = Dimensions.get("window");


  // init app screen
const CrecheScreen = ({navigation}) => {

  const [loader, setLoader] = useState(false)
  const [crecheData, setCrecheData] = useState('');


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

  //USE EFFECT
useEffect(() => {

  //fetch providers
  //FetchProviders();

  FetchCrecheProviders();

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
          <Text style={styles.mainTitle}>Available Sessions</Text>
          <Image source={icons.kids} 
            style={{
              height: 20, width: 20, marginLeft:7, tintColor: COLORS.darkGray, resizeMode: 'contain'
            }}
          />
      </View>
      
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
                  onPress={() => navigation.navigate('CrecheProvider', { providerId: item.crecheServiceId, startTime: item.crecheSessionName,
                                                    capacity: item.crecheSessionCapacity, teacher: item.crecheTeacherName,
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
    titleDesc: {
        color: COLORS.white,
        fontSize: 13,
        fontFamily: "Benton Sans",
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

export default CrecheScreen;