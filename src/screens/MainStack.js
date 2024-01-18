import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Notas from './Note.js';
import CreateNote from './Create.js';
import EditNote from './Edit.js';
import PendingTasks from './Pending.js';
import CompletedTasks from './Completed.js';

const Stack = createStackNavigator();

const MainStack = () => {
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

export default MainStack;
