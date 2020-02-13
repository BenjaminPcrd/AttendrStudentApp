import React, { useContext } from "react"
import { Image, Alert } from 'react-native'
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
    Icon,
    Text,
    Toast
} from "native-base"
import { AuthContext } from '../../App'

const Login = (props) => {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const { signIn } = useContext(AuthContext)

    const login = () => {
        if(username === "" && password === "") {
            Toast.show({
                text: "Please enter a username and a password",
                duration: 2000
            })
        } else if (username === "") {
            Toast.show({
                text: "Please enter a username",
                duration: 2000
            })
        } else if (password === "") {
            Toast.show({
                text: "Please enter a password",
                duration: 2000
            })
        } else  {
            signIn({ username, password})
        }
    }

    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => Alert.alert(
                        'Information',
                        'RGU attend app',
                        [
                            {text: 'Ok'}
                        ]
                    )}>
                        <Icon name='md-information-circle-outline' />
                    </Button>
                </Left>
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