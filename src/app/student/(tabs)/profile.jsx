// app/student/(tabs)/profile.jsx
import { View, Text, ScrollView, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/utils/auth/AuthContext";
import { Trophy } from "lucide-react-native";
import { getStudentPhoto } from "@/utils/studentPhoto";
import { useState, useEffect } from "react";

export default function Profile() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading ] = useState(true);

  useEffect(() => {
    if (!user?.student_id) return;

    const fetchPhoto = async () => {
      const url = await getStudentPhoto("0" + user.student_id); // if IDs start with 0
      
      setPhotoUrl(url);
      setLoading(false);
    };

    fetchPhoto();
  }, [user]);

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC", paddingTop: insets.top }}>
      <StatusBar style="dark" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture */}
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <View
            style={{
              padding: 6,                
              borderRadius: 24,          
              borderWidth: 3,
              borderColor: "#D4AF37",
              alignSelf: "center",
            }}
          >
            <Image
              source={photoUrl
                ? { uri: photoUrl } // remote Supabase photo
                : require("../../../../assets/images/user.jpg") // local fallback
              }
              style={{
                width: 100,
                height: 150,
                borderRadius: 20,        // image itself still rounded
              }}
            />
          </View> 
          <Text
            style={{
              marginTop: 16,
              fontSize: 22,
              fontWeight: "bold",
              color: "#1E293B",
              textTransform: "uppercase",
            }}
          >
            {user?.student_name || "Student Name"}
          </Text>
          <Text style={{ fontSize: 14, color: "#64748B" }}>
            {user?.class || "Grade 8A"}
          </Text>
        </View>

        {/* Bio Data */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: "#E2E8F0",
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 6,
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#D4AF37",
              marginBottom: 12,
            }}
          >
            Bio Data
          </Text>
          <Text style={{ fontSize: 14, color: "#1E293B", marginBottom: 8 }}>
            <Text style={{ fontWeight: "600" }}>ID:</Text>{" "}
            {"0"+user?.student_id || "0000000"}
          </Text>
          <Text style={{ fontSize: 14, color: "#1E293B", marginBottom: 8 }}>
            <Text style={{ fontWeight: "600" }}>GENDER:</Text>{" "}
            {user?.gender || "Male"}
          </Text>
          <Text style={{ fontSize: 14, color: "#1E293B", marginBottom: 8 }}>
            <Text style={{ fontWeight: "600" }}>NHIS NUMBER:</Text> {user?.nhis || "Number not recorded"}
          </Text>
          <Text style={{ fontSize: 14, color: "#1E293B", textTransform: "uppercase" }}>
            <Text style={{ fontWeight: "600" }}>Emergency:</Text>{" "}
            {user?.e_contact+"("+user?.e_name+")" || "No emergency contact recorded"}
          </Text>
        </View>

        {/* Positions Held */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: "#E2E8F0",
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 6,
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#D4AF37",
              marginBottom: 12,
            }}
          >
            Positions Held
          </Text>
          {user?.positions?.length > 0 ? (
            user.positions.map((pos, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Trophy size={18} color="#F59E0B" style={{ marginRight: 8 }} />
                <Text style={{ fontSize: 14, color: "#1E293B" }}>{pos}</Text>
              </View>
            ))
          ) : (
            <Text style={{ fontSize: 14, color: "#64748B" }}>
              No positions recorded
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
