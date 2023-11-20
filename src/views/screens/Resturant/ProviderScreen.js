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
          ProviderFeature, 
          MenuItemHeader,
          MenuItem 
        } from '../../components';

 const { width, height } = Dimensions.get("window");


// INIT APP
const ProviderScreen = ({navigation}) => {

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

  // FUNCTION TO RENDER BODY CONTENT
    function renderBodyContent() {
      return (
          <View style={styles.bodyContainer}>
              <View
                style={styles.vendorBox}
              >
                <Text style={styles.vendorTileName}>Travis Caterering Services</Text>
                
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
              </View>
          
                {/* Load body for menu items */}

                <View style={styles.menuListView}>

                <ScrollView>

                    <MenuItemHeader title="Main Meal" />

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
                    />

                </ScrollView>
                    
                </View>

                {/* End of Load body for menu items */}
          </View>
      )
    }
  return (
    <SafeAreaProvider style={styles.container}>

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
    marginVertical:15
  },
  vendorDesc: {
    fontSize:14,
    fontFamily: "Benton Sans",
    color: COLORS.darkGray,
    fontWeight: 'normal',
    marginVertical: 2,
    lineHeight:20,
  },
  vendorTileName : {
    fontSize: 20,
    fontFamily: "Benton Sans",
    color: COLORS.StatureBlue,
    fontWeight: 'bold',
  },
  vendorBox: {
    marginVertical: 5,
    marginHorizontal: 20,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: "Benton Sans",
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
    height:180,
    width
  },
  container: {
    flex: 1
  }
})

export default ProviderScreen;