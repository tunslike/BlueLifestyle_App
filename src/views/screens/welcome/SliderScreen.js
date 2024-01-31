import React from 'react'
import { 
  Dimensions, 
  FlatList, 
  Image, 
  ImageBackground, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, Platform } from 'react-native'
  import LinearGradient from 'react-native-linear-gradient';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { 
  COLORS, 
  images, 
  icons,
  verticalScale, 
} from '../../../constants';

const { width, height } = Dimensions.get("window");

const slides = [
  {
      id: '1',
      image: require("../../../assets/images/resturant_slider.jpg"),
      icon: icons.food,
      title: 'Restaurant',
      description: 'Experience the ease and comfort of making your food orders'
  },
  {
      id: '2',
      image: require("../../../assets/images/creche_slider.jpg"),
      icon: icons.kids,
      title: 'Kids Creche',
      description: 'Book your kids creche session with ease and convenience'
  },
  {
      id: '3',
      image: require("../../../assets/images/gym_slider.jpg"),
      icon: icons.gym,
      title: 'Indoor Gym',
      description: 'Experience Gym booking session with extreme comfort'
  },
]

const SliderScreen = ({navigation}) => {

  // set state
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0); 
  const ref = React.useRef(null);

  // function to update current slide index
  const updateCurrentSlideIndex = (e) => {
      const contentOffSetx = e.nativeEvent.contentOffset.x;
      const currentIndex = Math.round(contentOffSetx / width);
      setCurrentSlideIndex(currentIndex);
  }

  // function to Go to next slide
  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if(nextSlideIndex != slides.length) {
      const offset =  nextSlideIndex * width;
      ref?.current.scrollToOffset({offset})
      setCurrentSlideIndex(nextSlideIndex)
    }
  }

  // slide component
const Slide = ({item}) => {
  return (
    <View style={styles.sliderContainer}>
        <ImageBackground
        resizeMode="cover"
          source={item.image}
          style={[styles.imagebg]}>
          <View
            style={{
             paddingHorizontal: wp(3), position: 'absolute', top:wp(15),
             width
            }}
          >

          <View style={{flexDirection:'row', alignItems: 'center', 
          justifyContent: 'space-between', marginHorizontal:7}}>
                  <View style={styles.shieldDiv}>
                        <Image style={styles.img} source={images.shield} />
                  </View>
                      <TouchableOpacity
                      onPress={() => navigation.replace("Login")}
                        style={styles.skipBtn}
                      >
                        <Text style={styles.skipText}>Skip</Text>
                      </TouchableOpacity>
                </View>
          </View>
        
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{ x: 0, y: 1}}
            colors={[
              COLORS.gradientStart,
              COLORS.gradientMiddle,
              COLORS.gradientEnd
            ]}
            style={{
              height: Platform.OS === 'ios' ? 350 : 300,
              justifyContent: 'flex-start',
              paddingHorizontal: 20,
            }}
          >
            <View style={styles.titlebox}>
                <Image
                  source={item.icon}
                  resizeMode="contain"
                  style={{
                    height: hp(4.5),
                    width: hp(4.5),
                    tintColor: COLORS.white,
                    marginRight: 10
                  }}
                />
                <Text style={styles.textTitle}>{item.title}</Text>
            </View>
              <Text style={styles.textDescription}>{item.description}</Text>
              <View style={styles.btnDiv}>
                  <View style={styles.indicatorDiv}>
                    {slides.map((_,index) => (
                      <View key={index} 
                      style={[styles.indicator, currentSlideIndex == index && {
                        backgroundColor: COLORS.lightBlue, width: 25
                      },
                    ]}></View>
                    ))}
                  </View>

                  {currentSlideIndex == slides.length - 1 && 
                    (<TouchableOpacity
                    onPress={() => navigation.replace('Login')}
                    style={styles.btnNext}
                    >
                      <Text style={styles.btnTextNext}>Sign In</Text>
                      <Image 
                          source={icons.arrow} 
                          resizeMode='contain'
                          style={{
                            height: wp(4), width:wp(4), resizeMode: 'contain',
                            tintColor: COLORS.darkblue, marginLeft: 5,
                          }}
                          />
                    </TouchableOpacity>)
                  } 
                  {currentSlideIndex < slides.length - 1 && 
                    <TouchableOpacity
                    onPress={(goNextSlide)}
                    style={styles.btnNext}
                    >
                      <Text style={styles.btnTextNext}>Next</Text>
                      <Image 
                          source={icons.arrow} 
                          resizeMode='contain'
                          style={{
                            height: wp(4), width: wp(4), resizeMode: 'contain',
                            tintColor: COLORS.darkblue, marginLeft: 5,
                          }}
                          />
                    </TouchableOpacity>
                  }
                
              </View>
          </LinearGradient>
        </ImageBackground>
    </View>
  )
}
  return (
    <View>
    <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <FlatList
      ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        pagingEnabled  
        data={slides}
        contentContainerStyle={{height}}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <Slide item={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  skipBtn: {
      borderRadius: wp(5),
      borderColor: COLORS.white,
      borderStyle: 'solid',
      borderWidth: 1,
      paddingHorizontal: wp(5.3),
      paddingVertical: wp(1.3)
  },
  skipText: {
    fontFamily: "Roboto",
    fontWeight:'normal',
    fontSize:wp(3.5),
    color: COLORS.white
  },
  indicatorDiv: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  indicator : {
    height: 3,
    width: 10,
    backgroundColor: COLORS.textGrey,
    marginHorizontal: 3,
    borderRadius: 2
  },
  btnTextNext: {
    fontFamily: "Roboto",
    fontWeight:'600',
    fontSize:wp(3.3),
    color: COLORS.darkblue
  },
  btnNext : {
    borderRadius: wp(2.5),
    backgroundColor: COLORS.white,
    paddingHorizontal: wp(3),
    paddingVertical: wp(1.5),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'

  },
  btnDiv : {
      marginTop:hp(15),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  },
  titlebox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',   
  },
  textDescription : {
    marginTop:hp(1),
    fontFamily: "Roboto",
    color: COLORS.white,
    fontSize:wp(4),
    fontWeight: '300',
    lineHeight: hp(3)
  },
  textTitle: {
    fontSize: wp(7),
    fontFamily: "Roboto",
    color: COLORS.white,
    fontWeight: '900',
    lineHeight:hp(7)
  },
  img: {
    height:wp('14%'),
    width:wp('14%')
  },
  imagebg: {
    width,
    justifyContent: 'flex-end',
    resizeMode:'cover',
    flex: 1
  },
  sliderContainer: {
    alignItems:'center',
    flex:1,
  },
  container: {
    flex: 1
  }
})

export default SliderScreen