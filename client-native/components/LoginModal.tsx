import { useContext, useState } from "react";
import { Button, Modal, Text, TextInput, View } from "react-native";
import LoginContext from "./LoginContext";

export default function LoginModal({ visible, onClose, title='Sign in'}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')

    const {tryLogin} = useContext(LoginContext)

    async function loginPressed() {
        try {
            setLoginError('')
            await tryLogin(username, password)
            onClose()
        }
        catch (err) {
            console.log(err)
            setLoginError("Login Failed")
        }
    }

    return (
        <Modal transparent={true} visible={visible}>
            <View style={{ 
                flex: 1, 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: '#00000040' 
            }}>
                <View style={{
                    alignItems: 'fill', 
                    justifyContent: 'center', 
                    width: '80%', 
                    margin: '10%',
                    padding: '10%',
                    backgroundColor: 'white',
                    gap: 10 
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 700
                    }}>
                        {title}
                    </Text>
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
                    {  loginError && <Text>{loginError}</Text> }
                    <Button title="Login" onPress={loginPressed} />
                    <Button title="Cancel" onPress={onClose} />
                </View>
            </View>
        </Modal>
    )
}