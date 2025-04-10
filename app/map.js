import React, { useState, useEffect } from "react";
import { 
  View, Text, TouchableOpacity, Alert, Linking, StyleSheet, ActivityIndicator
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

const NearbyAttractionsScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Location access denied. Please enable it in settings.");
          setLoading(false);
          return;
        }

        let locationData = await Location.getCurrentPositionAsync({});
        setLocation(locationData.coords);
      } catch (error) {
        setErrorMsg("Failed to get location. Check GPS & permissions.");
      } finally {
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  const openGoogleMaps = (placeType) => {
    if (!location) {
      Alert.alert("Location not available", "Please enable location services.");
      return;
    }
    
    const url = `https://www.google.com/maps/search/${placeType}+near+me/@${location.latitude},${location.longitude},15z`;
    Linking.openURL(url).catch(err => Alert.alert("Error", "Could not open Google Maps."));
  };

  return (
    <View style={styles.container}>
      
      
      <Text style={styles.title}>Find Nearby Attractions</Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Locating you...</Text>
        </View>
      ) : errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : location ? (
        <View style={styles.infoContainer}>
          <Text style={styles.coordinates}>📍 Latitude: {location.latitude.toFixed(3)}</Text>
          <Text style={styles.coordinates}>📍 Longitude: {location.longitude.toFixed(3)}</Text>

          <Text style={styles.subtitle}>Explore Nearby:</Text>

          <TouchableOpacity style={styles.mapButton} onPress={() => openGoogleMaps("tourist+attractions")}>
            <MaterialIcons name="map" size={22} color="#fff" />
            <Text style={styles.buttonText}>Landmarks</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mapButton} onPress={() => openGoogleMaps("restaurants")}>
            <MaterialIcons name="restaurant" size={22} color="#fff" />
            <Text style={styles.buttonText}>Restaurants</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mapButton} onPress={() => openGoogleMaps("parks")}>
            <MaterialIcons name="park" size={22} color="#fff" />
            <Text style={styles.buttonText}>Parks</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.errorText}>Could not retrieve location.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F4F9F9", 
    alignItems: "center", 
    justifyContent: "center", 
    padding: 20, 
  },
  backButton: {
    position: "absolute", 
    top: 50, 
    left: 20, 
    padding: 10, 
  },
  title: {
    fontSize: 24,  
    color: "#283618",
    fontWeight: "bold", 
    marginBottom: 20,
  },
  loadingContainer: {
    alignItems: "center", 
    justifyContent: "center", 
  },
  loadingText: {
    fontSize: 18, 
    color: "#666", 
    marginTop: 10, 
  },
  infoContainer: {
    backgroundColor: "#FFF", 
    padding: 20, 
    borderRadius: 12, 
    alignItems: "center", 
    width: "90%", 
    borderWidth: 1, 
    borderColor: "#DDD", 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 5, 
  },
  coordinates: {
    fontSize: 18, 
    color: "#444", 
    marginBottom: 10, 
  },
  subtitle: {
    fontSize: 20,
    color: "#283618",
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  mapButton: {
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#3498db", 
    paddingVertical: 14, 
    paddingHorizontal: 25, 
    borderRadius: 10, 
    marginTop: 10, 
  },
  buttonText: {
    color: "#FFF", 
    fontSize: 18, 
    fontWeight: "bold", 
    marginLeft: 10, 
  },
  errorText: {
    fontSize: 18, 
    color: "#E63946", 
    marginTop: 10, 
    textAlign: "center",
  },
});

export default NearbyAttractionsScreen;