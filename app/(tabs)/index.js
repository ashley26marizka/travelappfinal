import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  StyleSheet,
  Text,
  Image,
} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { StackActions } from '@react-navigation/native';

import { useRouter } from 'expo-router';
export default function HomeScreen() {
  const router = useRouter(); 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View
          style={{
            padding: 6,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderColor:'skyblue',
          }}>
               <Pressable onPress={() => router.push('/login')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
      </View>
      
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>MyTrip</Text>
        </View>

        <View style={styles.yearWrapper}>
          <Text style={styles.yearText}>2025</Text>
        </View>

        <View style={styles.imageWrapper}>
          <Image source={require('@/assets/home.jpg')} style={styles.image} />
        </View>

        <View style={styles.subtitleWrapper}>
          <Text style={styles.subtitleText}>Organize your next trip</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <Pressable onPress={() => router.push('/plan')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Create your Trip</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleWrapper: {
    alignItems: 'center',

    padding: 6,
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  yearWrapper: {
    alignItems: 'center',

    padding: 6,
  },
  yearText: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: '600',
    color: 'skyblue',
  },
  imageWrapper: {
    padding: 5,
    alignItems: 'center',
  },
  image: {
    width: 500,
    height: 300,
    borderRadius: 10,
  },
  subtitleWrapper: {
    marginTop: 10,
    alignItems: 'center',
  },
  subtitleText: {
    fontWeight: 'bold',
  },
  buttonWrapper: {
    margin: 25,
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    backgroundColor: 'skyblue',
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});