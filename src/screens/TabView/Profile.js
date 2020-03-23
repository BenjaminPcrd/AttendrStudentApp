import React, { useState, useEffect } from "react"
import { Modal, FlatList, View, Dimensions, UIManager, LayoutAnimation, StyleSheet } from 'react-native'
import {
    Container,
    Content,
    Text,
    Button,
    Toast,
    Icon
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
            <Content padder>
                <View style={styles.top}>
                    <Text style={styles.hello}>Hello</Text>
                    <Text style={styles.name}>Benjamin Franklin</Text>
                    <Text style={styles.number}>1907005</Text>
                </View>
                
                <TouchableOpacity style={styles.button} onPress={() => { setModalVisible(true); setCancelAttendance(0); setModalScreenState(0) }}>
                    <AttendanceControls changeModalState={setModalScreenState} syncFunc={setUnsyncedData} exitCall={cancelAttendance} buttonStartText={"Start Attendance"} buttonStopText={"Stop Attendance"} type={1} successCounter={5} timeout={60000} />
                </TouchableOpacity>

            </Content>
            {
                sessionsUnsynced.length > 0 ? (
                    <View>
                        <View style={styles.bottom}>
                            <Text style={styles.prevSes}>Previous sessions</Text>
                            <Button transparent onPress={syncSessions}><Icon name={'md-sync'} style={styles.iconSync}/><Text style={styles.textSync}>sync now</Text></Button>
                        </View>
                        <FlatList
                            style={styles.flatList}
                            data={sessionsUnsynced}
                            renderItem={({ item }) => <Text>{new Date(item.timeStamp).toLocaleString() + " "}{item.ids.map(id => "| " + id + " ")}</Text>}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                ) : <View></View>
            }
        </Container>
    )
}

const styles = StyleSheet.create({
    top: { flex: 1, marginTop: 10, marginLeft: 10 },
    hello: { fontSize: 45 },
    name: { fontSize: 30, fontWeight: 'bold', color: '#712177' },
    number: { fontSize: 20, marginTop: 10 },
    button: { marginTop: 80 },
    bottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    prevSes: { marginLeft: 15, color: '#712177', fontWeight: 'bold', fontSize: 15, },
    iconSync: { color: "green", marginRight: 0},
    textSync: { color: "green", marginRight: 10 },
    flatList: { width: windowWidth, maxHeight: windowHeight / 6, marginLeft: 15, marginBottom: 15 }
})

export default Profile