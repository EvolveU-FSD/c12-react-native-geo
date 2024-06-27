import { useContext, useState } from "react";
import { Button, Modal, Text, TextInput, View } from "react-native";
import LoginContext, { IfLoggedIn, IfNotLoggedIn } from "./LoginContext";
import LoginModal from "./LoginModal";
import { hasApiCredentials } from "@/api";

export default function FavoriteModal({ visible, onClose }) {
    const [name, setName] = useState('')

    const loginContext = useContext(LoginContext)
    const loginClosed = () => {
        if (!hasApiCredentials()) {
            // user cancelled login, just close out of favorite add
            onClose()
        }
    }

    return (
        <>
            <IfLoggedIn>
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
                                New Favorite
                            </Text>

                            <Text>Name</Text>
                            <TextInput 
                                style={{ borderWidth: 1, padding: 5}}
                                value={name}
                                onChangeText={setName}
                            />
                            <Button title="Save" onPress={() => { console.log('Save' )}} />
                            <Button title="Cancel" onPress={onClose} />
                        </View>
                    </View>
                </Modal>
            </IfLoggedIn>
            <IfNotLoggedIn>
                <LoginModal
                    title='Sign in to add new favorite' 
                    visible={visible} 
                    onClose={loginClosed} 
                />
            </IfNotLoggedIn>
        </>
    )
}