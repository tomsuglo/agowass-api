// app/student/(tabs)/_layout.jsx
import { Tabs } from "expo-router";
import { Home, BookOpen, Users, UserIcon, Table2Icon } from "lucide-react-native";

export default function StudentTabLayout() {
  return (
    <Tabs
      initialRouteName="index"   // 👈 this sets the default tab
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
      {/* Only these will show in footer */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "TimeTable",
          tabBarIcon: ({ color }) => <Table2Icon color={color} size={24} />,
        }}
      /> 
      <Tabs.Screen
        name="profile"
        options={{
          title: "Me",
          tabBarIcon: ({ color }) => <UserIcon color={color} size={24} />,
        }}
      /> 

      {/*  Not shown in footer, but still accessible via router.push("/student/(tabs)/profile") */}
      <Tabs.Screen
        name="subjects"
        options={{
          href: null,   // 👈 hides this from tab bar
        }}
      />
      <Tabs.Screen
        name="assignments"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="class"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="announcement"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="reportCard"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="library_online"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          href: null,
        }}
      />
    </Tabs> 
  );
}
