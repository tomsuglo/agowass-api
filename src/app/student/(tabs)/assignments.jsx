import { 
  View, 
  Text, 
  Image,
  User,
  ScrollView, 
  TouchableOpacity, 
  LayoutAnimation, 
  Platform, 
  UIManager, 
  ActivityIndicator 
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Clock, LogOut, ChevronDown, ChevronUp } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/utils/auth/AuthContext";
import { useState, useEffect} from "react";
import Config from "@/config";


// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function StudentAssignments() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(false);
  const [assignments, setAssignments] = useState(null);

  const class_abb = user?.class || "";
  const notActiveStudent = !user || class_abb === "Completed" || user.status !== 1;

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await fetch(`${Config.API_URL}/assignments/${class_abb}`);
        const data = await res.json();
 
        setAssignments(Array.isArray(data) ? data : data.assignments || []);
      } catch (error) {

        console.error("Error fetching assignments:", error);
      } finally {
        
        setLoading(false); 
      }
    };

    fetchAssignments();
  }, [class_abb]);

  // Map subjects to icons (emoji style for now)
  const subjectIcons = {
    Maths: "📐",
    English: "📖",
    Science: "⚗️",
    Social: "🏺",
    Computing: "💻",
    Fante: "🎵",
    "C.A.D": "🎨",
    "R.M.E": "⚖️",
  };

  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(expanded === index ? null : index);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high":
        return "#ef4444"; // red
      case "medium":
        return "#f59e0b"; // amber
      default:
        return "#10b981"; // green
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC", paddingTop: insets.top }}>
      <StatusBar style="dark" />

      {/* Header with gradient */}
      <LinearGradient
        colors={["#1E293B", "#0f172a"]}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 24,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#334155",
        }}
      >
        <View>
          <Text style={{ fontSize: 26, fontWeight: "bold", color: "#FACC15", marginBottom: 4 }}>
            Assignments
          </Text>
          <Text style={{ fontSize: 14, color: "#E2E8F0" }}>
            {user?.class ? `For ${user.class}` : "- No Class Assigned -"}
          </Text>
        </View>

        {/* Logout button */}
        <TouchableOpacity
          onPress={async () => {
            await logout();
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 6,
            paddingHorizontal: 12,
            backgroundColor: "#FACC15",
            borderRadius: 10,
          }}
        >
          <LogOut size={18} color="#1E293B" style={{ marginRight: 6 }} />
          <Text style={{ color: "#1E293B", fontWeight: "600" }}>Logout</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Assignment list */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
      >
        {notActiveStudent ? (
          <View style={{ alignItems: "center", marginTop: 60 }}>
            <Text style={{ color: "#475569", fontSize: 16, textAlign: "center" }}>
              NO_LONGER_AN_ACTIVE_STUDENT
            </Text>
          </View>
        ) : loading ? (
          <View style={{ alignItems: "center", marginTop: 60 }}>
            <ActivityIndicator size="large" color="#FACC15" />
            <Text style={{ marginTop: 10, color: "#334155" }}>Loading assignments...</Text>
          </View>
        ) : !assignments || assignments.length === 0  ? (
          <View style={{ alignItems: "center", marginTop: 60, padding: 10, backgroundColor: "#FACC15" }}>  
            <Text style={{ color: "#334155", fontSize: 16 }}>NO_{class_abb}_ASSIGNMENTS_FOUND</Text>
          </View>
        ) : (
          <View style={{ gap: 18 }}>
            {assignments.map((item, index) => {
              const isOpen = expanded === index;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => toggleExpand(index)}
                  activeOpacity={0.9}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 20,
                    padding: 18,
                    shadowColor: "#000",
                    shadowOpacity: 0.08,
                    shadowRadius: 6,
                    elevation: 3,
                  }}
                >
                  {/* Top row */}
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flex: 1, marginRight: 12 }}>
                      <Text style={{ fontSize: 20, marginBottom: 6 }}>
                        {subjectIcons[item.subject_abb] || "📘"}{" "}
                        <Text style={{ fontWeight: "700", color: "#1E293B" }}>
                          {item.subject_name}
                        </Text>
                      </Text> 
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Clock size={14} color={getUrgencyColor(item.urgency)} style={{ marginRight: 6 }} />
                        <Text style={{ fontSize: 13, color: "#475569" }}>Due: {item.due_date}</Text>
                      </View>
                    </View>
                    {isOpen ? <ChevronUp size={22} color="#FACC15" /> : <ChevronDown size={22} color="#FACC15" />}
                  </View>

                  {/* Expanded view */}
                  {isOpen && ( item.image == 0 ? ( 
                      <View style={{ marginTop: 12, backgroundColor: "#F8FAFC", padding: 14, borderRadius: 12 }}>
                        <Text style={{ fontSize: 15, color: "#1E293B", lineHeight: 22 }}>{item.description}</Text>
                      </View>
                    ): 
                    ( 
                      <View style={{ marginTop: 12, backgroundColor: "#F8FAFC", padding: 14, borderRadius: 12 }}>
                        <Image source={
                          user?.profileImage
                            ? { uri: user.profileImage }
                            : require("../../../../assets/images/user.jpg")  
                        }
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 20,
                        }}/>
                      </View>
                    )
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
