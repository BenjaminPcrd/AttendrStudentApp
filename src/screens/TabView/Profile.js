import React from "react"
import {
    Container,
    Content,
    Thumbnail,
    Text,
    Button
} from 'native-base'

const Profile = () => {
    return (
        <Container>
            <Content contentContainerStyle={{ justifyContent: 'space-evenly', alignItems: 'center', flex: 1 }}>
                <Thumbnail large source={{uri: 'http://placekitten.com/100/100'}}/>
                <Text>Name of the student</Text>
                <Text>Id</Text>
                <Button block style={{ margin: 15, marginTop: 50 }}>
                    <Text>Attend</Text>
                </Button>
            </Content>
        </Container>
    )
}

export default Profile