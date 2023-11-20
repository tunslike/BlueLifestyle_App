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
  import { HeaderBar, OrderItem, ToggleButton } from '../../components';

  const { width, height } = Dimensions.get("window");


  // init app screen
const OrderScreen = ({navigation}) => {

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
          <Text style={styles.titleName}>Complete Your Order!</Text>

          <View style={styles.detailsBox}>
          <View style={styles.officeDetails}>
            <Image source={icons.basket} style={{
              height: 21, width: 21, resizeMode: 'contain',
              tintColor: COLORS.gentleBlue, marginRight: 3,
            }} />
            <Text style={styles.business}>ORDER BASKET</Text>
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
          <Text style={styles.mainTitle}>Your Order</Text>
          <Image source={icons.cart} 
            style={{
              height: 20, width: 20, marginLeft:7, tintColor: COLORS.darkGray, resizeMode: 'contain'
            }}
          />
      </View>

      <View style={styles.cartBox}>
        <OrderItem 
            name="Rice, Moi-moi and Beef"
            details="Rice, moi-moi and stew and cooked beef plus one bottle"
            price="5,500.00"
            image={images.moimoi_rice}
        />

        <OrderItem 
        name="Amala and Efo Riro"
        details="Rice, moi-moi and stew and cooked beef plus one bottle"
        price="2,050.00"
        image={images.amala}
    />

    <OrderItem 
    name="Bonlogesse Sphagetti"
    details="Rice, moi-moi and stew and cooked beef plus one bottle"
    price="3,000.00"
    image={images.indoomie_pic}
/>
      </View>
   

      <View style={styles.paymentTitle}>
          <Text style={styles.mainTitle}>Delivery Method</Text>
          <Image source={icons.delivery} 
            style={{
              height: 25, width: 25, marginLeft:7, tintColor: COLORS.darkGray, resizeMode: 'contain'
            }}
          />
      </View>
      
      <ToggleButton />

      
      <View style={styles.summaryTitle}>
          <Text style={styles.mainTitle}>Summary</Text>
          <Image source={icons.cash} 
            style={{
              height: 25, width: 25, marginLeft:7, tintColor: COLORS.darkGray, resizeMode: 'contain'
            }}
          />
      </View>  
    

{/* SUMMARY FIELD */}
<View style={styles.summaryWindow}>
    <View style={styles.summaryTextDiv}>
        <Text style={styles.summaryText}>Total Order</Text>
        <Text style={styles.summaryText}>₦ 9,040.00</Text>
    </View>
    


    <TouchableOpacity 
      style={styles.placeOrderbtn}>
          <Text style={styles.loginText}>Complete your Order</Text>
          <Image source={icons.check_yes}
            style={{height:24, width: 24    ,
            tintColor: COLORS.white, resizeMode: 'contain'}}
          />
    </TouchableOpacity>
</View>
{/* END OF SUMMARY FIELD
 */}

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
  summaryText: {
    fontSize: 16,
    fontFamily: "Benton Sans",
    color: COLORS.StandardardBankBlue,
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: 17,
    fontFamily: "Benton Sans",
    color: COLORS.white,
    fontWeight: 'bold',
    marginRight:10
  },
  placeOrderbtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.SecondaryGreen ,
    borderRadius:10,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginTop:40,
  },
  summaryTextDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryWindow: {
    backgroundColor: '#ededed',
    padding:25,
    marginBottom: 50,
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

export default OrderScreen;