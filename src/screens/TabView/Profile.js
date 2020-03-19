import React, { useState, useEffect } from "react"
import { Modal, FlatList, View, Dimensions, UIManager, LayoutAnimation } from 'react-native'
import {
    Container,
    Content,
    Text,
    Button,
    Toast,
    InputGroup
} from 'native-base'
import NetInfo from "@react-native-community/netinfo"
import AsyncStorage from '@react-native-community/async-storage'
import AttendanceControls from 'react-native-attendance-handler'

import ModalScreen from './ModalScreen'
import { TouchableOpacity } from "react-native-gesture-handler"

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
UIManager.setLayoutAnimationEnabledExperimental(true)
var sessionsUnsyncedData = [
    { timeStamp: Date.now(), ids: [457, 478] },
    { timeStamp: Date.now(), ids: [789, 654] },
    { timeStamp: Date.now(), ids: [537, 985] }
]

const Profile = ({ route }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [sessionsUnsynced, setSessionsUnsynced] = useState([])
    const [cancelAttendance, setCancelAttendance] = useState(0)
    const [modalScreenState, setModalScreenState] = useState(0)

    /*const unsubscribe = NetInfo.addEventListener(state => {
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
    })*/

    useEffect(() => {
        async function getSessionsUnsynced() {
            await AsyncStorage.setItem('SESSIONS_UNSYNCED', JSON.stringify(sessionsUnsyncedData)) //remove this
            const sessions_unsynced = await AsyncStorage.getItem('SESSIONS_UNSYNCED')
            if (sessions_unsynced != null) {
                const { isConnected } = await NetInfo.fetch()
                /*if(isConnected) {
                    await syncSessions()
                } else {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
                    setSessionsUnsynced(JSON.parse(sessions_unsynced))
                }*/
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
                setSessionsUnsynced(JSON.parse(sessions_unsynced))
            }
        }
        getSessionsUnsynced()
    }, [])

    const syncSessions = async () => {
        const { isConnected } = await NetInfo.fetch()
        if (isConnected) {
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

    const setUnsyncedData = async (data) => {
        var unsyncData = await AsyncStorage.getItem('SESSIONS_UNSYNCED')   
        if(unsyncData){
            unsyncData = JSON.parse(unsyncData)
            unsyncData.push(data)
            AsyncStorage.setItem("SESSIONS_UNSYNCED", JSON.stringify(unsyncData))
        }
        else{
            AsyncStorage.setItem("SESSIONS_UNSYNCED", JSON.stringify([data]))
        }
        setSessionsUnsynced(prevState => [...prevState, data])
        setModalScreenState(1)
    }

    return (
        <Container>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                <ModalScreen modalState={modalScreenState} exitFunc={setCancelAttendance} setModalVisible={setModalVisible} />
            </Modal>
            <Content padder contentContainerStyle={{ justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 30 }}>Hello Benjamin</Text>
                <Text style={{marginTop:-60}}>1907005</Text>

                {/*<Button block rounded style={{ margin: 15, marginTop: 50, height: 100 }} onPress={() => setModalVisible(true)}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Attend</Text>
                </Button>*/}
                <TouchableOpacity style={{marginBottom: 80}} onPress={() => { setModalVisible(true); setCancelAttendance(0); setModalScreenState(0) }}>
                    <AttendanceControls changeModalState={setModalScreenState} syncFunc={setUnsyncedData} exitCall={cancelAttendance} buttonStartText={"Start Attendance"} buttonStopText={"Stop Attendance"} type={1} successCounter={5} timeout={60000} />
                </TouchableOpacity>

            </Content>
            {
                sessionsUnsynced.length > 0 ? (
                    <View style={{marginBottom: 80}}>
                        <Button style={{ alignSelf: 'center' }} small success rounded onPress={syncSessions}><Text>Sync previous sessions</Text></Button>
                        <FlatList
                            style={{ width: windowWidth, maxHeight: windowHeight / 6, alignSelf: 'center', marginTop: 10 }}
                            data={sessionsUnsynced}
                            renderItem={({ item }) => <Text style={{ textAlign: 'center' }}>{new Date(item.timeStamp).toLocaleString() + " "}{item.ids.map(id => "| " + id + " ")}</Text>}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                ) : <View></View>
            }
        </Container>
    )
}

export default Profile