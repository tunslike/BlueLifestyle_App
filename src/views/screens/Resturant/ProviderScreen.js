import React, {useEffect, useState, useContext} from 'react';
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
        FlatList,
        Platform,
        Alert
 } from 'react-native';
 import axios from 'axios';
 import { useDispatch } from 'react-redux';
 import { AuthContext } from '../../../context/AuthContext';
 import { SafeAreaProvider } from 'react-native-safe-area-context';
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 import { useSelector } from 'react-redux';
 import { COLORS, icons, images, ApplicationName, utilities, APIBaseUrl } from '../../../constants';
 import { HeaderBarBlank, 
          ProviderFeature, 
          MenuItemHeader,
          MenuItem,
          NewLoader,
          AddToCartButton
        } from '../../components';
import { updateProviderID } from '../../../store/OrderSlice';

 const { width, height } = Dimensions.get("window");


// INIT APP
const ProviderScreen = ({route, navigation}) => {

  const {providerID, providerName} = route.params
  const dispatch = useDispatch();

  const { ExitAuthenticatedUser} = useContext(AuthContext);

  const cartItem = useSelector((state) => state.order.cart.length)
  const token = useSelector((state) => state.user.idtkn)

  const [loader, setLoader] = useState(false)
  const [menuItem, setMenuItem] = useState('');
  const [userToken, setUserToken] = useState(null);

  // FUNCTION TO LOAD RESTURANT MENUS
  const FetchRestaurantMenus = () => {

    console.log('*****************//////////////////*****************')
    console.log('Fetching Resturant Data')
    console.log('*****************//////////////////*****************')

     //show loader
     setLoader(true);

     const data = {
      "providerId":providerID
     }

     console.log('Posting with this token' + token)

     axios.post(APIBaseUrl.developmentUrl + 'services/Service/FetchRestaurantMenu', data, {
      headers: {
        'JWTToken': token
      }
    })
     .then(response => {
 
      setLoader(false)
 
         if(response.data.errorCode == '000') {
 
              //set data
              setMenuItem(response.data.restaurantServiceData)
 
         }else {
 
             console.log(response.data.statusMessage)
         
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

  //function to return base 64 image
  const convertToBase64 = (ext, data) => {

    var base64Image = `data:image/jpeg;base64,${data}`;

    console.log(base64Image);

  }
  // end of function

//USE EFFECT
useEffect(() => {


  console.log(providerID)
  //update prodivder Data
   dispatch(updateProviderID(providerID))
  //FetchProviders();
  console.log('No of items is ' + cartItem)

  FetchRestaurantMenus();

}, []);

  // FUNCTION TO RENDER HEADER
    function renderHeaderContent() {
      return (
        <ImageBackground
        source={images.kitchen_bg2}
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

  const bottomComponent = () => {
    return (
      <View style={{marginTop: 30, alignSelf: 'center'}}>
      {cartItem > 0 &&
        <AddToCartButton onPress={() => navigation.navigate("RestaurantOrder")} title="Complete your order" icon={icons.basket} />
        }
      </View>  
    )
  }

  // FUNCTION TO RENDER BODY CONTENT
    function renderBodyContent() {
      return (
          <View style={styles.bodyContainer}>
              <View
                style={styles.vendorBox}
              >
                <Text style={styles.vendorTileName}>{providerName}</Text>
                
                <View style={styles.vendorFeatures}>
                    <ProviderFeature
                      title="Like"
                      icon={icons.thumbs_up}
                    />
                    <ProviderFeature
                      title="20-30mins"
                      icon={icons.watch}
                    />
                    <ProviderFeature
                      title="Feedback"
                      icon={icons.feedback}
                    />
                </View>

                {cartItem > 0 &&
                <View style={{

                  alignSelf: 'center',
                  marginTop: 25,
                  marginBottom:15
                  
                }}>
               
                  <AddToCartButton onPress={() => navigation.navigate("RestaurantOrder")} count={cartItem} title="Complete your order" icon={icons.basket} />
                
                </View>
              }
      </View>
          
                {/* Load body for menu items */}

                <View style={styles.menuListView}>

                    <MenuItemHeader title="Main Meal" />

                    <FlatList 
                    data={menuItem}
                    keyboardDismissMode="on-drag"
                    keyExtractor={item => `${item.menuID}`} 
                    showsVerticalScrollIndicator={true}
                    ListFooterComponent={bottomComponent}
                    renderItem={
                        ({ item }) => {
                            return (
                              <MenuItem 
                              onPress={() => navigation.navigate('OrderMenuItem', {provider_id:providerID, menuID: item.menuID, 
                                foodName:item.food_Name, description: item.food_Description, amount: item.food_Price, 
                                image: { uri: `data:image/jpeg;base64,${item.menu_data}`} })}
                              name={item.food_Name}
                              details={item.food_Description}
                              price={utilities.formatToCurency(Number(item.food_Price))}
                              image={{ uri: `data:image/jpeg;base64,${item.menu_data}`}}
                            />
                            )
                        }
                    }
                />   
                {/*
                    <MenuItem 
                      onPress={() => navigation.navigate('OrderMenuItem')}
                      name="Spicy Native Sauce"
                      details="Indomie noodles cooked in Spicy sauce with Ofada"
                      price="2,500.00"
                      image={images.native_rice}
                    />

                    <MenuItem 
                      onPress={() => navigation.navigate('OrderMenuItem')}
                      name="Asian Beef Noodles"
                      details="Special mix of vegatables & dryfish cooked with indoomie"
                      price="4,000.00"
                      image={images.indoomie_pic}
                    />

                    <MenuItem 
                      onPress={() => navigation.navigate('OrderMenuItem')}
                      name="Rice, Moi-moi and Beef"
                      details="Rice, moi-moi and stew and cooked beef plus one bottle"
                      price="3,000.00"
                      image={images.moimoi_rice}
                    />

                    <MenuItem 
                      onPress={() => navigation.navigate('OrderMenuItem')}
                      name="Amala Swallo Complete"
                      details="two wraps of amala, efo-riro and goat meats plus one drink"
                      price="3,500.00"
                      image={images.amala}
                  /> */}

                  
                </View>

                {/* End of Load body for menu items */}
          </View>
      )
    }
  return (
    <SafeAreaProvider style={styles.container}>
    <StatusBar barStyle="light-content" />
    {loader && 
      <NewLoader title="Processing your request, please wait..." />
    }


         {/* Render Header */}
         {renderHeaderContent()}

               {/* Render Body */}  
              {renderBodyContent()}


    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
 
  menuListView: {
    borderTopColor: COLORS.lineDividerGray,
    borderTopWidth: 1,
    width,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical:20,
    borderTopStyle: 'solid',
    marginBottom: 100
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
    marginVertical:10
  },
  vendorDesc: {
    fontSize:14,
    fontFamily: "Roboto",
    color: COLORS.darkGray,
    fontWeight: 'normal',
    marginVertical: 2,
    lineHeight:20,
  },
  vendorTileName : {
    fontSize: 20,
    fontFamily: "Roboto",
    color: COLORS.StatureBlue,
    fontWeight: 'bold',
  },
  vendorBox: {
    marginVertical: 5,
    marginHorizontal: 20,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: "Roboto",
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
    height:200,
    width
  },
  container: {
    flex: 1
  }
})

export default ProviderScreen;