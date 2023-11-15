import React from 'react';
import {  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  Image, 
  TouchableOpacity} from 'react-native';
  import { COLORS, icons, images } from '../../../constants';
  import { HeaderBar, ProviderCard } from '../../components';

  const { width, height } = Dimensions.get("window");


  // init app screen
const RestaurantScreen = ({navigation}) => {

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
      <ScrollView style={{flex: 1}}>


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
            <ProviderCard
              image={images.kitchen_bg2}
              name="Travis Caterering Services"
              onPress={() => navigation.navigate('Provider')}
            />   
            <ProviderCard
              image={images.kitchen_bg}
              name="The Place Kitchen"
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
  providerList: {

  },
  detailsBox : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }, 
  mainTitle: {
    fontSize: 19,
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

export default RestaurantScreen;