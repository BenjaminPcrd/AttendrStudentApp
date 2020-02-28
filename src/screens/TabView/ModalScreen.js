import React, { useState, useEffect } from 'react'

import {
    View,
    Image,
    Animated
} from 'react-native'

import {
    Container,
    Content,
    Button,
    Icon,
    Text
} from 'native-base'
import { Easing } from 'react-native-reanimated'

const AnimatedIcon = Animated.createAnimatedComponent(Icon)

const ModalScreen = ({ setModalVisible }) => {
    const [iconAnim] = useState(new Animated.Value(0))
    useEffect(() => {
        Animated.timing(iconAnim, {toValue: 200, easing: Easing.linear}).start()
    }, [])

    console.log(iconAnim)
    return (
        <Container style={{backgroundColor: "rgb(100, 100, 200)"}}>
            <Button style={{alignSelf: 'flex-end'}} transparent onPress={() => setModalVisible(false)}>
                <Icon name="md-close-circle-outline" style={{color: 'white'}}/>
            </Button>
            <Content contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
                <AnimatedIcon
                    name="md-checkmark-circle-outline" 
                    style={{color: 'white', fontSize: iconAnim, alignSelf: 'center'}}
                />
            </Content>
            
        </Container>
        
    )
}

export default ModalScreen