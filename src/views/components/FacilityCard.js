import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Image, 
    TouchableOpacity,
    Dimensions,
    Platform,
    ImageBackground
} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Shadow } from 'react-native-shadow-2';
import { COLORS, icons } from '../../constants';

const { width, height } = Dimensions.get("window");

const FacilityCard = ({image, title, onPress, capacity, openingTime}) => {
  return (
    <View style={styles.cardBody}>
    <TouchableOpacity
        onPress={onPress}
        style={styles.cardContainer}
    >
        <ImageBackground 
            imageStyle={{ borderRadius: wp(3)}}
            source={image}
            resizeMode="cover"
            style={{
                height: wp(26), width: wp(29), 
                borderRadius: wp(10),
                resizeMode: 'contain',
                zIndex:10
            }}
        />

        <View style={styles.cardDetails}> 
            <View style={{flex:1}}>
            <Text style={styles.cardTitle}>{title}</Text>
            <View style={{flexDirection: 'row', 
                          justifyContent: 'flex-start', 
                          alignItems: 'center', 
                          marginBottom: Platform.OS === 'ios' ? 5 : null,
                          }}>
                <Image source={icons.time} 
                    style={{
                        height:15, marginRight:10, width: 15, tintColor: COLORS.darkGray, resizeMode: 'contain'
                    }}
                />
                <Text style={styles.subTitle}>{openingTime}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
            <Image source={icons.people} 
                style={{
                    height:15, marginRight:10, width: 15, tintColor: COLORS.darkGray, resizeMode: 'contain'
                }}
                />
                <Text style={styles.subTitle}>{capacity} Slots</Text>
            </View> 
            </View>
            <Image 
                source={icons.nav_arrow}
                style={{
                   marginLeft:-30, height: 25, width: 25, tintColor: COLORS.ArrowGray, resizeMode: 'contain'
                }}
            />
        </View>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    subTitle: {
        fontSize: 13,
        fontFamily: "Roboto",
        color: COLORS.darkGray,
        fontWeight: 'normal',
    },
    cardBody: {
     flex: 1,
     marginVertical: wp(3),
     marginHorizontal:20,
    },
    cardTitle: {
        fontSize: wp(5),
        fontFamily: "Roboto",
        color: COLORS.StatureBlue,
        fontWeight: 'bold',
        marginBottom:5
    },
    cardDetails: {
        backgroundColor: COLORS.white,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 33,
        paddingVertical:10,
        width,
        borderTopRightRadius:10,
        borderBottomRightRadius: 10,
        borderWidth: 1,
        borderColor: '#ededed',
        borderStyle: 'solid',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft:-10,
    },
    cardImage: {
        height: Platform.OS === 'ios' ? wp(30) : wp(23),
        width: Platform.OS === 'ios' ? hp(16) : wp(26),
        resizeMode: 'contain',
        borderRadius: 10,
        zIndex:10
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})

export default FacilityCard;