import React, {useState, useEffect} from 'react';
import {  
    StyleSheet, 
    Text, 
    View,
    SafeAreaView,
    ScrollView,
    Dimensions,
    StatusBar,
    Image, 
    TouchableOpacity,
    FlatList,
    Alert, Platform
} from 'react-native';
import axios from 'axios';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import { COLORS, icons, images, utilities,
          ApIHeaderOptions, APIBaseUrl, ApplicationNam, FacilityIDs } from '../../../constants';
  import { HeaderBar, OrderItem, ToggleButton, NewLoader, MessageBox } from '../../components';
  import { useSelector } from 'react-redux';
  import { useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../../../store/OrderSlice';

  const { width, height } = Dimensions.get("window");

  // init app screen
 const RestaurantOrderScreen = ({navigation}) => {
  
  const cart = useSelector((state) => state.order.cart)
  const cartItem = useSelector((state) => state.order.cart.length)
  const userData = useSelector((state) => state.user.userData)
  const providerID = useSelector((state) => state.order.providerID)
  const token = useSelector((state) => state.user.idtkn)


  const dispatch = useDispatch();

  const [delivery, setDelivery] = useState(null);
  const [totalOrder, setTotalOrder] = useState(0);

  const [showMessage, setShowMessage] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);
  const [activeToggle, setActiveToggle] = useState(1)

  const deliveryMethod = (data) => {
    setDelivery(data)
}

const calculateTotalOrder = () => {
  let totalPrice = 0;

  cart.forEach(function (item) {
    totalPrice = totalPrice + (item.amount * item.quantity)
  })

  setTotalOrder(totalPrice)
}

const clearCartItems = () => {

  Alert.alert('Blue Lifestyle Restaurant', 'Do you want to clear your orders?', [
    {
      text: 'No',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'Yes', onPress: () => executeClearCartItems()},
  ]);

}

const executeClearCartItems = () => {
     // push cart to store
     dispatch(clearCart())
     setTotalOrder(0)
    
     Alert.alert('Blue Lifestyle Restaurant', 'Your orders have been cleared!')
}

const removeItemFromCart = (menuId) => {

  Alert.alert('Blue Lifestyle Order', 'Do you to remove this item?', [
    {
      text: 'No',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'Yes', onPress: () => executeRemoveOrderCart(menuId)},
  ]);

}

const executeRemoveOrderCart = (menuId) => {

    // push cart to store
    dispatch(removeFromCart(menuId))

    console.log(cart)

    //show notification
    setShowMessage(1);

    setTimeout(hideNotificationMessage, 3000);

}

//functiont to turn of message
const hideNotificationMessage = () => {
  setShowMessage(0);
}


// FUNCTION TO COMPLETE RESTAURANT ORDER
const CompleteRestaurantOrder = () => {

  if(cart == null || cart.length == 0) {
    Alert.alert('Order is empty, unable to complete order')
    return;
  }

  Alert.alert('Blue Lifestyle Restaurant', 'Do you want to submit your order?', [
    {
      text: 'No',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'Yes', onPress: () => RequestRestaurantBooking()},
  ]);

}
// END OF FUNCTION

const RequestRestaurantBooking = () => {

  try {
    const data = {
      "userID": userData.userID,
      "entity": 1,
      "contactNumber": userData.phone,
      "deliveryType": "Eat-In",
      "facilityID": FacilityIDs.RestaurantFacilityID,
      "providerID": providerID,
      "orderDetails": cart
    }

      setIsLoading(true)

      console.log('********************* Booking Restaurant Session ***********************')
      console.log('Posting with the toke :-' + token);
      console.log(data)

      axios.post(APIBaseUrl.developmentUrl + 'orders/order/CreateRestaurant', data, {
        headers: {
          'JWTToken': token
        }
      })
      .then(response => {
  
        setIsLoading(false)
  
          if(response.data.errorCode == '000') {
  
               //set data
               console.log(response.data)

               // push cart to store
               dispatch(clearCart())

               //show success
               navigation.navigate('RestaurantComplete', {message:response.data.statusMessage, orderNumber: response.data.orderNo})
  
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
        console.log(error);
      });
    
  } catch (error) {
    setIsLoading(false)
    console.log(error)
  }
}

//USE EFFECT
useEffect(() => {

  calculateTotalOrder();

  //fetch providers
  console.log(cart)

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
  
  const CartBottomComponent = () => {
    return (
  
      <View>

          {/* Delivery Mothod */}
          {/*
            <View style={styles.paymentTitle}>
            <Text style={styles.mainTitle}>Delivery Method</Text>
            <Image source={icons.delivery} 
              style={{
                height: 25, width: 25, marginLeft:7, tintColor: COLORS.darkGray, resizeMode: 'contain'
              }}
            />
          </View>
            */}

    {/* DELIVERY TOGGLE CONTAINER */}
    {/*
    <View style={styles.toggleContainer}>
    <TouchableOpacity 
      onPress={() => setActiveToggle(1)}
    style={[styles.togglebtnLeft, {backgroundColor: (activeToggle == 1) ? COLORS.SecondaryGreen : COLORS.lineDividerGray}]}>
          <Image source={icons.eatIn} 
          style={{
              marginLeft:35,marginRight:5,height:14, width: 14, 
              resizeMode: 'contain', tintColor: (activeToggle == 1) ? COLORS.white : COLORS.StatureBlue
          }}
      />
      <Text style={[styles.toggleTextLeft, {color: (activeToggle == 1) ? COLORS.white : COLORS.StatureBlue}]}>Take Out</Text>
     
      
    </TouchableOpacity>
    <TouchableOpacity 
      onPress={() => setActiveToggle(2)}
      style={[styles.togglebtnRight, {backgroundColor: (activeToggle == 2) ? COLORS.SecondaryGreen : COLORS.lineDividerGray}]}>
    <Image source={icons.takeout} 
    style={{
     marginLeft:35, marginRight:5,height:18, width: 18, 
     resizeMode: 'contain', tintColor: (activeToggle == 2) ? COLORS.white : COLORS.StatureBlue
    }}
/>
       <Text style={[styles.toggleTextRight, {color: (activeToggle == 2) ? COLORS.white : COLORS.StatureBlue}]}>Eat-In</Text>
    </TouchableOpacity>
  </View>
  */}
    {/* END OF DELIVERY TOGGLE CONTAINER */}

        
            {/*<ToggleButton deliveryMethod={deliveryMethod} />*/}

        {/* End of Delivery Mothod */}

         {/* ORDER SUMMARY */}

                    <View style={styles.summaryTitle}>
                    <Text style={styles.mainTitle}>Summary</Text>
                    <Image source={icons.cash} 
                      style={{
                        height: 25, width: 25, marginLeft:7, tintColor: COLORS.darkGray, resizeMode: 'contain'
                      }}
                    />
                </View>  
              
            <View style={styles.summaryWindow}>
              <View style={styles.summaryTextDiv}>
                  <Text style={styles.summaryText}>Total Payment</Text>
                  <Text style={styles.summaryText}>₦ {utilities.formatToCurency(Number(totalOrder))}</Text>
              </View>
            
              <TouchableOpacity
              onPress={() => CompleteRestaurantOrder()} 
                style={styles.placeOrderbtn}>
                    <Text style={styles.loginText}>Complete your Order</Text>
                    <Image source={icons.check_yes}
                      style={{height:25, width: 25,
                      tintColor: COLORS.white, resizeMode: 'contain'}}
                    />
              </TouchableOpacity>
            </View>


         {/* END OF ORDER SUMMARY */}

      </View>
    )
  }

  // function to render body
  function renderBodyContent() {
    return (
      <View style={styles.bodyContainer}>


      {/* START OF ORDERS */}
      <View
            style={{
              flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
              paddingRight: 17
            }}>
            <View style={styles.vendorTitle}>
            <Text style={styles.mainTitle}>Your Order</Text>
            <View style={styles.counter}>
              <Text style={styles.textCounter}>{cartItem} Items</Text>
            </View>
            <Image source={icons.cart} 
              style={{
                height: 15, width: 15, marginTop:2, tintColor: COLORS.darkGray, resizeMode: 'contain'
              }}
            />
            </View>

            <TouchableOpacity style={styles.clearBtn}
              onPress={() => clearCartItems()}
            >
              <Text style={styles.clearTxt}>Clear Order</Text>
              <Image source={icons.check_no} 
                style={{
                  height:13, width: 13, tintColor: COLORS.SecondaryPlum, resizeMode: 'contain', 
                  marginLeft: 3, marginTop:2
                }}
              />
            </TouchableOpacity>
    </View>

    {cart.length == 0 &&
      <View style={styles.noCartBox}>
      <Image source={icons.info} style={{
        width:15, height: 15, tintColor: COLORS.WarningTextColor, resizeMode: 'contain'
      }} />
       <Text style={styles.noCartTxt}>No items in your order!</Text>
      </View>
    }


    <View style={styles.cartBox}>

      <FlatList 
      data={cart}
      keyboardDismissMode="on-drag"
      keyExtractor={item => `${item.menuID}`} 
      showsVerticalScrollIndicator={false}
      renderItem={
          ({ item }) => {
              return (
                <OrderItem 
                  onPressRemove={() => removeItemFromCart(item.menuID)}
                  type={2}
                  name={item.menuName}
                  details=""
                  price={utilities.formatToCurency(Number(item.amount)) + " x " + item.quantity}
                  image={images.blank_food}
                />
              )
          }
      }
      ListFooterComponent={<CartBottomComponent />}
      
    /> 

      {/*
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
          */}
</View>
      
    

      
      </View>
    )
  }

  // return function
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" />

    {isLoading && 
      <NewLoader title="Processing your order request, please wait..." />
    }
  
    {errorMessage &&
      <MessageBox status="error" message={errorMessage} />
    }

     {/* Render Header */}
     {renderHeaderContent()}


     {/* Render Body */}
     {renderBodyContent()}
    
    
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
  textCounter: {
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: 'bold',
    color: COLORS.StatureBlue,
  },
  counter: {
      borderRadius: 20,
      borderColor: COLORS.StatureBlue,
      borderWidth: 1,
      borderStyle: 'solid',
      paddingVertical: 1,
      paddingHorizontal: 7,
      marginHorizontal:7,
      marginTop:2
  },
  noCartBox: {
    marginHorizontal:20,
    padding:10,
    paddingLeft:20,
    borderRadius: 25,
    borderColor: COLORS.WarningBorder,
    borderStyle: 'dashed',
    borderWidth:1,
    backgroundColor: COLORS.Warningbg,
    marginTop:20,
    minHeight:100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: 10
  },
  noCartTxt: {
    fontSize: 14,
    fontFamily: "Roboto",
    fontWeight: 'normal',
    color: COLORS.WarningTextColor,
  },
  toggleContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal:20,
    marginTop:13,
    marginBottom:19,
    
},
togglebtnRight : {
    padding: 15,
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
    backgroundColor: COLORS.lineDividerGray,
    width: "50%",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
},
toggleTextLeft: {
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: "Roboto",
    color: COLORS.StandardardBankBlue,
    fontWeight: 'bold',
    color: COLORS.white,
    
},
toggleTextRight: {
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: "Roboto",
    color: COLORS.StandardardBankBlue,
    fontWeight: 'bold',
    color: COLORS.StatureBlue,
},
togglebtnLeft : {
    width: "50%",
    padding: 15,
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
    backgroundColor: COLORS.SecondaryGreen,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
},
  cartBox: {
    minHeight: 300
  },
  clearBtn: {
      borderColor: COLORS.SecondaryPlum,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 15,
      paddingHorizontal: 6,
      paddingVertical: 4,
      marginTop:8,
      flexDirection: 'row',
      justifyContent: 'flex-start', 
      alignItems: 'center'
  },
  clearTxt: {
    fontSize: 12,
    fontFamily: "Roboto",
    color: COLORS.SecondaryPlum,
    fontWeight: 'normal',
  },
  summaryText: {
    fontSize: 17,
    fontFamily: "Roboto",
    color: COLORS.StandardardBankBlue,
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: 17,
    fontFamily: "Roboto",
    color: COLORS.white,
    fontWeight: 'bold',
    marginRight:10
  },
  placeOrderbtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.SecondaryGreen ,
    borderRadius:15,
    paddingVertical: 14,
    marginHorizontal:25,
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
      marginBottom:10,
      marginTop:10,
  },

  summaryTitle : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop:25,
    marginBottom:10
},

  paymentTitle : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop:30,
},
  providerList: {

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
    paddingVertical:20
  },
  business : {
    fontSize: 14,
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

export default RestaurantOrderScreen;