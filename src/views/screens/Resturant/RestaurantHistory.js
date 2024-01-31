import React, {useState, useEffect} from 'react';
import {  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  Image, FlatList,
  TouchableOpacity} from 'react-native';
  import axios from 'axios';
  import { useSelector } from 'react-redux';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import { COLORS, icons, images, APIBaseUrl, ApIHeaderOptions, horizontalScale, verticalScale, moderateScale } from '../../../constants';
  import { HeaderBar, HistoryFacilityItem, 
    NewLoader, MessageBox,
    OrderHistoryItem } from '../../components';
  import {utilities } from '../../../constants';

  const { width, height } = Dimensions.get("window");


  // init app screen
const RestaurantHistory = ({navigation}) => {

  const token = useSelector((state) => state.user.idtkn)

  //GET FROM STORE
  const userData = useSelector((state) => state.user.userData)

  const [pendingStatus, setPendingStatus] = useState(true);
  const [completedStatus, setCompletedStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [filteredOrderData, setFilteredOrderData] = useState('');
  const [orderStatus, setOrderStatus] = useState('False')

  // function to set 
  const LoadPendingOrders = () => {
    setCompletedStatus(false)
    setPendingStatus(true)
    LoadPendingRestaurantOrder("False")
  }

  const LoadCompletedOrders = () => {
    setPendingStatus(false)
    setCompletedStatus(true)
    LoadPendingRestaurantOrder("True")
  }

  // function to load providers
  const LoadPendingRestaurantOrder = (status) => {

    //show loader
    setIsLoading(true);

    const data = {
        orderNo : "",
        userID : userData.userID
    }

    axios.post(APIBaseUrl.developmentUrl + 'orders/order/FetchRestaurantOrders', data, {
      headers: {
        'JWTToken': token
      }
    })
    .then(response => {

      setIsLoading(false)

        if(response.data.errorCode == '000') {

             //set data
             //setOrderData(response.data.restaurantOrders)

             let filteredData = [];

             if(status == "False") {

                for (let i= 0; i < response.data.restaurantOrders.length; i++) {
                    if (response.data.restaurantOrders[i].isTreated == "False") {
                        filteredData = [...filteredData, response.data.restaurantOrders[i]];
                  }
                }

             }else if(status == "True") {

                for (let i= 0; i < response.data.restaurantOrders.length; i++) {
                    if (response.data.restaurantOrders[i].isTreated == "True") {
                        filteredData = [...filteredData, response.data.restaurantOrders[i]];
                  }
                }

             }

             setFilteredOrderData(filteredData);


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
      setIsLoading(false)
      console.log(error);
    });

  }
// end of function

   //USE EFFECT
   useEffect(() => {
    
    console.log(userData.userID)

    //Validate user profile update
    LoadPendingRestaurantOrder(orderStatus);

}, []);

//empty function 
const DisplayNoDataComponent = () => {
    return (
        <View style={styles.orderStatusDiv}>
        <Image 
         source={icons.info}
         style={{
           height:32, width: 32, tintColor: COLORS.WarningTextColor,
           resizeMode: 'contain'
         }}
        />
        <Text style={styles.infoText}>Sorry, you do not have any pending order for any facility</Text>
     </View>
    )
}
//end of function


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
          <Text style={styles.titleName}>Restaurant Orders</Text>

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

      {/* START OF ORDERS */}
    
    <View
        style={styles.orderTab}
    >

        <TouchableOpacity 
            onPress={() => LoadPendingOrders()}
        style={(pendingStatus) ? styles.orderTabBtnActive : styles.orderTabBtnNotActive}>
        <View style={styles.orderBtn}>
            <Text style={(pendingStatus) ? styles.tabTextActive : styles.tabTextNotActive}>Pending</Text>
            <Image source={icons.pending} 
                style={{
                    height:15, width: 15, marginLeft: 7,
                    resizeMode: 'contain', tintColor: COLORS.StandardardBankBlue
                }}
            />
        </View>
        </TouchableOpacity>

        <TouchableOpacity 
            onPress={() => LoadCompletedOrders()}
        style={(completedStatus) ? styles.orderTabBtnActive : styles.orderTabBtnNotActive}>
        <View style={styles.orderBtn}>
            <Text style={(completedStatus) ? styles.tabTextActive : styles.tabTextNotActive}>Complete</Text>
            <Image source={icons.order_success} 
                    style={{
                        height:15, width: 15, marginLeft: 7,
                        resizeMode: 'contain', tintColor: COLORS.StandardardBankBlue
                    }}
                />
        </View>
    </TouchableOpacity>
    
    </View>

      <View style={styles.listBody}>

      <FlatList 
      data={filteredOrderData}
      ListEmptyComponent={DisplayNoDataComponent}
      keyboardDismissMode="on-drag"
      keyExtractor={item => `${item.orderID}`} 
      showsVerticalScrollIndicator={false}
      renderItem={
          ({ item }) => {
              return (
                <OrderHistoryItem 
                status={(item.isTreated == "True") ? 1 : 0} 
                orderNo={item.orderNo}
                orderDate={utilities.formatDateInMinutes(item.creationDate)}
                message={(item.isTreated == "True") ? "Completed" : "Pending"} />
              )
          }
      }
    /> 


      {/*

       <OrderHistoryItem status="pending" message="Pending" />
       <OrderHistoryItem status="success" message="Completed"/>
       <OrderHistoryItem status="pending" message="Pending" />
       <OrderHistoryItem status="success" message="Completed"/>
       <OrderHistoryItem status="pending" message="Pending" />

    */}
      </View>


      
   
        {/* END OF ORDERS */}
      
      </View>
    )
  }

  // return function
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" />

    {isLoading && 
        <NewLoader title="Processing your booking request, please wait..." />
      }

     {/* Render Header */}
     {renderHeaderContent()}


     {/* Render Body */}
     {renderBodyContent()}
    
    
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
    listBody: {
        marginHorizontal: 20,
        marginTop: 15
    },
    activeTab: {
        backgroundColor: COLORS.TabGray,
    },
    tabTextActive: {
        fontSize: 14,
        fontFamily: "Benton Sans",
        color: COLORS.StandardardBankBlue,
        fontWeight: 'bold', 
    },

    tabTextNotActive: {
        fontSize: 14,
        fontFamily: "Benton Sans",
        color: COLORS.StandardardBankBlue,
        fontWeight: 'bold', 
    },
    orderBtn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    orderTabBtnActive: {
        backgroundColor: COLORS.InfoAlertbg,
        width: '50%',
        alignItems: 'center',
        paddingVertical: 12,
        borderTopLeftRadius:10,
        borderTopRightRadius: 10,
    },
    orderTabBtnNotActive: {
        backgroundColor: COLORS.TabGray,
        width: '50%',
        alignItems: 'center',
        paddingVertical: 12,
        borderTopLeftRadius:10,
        borderTopRightRadius: 10,
    },
    orderTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 25,
        marginTop: 20,
    },
  infoText: {
    fontSize: 13,
    fontFamily: "Benton Sans",
    color: COLORS.StatureBlue,
    fontWeight: 'normal', 
    lineHeight: 20,
    width: horizontalScale(250)
  },
  orderStatusDiv: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.WarningBorder,
    backgroundColor: COLORS.Warningbg,
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
    fontSize: 13,
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
    marginTop: Platform.OS === 'ios' ? wp(-15) : null,
    paddingTop: Platform.OS === 'ios' ? wp(4.5) : null
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
  }
})

export default RestaurantHistory;