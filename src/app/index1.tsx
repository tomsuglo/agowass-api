import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Bell,
  Settings,
} from "lucide-react-native";

export default function Index() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const menuItems = [
    {
      title: "Staff Portal",
      subtitle: "Teachers & Administration",
      icon: Users,
      color: "#D4AF37",
      route: "/staff",
    },
    {
      title: "Student Portal",
      subtitle: "Students & Parents",
      icon: GraduationCap,
      color: "#D4AF37",
      route: "/student",
    },
    {
      title: "Library",
      subtitle: "Books & Resources",
      icon: BookOpen,
      color: "#D4AF37",
      route: "/library",
    },
    {
      title: "Calendar",
      subtitle: "Events & Schedule",
      icon: Calendar,
      color: "#D4AF37",
      route: "/calendar",
    },
    {
      title: "Announcements",
      subtitle: "School News & Updates",
      icon: Bell,
      color: "#D4AF37",
      route: "/announcements",
    },
    {
      title: "Settings",
      subtitle: "App Preferences",
      icon: Settings,
      color: "#D4AF37",
      route: "/settings",
    },
  ];

  return (
    <View
      style={{ flex: 1, backgroundColor: "#1A1A1A", paddingTop: insets.top }}
    >
      <StatusBar style="light" />

      {/* Header */}
      <View
        style={{
          backgroundColor: "#2D2D2D",
          paddingHorizontal: 20,
          paddingVertical: 24,
          borderBottomWidth: 1,
          borderBottomColor: "#404040",
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#D4AF37",
            marginBottom: 4,
          }}
        >
          AGOWASS
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#B8B8B8",
          }}
        >
          Welcome to your school management system
        </Text>
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
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
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
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: item.color + "20",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                  }}
                >
                  <IconComponent size={28} color={item.color} />
                </View>

                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#FFFFFF",
                    textAlign: "center",
                    marginBottom: 4,
                  }}
                >
                  {item.title}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: "#B8B8B8",
                    textAlign: "center",
                    lineHeight: 16,
                  }}
                >
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
