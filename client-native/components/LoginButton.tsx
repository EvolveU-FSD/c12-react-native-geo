import { useState } from "react";
import { Button } from "react-native";
import LoginModal from "./LoginModal";

export default function LoginButton() {
    const [showLogin, setShowLogin] = useState(false)

    return (
        <>
            <Button
                onPress={() => setShowLogin(true)}
                title="Login"
            />
            <LoginModal visible={showLogin} onClose={() => setShowLogin(false)}/>
        </>
    )
}