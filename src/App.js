import 'react-native-gesture-handler'
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

const AuthContext = React.createContext()
const Stack = createStackNavigator()

const App = () => {
    const [state, dispatch] = React.useReducer(
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
                    userToken: undefined
                }
        }
    }, 
    {
        isSignout: false,
        userToken: null
    })

    const authContext = React.useMemo(
        () => ({
            signIn: async data => {
                console.log(signin)
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' })
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
        }), []
    )

    return (
        <StyleProvider style={getTheme(material)}>

            <AuthContext.Provider value={authContext}>
                <NavigationContainer>
                    <Stack.Navigator headerMode='none'>
                        {/*state.userToken === null ? (
                            <Stack.Screen name="Login" component={Login} />
                        ) : (
                            <Stack.Screen name="TabView" component={TabView} />
                        )*/} 
                        <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="TabView" component={TabView} />{/*use react navigation*/}
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthContext.Provider>

        </StyleProvider>
    )
}

export default App