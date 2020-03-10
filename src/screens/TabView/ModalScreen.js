import React, { useState, useEffect } from 'react'
import {
    View,
    Image
} from 'react-native'
import {
    Container,
    Content,
    Button,
    Icon,
    Text
} from 'native-base'

const icons = [require("../../assets/bluetooth0.png"), require("../../assets/bluetooth1.png"), require("../../assets/bluetooth2.png"), require("../../assets/bluetooth3.png")]

const AnimatedIcon = () => {
    const [iconIndex, setIconIndex] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            iconIndex == icons.length - 1 ? setIconIndex(0) : setIconIndex(iconIndex + 1)
        }, 300)
    }, [iconIndex])

    return (
        <Image source={icons[iconIndex]} style={{resizeMode: 'contain', backgroundColor: 'red', width: 300}}/> 
    )
}

const ModalScreen = ({ setModalVisible }) => {
    const [marked, setMarked] = useState(false)

    useEffect(() => {
        setTimeout(() => setMarked(true), 5000)
    }, [])

    return (
        <Container>
            {
                marked ? (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Icon name="md-checkmark-circle-outline" style={{alignSelf: 'center', color: '#712177', fontSize: 100}}/>
                        </View>
                        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
                            <Text>Marked succesfully!</Text>
                            <Button full onPress={() => setModalVisible(false)}>
                                <Text>Go back</Text>
                            </Button>
                        </View>
                    </View>
                ) : (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <AnimatedIcon/>
                        </View>
                        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
                            <Text>Marking, please wait...</Text>
                            <Button full onPress={() => setModalVisible(false)}>
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