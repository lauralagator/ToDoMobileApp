import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Faks");

  const handleAddTask = async () => {
    if (title === "" || description === "") {
      Alert.alert("Greška", "Popuni sva polja");
      return;
    }

    try {
      await addDoc(collection(db, "tasks"), {
        title: title,
        description: description,
        completed: false,
        category: category,
        userId: auth.currentUser.uid,
      });

      Alert.alert("Uspjeh", "Zadatak dodan!");

      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Greška", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dodaj zadatak</Text>

      <TextInput
        placeholder="Naziv zadatka"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Opis"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <Text style={styles.label}>Kategorija</Text>

      <View style={styles.categoryContainer}>
        {["Faks", "Posao", "Privatno"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.categoryButton,
              category === item && styles.selectedCategory,
            ]}
            onPress={() => setCategory(item)}
          >
            <Text
              style={
                category === item
                  ? styles.selectedText
                  : styles.categoryText
              }
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleAddTask}
      >
        <Text style={styles.primaryButtonText}>
          Spremi zadatak
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff0f5",
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: "#d63384",
  },

  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 15,

    shadowColor: "#d63384",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  label: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "#c2185b",
    fontSize: 16,
  },

  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  categoryButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,

    shadowColor: "#d63384",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  selectedCategory: {
    backgroundColor: "#d63384",
  },

  categoryText: {
    color: "#c2185b",
    fontWeight: "600",
  },

  selectedText: {
    color: "#fff",
    fontWeight: "bold",
  },

  primaryButton: {
    backgroundColor: "#d63384",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});