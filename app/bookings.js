import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';

const travelModes = ['Bus', 'Train', 'Flight'];

export default function BookingPage() {
  const [activeMode, setActiveMode] = useState('Bus');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!from || !to || !date) {
      Alert.alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      // Replace with actual Redbus API endpoint and parameters
      const response = await axios.post('https://api.redbus.in/booking', {
        mode: activeMode,
        from,
        to,
        date,
      }, {
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY',
          'Content-Type': 'application/json',
        },
      });

      console.log(`✅ ${activeMode} Booking Response:`, response.data);
      Alert.alert(`Search successful for ${activeMode}`);
    } catch (error) {
      console.error("❌ API Error:", error);
      Alert.alert("API call failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Your {activeMode}</Text>

      <View style={styles.tabRow}>
        {travelModes.map((mode) => (
          <TouchableOpacity
            key={mode}
            onPress={() => setActiveMode(mode)}
            style={[styles.tab, activeMode === mode && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeMode === mode && styles.activeTabText]}>
              {mode}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="From"
          value={from}
          onChangeText={setFrom}
          style={styles.input}
        />
        <TextInput
          placeholder="To"
          value={to}
          onChangeText={setTo}
          style={styles.input}
        />
        <TextInput
          placeholder="Date (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
          style={styles.input}
        />
        <Button
          title={loading ? 'Searching...' : `Search ${activeMode}`}
          onPress={handleSearch}
          disabled={loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  tabRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  activeTab: {
    backgroundColor: '#1e90ff',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  form: { gap: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
});
