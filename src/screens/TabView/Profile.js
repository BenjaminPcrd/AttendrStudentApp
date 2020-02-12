import React, { useState } from "react"
import { Modal } from 'react-native'
import {
    Container,
    Content,
    Text,
    Button,
    Icon
} from 'native-base'

const Profile = () => {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <Container>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                <Button style={{width: 50, alignSelf: 'flex-end'}} transparent onPress={() => setModalVisible(false)}>
                    <Icon name="md-close" style={{color: 'black'}}/>
                </Button>
            </Modal>
            <Content contentContainerStyle={{ justifyContent: 'space-evenly', alignItems: 'center', flex: 1 }}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>Picard Benjamin</Text>
                <Text>1907005</Text>

                <Button block rounded style={{ margin: 15, marginTop: 50, height: 100 }} onPress={() => setModalVisible(true)}>
                    <Text>Attend</Text>
                </Button>
            </Content>
        </Container>
    )
}

export default Profile