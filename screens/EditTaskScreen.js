import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function EditTaskScreen({ route, navigation }) {
  const { task } = route.params;

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);
  const [category, setCategory] = useState(task.category || "Faks");

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "tasks", task.id), {
        title,
        description,
        completed,
        category,
      });

      Alert.alert("Uspjeh", "Zadatak je ažuriran!");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Greška", error.message);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Brisanje zadatka",
      "Jesi li sigurna da želiš obrisati ovaj zadatak?",
      [
        { text: "Odustani", style: "cancel" },
        {
          text: "Obriši",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "tasks", task.id));
              Alert.alert("Uspjeh", "Zadatak je obrisan!");
              navigation.navigate("Home");
            } catch (error) {
              Alert.alert("Greška", error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uredi zadatak</Text>

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
        style={styles.statusButton}
        onPress={() => setCompleted(!completed)}
      >
        <Text style={styles.statusButtonText}>
          {completed ? "Označi kao nezavršeno" : "Označi kao završeno"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleUpdate}
      >
        <Text style={styles.primaryButtonText}>Spremi promjene</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
      >
        <Text style={styles.deleteButtonText}>Obriši zadatak</Text>
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
    shadowOffset: { width: 0, height: 2 },
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
    marginBottom: 22,
  },

  categoryButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,

    shadowColor: "#d63384",
    shadowOffset: { width: 0, height: 2 },
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

  statusButton: {
    backgroundColor: "#f8bbd0",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },

  statusButtonText: {
    color: "#8a0f45",
    fontWeight: "bold",
    fontSize: 15,
  },

  primaryButton: {
    backgroundColor: "#d63384",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  deleteButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d63384",
  },

  deleteButtonText: {
    color: "#d63384",
    fontWeight: "bold",
    fontSize: 16,
  },
});