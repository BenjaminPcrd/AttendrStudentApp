import React from "react"
import Login from "./screens/Login"
import TabView from './screens/TabView'
import {
    StyleProvider
} from "native-base"

import getTheme from "../native-base-theme/components"
import material from "../native-base-theme/variables/material"

const App = () => {
    return (
        <StyleProvider style={getTheme(material)}>
            <TabView />
        </StyleProvider>
        
    )
}

export default App