import React from "react"
import { Image } from 'react-native'
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Title,
    Content,
    Form,
    Item,
    Label,
    Input,
    Button,
    Text
} from "native-base"

const Login = ({ navigation }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    //const { signIn } = React.useContext(AuthContext);
    const login = () => {
        navigation.navigate('TabView')
    }

    return (
        <Container>
            <Header>
                <Left />
                <Body>
                    <Title>RGU Attend</Title>
                </Body>
                <Right />
            </Header>
            <Content contentContainerStyle={{ justifyContent: 'space-evenly', flex: 1 }}>
                <Image source={require('../../assets/rgu.png')} style={{width: 300, height: 50, alignSelf: 'center'}}/>
                <Form>
                    <Item stackedLabel>
                        <Label>Username</Label>
                        <Input value={username} onChangeText={setUsername}/>
                    </Item>
                    <Item stackedLabel>
                        <Label>Password</Label>
                        <Input secureTextEntry={true} value={password} onChangeText={setPassword}/>
                    </Item>
                </Form>
                <Button block style={{ margin: 15, marginTop: 50 }} onPress={login}>
                    <Text>Sign In</Text>
                </Button>
            </Content>
      </Container>
    )
}

export default Login