import React from 'react'
import { StyleSheet, 
         TouchableOpacity, 
         Text, 
         Dimensions,
         View, 
         Image,
         ImageBackground} from 'react-native'
import { COLORS, icons, images } from '../../constants'

const { width, height } = Dimensions.get("window");

const ProviderCard = ({onPress, image, rating, name, description}) => {
  return (
    <TouchableOpacity 
        onPress={onPress}
    style={styles.container}>
      <ImageBackground 
        imageStyle={{ borderRadius: 20}}
        source={image}
        style={styles.cardBody}>
            <View style={styles.ratings}>
                <Image source={icons.rating} 
                    style={{
                        tintColor: COLORS.SecondaryGreen, 
                        height: 15, width: 15, resizeMode: 'contain', marginRight: 5
                    }}
                />
                <Text style={styles.ratingText}>4.5 (10)</Text>
            </View>
            <View style={styles.business}>
                <Image source={icons.food} 
                    style={{
                        height: 20, width: 20, tintColor: COLORS.darkGray,
                        resizeMode: 'contain', marginRight: 5
                    }}
                />
                <Text style={styles.businessName}>{name}</Text>
            </View>
      </ImageBackground>
       
      <View style={styles.features}>
        <View style={styles.featureBox}>
            <Image source={icons.check_yes} 
                style={{
                    width: 15, marginRight:3, height: 15, tintColor: COLORS.SecondaryGreen, resizeMode: 'contain'
                }}
            />
            <Text style={styles.featureText}>Eat In</Text>
        </View>
        <View style={styles.featureBox}>
            <Image source={icons.check_yes} 
                style={{
                    width: 15, marginRight:3, height: 15, tintColor: COLORS.SecondaryGreen, resizeMode: 'contain'
                }}
            />
            <Text style={styles.featureText}>Take Out</Text>
        </View>
            
       </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
    featureText: {
        fontSize: 12,
        fontFamily: "Roboto",
        color: COLORS.darkGray,
        fontWeight: 'bold',
    },
    features: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 25,
        marginVertical: 13
    },  
    business: {
        position:'absolute',
        bottom: 13,
        left: 13,
        backgroundColor: COLORS.TransparentWhite,
        padding:5,
        paddingHorizontal:16,
        borderRadius:12,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    businessName: {
        fontSize: 16,
        fontFamily: "Roboto",
        color: COLORS.StandardardBankBlue,
        fontWeight: 'bold',
    },
    ratingText: {
        fontSize: 13,
        fontFamily: "Roboto",
        color: COLORS.StandardardBankBlue,
        fontWeight: 'normal',
    },
    ratings: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        paddingVertical:4,
        paddingHorizontal:7
    },
    cardBody: {
        backgroundColor: COLORS.darkGray,
        width:373,
        padding:10,
        borderRadius:27,
        height: 160,
    }, 
    container: {
        marginHorizontal:10,
        marginBottom:15
    }
})

export default ProviderCard;