import React from 'react'
import {
    View
} from 'react-native'
import {
    Card,
    CardItem,
    Body,
    Badge,
    Text,
    Icon,
    Left,
    Right
} from 'native-base'

const TimetableCard = ({ item }) => {
    return (
        <Card>
            <CardItem header bordered>
                <Badge primary><Text>{item.type}</Text></Badge>
            </CardItem>
            <CardItem>
                <Left>
                    <Body>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.moduleName}</Text>
                        <Text style={{color: 'grey'}}>{item.staff}</Text>
                    </Body>
                </Left>
                <Right>
                    <Body style={{justifyContent: 'center'}}>
                        {/*<Icon name="md-checkmark" style={{color: '#712177'}}/>*/}
                        <Icon name="md-done-all" style={{color: '#712177', fontSize: 50}}/>
                    </Body>
                </Right>
            </CardItem>
            <CardItem footer bordered>
                <Left>
                    <Icon name="md-clock" style={{color: '#712177'}}/>
                    <Text>{new Date(item.start).toLocaleTimeString().replace(/(\d{1,2}:\d{2}):\d{2}/, "$1")}</Text>
                    <Text>{new Date(item.end).toLocaleTimeString().replace(/(\d{1,2}:\d{2}):\d{2}/, "$1")}</Text>
                </Left>
                <Left>
                    <Icon name="md-pin" style={{color: '#712177'}}/>
                    <Text>{item.location}</Text>
                </Left>
            </CardItem>
        </Card>
    )
}

export default TimetableCard