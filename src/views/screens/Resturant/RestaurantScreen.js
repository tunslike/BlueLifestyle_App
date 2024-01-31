import React, {useEffect, useContext, useState} from 'react';
import {  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  Image, Alert,
  FlatList} from 'react-native';
  import axios from 'axios';
  import { useSelector } from 'react-redux';
  import { AuthContext } from '../../../context/AuthContext';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import { COLORS, icons, images, APIBaseUrl, ApplicationName, ApIHeaderOptions } from '../../../constants';
  import { HeaderBar, ProviderCard, NewLoader } from '../../components';
  const { width, height } = Dimensions.get("window");


  // init app screen
const RestaurantScreen = ({navigation}) => {

  const token = useSelector((state) => state.user.idtkn)

  const { ExitAuthenticatedUser} = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false)
  const [providers, setProviders] = useState('');

// function to load providers
  const FetchProviders = () => {

    //show loader
    setIsLoading(true);

    console.log('Posting with this token:' + token)

    axios.post(APIBaseUrl.developmentUrl + 'services/Providers/FetchRestaurantProviders',{},{
      headers: {
        'JWTToken': token
      }
    })
    .then(response => {

      setIsLoading(false)

        if(response.data.errorCode == '000') {

             //set data
             setProviders(response.data.restaurantProviderData)
             console.log(providers)

        }else {

            console.log(response.data.statusMessage)
        
            if(response.data.statusMessage.includes("failed")) {
              Alert.alert(ApplicationName.AppName, 'Session Expired! Please login again')
              ExitAuthenticatedUser();
           }

            //set loading off
            setIsLoading(false)

            return;
        }
    })
    .catch(error => {
      console.log(error);
    });

  }
// end of function

//USE EFFECT
      useEffect(() => {

        //fetch providers
        FetchProviders();

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
          <Text style={styles.titleName}>Order, Savour, Repeat!</Text>

          <View style={styles.detailsBox}>
          <View style={styles.officeDetails}>
            <Image source={icons.food} style={{
              height: 21, width: 21, resizeMode: 'contain',
              tintColor: COLORS.gentleBlue, marginRight: 3,
            }} />
            <Text style={styles.business}>RESTAURANT</Text>
          </View>
            <View style={styles.officeDetails}>
              <Image source={icons.people} style={{
                height: 21, width: 21, resizeMode: 'contain',
                tintColor: COLORS.gentleBlue
              }} />
              <Text style={styles.business}>20</Text>
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
    
      {/* START OF RENDER PROVIDERS */}

      <View style={styles.vendorTitle}>
          <Text style={styles.mainTitle}>Today's Vendor</Text>
          <Image source={icons.vendor} 
            style={{
              height: 15, width: 15, marginLeft:7, tintColor: COLORS.darkGray, resizeMode: 'contain'
            }}
          />
      </View>

        <View style={styles.providerList}>

        <FlatList 
        data={providers}
        keyboardDismissMode="on-drag"
        keyExtractor={item => `${item.provider_id}`} 
        showsVerticalScrollIndicator={false}
        renderItem={
            ({ item }) => {
                return (
                  <ProviderCard
                  image={images.kitchen_bg2}
                  name={item.provider_name}
                  onPress={() => navigation.navigate('Provider', {providerID: item.provider_id, providerName: item.provider_name})}
                />   
                )
            }
        }
    />   
        </View>

        {/* END OF RENDER PROVIDERS */}

        {/* START OF RENDER ORDER HISTORY */}
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
        {isLoading && 
          <NewLoader title="Processing your request, please wait..." />
        }
    <StatusBar barStyle="light-content" />

     {/* Render Header */}
     {renderHeaderContent()}


     {/* Render Body */}
     {renderBodyContent()}
    
    
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
      marginBottom:20
  },
  providerList: {
 paddingHorizontal:10
  },
  detailsBox : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }, 
  mainTitle: {
    fontSize: 19,
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

export default RestaurantScreen;