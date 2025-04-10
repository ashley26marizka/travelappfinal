import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Linking 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const WeatherSearchScreen = () => {
  const [city, setCity] = useState("");

  const searchWeatherOnGoogle = () => {
    if (!city.trim()) {
      Alert.alert("Error", "Please enter a city name.");
      return;
    }
    
    const googleSearchUrl = `https://www.google.com/search?q=weather+in+${encodeURIComponent(city)}`;
    Linking.openURL(googleSearchUrl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check Weather</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />

      <TouchableOpacity style={styles.searchButton} onPress={searchWeatherOnGoogle}>
        <MaterialIcons name="search" size={22} color="#fff" />
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F4F9F9", 
    alignItems: "center", 
    justifyContent: "center", 
    padding: 20 
  },
  title: {
    fontSize: 24,  
    color: "#283618",
    fontWeight: "bold", 
    marginBottom: 20,
  },
  input: {
    width: "90%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 18,
    marginBottom: 15,
  },
  searchButton: {
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#3498db", 
    paddingVertical: 14, 
    paddingHorizontal: 25, 
    borderRadius: 10, 
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFF", 
    fontSize: 18, 
    fontWeight: "bold", 
    marginLeft: 10, 
  },
});

export default WeatherSearchScreen;
