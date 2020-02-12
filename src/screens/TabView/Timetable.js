import React from "react"

import {
    TouchableOpacity,
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
                    <Text style={{color: 'grey'}}>{item.staff}</Text>
                </Body>
            </CardItem>
            <CardItem style={{flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#DDD'}}>
                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                    <Icon name="md-clock" style={{color: '#712177'}}/>
                    <Text>{item.duration}</Text>
                </View>
                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                    <Icon name="md-pin" style={{color: '#712177'}}/>
                    <Text>{item.location}</Text>
                </View>
            </CardItem>
        </Card>
    )
}

const Timetable = () => {
    return (
        <Container>
            <Content padder>
                <FlatList 
                    data={timetableData}
                    renderItem={({ item }) => <MyCard item={item}/>}
                    keyExtractor={(item, index) => index}
                />
            </Content>
        </Container>
    )
}

export default Timetable