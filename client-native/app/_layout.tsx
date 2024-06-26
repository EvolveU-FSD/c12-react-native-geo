import { Stack } from "expo-router";
import LoginButton from "@/components/LoginButton";
import LoginContext, { LoginProvider } from "@/components/LoginContext";

export default function RootLayout() {
  return (
    <LoginProvider>
      <Stack>
        <Stack.Screen 
          name="index"
          options={{ 
            title: 'Favorite Places',
            headerRight: () => (
              <LoginButton />
            ), 
          }} 
        />
      </Stack>
    </LoginProvider>
  );
}
