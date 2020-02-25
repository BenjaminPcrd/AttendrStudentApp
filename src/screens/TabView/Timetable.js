import React, { useEffect, useState, useCallback } from "react"

import {
    FlatList,
    View,
    RefreshControl
} from 'react-native'

import { 
    Container,
    Card,
    CardItem,
    Text,
    Body,
    Badge,
    Icon,
    Button
} from "native-base"

import { getTimetableData } from '../../api/timetableApi'

import TimetableCard from './TimetableCard'

const Timetable = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [timetableData, setTimetableData] = useState()

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        setTimeout(() => setRefreshing(false), 2000)
      }, [refreshing])

    /*const getUpdatedLabel = (date1, date2) => {
        console.log(new Date(date1 - date2).getUTCSeconds())
        let dif = new Date(date1 - date2)
        if(dif.getUTCHours() > 0) return <Text style={{color: 'grey'}}>Updated a long time ago</Text>
        if(dif.getUTCMinutes() == 0) return <Text style={{color: 'grey'}}>Updated just now</Text>
        return <Text style={{color: 'grey'}}>Updated {dif.getUTCMinutes()} minutes ago</Text>
    }*/

    useEffect(() => {
        console.log("UseEffect")
        getTimetableData().then(res => setTimetableData(res))
    }, [])

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
                            {/*getUpdatedLabel(now, updatedAt)*/}
                            <Text style={{color: 'grey'}}>Updated just now</Text>
                        </View>
                    )
                }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </Container>
    )
}

export default Timetable