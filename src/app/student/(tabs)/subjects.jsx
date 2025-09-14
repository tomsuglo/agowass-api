import { View, Text, ScrollView, TouchableOpacity, Linking, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BookOpen, User, LogOut, Phone } from "lucide-react-native";
import { useAuth } from "@/utils/auth/AuthContext";
import { useEffect, useState } from "react";
import Config from "@/config";

export default function StudentSubjects() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const class_abb = user?.class || "";  // 👈 safe fallback

  const notActiveStudent = !user || class_abb === "Completed" || user.status !== 1;

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🎨 Color palette for subjects
  const colors = ["#D4AF37", "#2563EB", "#16A34A", "#DC2626", "#9333EA", "#F59E0B"];
 

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch(`${Config.API_URL}/subjects/${class_abb}`);
        const data = await res.json();
        setSubjects(Array.isArray(data) ? data : data.subjects || []);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [class_abb]);

  const callTeacher = (phoneNumber) => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl).catch((err) =>
      console.error("Failed to open dialer:", err)
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC", paddingTop: insets.top }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          backgroundColor: "#1E293B",
          paddingHorizontal: 20,
          paddingVertical: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 2,
          borderBottomColor: "#D4AF37",
        }}
      >
        <View>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "#FFFFFF", marginBottom: 2 }}>
            SUBJECTS
          </Text>
          <Text style={{ fontSize: 14, color: "#D4AF37" }}>
            {user?.student_name || "Guest"} • {user?.class || "Undefined"}
          </Text>
        </View>

        {/* Logout */}
        <TouchableOpacity
          onPress={async () => {
            await logout();
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 6,
            paddingHorizontal: 10,
            backgroundColor: "#D4AF37",
            borderRadius: 8,
          }}
        >
          <LogOut size={18} color="#2D2D2D" style={{ marginRight: 6 }} />
          <Text style={{ color: "#2D2D2D", fontWeight: "600" }}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Subjects */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {notActiveStudent ? (
          <View style={{ alignItems: "center", justifyContent: "center", marginTop: 40 }}>
            <Text style={{ marginTop: 10, color: "#1E293B", textAlign: "center" }}>
              Sorry, you are no more an active student. No subjects have been registered for you.
            </Text>
          </View>
        ) : loading ? (
          <View style={{ alignItems: "center", justifyContent: "center", marginTop: 40 }}>
            <ActivityIndicator size="large" color="#D4AF37" />
            <Text style={{ marginTop: 10, color: "#1E293B" }}>Loading Subjects...</Text>
          </View>
        ) : (
          <View style={{ gap: 18 }}>
            {subjects.map((subject, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 16,
                  padding: 16,
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 6,
                  elevation: 3,
                  borderLeftWidth: 5,
                  borderLeftColor: colors[index % colors.length],
                }}
              >
                {/* Subject Info */}
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                  <View
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      backgroundColor: colors[index % colors.length] + "25",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 14,
                    }}
                  >
                    <BookOpen size={22} color={colors[index % colors.length]} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: colors[index % colors.length] }}>
                      {subject.subject_name}
                    </Text>
                    <Text style={{ fontSize: 13, color: "#64748B" }}>{subject.subject_abb}</Text>
                  </View>
                </View>

                {/* Teacher Info */}
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                  <User size={18} color={colors[index % colors.length]} style={{ marginRight: 8 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, color: "#1E293B" }}>{subject.staff_name}</Text>
                    <TouchableOpacity
                      onPress={() => callTeacher("0" + subject.phone_no)}
                      style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
                    >
                      <Phone size={14} color="#64748B" style={{ marginRight: 4 }} />
                      <Text style={{ fontSize: 12, color: "#2563EB", textDecorationLine: "underline" }}>
                        {"0" + subject.phone_no}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Progress Bar */}
                <View style={{ marginTop: 6 }}>
                  <Text style={{ fontSize: 12, color: "#64748B", marginBottom: 4 }}>
                    Progress: {subject.progress || 0}%
                  </Text>
                  <View
                    style={{
                      height: 6,
                      backgroundColor: "#E5E7EB",
                      borderRadius: 6,
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        width: `${subject.progress || 0}%`,
                        height: "100%",
                        backgroundColor: colors[index % colors.length],
                      }}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
