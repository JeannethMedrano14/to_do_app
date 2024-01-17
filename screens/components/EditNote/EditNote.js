import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import axios from 'axios';
import { styles } from './StyleEditNote';

export default function EditNote(props) {
  const initialState = {
    title: "",
    description: "",
    due_date: "",
    due_time: "",
  };

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [estado, setEstado] = useState(initialState);

  useEffect(() => {
    const getOneNote = async (id) => {
      try {
        const response = await axios.get(`http://192.168.0.80:8080/tasks/${id}`);
        setEstado(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getOneNote(props.route.params.taskId);
  }, [props.route.params.taskId]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShow(Platform.OS === "ios");

    setDate(currentDate);

    let tempDate = new Date(currentDate);

     // Formatear fecha
     let fDate =
     tempDate.getFullYear() +
     "-" +
     (tempDate.getMonth() + 1).toString().padStart(2, '0') +
     "-" +
     tempDate.getDate().toString().padStart(2, '0');
 
   // Formatear hora
   let fTime =
     tempDate.getHours().toString().padStart(2, '0') +
     ":" +
     tempDate.getMinutes().toString().padStart(2, '0');

    setEstado({
      ...estado,
      due_date: fDate,
      due_time: fTime,
    });
  };

  const showMode = (currentDate) => {
    setShow(true);
    setMode(currentDate);
  };

  const handleChangeText = (value, name) => {
    setEstado({ ...estado, [name]: value });
  };

  const saveEditedNote = async () => {
    try {
      if (
        estado.title === "" ||
        estado.description === "" ||
        estado.due_date === "" ||
        estado.due_time === ""
      ) {
        Alert.alert(
          "Mensaje importante",
          "Debes rellenar todos los campos requeridos"
        );
      } else {
        const tareaActualizada = {
          title: estado.title,
          description: estado.description,
          due_date: estado.due_date,
          due_time: estado.due_time,
        };

        await axios.put(`http://192.168.0.80:8080/tasks/${props.route.params.taskId}`, tareaActualizada);

        Alert.alert("Éxito", "Tarea actualizada con éxito");

        props.navigation.navigate("Notas");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.caja}>
        <TextInput
          placeholder="Ingresa el título"
          style={styles.textoInput}
          value={estado.title}
          onChangeText={(value) => handleChangeText(value, "title")}
        />

        <TextInput
          placeholder="Ingresa el detalle"
          multiline={true}
          numberOfLines={4}
          style={styles.textoInput}
          value={estado.description}
          onChangeText={(value) => handleChangeText(value, "description")}
        />

        <View style={styles.inputDate}>
          <TextInput
            placeholder="2024-01-01"
            style={styles.textoDate}
            value={estado.due_date}
            editable={false}
          />

          <TouchableOpacity
            style={styles.botonDate}
            onPress={() => showMode("date")}
          >
            <Text style={styles.subtitle}>Date</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputDate}>
          <TextInput
            placeholder="12:00"
            style={styles.textoDate}
            value={estado.due_time}
            editable={false}
          />

          <TouchableOpacity
            style={styles.botonDate}
            onPress={() => showMode("time")}
          >
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

        <TouchableOpacity style={styles.botonEnviar} onPress={saveEditedNote}>
          <Text style={styles.textoBtnEnviar}>Guardar cambios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}