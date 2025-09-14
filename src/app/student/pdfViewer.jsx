import { View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { useLocalSearchParams } from "expo-router";

export default function PdfViewer() {
  const { base64 } = useLocalSearchParams();

  if (!base64) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        source={{ uri: `data:application/pdf;base64,${base64}` }}
        style={{ flex: 1 }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" color="#D4AF37" />}
      />
    </View>
  );
}
