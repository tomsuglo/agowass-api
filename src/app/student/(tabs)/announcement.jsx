import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  LayoutAnimation, 
  Platform, 
  UIManager, 
  ActivityIndicator
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Bell, ChevronRight, ChevronDown, LogOut } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/utils/auth/AuthContext";
import { useState, useEffect } from "react";
import Config from "@/config";

// ✅ Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function StudentHome() {
    const insets = useSafeAreaInsets();
    const { user, logout } = useAuth();
    const [expanded, setExpanded] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
        try {
            const res = await fetch(`${Config.API_URL}/all_messages`);
            const data = await res.json();
            setAnnouncements(Array.isArray(data) ? data : data.reports || []);
        } catch (error) {
            console.error("Error fetching announcements:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchMessages();
    }, []);

    const typeColors = {
        event: "#2563eb",  // blue
        update: "#16a34a", // green
        alert: "#e11d48",  // red
    };

    const toggleExpand = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(expanded === index ? null : index);
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#F8FAFC", paddingTop: insets.top }}>
        <StatusBar style="light" />

        {/* Gradient Header */}
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
                AGOWASS App
            </Text>
            <Text style={{ fontSize: 14, color: "#E2E8F0" }}>
                {user?.student_name || "Guest"} • {user?.class || "No Class"}
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
                paddingHorizontal: 12,
                backgroundColor: "#FACC15",
                borderRadius: 10,
            }}
            >
            <LogOut size={18} color="#1E293B" style={{ marginRight: 6 }} />
            <Text style={{ color: "#1E293B", fontWeight: "600" }}>Logout</Text>
            </TouchableOpacity>
        </LinearGradient>

        {/* Section Title */}
        <View style={{ padding: 20, paddingBottom: 0 }}>
            <Text style={{ fontSize: 20, fontWeight: "700", color: "#1E293B" }}>
            📢 Announcements
            </Text>
        </View>

        {/* Announcements List */}
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 80 }}
            showsVerticalScrollIndicator={false}
        >
            {loading ? (
            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 40 }}>
                <ActivityIndicator size="large" color="#D4AF37" />
                <Text style={{ marginTop: 10, color: "#1E293B" }}>Loading Announcements...</Text>
            </View>
            ) : announcements.length === 0 ? (
            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 40 }}>
                <Text style={{ marginTop: 10, color: "#e11d48", textAlign: "center" }}>
                No Announcements Available
                </Text>
            </View>
            ) : (
            announcements.map((announcement, index) => {
                const isOpen = expanded === index;
                return (
                <TouchableOpacity
                    key={index}
                    activeOpacity={0.9}
                    onPress={() => toggleExpand(index)}
                    style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 14,
                    shadowColor: "#000",
                    shadowOpacity: 0.06,
                    shadowRadius: 6,
                    elevation: 2,
                    }}
                >
                    {/* Header Row */}
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                        style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: typeColors[announcement.type] || "#64748B",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 14,
                        }}
                    >
                        <Bell size={18} color="#fff" />
                    </View>

                    {/* Title + Time */}
                    <View style={{ flex: 1 }}>
                        <Text
                        style={{
                            fontSize: 15,
                            fontWeight: "600",
                            color: "#1E293B",
                            marginBottom: 4,
                        }}
                        >
                        {announcement.title}
                        </Text>
                        <Text style={{ fontSize: 12, color: "#64748B" }}>
                        {new Date(announcement.created_at).toLocaleString()}
                        </Text>
                    </View>

                    {isOpen ? (
                        <ChevronDown size={18} color="#64748B" />
                    ) : (
                        <ChevronRight size={18} color="#64748B" />
                    )}
                    </View>

                    {/* Expanded Content */}
                    {isOpen && (
                    <View
                        style={{
                        marginTop: 12,
                        borderTopWidth: 1,
                        borderTopColor: "#E2E8F0",
                        paddingTop: 10,
                        }}
                    >
                        <Text style={{ fontSize: 14, lineHeight: 20, color: "#334155" }}>
                        {announcement.details}
                        </Text>
                    </View>
                    )}
                </TouchableOpacity>
                );
            })
            )}
        </ScrollView>
        </View>
    );
}
