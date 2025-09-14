import { Tabs } from "expo-router";
import {
  Users,
  BookOpen,
  Calendar,
  BarChart3,
  MessageSquare,
} from "lucide-react-native";

export default function StaffTabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#2D2D2D",
          borderTopWidth: 1,
          borderColor: "#404040",
          paddingTop: 4,
        },
        tabBarActiveTintColor: "#D4AF37",
        tabBarInactiveTintColor: "#B8B8B8",
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <BarChart3 color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="students"
        options={{
          title: "Students",
          tabBarIcon: ({ color, size }) => <Users color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="classes"
        options={{
          title: "Classes",
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color, size }) => <Calendar color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color, size }) => (
            <MessageSquare color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
