import React from 'react'
import { StyleSheet, 
         Text, 
         Image, 
         TouchableOpacity, 
         View } from 'react-native'

import { COLORS, icons, images } from '../../constants'

const GymSpecials = ({onPress, image, title, subTitle, trainer}) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        style={styles.box}
    >
      <Image source={image} 
        style={styles.boxImg}
      />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.details}>
        <Image
            source={icons.trainer}
            style={{
                height:15, width:15,
                resizeMode: 'contain', tintColor:COLORS.SecondaryGreen
            }}
        />
        <Text style={styles.subTitle}>{trainer}</Text>
      </View>
      <View style={styles.details}>
      <Image
          source={icons.calendar}
          style={{
              height:13, width:13,
              resizeMode: 'contain', tintColor:COLORS.SecondaryGreen
          }}
      />
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  subTitle: {
    fontFamily: "Benton Sans",
    color: COLORS.darkGray,
    fontWeight: 'normal', 
    fontSize: 13,
  },
    details: {
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        columnGap:5
    },
    title: {
        fontSize: 13,
        fontFamily: "Benton Sans",
        color: COLORS.StandardardBankBlue,
        fontWeight: 'bold', 
        paddingHorizontal:5,
        paddingVertical:5,
    },  
    boxImg: {
        width: 170,
        height: 120,
        resizeMode: 'contain',
        borderRadius: 10
    },
    box : {
marginRight:15
    }
})

export default GymSpecials;
