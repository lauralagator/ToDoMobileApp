import { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { signOut } from "firebase/auth";
import { db, auth } from "../firebase";

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "tasks"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksArray = [];

      snapshot.forEach((doc) => {
        tasksArray.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setTasks(tasksArray);
    });

    return () => unsubscribe();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "completed") {
      return task.completed === true && matchesSearch;
    }

    if (filter === "uncompleted") {
      return task.completed === false && matchesSearch;
    }

    return matchesSearch;
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCompleted = () => {
    const completedTasks = tasks.filter((task) => task.completed === true);

    if (completedTasks.length === 0) {
      Alert.alert("Info", "Nema završenih zadataka za brisanje.");
      return;
    }

    Alert.alert(
      "Brisanje završenih zadataka",
      "Jesi li sigurna da želiš obrisati sve završene zadatke?",
      [
        { text: "Odustani", style: "cancel" },
        {
          text: "Obriši",
          style: "destructive",
          onPress: async () => {
            for (const task of completedTasks) {
              await deleteDoc(doc(db, "tasks", task.id)); /*iz db zapravo vuce "tasks" s tocnto tim ID-em"*/
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Moji zadaci</Text>

      <Button title="Odjava" color="#d63384" onPress={handleLogout} />

      <View style={styles.space}>
        <Button
          title="Dodaj zadatak"
          onPress={() => navigation.navigate("AddTask")}
        />
      </View>

      <TextInput
        placeholder="Pretraži zadatke..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      <View style={styles.filterContainer}>
        <Button title="Svi" onPress={() => setFilter("all")} />
        <Button title="Završeni" onPress={() => setFilter("completed")} />
        <Button title="Nezavršeni" onPress={() => setFilter("uncompleted")} />
      </View>

      <TouchableOpacity
        style={styles.clearButton}
        onPress={handleDeleteCompleted}
      >
        <Text style={styles.clearButtonText}>Obriši završene zadatke</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        style={{ width: "100%", marginTop: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.taskCard}
            onPress={() =>
              navigation.navigate("EditTask", {
                task: item,
              })
            }
          >
            <Text style={styles.taskTitle}>{item.title}</Text>

            <Text>{item.description}</Text>

            <Text style={styles.category}>
              Kategorija: {item.category ? item.category : "Bez kategorije"}
            </Text>

            <Text style={styles.status}>
              {item.completed ? "Završeno" : "Nije završeno"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff0f5",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#d63384",
  },

  space: {
    marginTop: 15,
  },

  searchInput: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginTop: 15,
    marginBottom: 10,
    shadowColor: "#d63384",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },

  clearButton: {
    backgroundColor: "#ffd6e7",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
  },

  clearButtonText: {
    color: "#c2185b",
    fontWeight: "bold",
  },

  taskCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 20,
    marginBottom: 14,
    shadowColor: "#d63384",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },

  taskTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#c2185b",
  },

  category: {
    marginTop: 8,
    fontWeight: "600",
    color: "#ff4fa3",
  },

  status: {
    marginTop: 12,
    fontWeight: "bold",
    color: "#555",
  },
});