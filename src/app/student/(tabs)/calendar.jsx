import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/utils/auth/AuthContext";
import { LogOut } from "lucide-react-native";
import Config from "@/config";
import { useState, useEffect } from "react";


export default function TimetableScreen() {
    const insets = useSafeAreaInsets();
    const { user, logout } = useAuth();
    const class_abb = user?.class || ""; 

    const notActiveStudent = !user || class_abb === "Completed" || user.status !== 1;

    const [loading, setLoading] = useState(false);  
    
    const [timetable, setTimetable] = useState({});
    
    useEffect(() => {
        const fetchTimetable = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${Config.API_URL}/timetable/${class_abb}`);
                const data = await res.json();

                // Group by day
                const grouped = data.reduce((acc, lesson) => {
                    if (!acc[lesson.day]) acc[lesson.day] = [];
                    acc[lesson.day].push({
                    subject: lesson.subject,
                    time: lesson.time,
                    });
                    return acc;
                }, {});

                setTimetable(grouped);
            } catch (error) {
            console.error("Error fetching timetable:", error);
            } finally {
            setLoading(false);
            }
        };

        fetchTimetable();
    }, [class_abb]);

    
    const weekdayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const days = weekdayOrder.filter(day => Object.keys(timetable).includes(day));


    // selectedDay state
    const [selectedDay, setSelectedDay] = useState("Monday");

    // once timetable updates, adjust default selected day
    useEffect(() => {
        if (days.length > 0) {
            const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
            setSelectedDay(days.includes(today) ? today : days[0]); // fallback = first available day
        }
    }, [timetable]);



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
                AGOWASS App
            </Text>
            <Text style={{ fontSize: 14, color: "#D4AF37" }}>
                TIMETABLE
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

        {/* Main Content */}
        {notActiveStudent ? (
            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 40, padding: 20 }}>
            <Text style={{ marginTop: 10, color: "#1E293B", textAlign: "center" }}>
                NO_LONGER_AN_ACTIVE_STUDENT
            </Text>
            </View>
        ) : loading ? (
            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 40 }}>
            <ActivityIndicator size="large" color="#D4AF37" />
            <Text style={{ marginTop: 10, color: "#1E293B" }}>Loading Timetable...</Text>
            </View>
        ) : (
            <>
            {/* Day Selector Tabs */}
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 12, paddingHorizontal: 10 }}
            style={{ borderBottomWidth: 1, borderBottomColor: "#E2E8F0" }}
            >
            {days.map((day, idx) => (
                <TouchableOpacity
                key={idx}
                onPress={() => setSelectedDay(day)}
                style={{
                    marginRight: 10,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 20,
                    backgroundColor: selectedDay === day ? "#D4AF37" : "#E5E7EB",
                }}
                >
                <Text
                    style={{
                    fontWeight: "600",
                    color: selectedDay === day ? "#1E293B" : "#475569",
                    }}
                >
                    {day}
                </Text>
                </TouchableOpacity>
            ))}
            </ScrollView>

            {/* Selected Day Timetable */}
            <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 100 }}
            showsVerticalScrollIndicator={false}
            >
            {timetable[selectedDay]?.map((period, idx) => (
                <View
                key={idx}
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 14,
                    marginBottom: 10,
                    borderRadius: 12,
                    backgroundColor: "#FFFFFF",
                    borderWidth: 1,
                    borderColor: "#E2E8F0",
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 2,
                }}
                >
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#1E293B" }}>
                    {period.subject}
                </Text>
                <Text style={{ fontSize: 14, color: "#64748B" }}>{period.time}</Text>
                </View>
            ))}
            </ScrollView>
            </>
        )}
        </View>
    );
}
