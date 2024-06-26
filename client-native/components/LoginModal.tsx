import { useState } from "react";
import { Button, Modal, Text, TextInput, View } from "react-native";

export default function LoginModal({ visible, onClose}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function tryLogin() {
        console.log('Login with', username, password)
    }

    return (
        <Modal transparent={true} visible={visible}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{
                    alignItems: 'fill', 
                    justifyContent: 'center', 
                    width: '80%', 
                    margin: '10%',
                    padding: '10%',
                    backgroundColor: 'white',
                    gap: 10 
                }}>
                    <Text>Username</Text>
                    <TextInput 
                        style={{ borderWidth: 1, padding: 5}}
                        value={username}
                        onChangeText={setUsername}
                    />
                    <Text>Password</Text>
                    <TextInput 
                        style={{ borderWidth: 1, padding: 5}} 
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    <Button title="Login" onPress={tryLogin} />
                    <Button title="Cancel" onPress={onClose} />
                </View>
            </View>
        </Modal>
    )
}