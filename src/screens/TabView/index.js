import React, { useContext, useState } from "react"
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
    Icon,
    Text
} from 'native-base'

import Profile from './Profile'
import Timetable from './Timetable'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AuthContext } from '../../App'

const Tab = createBottomTabNavigator()

const TabView = ({ navigation }) => {
    const { signOut } = useContext(AuthContext)

    const logout = () => {
        Alert.alert(
            'Logout',
            'Do you want to logout?',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Ok', onPress: () => signOut()}
            ]
        )
    }
    
    return (
        <Container>
            <Header hasTabs>
                <Left />
                <Body>
                    <Title>Attend Student</Title>
                </Body>
                <Right>
                    <Button transparent onPress={logout}>
                        <Icon name='md-log-out' />
                    </Button>
                </Right>
            </Header>
            <Tab.Navigator
                lazy={true}
                tabBarOptions={{
                    activeTintColor: "white",
                    activeBackgroundColor: "#712177",
                    inactiveTintColor: "#712177",
                    inactiveBackgroundColor: "white",

                    labelStyle: { fontSize: 13 }
                }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconColor 
                        let iconName = focused ? iconColor = 'white' : iconColor = '#712177'
                        switch(route.name) {
                            case "Profile":
                                iconName = 'md-person'
                                break
                            case "Timetable":
                                iconName = 'md-calendar'
                                break
                        }
                        return <Icon name={iconName} style={{color: iconColor}}/>
                    }
                })}
            >
                <Tab.Screen name='Profile' component={Profile}/>
                <Tab.Screen name='Timetable' component={Timetable}/>
            </Tab.Navigator>
      </Container>
    )
}

export default TabView