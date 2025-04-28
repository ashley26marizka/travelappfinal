import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { db, auth } from '../firebaseconfig.js';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';

const screenWidth = Dimensions.get("window").width;

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const user = auth.currentUser;

  useEffect(() => {
    if (user) fetchExpenses();
  }, [user]);

  const fetchExpenses = () => {
    const q = query(collection(db, "expenses"), where("userId", "==", user.uid));
    return onSnapshot(q, (snapshot) => {
      const expensesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setExpenses(expensesList);
    });
  };

  const addExpense = async () => {
    if (amount && category && user) {
      const newExpense = { category, amount: parseFloat(amount), userId: user.uid };
      await addDoc(collection(db, "expenses"), newExpense);
      setAmount('');
      setCategory('');
    }
  };

  const removeExpense = async (id) => {
    await deleteDoc(doc(db, "expenses", id));
  };

  const getPieChartData = () => {
    const categories = {};
    expenses.forEach(exp => {
      categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
    });
    return Object.keys(categories).map((key, index) => ({
      name: key,
      amount: categories[key],
      color: getRandomColor(index),
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    }));
  };

  const getBarChartData = () => {
    const categories = {};
    expenses.forEach(exp => {
      categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
    });
    return {
      labels: Object.keys(categories),
      datasets: [{ data: Object.values(categories) }],
    };
  };

  const getRandomColor = (index) => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
    return colors[index % colors.length];
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, exp) => total + exp.amount, 0).toFixed(2);
  };

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View>
          <Text style={styles.header}>Expense Tracker</Text>

          <TextInput
            placeholder="Enter Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            style={styles.input}
          />

          <TextInput
            placeholder="Enter Category (Food, Activity, etc.)"
            value={category}
            onChangeText={setCategory}
            style={styles.input}
          />

          <Button title="Add Expense" onPress={addExpense} />

          {expenses.length > 0 && (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.chartTitle}>Expense Distribution</Text>
              <PieChart
                data={getPieChartData()}
                width={screenWidth - 40}
                height={220}
                chartConfig={{
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
                }}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />

            </View>
          )}

          <Text style={styles.totalExpense}>Total Expenses: ₹{getTotalExpenses()}</Text>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.expenseItem}>
          <Text style={styles.expenseText}>{item.category}: ₹{item.amount.toFixed(2)}</Text>
          <TouchableOpacity onPress={() => removeExpense(item.id)}>
            <Text style={styles.deleteText}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex:1,padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5
  },
  chartTitle: {
    fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 10
  },
  totalExpense: {
    fontSize: 20, fontWeight: 'bold', marginTop: 20, textAlign: 'center'
  },
  expenseItem: {
    flexDirection: 'row', justifyContent: 'space-between',
    padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc'
  },
  expenseText: { fontSize: 16 },
  deleteText: { fontSize: 16, color: 'red' }
});

export default ExpenseTracker;
