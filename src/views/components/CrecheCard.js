import React from 'react';
import { StyleSheet, 
    TouchableOpacity, 
    Text, 
    Dimensions,
    View, 
    Image,
    ImageBackground, Platform} from 'react-native';

import { COLORS, icons } from '../../constants';
const { width, height } = Dimensions.get("window");

const CrecheCard = ({onPress, image, time, slot, rating, name}) => {
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
            <Text style={styles.ratingText}>{rating} (10)</Text>
        </View>
        <View style={styles.business}>
            <Image source={icons.kids} 
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
        <Image source={icons.time} 
            style={{
                width: 15, marginRight:3, height: 15, tintColor: COLORS.SecondaryGreen, resizeMode: 'contain'
            }}
        />
        <Text style={styles.featureText}>Opens: {time}</Text>
    </View>
    <View style={styles.featureBox}>
        <Image source={icons.people} 
            style={{
                width: 15, marginRight:3, height: 15, tintColor: COLORS.SecondaryGreen, resizeMode: 'contain'
            }}
        />
        <Text style={styles.featureText}>Slots: {slot}</Text>
    </View>
        
   </View>
</TouchableOpacity>
  )
}

export default CrecheCard

const styles = StyleSheet.create({

    featureBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: 8,
        borderColor: COLORS.ArrowGray,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: Platform.OS === 'ios' ? 13 : 10,
        paddingVertical: Platform.OS == 'ios' ? 6 : 2,
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
        padding:10,
        borderRadius:27,
        height: 160,
    }, 
    container: {
        marginHorizontal:10,
        marginBottom:15
    }
})