import React, {useRef, useMemo, useState} from 'react';
import { 
        StyleSheet, 
        Text, 
        View } from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import { COLORS, 
         icons, 
         images, 
         verticalScale, 
         horizontalScale, 
         moderateScale } from '../../constants';  

const CustomBottomSheet = ({title}) => {

const snapPoints = useMemo(() => ['25%', '50%', '70%'], [])

const bottomSheetRef = useRef(null);


  return (
    <BottomSheet 
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={0}  
    >
        <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
    title: {
        fontSize: moderateScale(20),
        fontFamily: "Benton Sans",
        color: COLORS.StandardardBankBlue,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: verticalScale(15)
    },
    container: {
        backgroundColor: COLORS.white,
        marginHorizontal: horizontalScale(20),
        flex: 1,
    }
})

export default CustomBottomSheet;