import React, {useState} from 'react';
import { 
  SafeAreaView,
  StyleSheet, 
  Text,
  Image, 
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { COLORS, images, icons} from '../../../constants';
import { LoginInput } from '../../components';
const { width, height } = Dimensions.get("window");

const LoginScreen = ({navigation}) => {

  // SET STATES
  const [isVisible, setIsVisible] = React.useState(false);


  // SET USER INPUT STATES
  const [sapid, setSAPID] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  return (
    <KeyboardAwareScrollView 
     enableOnAndroid={true}
     keyboardShouldPersistTaps={"handled"}
     extraScrollHeight={-300}
     contentContainerStyle={{
      flexGrow: 1,
      justifyContent: 'center'
     }}>
    <StatusBar barStyle="dark-content"  />
    <SafeAreaView>
      <View style={styles.subContainer}>
          <Image style={styles.img} source={images.shield} />
      </View>
      <View style={styles.imgContainer}>
        <Image source={images.resturant_image} style={{
          height: 200, width, resizeMode: 'contain'
        }} />
        <Text style={styles.loginTitle}>
        Let's Get You Started
        </Text>
        <Text style={styles.loginDesc}>Just a few details to get you on your way</Text>
      </View>

      <View>
          <LoginInput 
            value={sapid}
            onChange={(text) => setSAPID(text)}
            pwd={false}
            placeholder="Enter your SAP ID"
            icon={icons.user}
            maxlength={7}
          />
          <LoginInput 
            value={password}
            onChange={(text) => setPassword(text)}
            pwd={true}
            setSecureText={isVisible}
            placeholder="Enter your password"
            icon={icons.pwd}
            eye_type={isVisible == true ? icons.eye_off : icons.eye_on}
            visibleOnPress={() => setIsVisible(!isVisible)}
          />
      </View>

      <View>
          <TouchableOpacity 
            onPress={() => navigation.replace('Tab')}
            style={styles.loginBtn}>
                <Text style={styles.loginText}>Sign In</Text>
                <Image source={icons.arrow} 
                  style={{height:22, width: 22,
                  tintColor: COLORS.white, resizeMode: 'contain'}}
                />
          </TouchableOpacity>
      </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  loginText: {
    fontSize: 16,
    fontFamily: "Benton Sans",
    color: COLORS.white,
    fontWeight: 'bold',
    marginRight:20
  },
  loginBtn: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.StandardardBankBlue ,
      borderRadius:10,
      paddingHorizontal: 20,
      paddingVertical: 18,
      marginHorizontal:25,
      marginTop:40
  },
  loginDesc :{
    fontSize: 14,
    fontFamily: "Benton Sans",
    color: COLORS.darkGray,
    fontWeight: 'normal',
    marginHorizontal: 25,
    marginVertical:5,
  },
  loginTitle : {
    width:350,
    fontSize: 25,
    fontFamily: "Benton Sans",
    color: COLORS.StandardardBankBlue,
    fontWeight: 'bold',
    marginHorizontal:25,
    marginTop:40,
  },
  imgContainer : {
    marginVertical:20
  },
  subContainer: {
    marginHorizontal: 25,
    marginBottom:10,
    marginTop:20
  },
  container : {
    flex: 1,
    color: COLORS.white,
  },
  img: {
    height:60,
    width:60
  },
})

export default LoginScreen;