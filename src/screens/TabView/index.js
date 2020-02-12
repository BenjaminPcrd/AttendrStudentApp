import React from "react"
import {
    Alert,
} from 'react-native'
import { 
    Container, 
    Header, 
    Left, 
    Body, 
    Title, 
    Right, 
    Button,
    Tab, 
    Tabs, 
    TabHeading, 
    Icon, 
    Text 
} from 'native-base'
import Profile from './Profile'
import Timetable from './Timetable'

const TabView = ({ navigation }) => {
    const logout = () => {
        Alert.alert(
            'Logout',
            'Do you want to logout?',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Ok', onPress: () => navigation.navigate('Login')}
            ]
        );
    }

    return (
        <Container>
            <Header hasTabs>
                <Left />
                <Body>
                    <Title>RGU Attend</Title>
                </Body>
                <Right>
                <Button transparent onPress={logout}>
                    <Icon name='md-log-out' />
                </Button>
                </Right>
            </Header>
            <Tabs tabBarPosition={'bottom'}>
                <Tab heading={ <TabHeading><Icon name="md-person" /><Text>Profile</Text></TabHeading>}>
                    <Profile />
                </Tab>
                <Tab heading={ <TabHeading><Icon name="md-calendar" /><Text>Timetable</Text></TabHeading>}>
                    <Timetable />
                </Tab>
            </Tabs>
      </Container>
    )
}

export default TabView