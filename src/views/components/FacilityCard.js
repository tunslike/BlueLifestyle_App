import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Image, 
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import { Shadow } from 'react-native-shadow-2';
import { COLORS, icons } from '../../constants';

const { width, height } = Dimensions.get("window");

const FacilityCard = ({image, title, onPress}) => {
  return (
    <View style={styles.cardBody}>
    <TouchableOpacity
        onPress={onPress}
        style={styles.cardContainer}
    >
        <Image source={image} style={styles.cardImage} />

        <View style={styles.cardDetails}> 
            <View>
            <Text style={styles.cardTitle}>{title}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                <Image source={icons.time} 
                    style={{
                        height:15, marginRight:10, width: 15, tintColor: COLORS.darkGray, resizeMode: 'contain'
                    }}
                />
                <Text style={styles.subTitle}>Opens: 10:00am</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
            <Image source={icons.key} 
                style={{
                    height:15, marginRight:10, width: 15, tintColor: COLORS.darkGray, resizeMode: 'contain'
                }}
                />
                <Text style={styles.subTitle}>Slot Available: 87</Text>
            </View> 
            </View>
            <Image 
                source={icons.nav_arrow}
                style={{
                   marginLeft:50,  height: 25, width: 25, tintColor: COLORS.ArrowGray, resizeMode: 'contain'
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
        fontFamily: "Benton Sans",
        color: COLORS.darkGray,
        fontWeight: 'normal',
    },
    cardBody: {
     flex: 1,
     marginVertical: 10,
     marginHorizontal:20,
    },
    cardTitle: {
        fontSize: 20,
        fontFamily: "Benton Sans",
        color: COLORS.StatureBlue,
        fontWeight: 'bold',
        marginBottom:5
    },
    cardDetails: {
        backgroundColor: COLORS.white,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical:10,
        width,
        borderTopRightRadius:10,
        borderBottomRightRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.ArrowGray,
        borderStyle: 'solid',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    cardImage: {
        height: 100,
        width: 120,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})

export default FacilityCard;