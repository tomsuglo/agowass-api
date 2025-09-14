import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Search, Filter, User, Phone, Mail } from "lucide-react-native";
import { useState } from "react";

export default function StaffStudents() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");

  const students = [
    {
      id: 1,
      name: "John Doe",
      grade: "8A",
      phone: "+1234567890",
      email: "john.doe@email.com",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      grade: "8A",
      phone: "+1234567891",
      email: "jane.smith@email.com",
      status: "active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      grade: "8B",
      phone: "+1234567892",
      email: "mike.johnson@email.com",
      status: "active",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      grade: "7A",
      phone: "+1234567893",
      email: "sarah.wilson@email.com",
      status: "inactive",
    },
    {
      id: 5,
      name: "David Brown",
      grade: "7B",
      phone: "+1234567894",
      email: "david.brown@email.com",
      status: "active",
    },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#404040",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#D4AF37",
            marginBottom: 16,
          }}
        >
          Students
        </Text>

        {/* Search Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#404040",
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
            marginBottom: 12,
          }}
        >
          <Search size={20} color="#B8B8B8" style={{ marginRight: 12 }} />
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              color: "#FFFFFF",
            }}
            placeholder="Search students..."
            placeholderTextColor="#B8B8B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Button */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-start",
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: "#D4AF37" + "20",
            borderRadius: 8,
          }}
        >
          <Filter size={16} color="#D4AF37" style={{ marginRight: 6 }} />
          <Text style={{ fontSize: 14, color: "#D4AF37", fontWeight: "500" }}>
            Filter
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: "#2D2D2D",
            borderRadius: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
            borderWidth: 1,
            borderColor: "#404040",
          }}
        >
          {filteredStudents.map((student, index) => (
            <TouchableOpacity
              key={student.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
                borderBottomWidth: index < filteredStudents.length - 1 ? 1 : 0,
                borderBottomColor: "#404040",
              }}
              activeOpacity={0.7}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#D4AF37" + "20",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                }}
              >
                <User size={24} color="#D4AF37" />
              </View>

              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#FFFFFF",
                      marginRight: 8,
                    }}
                  >
                    {student.name}
                  </Text>
                  <View
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      backgroundColor:
                        student.status === "active"
                          ? "#D4AF37" + "30"
                          : "#DC262630",
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "500",
                        color:
                          student.status === "active" ? "#D4AF37" : "#DC2626",
                      }}
                    >
                      {student.status.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    color: "#B8B8B8",
                    marginBottom: 4,
                  }}
                >
                  Grade {student.grade}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Phone size={12} color="#B8B8B8" style={{ marginRight: 4 }} />
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#B8B8B8",
                      marginRight: 12,
                    }}
                  >
                    {student.phone}
                  </Text>
                  <Mail size={12} color="#B8B8B8" style={{ marginRight: 4 }} />
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#B8B8B8",
                    }}
                  >
                    {student.email}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filteredStudents.length === 0 && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 40,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#B8B8B8",
                textAlign: "center",
              }}
            >
              No students found matching your search.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
