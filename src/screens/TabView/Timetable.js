import React from "react"

import {
    TouchableOpacity,
    FlatList
} from 'react-native'

import { 
    Container, 
    Content,
    Card,
    CardItem,
    Text,
    Body,

} from "native-base"

const MyCard = () => {
    return (
        <TouchableOpacity activeOpacity={0.5}>
            <Card>
                <CardItem header bordered>
                    <Text>Lecture</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            Details
                        </Text>
                    </Body>
                </CardItem>
                <CardItem footer bordered>
                    <Text>Date</Text>
                </CardItem>
            </Card>
        </TouchableOpacity>
    )
}

const Timetable = () => {
    return (
        <Container>
            <Content padder>
                <MyCard />
                <MyCard />
                <MyCard />
                <MyCard />
                <MyCard />
                <MyCard />
                <MyCard />
            </Content>
        </Container>
    )
}

export default Timetable