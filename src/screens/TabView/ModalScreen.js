import React, { useState, useEffect } from 'react'
import {
    View,
    Image,
    Dimensions,
    Animated,
    Easing
} from 'react-native'

import {
    Container,
    Content,
    Button,
    Icon,
    Text
} from 'native-base'

const icons = [require("../../assets/bluetooth0.png"), require("../../assets/bluetooth1.png"), require("../../assets/bluetooth2.png"), require("../../assets/bluetooth3.png")]

const windowWidth = Dimensions.get('window').width
const AnimatedIcon = Animated.createAnimatedComponent(Icon)

const ModalScreen = (props) => {
    const [marked, setMarked] = useState(false)
    const [iconIndex, setIconIndex] = useState(0)
    const [widthAnim] = useState(new Animated.Value(windowWidth))

    useEffect(() => {
        setTimeout(async() => {

            Animated.timing(
                widthAnim,
                {
                    toValue: 0,
                    duration: 100
                }
            ).start(() => {
                //setMarked(true)
                Animated.spring(
                    widthAnim,
                    {
                        toValue: 100,
                        duration: 100
                    }
                ).start()
            })
        }, 3000)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            iconIndex == icons.length - 1 ? setIconIndex(0) : setIconIndex(iconIndex + 1)
        }, 400)
    }, [iconIndex])

    return (
        <Container>
            {
                props.modalState == 1 ? ( //Success state
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <AnimatedIcon name="md-checkmark-circle-outline" style={{alignSelf: 'center', color: '#712177', fontSize: widthAnim}}/>
                        </View>
                        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
                            <Text>Marked succesfully!</Text>
                            <Button full onPress={() => {props.setModalVisible(false); props.exitFunc(1)}}>
                                <Text>Go back</Text>
                            </Button>
                        </View>
                    </View>
                ) : props.modalState == 0 ? ( //Searching state
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Animated.Image source={icons[iconIndex]} style={{resizeMode: 'contain', width: widthAnim}}/> 
                        </View>
                        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
                            <Text>Marking, please wait...</Text>
                            <Button full onPress={() => {props.setModalVisible(false); props.exitFunc(1)}}>
                                <Text>Go back</Text>
                            </Button>
                        </View>
                    </View>
                ) : ( //Failure state (timeout state)
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Animated.Image source={icons[iconIndex]} style={{resizeMode: 'contain', width: widthAnim}}/> 
                        </View>
                        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
                            <Text>FAILED TO FIND BEACONS! :( </Text>
                            <Button full onPress={() => {props.setModalVisible(false); props.exitFunc(1)}}>
                                <Text>Go back</Text>
                            </Button>
                        </View>
                    </View>
                )
            }
        </Container>
    )
}

export default ModalScreen