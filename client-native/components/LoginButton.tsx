import { useContext, useState } from "react";
import { Button } from "react-native";
import LoginModal from "./LoginModal";
import LoginContext, { IfLoggedIn, IfNotLoggedIn } from "./LoginContext";

export default function LoginButton() {
    const [showLogin, setShowLogin] = useState(false)
    const loginContext = useContext(LoginContext)
    return (
        <>
            <IfNotLoggedIn>
                <Button
                    onPress={() => setShowLogin(true)}
                    title="Login"
                />
                <LoginModal visible={showLogin} onClose={() => setShowLogin(false)}/>
            </IfNotLoggedIn>
            <IfLoggedIn>
                <Button
                    onPress={() => loginContext.logout()}
                    title="Logout"
                />
            </IfLoggedIn>
        </>
    )
}