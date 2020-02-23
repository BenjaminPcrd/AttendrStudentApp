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

const timetableData = require('./timetable.json')

function getData() {
    return new Promise((resolve, reject) => resolve(timetableData))
}

const MyCard = ({ item }) => {
    return (
        <Card>
            <CardItem>
                <Body style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <View style={{flex: 3}}>
                        <Badge info><Text>{item.type}</Text></Badge>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.moduleName}</Text>
                        {/*<Text>{new Date(item.start).toDateString()}</Text>*/}
                        <Text style={{color: 'grey'}}>{item.staff}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', alignSelf: 'center'}}>
                        {/*<Icon name="md-checkmark" style={{color: '#712177'}}/>*/}
                        <Icon name="md-done-all" style={{color: '#712177', fontSize: 50}}/>
                    </View>
                    
                </Body>
            </CardItem>
            <CardItem style={{flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#DDD'}}>
                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                    <Icon name="md-clock" style={{color: '#712177'}}/>
                    <View>
                        <Text>{new Date(item.start).toLocaleTimeString().replace(/(\d{1,2}:\d{2}):\d{2}/, "$1")}</Text>
                        <Text>{new Date(item.end).toLocaleTimeString().replace(/(\d{1,2}:\d{2}):\d{2}/, "$1")}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                    <Icon name="md-pin" style={{color: '#712177'}}/>
                    <Text style={{flex: 1, flexWrap: 'wrap'}}>{item.location}</Text>
                </View>
            </CardItem>
        </Card>
    )
}

const Timetable = () => {
    const [updatedAt, setUpdatedAt] = useState()
    const [count, setCount] = useState(0)
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        getData().then(res => {
            //manage data
            setRefreshing(false)
            setUpdatedAt(new Date())
        })
      }, [refreshing])

    const getUpdatedLabel = (date1, date2) => {
        console.log(new Date(date1 - date2).getUTCSeconds())
        let dif = new Date(date1 - date2)
        if(dif.getUTCHours() > 0) return <Text style={{color: 'grey'}}>Updated a long time ago</Text>
        if(dif.getUTCMinutes() == 0) return <Text style={{color: 'grey'}}>Updated just now</Text>
        return <Text style={{color: 'grey'}}>Updated {dif.getUTCMinutes()} minutes ago</Text>
    }

    useEffect(() => {
        console.log("UseEffect")
        getData().then(res => {
            //manage data
            setUpdatedAt(new Date())
        })
        //const interval = 
        setInterval(() => setCount(count + 1), 10000)
        //return () => clearInterval(interval);
    }, [])

    return (
        <Container style={{paddingLeft: 5, paddingRight: 5}}>
            <FlatList 
                data={timetableData}
                renderItem={({ item }) => <MyCard item={item}/>}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => {
                    return (
                        <View>
                            <Text style={{marginTop: 10, textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>{new Date().toDateString()}</Text>
                            {getUpdatedLabel(new Date, updatedAt)}
                        </View>
                    )
                }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                
            />
        </Container>
    )
}

export default Timetable