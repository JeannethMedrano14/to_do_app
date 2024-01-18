import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { styles } from './StyleCreateNote';
import axios from 'axios';

export default function CreateNote(props) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [estado, setEstado] = useState({ titulo: '', detalle: '' });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    const tempDate = new Date(currentDate);
    const formattedDate =
      tempDate.getFullYear() +
      '/' +
      String(tempDate.getMonth() + 1).padStart(2, '0') +
      '/' +
      String(tempDate.getDate()).padStart(2, '0');
    const formattedTime =
      String(tempDate.getHours()).padStart(2, '0') +
      ':' +
      String(tempDate.getMinutes()).padStart(2, '0');

    setFecha(formattedDate);
    setHora(formattedTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const handleChangeText = (value, name) => {
    setEstado({ ...estado, [name]: value });
  };

  const saveNote = async () => {
    try {
      if (!estado.titulo || !estado.detalle) {
        Alert.alert('Mensaje importante', 'Debes rellenar todos los campos requeridos');
      } else {
        const nota = {
          title: estado.titulo,
          description: estado.detalle,
          due_date: fecha,
          due_time: hora,
        };

        await axios.post('http://192.168.0.80:8080/tasks', nota);

        Alert.alert('Éxito', 'Guardado con éxito');

        props.navigation.navigate('Notas');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.contenedorPadre}>
      <View style={styles.tarjeta}>
        <View style={styles.contenedor}>
          <TextInput
            placeholder="Ingresa el título"
            style={styles.textoInput}
            value={estado.titulo}
            onChangeText={(value) => handleChangeText(value, 'titulo')}
          />
          <TextInput
            placeholder="Ingresa el detalle"
            multiline={true}
            numberOfLines={4}
            style={styles.textoInput}
            value={estado.detalle}
            onChangeText={(value) => handleChangeText(value, 'detalle')}
          />

          {/* Contenedor de fecha */}
          <View style={styles.inputDate}>
            <TextInput placeholder="1/1/2024" style={styles.textoDate} value={fecha} />
            <TouchableOpacity style={styles.botonDate} onPress={() => showMode('date')}>
              <Text style={styles.subtitle}>Date</Text>
            </TouchableOpacity>
          </View>

          {/* Contenedor de hora */}
          <View style={styles.inputDate}>
            <TextInput placeholder="6 : 30" style={styles.textoDate} value={hora} />
            <TouchableOpacity style={styles.botonDate} onPress={() => showMode('time')}>
              <Text style={styles.subtitle}>Hora</Text>
            </TouchableOpacity>
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              minimumDate={new Date('2024-1-1')}
            />
          )}

          {/* Boton para enviar los datos */}
          <TouchableOpacity style={styles.botonEnviar} onPress={saveNote}>
            <Text style={styles.textoBtnEnviar}>Guardar una nueva tarea</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
