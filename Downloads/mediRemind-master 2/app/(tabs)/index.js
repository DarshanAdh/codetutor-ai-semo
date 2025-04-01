import { View, Text, Button, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";


export default function HomeScreen() {
  const router = useRouter();


  useEffect(() => {
    const redirectAsync = async () => {
      redirectToAuthCodeFlow();
    };

    redirectAsync();
  }, []); // Added dependency array to prevent infinite re-renders

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Page</Text>

      {/* The buttons to navigate */}



      {/* Debugging Button (Uncomment if needed) */}
      {/* <Button
        title="DEBUG: Clear Async Storage"
        onPress={() => {
          AsyncStorage.removeItem("spotify_auth_token");
          AsyncStorage.removeItem("spotify_refresh_token");
          AsyncStorage.removeItem("spotify_bearer_token");
          AsyncStorage.removeItem("spotify_bearer_obj");
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa", // Light background color
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
});
