// app/_layout.jsx
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/utils/auth/AuthContext";
import { View, Text, Image } from "react-native";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function RootNavigator() {
  const { loading, logout, user } = useAuth(); // This is now from AuthContext

  const handleLogout = async () => {
    await logout();
  };
  
  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F8FAFC",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/loading.png")} // put your gif in the assets folder
          style={{ width: 250, height: 250 }}
        />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        // Logged in
        <Stack.Screen name="student/(tabs)" />
      ) : (
        // Not logged in
        <Stack.Screen name="index" />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>  
          <RootNavigator />
        </AuthProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
