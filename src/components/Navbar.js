import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import MainStack from '../screens/MainStack.js';
import PendingTasks from '../screens/Pending.js';
import CompletedTasks from '../screens/Completed.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

const Navbar = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTintColor: "#fff",
        }}
      >
        
        <Drawer.Screen
          name="Tareas Pendientes"
          component={PendingTasks}
          options={{
            drawerLabelStyle: {
              fontSize: 18,
            },
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="clock-outline" color="orange" size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Tareas Completadas"
          component={CompletedTasks}
          options={{
            drawerLabelStyle: {
              fontSize: 18,
            },
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="check-circle-outline" color="green" size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Home"
          component={MainStack}
          options={{
            drawerLabelStyle: {
              fontSize: 18,
            },
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navbar;
