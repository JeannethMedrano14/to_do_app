import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#129BF4',
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  textoBoton: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16,
  },
  contenedor: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titulo: {
    fontWeight: 'bold',
  },
  icono: {
    marginLeft: 10,
  },
  selectedItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
  // Ajusta el estilo del mensaje para agregar margen inferior
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  
  // Ajusta los estilos de los botonesEliminar y Cancelar
  botonEliminar: {
    backgroundColor: 'red',
    borderRadius: 50, // Hacer los botones completamente redondos
    padding: 10,
    marginBottom: 10, // Espaciado entre el mensaje y los botones
    marginRight: 10, // Alineación con el botón "Cancelar"
  },
  
  botonCancelar: {
    backgroundColor: '#129BF4',
    borderRadius: 50, // Hacer los botones completamente redondos
    padding: 10,
  },
});


