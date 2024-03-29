import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions} from 'react-native'
import { COLORS, icons } from '../../constants';
import Animated, {SlideInDown, SlideInUp, SlideOutUp} from 'react-native-reanimated';

const { width, height } = Dimensions.get("window");

const MessageBox = ({status, message}) => {
  return (
    <Animated.View 
    entering={SlideInUp}
    exiting={SlideOutUp}
    style={[styles.container, {backgroundColor:(status == 'error') ? COLORS.SecondaryPlum : COLORS.SecondaryGreen}]}>
    <Image 
        source={(status == 'error') ? icons.check_no : (status == 'success') ? icons.check_yes : null}
        style={{
            height: 20, width: 20, resizeMode: 'contain', tintColor: COLORS.white
        }}
    />
      <Text style={styles.messageText}>{message}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    messageText: {
        fontSize: 15,
        fontFamily: "Benton Sans",
        color: COLORS.white,
        fontWeight: 'medium',
    },
    container: {
        columnGap: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width,
        height:80,
        paddingLeft:20,
        paddingTop: 10,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex:10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        zIndex:13
    }
})

export default MessageBox;
