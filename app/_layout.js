import { Stack, SplashScreen } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from 'expo-font';
import { useEffect } from "react";
import AudioPlayer from "../components/AudioPlayer";
import { GlobalStateProvider } from "../GlobalStateContext";

export default function Layout() {
  
  const [fontsLoaded, fontError] = useFonts({
    'AlQalam Shamil.ttf': require('../assets/fonts/AlQalamShamil.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
    return null;
  }
  
  return (
    <SafeAreaProvider>
      <GlobalStateProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="category/[_id]"
          options={{ headerShown: false, animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="article/[_id]"
          options={{ headerShown: false, animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="articledetail/[id]"
          options={{ headerShown: false, animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="modal/[src]"
          options={{ headerShown: false, presentation: 'modal', animation: 'slide_from_bottom' }}
        />
      </Stack>
      <AudioPlayer/>
      </GlobalStateProvider>
    </SafeAreaProvider>
  );
}