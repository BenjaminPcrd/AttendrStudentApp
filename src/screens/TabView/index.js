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
    TabHeading, 
    Icon, 
    Text 
} from 'native-base'

import Profile from './Profile'
import Timetable from './Timetable'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator()

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
            {/*<Tabs tabBarPosition={'bottom'}>
                <Tab heading={ <TabHeading><Icon name="md-person" /><Text>Profile</Text></TabHeading>}>
                    <Profile />
                </Tab>
                <Tab heading={ <TabHeading><Icon name="md-calendar" /><Text>Timetable</Text></TabHeading>}>
                    <Timetable />
                </Tab>
            </Tabs>*/}
            <Tab.Navigator
                lazy={false}
                tabBarPosition={'bottom'}
                tabBarOptions={{
                    activeTintColor: "white",
                    inactiveTintColor: "grey",
                    style: { backgroundColor: '#712177' },
                    indicatorStyle: { backgroundColor: 'white' },
                    labelStyle: { marginBottom: 0, fontWeight: 'bold' },
                    showIcon: true
                }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconColor = focused ? 'white' : 'grey'
                        let iconName
                        if(route.name === 'Profile') {
                            iconName = 'md-person'
                        } else {
                            iconName = 'md-calendar'
                        }
                        return <Icon name={iconName} style={{color: iconColor}}/>
                    }
                })}
            >
                <Tab.Screen name='Profile' component={Profile} />
                <Tab.Screen name='Timetable' component={Timetable} />
            </Tab.Navigator>
      </Container>
    )
}

export default TabView