import React, { useState, useEffect } from "react"
import { Modal, FlatList, View, Dimensions, UIManager, LayoutAnimation } from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import {
    Container,
    Content,
    Text,
    Button,
    Toast
} from 'native-base'

import ModalScreen from './ModalScreen'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
UIManager.setLayoutAnimationEnabledExperimental(true)

const Profile = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [attendanceToSync, setAttendanceToSync] = useState([new Date(), new Date(), new Date(), new Date()])

    useEffect(() => {
        NetInfo.fetch().then(state => {
            if(state.isConnected) {
                if(attendanceToSync.length > 0) syncAttendance()
            } else {
                Toast.show({
                    text: "You're not connected to internet...",
                    duration: 2000
                })
            }
        })
    }, [])

    const syncAttendance = () => {
        NetInfo.fetch().then(state => {
            if(!state.isConnected) {
                Toast.show({
                    text: "You're not connected to internet...",
                    duration: 2000
                })
            } else {
                setTimeout(() => {
                    Toast.show({
                        text: "Previous attendances synced",
                        duration: 2000
                    })
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
                    setAttendanceToSync([])
                }, 1000)
            }
        })
    }

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
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Attend</Text>
                </Button>

            </Content>
            {
                attendanceToSync.length > 0 ? (
                    <View>
                        <Button style={{alignSelf: 'center'}} small success rounded onPress={syncAttendance}><Text>Sync previous attendances</Text></Button>
                        <FlatList
                            style={{width: windowWidth, maxHeight: windowHeight / 6, alignSelf: 'center', marginTop: 10}}
                            data={attendanceToSync}
                            renderItem={({ item }) => <Text style={{textAlign: 'center'}}>{item.toLocaleString()}</Text>}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                ) : <View></View>
            }
            
        </Container>
    )
}

export default Profile