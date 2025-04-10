import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import { auth, db } from '../firebaseconfig.js';
import { FontAwesome } from "@expo/vector-icons";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

const PackingList = () => {
    const [itemName, setItemName] = useState('');
    const [packingList, setPackingList] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const user = auth.currentUser;

    useEffect(() => {
        if (user) fetchPackingList();
    }, [user]);

    const fetchPackingList = async () => {
        if (!user) return;
        const q = query(collection(db, 'packingLists'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPackingList(items);
    };

    const handleSaveItem = async () => {
        if (!itemName.trim()) {
            Alert.alert('Error', 'Please enter an item name');
            return;
        }
        try {
            if (editingItem) {
                const itemRef = doc(db, 'packingLists', editingItem.id);
                await updateDoc(itemRef, { item: itemName });
                setEditingItem(null);
            } else {
                await addDoc(collection(db, 'packingLists'), { userId: user.uid, item: itemName });
            }
            setItemName('');
            fetchPackingList();
        } catch (error) {
            Alert.alert('Error', 'Failed to save item');
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            await deleteDoc(doc(db, 'packingLists', id));
            fetchPackingList();
        } catch (error) {
            Alert.alert('Error', 'Failed to delete item');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Packing List</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Item"
                value={itemName}
                onChangeText={setItemName}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveItem}>
                <Text style={styles.saveButtonText}>{editingItem ? 'Update Item' : 'Add Item'}</Text>
            </TouchableOpacity>
            <FlatList
                data={packingList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemRow}>
                        <Text style={styles.itemText}>{item.item}</Text>
                        <TouchableOpacity onPress={() => { setItemName(item.item); setEditingItem(item); }}>
                          <FontAwesome name="pencil" size={20} color="blue" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                          <FontAwesome name="trash" size={20} color="red" />
                        </TouchableOpacity>
                        
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginBottom: 10, backgroundColor: '#FFF' },
    saveButton: { backgroundColor: '#1E90FF', padding: 12, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
    saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
    itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF', padding: 10, borderRadius: 10, marginBottom: 10 },
    itemText: { fontSize: 16, color: '#333' },
    editButton: { fontSize: 20, color: 'blue', marginHorizontal: 10 },
    deleteButton: { fontSize: 20, color: 'red' }
});

export default PackingList;
