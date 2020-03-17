import React, { useState, useEffect } from "react"
import { Modal, FlatList, View, Dimensions, UIManager, LayoutAnimation } from 'react-native'
import {
    Container,
    Content,
    Text,
    Button,
    Toast
} from 'native-base'
import NetInfo from "@react-native-community/netinfo"
import AsyncStorage from '@react-native-community/async-storage'

import ModalScreen from './ModalScreen'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
UIManager.setLayoutAnimationEnabledExperimental(true)
const sessionsUnsyncedData = [
    {timeStamp: new Date(), ids: [457, 478]},
    {timeStamp: new Date(), ids: [789, 654]},
    {timeStamp: new Date(), ids: [537, 985]},
    {timeStamp: new Date(), ids: [124, 563]},
    {timeStamp: new Date(), ids: [417, 254]}
]

const Profile = ({route}) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [sessionsUnsynced, setSessionsUnsynced] = useState([])

    const unsubscribe = NetInfo.addEventListener(state => {
        if(state.isConnected) {
            if(state.isConnected) {
                Toast.show({
                    text: "You are now connected",
                    duration: 2000
                })
            } else {
                Toast.show({
                    text: "You are not longer connected",
                    duration: 2000
                })
            }
        }   
    })

    useEffect(() => {
        async function getSessionsUnsynced() {
            await AsyncStorage.setItem('SESSIONS_UNSYNCED', JSON.stringify(sessionsUnsyncedData)) //remove this
            const sessions_unsynced = await AsyncStorage.getItem('SESSIONS_UNSYNCED')
            if(sessions_unsynced != null) {
                const { isConnected } = await NetInfo.fetch()
                if(isConnected) {
                    await syncSessions()
                } else {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
                    setSessionsUnsynced(JSON.parse(sessions_unsynced))
                }
            }
        }
        getSessionsUnsynced()
    }, [])

    const syncSessions = async () => {
        const { isConnected } = await NetInfo.fetch()
        if(isConnected) {
            await AsyncStorage.removeItem('SESSIONS_UNSYNCED')
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
            setSessionsUnsynced([])
            Toast.show({
                text: "Previous sessions synced!",
                duration: 2000
            })
        } else {
            Toast.show({
                text: "No connection, impossible to sync",
                duration: 2000
            })
        }
        
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
                sessionsUnsynced.length > 0 ? (
                    <View>
                        <Button style={{alignSelf: 'center'}} small success rounded onPress={syncSessions}><Text>Sync previous sessions</Text></Button>
                        <FlatList
                            style={{width: windowWidth, maxHeight: windowHeight / 6, alignSelf: 'center', marginTop: 10}}
                            data={sessionsUnsynced.map(i => new Date(i.timeStamp))}
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