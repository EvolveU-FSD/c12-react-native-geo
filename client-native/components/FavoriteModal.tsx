import { useState } from "react";
import { Button, Modal, Text, TextInput, View } from "react-native";
import { IfLoggedIn, IfNotLoggedIn } from "./LoginContext";
import LoginModal from "./LoginModal";
import { createFavorite, hasApiCredentials } from "@/api";

export default function FavoriteModal({ visible, point, onSave, onCancel }) {
    const [name, setName] = useState('')
    const [saveError, setSaveError] = useState('')

    async function savePressed() {
        try {
            setSaveError('')
            const newFavorite = await createFavorite(name, point.latitude, point.longitude)
            setName('')
            onSave()
        }        
        catch (err) {
            console.log(err)
            setSaveError(err.message)
        }
    }

    async function cancelPressed() {
        setName('')
        setSaveError('')
        onCancel()
    }

    const loginClosed = () => {
        if (!hasApiCredentials()) {
            // user cancelled login, just close out of favorite add
            onCancel()
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
                            { saveError && <Text>{saveError}</Text> }
                            <Button title="Save" onPress={savePressed} />
                            <Button title="Cancel" onPress={cancelPressed} />
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