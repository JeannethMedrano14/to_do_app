import { StyleSheet} from 'react-native';


export const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },

  caja: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "90%",
  },

  textoInput: {
    borderColor: "slategray",
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    width: "100%",
  },

  inputDate: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  botonDate: {
    backgroundColor: "#000",
    borderRadius: 15,
    padding: 10,
    width: "30%",
    height: 50,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  textoDate: {
    borderColor: "slategray",
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    flex: 1,
  },

  subtitle: {
    color: "white",
    fontSize: 18,
  },

  botonEnviar: {
    backgroundColor: "#129BF4",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 20,
    margin: 20,
    padding: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  textoBtnEnviar: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  
});

