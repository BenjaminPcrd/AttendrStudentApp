import React, { useState } from "react"
import { Modal, FlatList } from 'react-native'
import {
    Container,
    Content,
    Text,
    Button
} from 'native-base'

import ModalScreen from './ModalScreen'

const Profile = () => {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <Container>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                <ModalScreen setModalVisible={setModalVisible}/>
            </Modal>
            <Content padder contentContainerStyle={{ justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>Hello</Text>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>Picard Benjamin</Text>
                <Text>1907005</Text>

                <Button block rounded style={{ margin: 15, marginTop: 50, height: 100 }} onPress={() => setModalVisible(true)}>
                    <Text>Attend</Text>
                </Button>

            </Content>
            <FlatList
                    style={{width: 300, maxHeight: 150, alignSelf: 'center'}}
                    data={["att1", "att2", "att3", "att1", "att2", "att3", "att1", "att2", "att3", "att1", "att2"]}
                    renderItem={({ item }) => <Text style={{textAlign: 'center'}}>{item}</Text>}
                    keyExtractor={(item, index) => index.toString()}
                />
        </Container>
    )
}

export default Profile