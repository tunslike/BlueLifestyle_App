import React, {useState} from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS, dummyData, horizontalScale, verticalScale, moderateScale } from '../../constants';

const DropDown = ({data, value, onChange, isFocus, onBlur, placeholder, icon}) => {

  return (
    <View style={styles.dropdownBox}>

            <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            searchPlaceholder="Search..."
            value={value}
            onFocus={isFocus}
            onBlur={onBlur}
            onChange={onChange}
            renderLeftIcon={() => (
              <Image source={icon} 
                style={{
                  height: 23, width: 23, marginLeft:-10, marginRight:17, tintColor: COLORS.StandardardBankBlue, resizeMode: 'contain'
                }}
              />
            )}
        />
            
    </View>
  )
}

const styles = StyleSheet.create({
    placeholderStyle: {
        fontSize: moderateScale(15),
        fontFamily: "Benton Sans",
        color: COLORS.darkGray,
        fontWeight: 'normal',
      },
      selectedTextStyle: {
        fontSize: moderateScale(15),
        fontFamily: "Benton Sans",
        color: COLORS.darkblue,
        fontWeight: 'normal',
      },
      inputSearchStyle: {
        height: verticalScale(40),
        fontSize: moderateScale(15),
        fontFamily: "Benton Sans",
        color: COLORS.StandardardBankBlue,
        fontWeight: 'normal',
      },
      dropdownBox: {
        marginHorizontal: horizontalScale(25),
        marginTop: verticalScale(12)
      },
      dropdown: {
        height: verticalScale(50),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.textGrey,
        paddingHorizontal: moderateScale(8),
      },
})
export default DropDown
