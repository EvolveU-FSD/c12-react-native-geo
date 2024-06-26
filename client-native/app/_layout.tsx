import { Stack } from "expo-router";
import LoginButton from "@/components/LoginButton";

export default function RootLayout() {
  return (
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
  );
}
