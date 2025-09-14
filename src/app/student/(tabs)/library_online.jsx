import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert, Linking } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BookOpen, LogOut } from "lucide-react-native";
import { useAuth } from "@/utils/auth/AuthContext";
import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router";

export default function LibraryScreen() {
    const insets = useSafeAreaInsets();
    const { user, logout } = useAuth();
    const router = useRouter();

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch free eBooks from Gutendex
    useEffect(() => {
        const fetchBooks = async () => {
        try {
            const res = await fetch("https://gutendex.com/books/?topic=children");
            const data = await res.json();
            setBooks(data.results || []);
        } catch (err) {
            console.error("Error fetching books:", err);
        } finally {
            setLoading(false);
        }
        };

        fetchBooks();
    }, []);

    // Open book in in-app PDF viewer or browser
    const openBook = async (book) => {
    try {
        const pdfUrl = book.formats["application/pdf"];
        const browserUrl = book.formats["text/html"] || book.formats["text/plain"];

        if (pdfUrl) {
        // Download to cache
        const fileUri = `${FileSystem.cacheDirectory}${book.id}.pdf`;
        const { uri } = await FileSystem.downloadAsync(pdfUrl, fileUri);

        // Read as Base64 so we can load in WebView
        const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        // Navigate to PdfViewer
        router.push({
            pathname: "/student/pdfViewer",
            params: { base64 },
        });
        } else if (browserUrl) {
        Alert.alert(
            "Opening in Browser",
            "This book is not available as PDF. It will open in your browser.",
            [
            {
                text: "OK",
                onPress: () => Linking.openURL(browserUrl),
            },
            ]
        );
        } else {
        Alert.alert("Unavailable", "No readable version of this book was found.");
        }
    } catch (err) {
        console.error("Error opening book:", err);
        Alert.alert("Error", "Could not open this book.");
    }
    };


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
                        AGOWASS Library
                    </Text>
                    <Text style={{ fontSize: 14, color: "#D4AF37" }}>
                        {user?.student_name || "Guest"}
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

            {/* Book List */}
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 100 }}
                showsVerticalScrollIndicator={false}
            >
                {loading ? (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 40 }}>
                    <ActivityIndicator size="large" color="#D4AF37" />
                    <Text style={{ marginTop: 10, color: "#1E293B" }}>Loading Books...</Text>
                </View>
                ) : (
                <View style={{ gap: 16 }}>
                    {books.map((book, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{
                        flexDirection: "row",
                        backgroundColor: "#FFFFFF",
                        borderRadius: 16,
                        padding: 12,
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowRadius: 6,
                        elevation: 3,
                        }}
                        onPress={() => openBook(book)}
                    >
                        {/* Book Cover */}
                        {book.formats["image/jpeg"] ? (
                        <Image
                            source={{ uri: book.formats["image/jpeg"] }}
                            style={{ width: 60, height: 90, borderRadius: 8, marginRight: 12 }}
                        />
                        ) : (
                        <View
                            style={{
                            width: 60,
                            height: 90,
                            borderRadius: 8,
                            marginRight: 12,
                            backgroundColor: "#E5E7EB",
                            alignItems: "center",
                            justifyContent: "center",
                            }}
                        >
                            <BookOpen size={28} color="#9CA3AF" />
                        </View>
                        )}

                        {/* Book Info */}
                        <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", color: "#1E293B" }}>
                            {book.title}
                        </Text>
                        <Text style={{ fontSize: 13, color: "#64748B" }}>
                            {book.authors.length > 0 ? book.authors[0].name : "Unknown Author"}
                        </Text>
                        </View>
                    </TouchableOpacity>
                    ))}
                </View>
                )}
            </ScrollView>
        </View>
    );
}
