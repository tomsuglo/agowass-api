import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LogOut } from "lucide-react-native";
import { useAuth } from "@/utils/auth/AuthContext";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import Config from "@/config";


// 🎯 Grade + Remark helper
const getGradeAndRemark = (score) => {
  if (score <= 34.9) return { grade: "F", remark: "Fail" };
  if (score <= 39.9) return { grade: "E", remark: "Credit" };
  if (score <= 49.9) return { grade: "D", remark: "Pass" };
  if (score <= 59.9) return { grade: "C", remark: "Good" };
  if (score <= 79.9) return { grade: "B", remark: "Very Good" };
  if (score <= 100) return { grade: "A", remark: "Excellent" };
  return { grade: "-", remark: "N/A" };
};

// 🎯 Ordinal suffix helper
function getOrdinalSuffix(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default function StudentReportCard() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const { class: className, term, termName } = useLocalSearchParams(); // ✅ receive params

  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
    try {
        const res = await fetch(`${Config.API_URL}/report_card`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            student_id: "0" + user?.student_id,
            className: className,
            term: term,
        }),
        });

        const data = await res.json();

        setReport(data.report || []);        // ✅ store only the array
        setPosition(data.position || null);  // ✅ store position separately
    } catch (error) {
        console.error("Error fetching report:", error);
    } finally {
        setLoading(false);
    }
    };

    fetchReport();
  }, [className, term, user?.student_id]);
  
  const totalScore = report.reduce(
    (sum, s) => sum + parseFloat(s.total_percent || 0),
    0
  );

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
          onPress={async () => await logout()}
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
      <View style={{ padding: 10, backgroundColor: "#1E293B", borderBottomWidth: 1, borderBottomColor: "#404040" }}>
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#FFFFFF" }}>
          STUDENT REPORT CARD
        </Text>
      </View>

      {/* Report Body */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 100 }}>
        {loading ? (
          <View style={{ alignItems: "center", justifyContent: "center", marginTop: 40 }}>
            <ActivityIndicator size="large" color="#D4AF37" />
            <Text style={{ marginTop: 10, color: "#1E293B" }}>Loading Report...</Text>
          </View>
        ) : report.length === 0 ? (
          <View style={{ alignItems: "center", justifyContent: "center", marginTop: 40 }}>
            <Text style={{ marginTop: 10, color: "#e7120bff", textAlign: "center" }}>
              NO REPORT CARD FOUND
            </Text>
          </View>
        ) : (
          <>
            {/* Summary Info */}
            <View style={{ marginBottom: 10, borderRadius: 12, backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", overflow: "hidden" }}>
              {[
                { label: "Class", value: className },
                { label: "Term", value: termName.split(",")[1] },
                { label: "Year", value: termName.split(",")[0] },
                { label: "Raw Score", value: totalScore, highlight: true },
                { label: "Position", value: position ? getOrdinalSuffix(position) : "-" },
              ].map((row, index) => (
                <View key={index} style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 2, paddingHorizontal: 6 }}>
                  <Text style={{ fontSize: 16, color: "#1E293B" }}>{row.label}:</Text>
                  <Text style={{ fontSize: 16, fontWeight: "600", color: row.highlight ? "#D4AF37" : "#1E293B" }}>
                    {row.value}
                  </Text>
                </View>
              ))}
            </View>

            {/* Table Header */}
            <View style={{ flexDirection: "row", backgroundColor: "#D4AF37", padding: 10, borderRadius: 8 }}>
              <Text style={{ flex: 2, fontWeight: "700", color: "#1E293B" }}>Subject</Text>
              <Text style={{ flex: 1, fontWeight: "700", color: "#1E293B", textAlign: "center" }}>Class</Text>
              <Text style={{ flex: 1, fontWeight: "700", color: "#1E293B", textAlign: "center" }}>Exam</Text>
              <Text style={{ flex: 1, fontWeight: "700", color: "#1E293B", textAlign: "center" }}>Total</Text>
              <Text style={{ flex: 1, fontWeight: "700", color: "#1E293B", textAlign: "center" }}>Grade</Text>
              <Text style={{ flex: 2, fontWeight: "700", color: "#1E293B", textAlign: "right" }}>Remarks</Text>
            </View>

            {/* Table Rows */}
            {report.map((item, index) => {
              const total = parseFloat(item.total_percent) || 0;
              const { grade, remark } = getGradeAndRemark(total);

              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F1F5F9",
                    padding: 10,
                    borderRadius: 8,
                    marginTop: 6,
                  }}
                >
                  <Text style={{ flex: 2, color: "#1E293B" }}>{item.subject_name}</Text>
                  <Text style={{ flex: 1, color: "#1E293B", textAlign: "center" }}>
                    {parseFloat(item.class_percent)}
                  </Text>
                  <Text style={{ flex: 1, color: "#1E293B", textAlign: "center" }}>
                    {parseFloat(item.exams_percent)}
                  </Text>
                  <Text style={{ flex: 1, color: "#1E293B", textAlign: "center", fontWeight: "600" }}>
                    {total}
                  </Text>
                  <Text style={{ flex: 1, color: "#1E293B", textAlign: "center", fontWeight: "600" }}>
                    {grade}
                  </Text>
                  <Text style={{ flex: 2, color: "#475569", textAlign: "right" }}>{remark}</Text>
                </View>
              );
            })}
          </>
        )}
      </ScrollView>
    </View>
  );
}