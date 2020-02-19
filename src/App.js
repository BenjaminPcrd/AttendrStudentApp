import 'react-native-gesture-handler'
import React, {
    createContext,
    useReducer,
    useMemo,
    useEffect
} from "react"

import AsyncStorage from '@react-native-community/async-storage'

import Login from "./screens/Login"
import TabView from './screens/TabView'
import Profile from './screens/TabView/Profile'
import Timetable from './screens/TabView/Timetable'

import {
    StyleProvider,
    Button,
    Root,
    Container,
    Content,
    Spinner
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
            case 'RESTORE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'SIGN_IN':
                return {
                    ...prevState,
                    isSignout: false,
                    userToken: action.token,
                }
            case 'SIGN_OUT':
                return {
                    ...prevState,
                    isSignout: true,
                    userToken: null,
                }
        }
    }, 
    {
        isLoading: true,
        isSignout: false,
        userToken: null
    })

    useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken

            try {
                userToken = await AsyncStorage.getItem('userToken')
            } catch(e) {

            }
            
            dispatch({ type: 'RESTORE_TOKEN', token: userToken })
        }

        bootstrapAsync()
    }, [])

    const authContext = useMemo(
        () => ({
            signIn: async data => {
                await AsyncStorage.setItem('userToken', 'dummy-auth-token')
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' })
            },
            signOut: async () => {
                await AsyncStorage.removeItem('userToken')
                dispatch({ type: 'SIGN_OUT' })
                
            },
        }), []
    )

    if (state.isLoading) {
        return (
            <Container>
                <Content contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Spinner color='#712177'/>
                </Content>
            </Container>
        )
    }

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