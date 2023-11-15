import React, {useRef} from 'react';
import { 
        StyleSheet, 
        Text, 
        View,
        ImageBackground,
        TouchableOpacity,
        Dimensions,
        Image,
        ScrollView
 } from 'react-native';

 import { SafeAreaProvider } from 'react-native-safe-area-context';
 import { COLORS, icons, images } from '../../../constants';
 import { HeaderBarBlank, 
          AddQuantityItem,
          Button
        } from '../../components';

 const { width, height } = Dimensions.get("window");

// INIT APP
const OrderMenuItem = ({navigation}) => {

    // FUNCTION TO RENDER HEADER FUNCTION
    function renderHeaderContent() {
        return (
            <ImageBackground
            source={images.kitchen_bg2}
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
                    <Text style={styles.productHeader}>Rice, Moi-moi and Beef</Text>
                </View>

                <View style={styles.productDesc}>
                    <Text style={styles.descText}>Indomie noodles cooked in Spicy sauddce with Ofada</Text>
                </View>

                <View style={styles.priceBox}>
                <Image source={icons.cash} 
                    style={{
                        height: 25, width: 25, 
                        resizeMode: 'contain', tintColor: COLORS.darkGray,
                        marginRight: 15
                    }}
                />
                        <Text style={styles.textPrice}>₦ 4,500.00</Text>
                </View>

                <AddQuantityItem />

                <Button title="Add to order" icon={icons.basket} />
                
            </View>
        )
    }
    // END OF FUNCTION TO RENDER BODY

  return (

    <SafeAreaProvider style={styles.container}>

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