import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Users, Lock, Mail, ArrowLeft } from "lucide-react-native";

export default function StaffIndex() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);

    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      // For demo purposes, accept any email/password
      router.push("/staff/(tabs)");
    }, 1500);
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: "#1A1A1A", paddingTop: insets.top }}
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
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#404040",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
          }}
        >
          <ArrowLeft size={20} color="#D4AF37" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#D4AF37",
          }}
        >
          Staff Login
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 40,
          justifyContent: "center",
        }}
      >
        {/* Logo/Icon */}
        <View
          style={{
            alignItems: "center",
            marginBottom: 40,
          }}
        >
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
            <Users size={40} color="#D4AF37" />
          </View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#D4AF37",
              marginBottom: 8,
            }}
          >
            AGOWASS Staff
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#B8B8B8",
              textAlign: "center",
            }}
          >
            Sign in to access your dashboard
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
          {/* Email Input */}
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: "#D4AF37",
                marginBottom: 8,
              }}
            >
              Email Address
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
              <Mail size={20} color="#B8B8B8" style={{ marginRight: 12 }} />
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: "#FFFFFF",
                }}
                placeholder="Enter your email"
                placeholderTextColor="#6B7280"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
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
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: "#FFFFFF",
                }}
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
              backgroundColor: loading ? "#B8860B" : "#D4AF37",
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: "center",
              marginBottom: 16,
            }}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1A1A1A",
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 14,
                color: "#D4AF37",
                textDecorationLine: "underline",
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
