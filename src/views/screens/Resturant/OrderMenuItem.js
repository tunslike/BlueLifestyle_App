import React, {useRef, useEffect, useState} from 'react';
import { 
        StyleSheet, 
        Text, 
        View,
        ImageBackground,
        TouchableOpacity,
        Dimensions,
        Image,
        ScrollView,
        Alert
 } from 'react-native';

 import { SafeAreaProvider } from 'react-native-safe-area-context';
 import { COLORS, icons, images, utilities, verticalScale } from '../../../constants';
 import { HeaderBarBlank, 
          AddQuantityItem,
          Button, MessageBox
        } from '../../components';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../../store/OrderSlice';

 const { width, height } = Dimensions.get("window");

// INIT APP
const OrderMenuItem = ({route, navigation}) => {

const {menuID, menuItem, description, amount, image } = route.params

const orderCart = useSelector((state) => state.order.cart);
const dispatch = useDispatch();

const [showMessage, setShowMessage] = useState(0);
const [itemCount, setItemCount] = useState(0);

const getItemCount = (data) => {
    if(!data) {
        setItemCount(Number(data))
    }
}

// function to load product details
const AddProductToCart = (product_id) => {

    // create cart object
    const cart = {
        menuID : product_id,
        quantity: itemCount,
        amount: amount
    }
    
    // push cart to store
    dispatch(addToCart(cart))

    //show notification
    setShowMessage(1);

    setTimeout(hideNotificationMessage, 3000);
}
// end of function

//functiont to turn of message
const hideNotificationMessage = () => {
    setShowMessage(0);
}

//USE EFFECT
useEffect(() => {

    //fetch providers
    console.log("Number of items in cart: " + orderCart.length)
  
  }, []);

    // FUNCTION TO RENDER HEADER FUNCTION
    function renderHeaderContent() {
        return (
            <ImageBackground
            source={image}
            style={styles.headerBg}
          >
              <HeaderBarBlank 
                onPress={() => navigation.goBack()}
                icon={icons.close}
              /></ImageBackground>
        )
    }
    // END OF FUNCTION

    // FUNCTION TO RENDER BODY
    function renderBodyContent() {
        return (
            <View style={styles.productDetails}>

                <View style={styles.header}>
                    <Image source={icons.food} 
                        style={{
                            height: 25, width: 25, 
                            resizeMode: 'contain', tintColor: COLORS.darkGray,
                            marginRight: 15
                        }}
                    />
                    <Text style={styles.productHeader}>{menuItem}</Text>
                </View>

                <View style={styles.productDesc}>
                    <Text style={styles.descText}>{description}</Text>
                </View>

                <View style={styles.priceBox}>
                <Image source={icons.cash} 
                    style={{
                        height: 25, width: 25, 
                        resizeMode: 'contain', tintColor: COLORS.darkGray,
                        marginRight: 15
                    }}
                />
                        <Text style={styles.textPrice}>₦ {utilities.formatToCurency(Number(amount))}</Text>
                    
                </View>

                <AddQuantityItem getItemCount={getItemCount} amount={amount} />

                <Button onPress={() => AddProductToCart(menuID)} title="Add to Order" icon={icons.basket} />
                
            </View>
        )
    }
    // END OF FUNCTION TO RENDER BODY

  return (

    <SafeAreaProvider style={styles.container}>

    {showMessage == 1 &&
        <MessageBox message="Item has been added to your order successfully!" status="success" />
    }

         {/* Render Header */}
         {renderHeaderContent()}


         {/* Render Header */}
         {renderBodyContent()}

    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
    priceBox: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textPrice: {
        fontSize: 24,
        fontFamily: "Benton Sans",
        color: COLORS.StandardardBankBlue,
        fontWeight: 'bold',
    },
    descText: {
        fontSize: 15,
        fontFamily: "Benton Sans",
        color: COLORS.darkGray,
        fontWeight: 'normal',
        lineHeight:23
    },
    productDesc: {
        width:'100%',
        borderRadius:10,
        padding:15,
        marginVertical: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:2
    },
    productHeader: {
        fontSize: 20,
        fontFamily: "Benton Sans",
        color: COLORS.StandardardBankBlue,
        fontWeight: 'bold',
    },
    productDetails: {
        width,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
        paddingHorizontal:20,
        paddingVertical: 40,
        height: '100%'
    },
    headerBg: {
        height:350,
        width
      },
    container: {
        flex: 1
      }
})

export default OrderMenuItem;