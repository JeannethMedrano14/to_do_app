import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import appFirebase from "../../../credenciales";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { styles } from './StyleEditNote'

const db = getFirestore(appFirebase);

export default function EditNote(props) {
  const initialState = {
    titulo: "",
    detalle: "",
    fecha: "",
    hora: "",
  };

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [estado, setEstado] = useState(initialState);

  useEffect(() => {
    const getOneNote = async (id) => {
      try {
        const docRef = doc(db, "notas", id);

        const docSnap = await getDoc(docRef);

        setEstado(docSnap.data());
      } catch (error) {
        console.log(error);
      }
    };

    getOneNote(props.route.params.notaId);
  }, [props.route.params.notaId]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShow(Platform.OS === "ios");

    setDate(currentDate);

    let tempDate = new Date(currentDate);

    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    let fTime = tempDate.getHours() + " : " + tempDate.getMinutes();

    setEstado({
      ...estado,
      fecha: fDate,
      hora: fTime,
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
        estado.titulo === "" ||
        estado.detalle === "" ||
        estado.fecha === "" ||
        estado.hora === ""
      ) {
        Alert.alert(
          "Mensaje importante",

          "Debes rellenar todos los campos requeridos"
        );
      } else {
        const notaActualizada = {
          titulo: estado.titulo,

          detalle: estado.detalle,

          fecha: estado.fecha,

          hora: estado.hora,
        };

        await updateDoc(
          doc(db, "notas", props.route.params.notaId),

          notaActualizada
        );

        Alert.alert("Éxito", "Nota actualizada con éxito");

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
          value={estado.titulo}
          onChangeText={(value) => handleChangeText(value, "titulo")}
        />

        <TextInput
          placeholder="Ingresa el detalle"
          multiline={true}
          numberOfLines={4}
          style={styles.textoInput}
          value={estado.detalle}
          onChangeText={(value) => handleChangeText(value, "detalle")}
        />

        {/* Contenedor de fecha */}

        <View style={styles.inputDate}>
          <TextInput
            placeholder="1/1/2024"
            style={styles.textoDate}
            value={estado.fecha}
            editable={false}
          />

          <TouchableOpacity
            style={styles.botonDate}
            onPress={() => showMode("date")}
          >
            <Text style={styles.subtitle}>Date</Text>
          </TouchableOpacity>
        </View>

        {/*
Contenedor de hora */}

        <View style={styles.inputDate}>
          <TextInput
            placeholder="6 : 30"
            style={styles.textoDate}
            value={estado.hora}
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
