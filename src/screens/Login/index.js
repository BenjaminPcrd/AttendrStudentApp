import React from "react"
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
                <Form>
                    <Item stackedLabel>
                        <Label>Username</Label>
                        <Input />
                    </Item>
                    <Item stackedLabel>
                        <Label>Password</Label>
                        <Input secureTextEntry={true}/>
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