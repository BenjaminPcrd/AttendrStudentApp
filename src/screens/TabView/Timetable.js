import React from "react"

import {
    FlatList,
    View
} from 'react-native'

import { 
    Container, 
    Content,
    Card,
    CardItem,
    Text,
    Body,
    Badge,
    Icon
} from "native-base"

const timetableData = require('./timetable.json')

const MyCard = ({ item }) => {
    return (
        <Card>
            <CardItem>
                <Body>
                    {
                        item.type === "Teaching-Lecture" ? (
                            <Badge success>
                                <Text>{item.type}</Text>
                            </Badge>
                        ) : (
                            <Badge info>
                                <Text>{item.type}</Text>
                            </Badge>
                        )
                    }
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.moduleName}</Text>
                    {/*<Text>{new Date(item.start).toDateString()}</Text>*/}
                    <Text style={{color: 'grey'}}>{item.staff}</Text>
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
    return (
        <Container style={{padding: 5}}>
            <FlatList 
                data={timetableData}
                renderItem={({ item }) => <MyCard item={item}/>}
                keyExtractor={(item, index) => index.toString()}
            />
        </Container>
    )
}

export default Timetable