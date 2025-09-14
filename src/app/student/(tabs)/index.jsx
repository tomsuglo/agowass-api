import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Calendar,
  Bell,
  LogOut,
  BookCheck,
  File,
  PenBoxIcon,
  BookOpen,
} from "lucide-react-native";
import { useAuth } from "@/utils/auth/AuthContext";

export default function Index() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useAuth(); // ✅ Get user from AuthContext

  const menuItems = [
    { title: "Subjects", subtitle: "Registered Subjects For The Term", icon: BookCheck, color: "#D4AF37", route: "/student/(tabs)/subjects" },
    { title: "Report Card", subtitle: "Exams Results & Class Score Results", icon: File, color: "#D4AF37", route: "/student/(tabs)/report" },
    { title: "Assignments", subtitle: "Home Works & Project Works", icon: PenBoxIcon, color: "#D4AF37", route: "/student/(tabs)/assignments" },
    { title: "TimeTable", subtitle: "Events & Schedule", icon: Calendar, color: "#D4AF37", route: "/student/(tabs)/calendar" },
    { title: "Announcements", subtitle: "School News & Updates", icon: Bell, color: "#D4AF37", route: "/student/(tabs)/announcement" },
    { title: "Library", subtitle: "Books & Resources", icon: BookOpen, color: "#D4AF37", route: "/student/(tabs)/library_online" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC', paddingTop: insets.top }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={{
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <View>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#1E293B',
            marginBottom: 4
          }}>
            AGOWASS App
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#64748B'
          }}>
            {user?.student_name || "Guest"} • {user?.class || "- Not stated -"}
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

      {/* Menu Grid */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 16,
        }}>
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={index}
                style={{
                  width: "47%",
                  backgroundColor: "#2D2D2D",
                  borderRadius: 16,
                  padding: 20,
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 6,
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: "#404040",
                }}
                onPress={() => router.push(item.route)}
                activeOpacity={0.7}
              >
                <View style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: item.color + "20",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                }}>
                  <IconComponent size={28} color={item.color} />
                </View>

                <Text style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#FFFFFF",
                  textAlign: "center",
                  marginBottom: 4,
                }}>
                  {item.title}
                </Text>

                <Text style={{
                  fontSize: 12,
                  color: "#B8B8B8",
                  textAlign: "center",
                  lineHeight: 16,
                }}>
                  {item.subtitle}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
