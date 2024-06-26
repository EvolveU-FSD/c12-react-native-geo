import { useState } from "react";
import { Button, Modal, Text, TextInput, View } from "react-native";

export default function FavoriteModal({ visible, onClose }) {
    const [name, setName] = useState('')

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
    )
}