import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './StylePendingTasks.js';
import axios from 'axios';

const PendingTasks = () => {
  const [pendingTasks, setPendingTasks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.0.80:8080/tasks/completed/0');
      setPendingTasks(response.data);
    } catch (error) {
      console.error('Error fetching pending tasks:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pendingTasks}
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

export default PendingTasks;
