import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { GraduationCap, Lock, User } from "lucide-react-native";
import { useAuth } from "@/utils/auth/AuthContext";
import NetInfo from "@react-native-community/netinfo";

export default function StudentIndex() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const [isConnected, setIsConnected] = useState(true);

  // ✅ Subscribe to connection state
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected && (state.isInternetReachable ?? true));
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (!isConnected) {
      Alert.alert("No Internet", "Please check your connection and try again.");
      return;
    } 

    try { 
      setLoading(true);
      const { success, message } = await login(studentId, password);
      setLoading(false);

      if (!success) {
        Alert.alert("Login Failed", message || "Invalid credentials");
      } else {
        // router.push("/student/dashboard"); // ✅ redirect after login
      }
    } catch (err) {
      setLoading(false);
      console.error("Login error:", err);
      Alert.alert("Error", err.message || "Something went wrong, try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#c9c8c8ff",
            paddingTop: insets.top,
          }}
        >
          <StatusBar style="light" />

          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#2D2D2D",
              paddingHorizontal: 20,
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#404040",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#D4AF37",
              }}
            >
              AGONA WASSA M/A J.H.S
            </Text>
          </View>

          {/* ⚡ Offline Banner */}
          {!isConnected && (
            <View style={{ backgroundColor: "#ef4444", padding: 10 }}>
              <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>
                ⚠️ No Internet Connection
              </Text>
            </View>
          )}

          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              paddingVertical: 40,
              justifyContent: "center",
            }}
          >
            {/* Logo/Icon */}
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: "#2D2D2D",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  borderWidth: 2,
                  borderColor: "#D4AF37",
                }}
              >
                <GraduationCap size={40} color="#D4AF37" />
              </View>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "#1b1a1aff",
                  marginBottom: 8,
                }}
              >
                Student Login
              </Text>
            </View>

            {/* Login Form */}
            <View
              style={{
                backgroundColor: "#2D2D2D",
                borderRadius: 16,
                padding: 24,
                borderWidth: 1,
                borderColor: "#404040",
              }}
            >
              {/* Student ID Input */}
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#D4AF37",
                    marginBottom: 8,
                  }}
                >
                  Student ID
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#1A1A1A",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    borderWidth: 1,
                    borderColor: "#404040",
                  }}
                >
                  <User size={20} color="#B8B8B8" style={{ marginRight: 12 }} />
                  <TextInput
                    style={{ flex: 1, fontSize: 16, color: "#FFFFFF" }}
                    placeholder="Enter your student ID"
                    placeholderTextColor="#6B7280"
                    value={studentId}
                    onChangeText={setStudentId}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#D4AF37",
                    marginBottom: 8,
                  }}
                >
                  Password
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#1A1A1A",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    borderWidth: 1,
                    borderColor: "#404040",
                  }}
                >
                  <Lock size={20} color="#B8B8B8" style={{ marginRight: 12 }} />
                  <TextInput
                    style={{ flex: 1, fontSize: 16, color: "#FFFFFF" }}
                    placeholder="Enter your password"
                    placeholderTextColor="#6B7280"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
              </View>
              
              {/* Login Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: !isConnected
                    ? "#9CA3AF" // gray when offline
                    : loading
                    ? "#B8860B" // dark gold when loading
                    : "#D4AF37", // normal gold
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: "center",
                  marginBottom: 16,
                }}
                onPress={handleLogin}
                disabled={loading || !isConnected} // disable when offline or loading
                activeOpacity={0.8}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: !isConnected ? "#4B5563" : "#1A1A1A", // darker text when offline
                  }}
                >
                  {!isConnected
                    ? "No Internet"
                    : loading
                    ? "Signing In..."
                    : "Sign In"}
                </Text>
              </TouchableOpacity>
                  
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
