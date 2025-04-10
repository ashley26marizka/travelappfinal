import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

const DestinationDetails = () => {
  const { destination } = useLocalSearchParams();
  const parsed = JSON.parse(destination);

  const handleOpenLink = () => {
    if (parsed.link) {
      Linking.openURL(parsed.link).catch((err) =>
        console.error("Failed to open link:", err)
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{parsed.title || "No Title"}</Text>
      <Image
        source={{ uri: parsed.thumbnail_url || "https://via.placeholder.com/150" }}
        style={styles.image}
      />
      <Text style={styles.description}>
        {parsed.snippet || "No description available"}
      </Text>

      {parsed.link ? (
        <TouchableOpacity onPress={handleOpenLink}>
          <Text style={styles.link}>🔗 View Source</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.link}>No link available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
  },
  link: {
    fontSize: 16,
    color: "#007bff",
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default DestinationDetails;
