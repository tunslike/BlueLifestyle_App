import React, {useState} from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  Image 
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { COLORS,images, icons } from '../../../constants' 
import { FacilityCard } from '../../components';

const { width, height } = Dimensions.get("window");

const DashboardScreen = ({navigation}) => {

  // Render Header Function
  function renderHeaderContent() {
    return (
      <View style={styles.headerbg}>

        <View style={styles.headerToolbar}>
            <Image style={styles.img} source={images.shield} />
            <Image source={icons.notification} style={{
              height:32, width: 32, tintColor: COLORS.lightBlue, resizeMode: 'contain'
            }} />
        </View>
        <View style={styles.profileDisplay}>
            <Text style={styles.greetings}>Good Morning</Text>
            <Text style={styles.titleName}>Hi, Babatunde</Text>

            <View style={styles.officeDetails}>
                <Image source={icons.office} style={{
                  height: 15, width: 15, resizeMode: 'contain',
                  tintColor: COLORS.gentleBlue, marginRight: 5,
                }} />
                <Text style={styles.business}>Pensions | Information Technology</Text>
            </View> 
        </View>
      </View>
    )
  }

  // Render Body
  function renderBodyContent() {
    return (
      <View style={styles.bodyContainer}>
          <Text style={styles.mainTitle}>What would you like to do today?</Text>
          <View>
            <ScrollView>
                <FacilityCard 
                  image={images.dash_rest_img}
                  title="Restuarant"
                  onPress={() => navigation.navigate('Restaurant')}
                />
                <FacilityCard 
                  image={images.creche_dash_img}
                  title="Creche"          
                />
                <FacilityCard 
                    image={images.gym_dash_img}
                    title="Gym"          
              />
            </ScrollView>
          </View>

      </View> 

    )
  }

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

         {/* Render Header */}
         {renderHeaderContent()}


         {/* Render Body */}
         {renderBodyContent()}
        
    </SafeAreaView>

  )
}

export default DashboardScreen;

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 22,
    fontFamily: "Benton Sans",
    color: COLORS.StatureBlue,
    fontWeight: 'bold',
    width: 250,
    lineHeight:28,
    marginBottom: 15,
    marginHorizontal:20
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    borderTopRightRadius: 20,
    marginTop: -20,
    width,
    marginRight:20,
    paddingVertical:20
  },
  business : {
    fontSize: 13,
    fontFamily: "Benton Sans",
    color: COLORS.gentleBlue,
    fontWeight: 'normal',
    marginLeft:5
  },
  greetings: {
    fontSize: 15,
    fontFamily: "Benton Sans",
    color: COLORS.lightBlue,
    fontWeight: 'normal',
  },
  titleName: {
    fontSize: 28,
    fontFamily: "Benton Sans",
    color: COLORS.white,
    fontWeight: 'bold',
  },
  officeDetails: {
    marginVertical:7,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  profileDisplay: {
    marginHorizontal:20,
    marginVertical: 15
  },
  headerToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal:20
  },
  headerbg: {
    width,
    height: 220,
    backgroundColor: COLORS.StandardardBankBlue,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
  },
  img: {
    height:40,
    width:40
  }
})