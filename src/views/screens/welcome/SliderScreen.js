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
  View } from 'react-native'
  import LinearGradient from 'react-native-linear-gradient';

import { 
  COLORS, 
  images, 
  icons, 
} from '../../../constants';

const { width, height } = Dimensions.get("window");

const slides = [
  {
      id: '1',
      image: require("../../../assets/images/resturant2_slider.jpg"),
      icon: icons.food,
      title: 'Restaurant',
      description: 'Experience the ease and comfort of making your food orders'
  },
  {
      id: '2',
      image: require("../../../assets/images/creche_slider.jpg"),
      icon: icons.kid,
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
          style={styles.imagebg}>

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{ x: 0, y: 1}}
            colors={[
              COLORS.gradientStart,
              COLORS.gradientMiddle,
              COLORS.gradientEnd
            ]}
            style={{
              height: 300,
              justifyContent: 'flex-start',
              paddingHorizontal: 20,
            }}
          >
            <View style={styles.titlebox}>
                <Image
                  source={item.icon}
                  resizeMode="contain"
                  style={{
                    height: 43,
                    width: 43,
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
                            height: 23, width: 23, resizeMode: 'contain',
                            tintColor: COLORS.darkblue, marginLeft: 10,
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
                            height: 23, width: 23, resizeMode: 'contain',
                            tintColor: COLORS.darkblue, marginLeft: 10,
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
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
    <StatusBar barStyle="light-content" />
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
    fontFamily: "Benton Sans",
    fontWeight:'600',
    fontSize:16,
    color: COLORS.darkblue
  },
  btnNext : {
    borderRadius: 8,
    backgroundColor: COLORS.white,
    paddingHorizontal:23,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'

  },
  btnDiv : {
      marginTop:110,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  },
  titlebox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'   
  },
  textDescription : {
    marginTop:10,
    fontFamily: "Benton Sans",
    color: COLORS.white,
    fontSize:17,
    fontWeight: '300'
  },
  textTitle: {
    width:350,
    fontSize: 33,
    fontFamily: "Benton Sans",
    color: COLORS.white,
    fontWeight: '900',
    lineHeight:40
  },
  imagebg: {
    flex: 1,
    width,
    justifyContent: 'flex-end'
  },
  sliderContainer: {
    alignItems:'center'
  }
})

export default SliderScreen