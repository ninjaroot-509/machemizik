import React, { useRef, useState, useEffect } from 'react'
import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, FlatList, Image, Alert, BackHandler } from 'react-native'
import { SCREENS } from '../../constants';
import { Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');

const data = [
    {
        id: 1,
        title: 'Welcome',
        description: 'lorem ipsun dolor sit amet consec tetur adispicing elit',
        img: require('../../assets/logo.png')
    },
    {
        id: 2,
        title: 'Welcome 2',
        description: 'lorem ipsun dolor sit amet consec tetur adispicing elit',
        img: require('../../assets/logo.png')
    },
    {
        id: 3,
        title: 'Welcome 3',
        description: 'lorem ipsun dolor sit amet consec tetur adispicing elit',
        img: require('../../assets/logo.png')
    },
]

const COLORS = {
  primary : "#f34160",

  black: "#171717",
  white: "#FFFFFF",
  background: "#FFFFFF"
}

const SIZES = {
  base: 10,
  width,
  height
}

const Onboarding = ({navigation}) => {
    const flatlistRef = useRef();
    const [currentPage, setCurrentPage] = useState(0);
    const [viewableItems, setViewableItems] = useState([])

    const handleViewableItemsChanged = useRef(({viewableItems})=> {
        setViewableItems(viewableItems)
    })
    useEffect(() => {
        if(!viewableItems[0] || currentPage === viewableItems[0].index) 
            return;
        setCurrentPage(viewableItems[0].index)

    }, [viewableItems])

    const handleNext = () => {
        if(currentPage == data.length-1)
            return;

        flatlistRef.current.scrollToIndex({
            animated: true,
            index: currentPage +1
        })
    }

    const handleBack = () => {
        if(currentPage==0) 
            return;
        flatlistRef.current.scrollToIndex({
            animated: true,
            index: currentPage - 1
        })
    }

    const handleSkipToEnd = () => {
        flatlistRef.current.scrollToIndex({
            animate: true,
            index: data.length - 1
        })
    }   

    const renderFlatlistItem = ({item}) => {
        return (
            <View key={item.id} style={{
                width: SIZES.width,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 35
            }}>
                <View style={{
                    alignItems: 'center',
                    paddingVertical: 10
                }}>
                    <Image
                    source={item.img}
                    style={{
                      width: 200, 
                      height: 200,
                  }}
                    />
                </View>
                <View style={{paddingHorizontal: SIZES.base * 4, marginTop: SIZES.base * 3.5}}>
                    <Text style={{fontSize: 27, textAlign: 'center', fontWeight: 'bold', color: COLORS.primary}}>
                        {item.title}
                    </Text>
                    <Text style={{
                        fontSize: 16,
                        textAlign: 'center',
                        marginTop: 10,
                        lineHeight: 28,
                        color: '#141414',
                        fontWeight: '700'
                    }}>
                        {item.description}
                    </Text>
                </View>
                
                <View style={{paddingHorizontal: SIZES.base * 4, marginTop: SIZES.base * 3.5}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {
                            // No. of dots
                            [...Array(data.length)].map((_, index)=>(
                                <View
                                key={index} 
                                style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    backgroundColor: index==currentPage 
                                    ? COLORS.primary
                                    : COLORS.primary + '20',
                                    marginRight: 8
                                }} />
                            ))
                        }
                    </View>
                </View>

                <View style={{marginTop: SIZES.base * 4}}>
                {
                        item.id !== 3 ? (
                            <TouchableOpacity 
                                onPress={handleNext}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: width / 1.5,
                                    height: 45,
                                    borderRadius: 30,
                                    backgroundColor: '#f24160',
                                }}
                                activeOpacity={0.8}
                                >
                                <Text style={{
                                    color: COLORS.white,
                                    fontSize: 14,
                                    fontWeight: '700'
                                    }}>Next</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={{ alignItems: 'center'}}>
                                <View style={{}}>
                                    <TouchableOpacity 
                                    onPress={() => navigation.navigate(SCREENS.LOGIN)}
                                    style={{
                                        paddingHorizontal: SIZES.base,
                                        width: width / 1.3,
                                        height: 48,
                                        borderRadius: 10,
                                        backgroundColor: COLORS.primary,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            color: COLORS.white,
                                            fontSize: 14,
                                            fontWeight: '700',
                                        }}>Login</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{paddingVertical: 18}}>
                                    <TouchableOpacity 
                                    onPress={() => navigation.navigate(SCREENS.SIGNUP)}
                                    style={{
                                        paddingHorizontal: SIZES.base,
                                        width: width / 1.3,
                                        height: 48,
                                        borderRadius: 10,
                                        borderWidth: 1.3,
                                        borderColor: COLORS.primary,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            color: COLORS.primary,
                                            fontSize: 14,
                                            fontWeight: '700',
                                        }}>Register</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                </View>

            </View>
        )
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#ffffff'
        }}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent"/>
            {/* FLATLIST with pages */}
            <FlatList
            data={data}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderFlatlistItem}

            ref={flatlistRef}
            onViewableItemsChanged={handleViewableItemsChanged.current}
            viewabilityConfig={{viewAreaCoveragePercentThreshold: 100}}
            initialNumToRender={1}
            extraData={SIZES.width}
            />
        </View>
    )
}

export default Onboarding