import React, { useEffect, useState, useCallback } from "react"

import {
    FlatList,
    View,
    RefreshControl
} from 'react-native'

import { 
    Container,
    Spinner,
    Text,
    Toast
} from "native-base"

import TimetableCard from './TimetableCard'

import AsyncStorage from '@react-native-community/async-storage'

function getTimetableData() {
    const url = "http://bepicard.com/timetable"
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then(json => resolve(json))
            .catch(err => reject(err))
    })
}

const Timetable = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [timetableData, setTimetableData] = useState()
    const [lastUpdate, setLastUpdate] = useState()
    const [count, setCount] = useState(0)

    async function update() {
        console.log("update")
        const json = await getTimetableData()
        await AsyncStorage.setItem('timetable', JSON.stringify(json))
        setTimetableData(json)

        const date = new Date()
        await AsyncStorage.setItem('lastUpdate', date.toISOString())
        setLastUpdate(date)
        setRefreshing(false)
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        update().catch(err => {
            Toast.show({
                text: "Couldn't get data",
                duration: 2000
            })
            setRefreshing(false)
        })
        //setTimeout(() => setRefreshing(false), 2000)
      }, [refreshing])

    useEffect(() => {
        async function getTimetable() {
            const timetable = await AsyncStorage.getItem('timetable')
            const lastTimetableUpdate = await AsyncStorage.getItem('lastUpdate')
            if(timetable == null || lastTimetableUpdate == null) {
                update()
            } else if(new Date(lastTimetableUpdate).getDate() != new Date().getDate()) {
                update()
            } else {
                setTimetableData(JSON.parse(timetable))
                setLastUpdate(new Date(lastTimetableUpdate))
            }
        }
        getTimetable()

        setInterval(() => setCount((prevCount) => prevCount + 1), 15000)
    }, [])

    function lastUpdateLabel() {
        if(lastUpdate == undefined) {
            return "Updating..."
        } else {
            let dif = Math.floor(((new Date() - lastUpdate) / 1000) / 60)
            if(dif >= (60 * 24)) {
                return "Updated a long time ago"
            } else if(dif >= 60) {
                return "Updated " + Math.floor(dif / 60) + " hours ago"
            } else if(dif > 0) {
                return "Updated " + dif + " minutes ago"
            } else {
                return "Updated just now"
            }
        }
    }
    
    return (
        <Container style={{paddingLeft: 5, paddingRight: 5}}>
            <FlatList 
                data={timetableData}
                renderItem={({ item }) => <TimetableCard item={item}/>}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => {
                    return (
                        <View>
                            <Text style={{marginTop: 10, textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>{new Date().toDateString()}</Text>
                            <Text style={{color: 'grey'}}>{lastUpdateLabel()}</Text>
                            
                        </View>
                    )
                }}
                ListEmptyComponent={<Spinner color='#712177'/>}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </Container>
    )
}

export default Timetable