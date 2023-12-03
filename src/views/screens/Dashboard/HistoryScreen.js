import React, {useState} from 'react';
import {  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  Image, 
  TouchableOpacity} from 'react-native';
  import { COLORS, icons, images, verticalScale, horizontalScale, moderateScale } from '../../../constants';
  import { HeaderBar, OrderFacilityItem } from '../../components';

  const { width, height } = Dimensions.get("window");


  // init app screen
const HistoryScreen = ({navigation}) => {

  const [orderAvailabe, setOrderAvailable] = useState(true);

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
          <Text style={styles.titleName}>See Your History</Text>

          <View style={styles.detailsBox}>
          <View style={styles.officeDetails}>
            <Image source={icons.history} style={{
              height: 21, width: 21, resizeMode: 'contain',
              tintColor: COLORS.gentleBlue, marginRight: 3,
            }} />
            <Text style={styles.business}>VIEW ORDER AND BOOKING HISTORY</Text>
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
          <Text style={styles.mainTitle}>Your Orders</Text>
          <Image source={icons.cart} 
            style={{
              height: 20, width: 20, marginLeft:7, tintColor: COLORS.darkGray, resizeMode: 'contain'
            }}
          />
      </View>
      <View style={styles.subTitleBox}>
            <Text style={styles.subTitle}>Select the facility category below to view and complete your order</Text>
      </View>

      {orderAvailabe == false &&
        
        <View style={styles.orderStatusDiv}>
           <Image 
            source={icons.info}
            style={{
              height:32, width: 32, tintColor: COLORS.gradientMiddle,
              resizeMode: 'contain'
            }}
           />
           <Text style={styles.infoText}>Sorry, you do not have any pending order for any facility</Text>
        </View>
        
      }

      <OrderFacilityItem 
          onPress={() => navigation.navigate('RestaurantOrder')}
          type="food"
          icon={icons.food} 
          title="3 Orders Pending" />

          <OrderFacilityItem 
          type="creche"
          icon={icons.kids} 
          title="3 Orders Pending" />

          <OrderFacilityItem 
          type="gym"
          icon={icons.gym} 
          title="3 Orders Pending" />
      
   
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
      marginBottom:10,
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
    fontSize: 21,
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

export default HistoryScreen;