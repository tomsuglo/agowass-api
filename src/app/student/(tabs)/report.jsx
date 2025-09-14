import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator 
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LogOut, Eye } from "lucide-react-native";
import { useAuth } from "@/utils/auth/AuthContext";
import { useRouter, useLocalSearchParams } from "expo-router";  
import { useState, useEffect } from "react";
import Config from "@/config";

export default function StudentReportCard() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const router = useRouter();
  const student_id = user?.student_id;

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🎨 Color palette for subjects
  const colors = ["#D4AF37", "#2563EB", "#16A34A", "#DC2626", "#9333EA", "#F59E0B"];

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`${Config.API_URL}/all_reports/0${student_id}`);
        const data = await res.json();
 
        setReports(Array.isArray(data) ? data : data.reports || []);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    if (student_id) fetchReports();
  }, [student_id]);

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC", paddingTop: insets.top }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          backgroundColor: "#2D2D2D",
          paddingHorizontal: 20,
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#404040",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#D4AF37", marginBottom: 4 }}>
            AGOWASS App
          </Text>
          <Text style={{ fontSize: 14, color: "#B8B8B8" }}>
            {user?.student_name || "Guest"} • {user?.class || "Class Not Assigned"}
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

      {/* Title */}
      <View
        style={{
          padding: 10,
          backgroundColor: "#1E293B",
          borderBottomWidth: 1,
          borderBottomColor: "#404040",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#FFFFFF" }}>
          STUDENT REPORT CARD
        </Text>
      </View>

      {/* Report Table */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 40 }}>
            <ActivityIndicator size="large" color="#D4AF37" />
            <Text style={{ marginTop: 10, color: "#1E293B" }}>Loading Reports...</Text>
          </View>
        ) : (
          reports.map((item, index) => ( 
            <View
              key={index}
              style={{
                flexDirection: "row",
                backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F1F5F9",
                padding: 12,
                borderRadius: 8,
                marginTop: 6,
                alignItems: "center",
              }}
            >  
              <Text style={{ flex: 2, color: "#1E293B" }}>{item.class}</Text>
              <Text style={{ flex: 1, color: "#1E293B", textAlign: "center" }}>
                {item.full_term.split(",")[0]}
              </Text>
              <Text style={{ flex: 1, color: "#1E293B", textAlign: "center" }}>
                {item.full_term.split(",")[1]}
              </Text>

              {/* View Button */}
              <TouchableOpacity
                style={{ flex: 0.5, alignItems: "flex-end" }}
                onPress={() =>
                  router.push({
                    pathname: "/student/reportCard",
                    params: { class: item.class, term: item.details_id, termName: item.full_term },
                  })
                }
              >
                <Eye size={20} style = {{ color: colors[index % colors.length], backgroundColor: colors[index % colors.length] + "25" }} />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
