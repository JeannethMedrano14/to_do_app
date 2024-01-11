import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import appFirebase from '../../../credenciales';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, CheckBox, Button } from '@rneui/themed';
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content';
import { ListItemTitle } from '@rneui/base/dist/ListItem/ListItem.Title';
import { ListItemSubtitle } from '@rneui/base/dist/ListItem/ListItem.Subtitle';
import { styles } from './StyleNotas';

const db = getFirestore(appFirebase);

export default function Notas(props) {
  const [lista, setLista] = useState([]);
  const [tareasSeleccionadas, setTareasSeleccionadas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [notaEliminarId, setNotaEliminarId] = useState(null);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error al almacenar datos:', error);
    }
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return null;
    }
  };

  const deleteNote = async (id) => {
    try {
      await deleteDoc(doc(db, 'notas', id));
      Alert.alert('Éxito', 'Nota eliminada con éxito');
      const updatedList = lista.filter((note) => note.id !== id);
      setLista(updatedList);
      setTareasSeleccionadas(
        tareasSeleccionadas.filter((taskId) => taskId !== id)
      );
      setModalVisible(false);
    } catch (error) {
      console.error('Error al eliminar la nota:', error);
    }
  };

  const toggleSeleccion = async (id) => {
    const isSelected = tareasSeleccionadas.includes(id);
    if (isSelected) {
      const updatedSelection = tareasSeleccionadas.filter((taskId) => taskId !== id);
      setTareasSeleccionadas(updatedSelection);
      await storeData('tareasSeleccionadas', updatedSelection);
    } else {
      const updatedSelection = [...tareasSeleccionadas, id];
      setTareasSeleccionadas(updatedSelection);
      await storeData('tareasSeleccionadas', updatedSelection);
    }
  };

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'notas'));
        const docs = [];
        querySnapshot.forEach((doc) => {
          const { titulo, detalle, fecha, hora } = doc.data();
          docs.push({
            id: doc.id,
            titulo,
            detalle,
            fecha,
            hora,
          });
        });
        setLista(docs);

        const storedSelection = await getData('tareasSeleccionadas');
        if (storedSelection !== null) {
          setTareasSeleccionadas(storedSelection);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, []);

  const openModal = (id) => {
    setModalVisible(true);
    setNotaEliminarId(id);
  };

  const closeModal = () => {
    setModalVisible(false);
    setNotaEliminarId(null);
  };

  return (
    <ScrollView>
      <View>
        <TouchableOpacity style={styles.boton} onPress={() => props.navigation.navigate('Crear')}>
          <Text style={styles.textoBoton}>Agregar una nueva tarea</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contenedor}>
        {lista.map((not) => (
          <ListItem
            key={not.id}
            containerStyle={tareasSeleccionadas.includes(not.id) ? styles.selectedItem : null}
          >
            <CheckBox
              checked={tareasSeleccionadas.includes(not.id)}
              onPress={() => toggleSeleccion(not.id)}
            />
            <ListItemContent>
              <ListItemTitle style={styles.titulo}>{not.titulo}</ListItemTitle>
              <ListItemSubtitle>{not.fecha}</ListItemSubtitle>
            </ListItemContent>
            <FontAwesome
              name="pencil"
              size={24}
              color="black"
              style={styles.icono}
              onPress={() => {
                props.navigation.navigate('Editar', { notaId: not.id });
              }}
            />
            <FontAwesome
              name="trash"
              size={24}
              color="black"
              style={styles.icono}
              onPress={() => openModal(not.id)}
            />
          </ListItem>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¿Seguro que quieres eliminar esta tarea?</Text>
            <Button onPress={() => deleteNote(notaEliminarId)} style={styles.botonEliminar}>
              Eliminar
            </Button>
            <Button onPress={closeModal} style={styles.botonCancelar}>
              Cancelar
            </Button>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
