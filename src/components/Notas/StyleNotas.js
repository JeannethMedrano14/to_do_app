import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
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
    marginBottom: 1,
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  fecha: {
    marginTop: 10,
    color: 'gray',
  },
});