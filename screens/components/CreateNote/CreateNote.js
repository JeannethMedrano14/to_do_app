import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import appFirebase from '../../../credenciales';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { styles } from './StyleCreateNote';

const db = getFirestore(appFirebase);

export default function CreateNote(props) {
  const initialState = {
    titulo: '',
    detalle: '',
  };

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [estado, setEstado] = useState(initialState);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
    let fTime = tempDate.getHours() + " : " + tempDate.getMinutes();
    setFecha(fDate);
    setHora(fTime);
  };

  const showMode = (currentDate) => {
    setShow(true);
    setMode(currentDate);
  };

  const handleChangeText = (value, name) => {
    setEstado({ ...estado, [name]: value });
  };

  const saveNote = async () => {
    try {
      if (estado.titulo === '' || estado.detalle === '') {
        Alert.alert('Mensaje importante', 'Debes rellenar el campo requerido');
      } else {
        const nota = {
          titulo: estado.titulo,
          detalle: estado.detalle,
          fecha: fecha,
          hora: hora,
        };

        await addDoc(collection(db, 'notas'), { ...nota });

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
            <TouchableOpacity style={styles.botonDate} onPress={() => showMode("date")}>
              <Text style={styles.subtitle}>Date</Text>
            </TouchableOpacity>
          </View>

          {/* Contenedor de hora */}
          <View style={styles.inputDate}>
            <TextInput placeholder="6 : 30" style={styles.textoDate} value={hora} />
            <TouchableOpacity style={styles.botonDate} onPress={() => showMode("time")} >
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
              minimumDate={new Date("2024-1-1")}
            />
          )}

          {/* Boton para enviar los datos */}
          <View>
            <TouchableOpacity style={styles.botonEnviar} onPress={saveNote} >
              <Text style={styles.textoBtnEnviar}>Guardar una nueva nota</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
