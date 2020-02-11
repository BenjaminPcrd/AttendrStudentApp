import 'react-native-gesture-handler';
import React from "react"

import Login from "./screens/Login"
import TabView from './screens/TabView'
import {
    StyleProvider
} from "native-base"

import getTheme from "../native-base-theme/components"
import material from "../native-base-theme/variables/material"

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const App = () => {
    return (
        <NavigationContainer>
            <StyleProvider style={getTheme(material)}>
                <Stack.Navigator headerMode='none' initialRouteName="Login">
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="TabView" component={TabView} />
                </Stack.Navigator>
            </StyleProvider>
        </NavigationContainer>
        
    )
}

export default App