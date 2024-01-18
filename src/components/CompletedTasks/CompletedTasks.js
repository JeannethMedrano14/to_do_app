import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './StyleCompletedTasks.js';
import axios from 'axios';

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.0.80:8080/tasks/completed/1');
      setCompletedTasks(response.data);
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={completedTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.contenedor}>
            <Text style={styles.titulo}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CompletedTasks;