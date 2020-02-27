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
                <View style={{
                    flex: 1, 
                    backgroundColor: item.typeId == 0 ? "rgb(100, 200, 100)" : "rgb(200, 100, 150)", 
                    paddingLeft: 10, paddingTop: 5, paddingBottom: 5,
                    borderRadius: 10
                }}><Text style={{color: 'black'}}>{item.type}</Text></View>
            </CardItem>
            <CardItem>
                <Left style={{flex: 3}}>
                    <Body>
                        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'rgb(100, 100, 200)'}}>{item.moduleName}</Text>
                        <Text style={{color: 'grey'}}>{item.staff}</Text>
                    </Body>
                </Left>
                <Right style={{flex: 1}}>
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