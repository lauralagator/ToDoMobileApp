import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AddTaskScreen from "./screens/AddTaskScreen";
import EditTaskScreen from "./screens/EditTaskScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Prijava" }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Registracija" }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "TaskFlow" }}
        />

        <Stack.Screen
          name="AddTask"
          component={AddTaskScreen}
          options={{ title: "Dodaj zadatak" }}
        />

        <Stack.Screen
          name="EditTask"
          component={EditTaskScreen}
          options={{ title: "Uredi zadatak" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}