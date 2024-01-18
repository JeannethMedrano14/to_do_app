import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { styles } from './AppStyles.js';
import Notas from "./src/screens/Note.js";
import CreateNote from "./src/screens/Create.js";
import EditNote from "./src/screens/Edit.js";
import PendingTasks from "./src/screens/Pending.js";
import CompletedTasks from "./src/screens/Completed.js";

export default function App() {
  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Notas"
          component={Notas}
          options={{
            title: "ToDoApp",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#000" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Crear"
          component={CreateNote}
          options={{
            title: "Crear Tarea",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#129BF4" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Editar"
          component={EditNote}
          options={{
            title: "Editar Tarea",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#000" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="TareasPendientes"
          component={PendingTasks}
          options={{
            title: "Tareas Pendientes",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#FFD700" },
            headerTintColor: "black",
          }}
        />
        <Stack.Screen
          name="TareasCompletadas"
          component={CompletedTasks}
          options={{
            title: "Tareas Completadas",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#32CD32" },
            headerTintColor: "white",
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}