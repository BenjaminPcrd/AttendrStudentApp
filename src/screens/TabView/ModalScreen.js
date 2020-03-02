import React, { useState, useEffect } from 'react'
import {
    View,
} from 'react-native'
import {
    Container,
    Content,
    Button,
    Icon,
    Text,
    Spinner
} from 'native-base'

const ModalScreen = ({ setModalVisible }) => {
    const [marked, setMarked] = useState(false)

    useEffect(() => {
        setTimeout(() => setMarked(true), 3000)
    }, [])

    console.log(marked)
    return (
        <Container>
            <Button style={{alignSelf: 'flex-end'}} transparent onPress={() => setModalVisible(false)}>
                <Icon name="md-close-circle-outline" style={{color: 'black'}}/>
            </Button>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flex: 2, justifyContent: 'center'}}>
                    {
                        marked ? (
                            <Icon name="md-checkmark-circle-outline" style={{alignSelf: 'center', color: '#712177', fontSize: 65}}/>
                        ) : (
                            <Spinner color='#712177'/>
                        )
                    }
                </View>
                <View style={{flex: 1}}>
                    <Text>{marked ? "Marked" : "Not marked"}</Text>
                </View>
            </View>
        </Container>
        
    )
}

export default ModalScreen