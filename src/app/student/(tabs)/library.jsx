import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BookOpen } from "lucide-react-native";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import books from "../../../../assets/books/books.json";
import { useRouter } from "expo-router";


// Map JSON "file" names to actual assets
const bookAssets = {
  "A-brief-history-of-time.pdf": require("../../../../assets/books/A-brief-history-of-time.pdf"),
  "romeo-and-juliet.pdf": require("../../../../assets/books/romeo-and-juliet.pdf"),
  "alice-adventures-in-wonderland.pdf": require("../../../../assets/books/alice-adventures-in-wonderland.pdf"),
  "computer-hardware-and-software.pdf": require("../../../../assets/books/computer-hardware-and-software.pdf"),
  "rich-dad-poor-dad-rich-dad-s-prophecy.pdf": require("../../../../assets/books/rich-dad-poor-dad-rich-dad-s-prophecy.pdf"),
  "tell-me-why.pdf": require("../../../../assets/books/tell-me-why.pdf"),
  "the-time-machine.pdf": require("../../../../assets/books/the-time-machine.pdf"),
};

export default function OfflineLibrary() {
  const insets = useSafeAreaInsets();
  const router = useRouter();


  const openBook = async (fileKey, router) => {
    try {
      const asset = Asset.fromModule(bookAssets[fileKey]);
      await asset.downloadAsync();

      const fileUri = `${FileSystem.cacheDirectory}${fileKey}`;
      await FileSystem.copyAsync({ from: asset.localUri, to: fileUri });

      // Read as Base64
      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Pass base64 string to PdfViewer
      router.push({
        pathname: "/student/pdfViewer",
        params: { base64 },
      });
    } catch (err) {
      console.error("Error opening book:", err);
    }
  };


  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC", paddingTop: insets.top }}>
      <StatusBar style="dark" />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
          📚 Offline Library
        </Text>

        {books.map((book, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: "row",
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              padding: 12,
              marginBottom: 12,
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 2,
              alignItems: "center",
            }}
            onPress={() => openBook(book.file, router)}
          >
            <BookOpen size={28} color="#D4AF37" style={{ marginRight: 12 }} />
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#1E293B" }}>
              {book.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
