import 'react-native-gesture-handler'
import React, {
    createContext,
    useReducer,
    useMemo
} from "react"

import Login from "./screens/Login"
import TabView from './screens/TabView'
import Profile from './screens/TabView/Profile'
import Timetable from './screens/TabView/Timetable'

import {
    StyleProvider,
    Button,
    Root
} from "native-base"

import getTheme from "../native-base-theme/components"
import material from "../native-base-theme/variables/material"

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

export const AuthContext = createContext()
const Stack = createStackNavigator()

const App = ({ navigation }) => {
    const [state, dispatch] = useReducer(
        (prevState, action) => {
        switch(action.type) {
            case 'SIGN_IN':
                return {
                    ...prevState,
                    isSignout: false,
                    userToken: action.token
                }
            case 'SIGN_OUT':
                return {
                    ...prevState,
                    isSignout: true,
                    userToken: null
                }
        }
    }, 
    {
        isSignout: true,
        userToken: null
    })

    const authContext = useMemo(
        () => ({
            signIn: async data => {
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' })
            },
            signOut: () => {
                dispatch({ type: 'SIGN_OUT' })
            },
        }), []
    )

    return (
        <StyleProvider style={getTheme(material)}>
            <Root>

                <AuthContext.Provider value={authContext}>
                    <NavigationContainer>
                        <Stack.Navigator headerMode='none'>
                            {state.userToken === null ? (
                                <Stack.Screen name="Login" component={Login} />
                            ) : (
                                <Stack.Screen name="TabView" component={TabView} />
                            )}
                        </Stack.Navigator>
                    </NavigationContainer>
                </AuthContext.Provider>
                
            </Root>
        </StyleProvider>
    )
}

export default App