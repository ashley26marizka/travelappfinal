import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MotiView } from "moti";

const PlanTrip = () => {
  const router = useRouter();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Plan Your Trip</Text>

        {[
          { title: "🗺️ Map", subtitle: "View map", route: "/map" },
          { title: "🌦️ Weather", subtitle: "Check forecast", route: "/weather" },
          { title: "🏞️ Places to explore",subtitle:"Tourist Places",route:"/trip"},
          { title: "🧳 To pack", subtitle: "Add items", route: "/packing" },
          { title: "📅 Itinerary", subtitle: "Plan your trip", route: "/createtrip" },
          { title: "💰 Budget", subtitle: "Calculate expenses", route: "/expenses" },
          { title: "📸 Images",subtitle:"Your Memories",route:"/image"},          
          { title: "🚌 Bookings", subtitle: "Book your tickets", route: "/bookings" },
        ].map((item, index) => (
          <MotiView
            from={{ translateX: 300, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 120,
              delay: index * 150, 
            }}
            key={item.route}
          >
            <View style={styles.box}>
              <Pressable onPress={() => router.push(item.route)}>
                <Text style={styles.boxText}>{item.title}</Text>
                <Text style={styles.subText}>{item.subtitle}</Text>
              </Pressable>
            </View>
          </MotiView>
        ))}
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  box: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  boxText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
});

export default PlanTrip;
