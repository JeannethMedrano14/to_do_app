import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { styles } from './StyleNotas.js';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

export default function Notas(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  async function fetchData() {
    try {
      const response = await axios.get("http://192.168.0.80:8080/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }
  

  const formatDueDate = (dueDate) => {
    const date = new Date(dueDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.contenedor} onPress={() => handleTaskPress(item.id)}>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={() => handleToggleStatus(item.id, item.completed)}
          style={styles.iconContainer}
        >
          {item.completed ? (
            <MaterialIcons name="check" size={24} color="green" style={styles.icon} />
          ) : (
            <MaterialIcons name="schedule" size={24} color="orange" style={styles.icon} />
          )}
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.titulo}>{item.title}</Text>
          <Text style={styles.fecha}>{formatDueDate(item.due_date)}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => handleEditTask(item.id)}>
            <MaterialIcons name="edit" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
            <MaterialIcons name="delete" size={24} color="red" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleToggleStatus = async (taskId, isCompleted) => {
    try {
      await axios.put(`http://192.168.0.80:8080/tasks/${taskId}/toggle`, { completed: !isCompleted });
      fetchData();
    } catch (error) {
      console.error(`Error al cambiar el estado de la tarea ${taskId}:`, error);
    }
  };

  const handleTaskPress = (taskId) => {
    console.log(`Tarea seleccionada: ${taskId}`);
  };

  const handleEditTask = (taskId) => {
    props.navigation.navigate('Editar', { taskId });
  };

  const handleDeleteTask = async (taskId) => {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Seguro que quieres eliminar esta tarea?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              await axios.delete(`http://192.168.0.80:8080/tasks/${taskId}`);
              fetchData();
            } catch (error) {
              console.error(`Error al eliminar la tarea ${taskId}:`, error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.boton} onPress={() => props.navigation.navigate('Crear')}>
        <Text style={styles.textoBoton}>Agregar una nueva tarea</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boton} onPress={() => props.navigation.navigate('TareasPendientes')}>
        <Text style={styles.textoBoton}>Tareas Completadas</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <StatusBar style='auto' />
    </View>
  );
}
