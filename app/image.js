import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { CameraIcon, MapPinIcon, Trash2Icon, PencilIcon } from "lucide-react-native";
import { db } from "../firebaseconfig.js"; // 🔧 Adjust path as needed
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function MemoriesScreen() {
  const [memories, setMemories] = useState([]);
  const [note, setNote] = useState("");
  const [editingId, setEditingId] = useState(null);

  const memoriesRef = collection(db, "memories");

  // 🔄 Load all memories on component mount
  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    const snapshot = await getDocs(memoriesRef);
    const loaded = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMemories(loaded);
  };

  // 📸 Add new or update existing memory
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      try {
        if (editingId) {
          const memoryRef = doc(db, "memories", editingId);
          await updateDoc(memoryRef, { note });
          setEditingId(null);
        } else {
          await addDoc(memoriesRef, { uri, note });
        }

        await fetchMemories();
        setNote("");
      } catch (err) {
        console.error("Error saving memory:", err);
      }
    }
  };

  const handleDelete = (id) => {
    Alert.alert("Delete Memory", "Are you sure you want to delete this memory?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "memories", id));
            console.log("Deleted memory with ID:", id);
            setMemories((prev) => prev.filter((m) => m.id !== id));
          } catch (err) {
            console.error("Error deleting memory:", err);
          }
        },
      },
    ]);
  };
  

  // ✏️ Start editing a memory note
  const handleEdit = (id, currentNote) => {
    setEditingId(id);
    setNote(currentNote);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📸 Trip Memories</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Write your memory or journal here..."
          value={note}
          onChangeText={setNote}
          style={styles.textInput}
          multiline
        />
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <CameraIcon color="white" size={20} />
          <Text style={styles.uploadButtonText}>
            {editingId ? "Update Memory" : "Upload Photo"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.memoriesContainer}>
        {memories.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.noteText}>{item.note}</Text>
              <View style={styles.locationContainer}>
                <MapPinIcon size={16} color="#6B7280" />
                <Text style={styles.locationText}>Location info (optional)</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => handleEdit(item.id, item.note)}
                  style={styles.actionButton}
                >
                  <PencilIcon size={18} color="#2563EB" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                  style={styles.actionButton}
                >
                  <Trash2Icon size={18} color="#DC2626" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  inputContainer: { marginBottom: 24 },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    textAlignVertical: "top",
  },
  uploadButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  uploadButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  memoriesContainer: { gap: 16 },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  image: { width: "100%", height: 200 },
  cardContent: { padding: 12 },
  noteText: { fontSize: 16, color: "#374151" },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  locationText: { fontSize: 14, color: "#6B7280", marginLeft: 4 },
  actions: { flexDirection: "row", marginTop: 10 },
  actionButton: { marginRight: 12 },
});
