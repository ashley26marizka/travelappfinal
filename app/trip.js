import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import RNPickerSelect from "react-native-picker-select";

const SERPAPI_KEY = "3901a0e749162c9b454aae3c72f6fca2d597fd2ec0ce952a3c2854d6de8354ca";

const DESTINATION_TYPES = [
  { label: "Popular", value: "Best travel destinations" },
  { label: "Beaches", value: "Best beach destinations" },
  { label: "Mountains", value: "Best mountain destinations" },
  { label: "Historical", value: "Best historical destinations" },
];

const fetchDestinations = async (query) => {
  try {
    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "google", // FIXED: use google instead of google_travel
        q: query,
        api_key: SERPAPI_KEY,
      },
    });

    console.log("API Response:", response.data);

    if (!response.data || !response.data.organic_results) {
      throw new Error("No results found");
    }

    const destinations = response.data.organic_results.map((result) => ({
      title: result.title,
      link: result.link,
      snippet: result.snippet,
      thumbnail_url: result.thumbnail || "https://via.placeholder.com/150",
    }));

    return { results: destinations };
  } catch (error) {
    console.error("Error fetching destinations:", error.message);
    return { error: error.message, results: [] };
  }
};

const DestinationCard = ({ destination, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <Image
      source={{ uri: destination.thumbnail_url }}
      style={styles.image}
    />
    <Text style={styles.title}>
      {destination.title || "Unknown Destination"}
    </Text>
    <Text style={styles.description}>
      {destination.snippet || "No description available"}
    </Text>
    <Text style={styles.link}>View More</Text>
  </TouchableOpacity>
);

const Tripping = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState("Best travel destinations");
  const router = useRouter();

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        setLoading(true);
        setError("");
        const result = await fetchDestinations(selectedType);
        if (result.error) {
          setError(`Error: ${result.error}`);
        } else if (result.results.length === 0) {
          setError("No destinations found. Try again later.");
        }
        setDestinations(result.results);
      } catch (err) {
        setError("Something went wrong");
        console.error("useEffect Error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadDestinations();
  }, [selectedType]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🌍 Popular Destinations</Text>

      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={(value) => {
            if (value) setSelectedType(value);
          }}
          items={DESTINATION_TYPES}
          style={pickerStyles}
          placeholder={{ label: "Select Destination Type", value: null }}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={destinations}
          keyExtractor={(item, index) => `destination-${index}`}
          renderItem={({ item }) => (
            <DestinationCard
              destination={item}
              onPress={() =>
                router.push({
                  pathname: "/destinationdetails",
                  params: { destination: JSON.stringify(item) },
                })
              }
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    alignItems: "center",
  },
  image: { width: "100%", height: 150, borderRadius: 10 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
    textAlign: "center",
  },
  link: {
    color: "#007bff",
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  picker: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: "#333",
  },
});

const pickerStyles = {
  inputIOS: styles.picker,
  inputAndroid: styles.picker,
  placeholder: { color: "#999" },
};

export default Tripping;
