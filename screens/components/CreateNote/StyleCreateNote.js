import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  contenedorPadre: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tarjeta: {
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
  contenedor: {
    padding: 20,
  },
  textoInput: {
    borderColor: 'slategray',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    width: '100%',
  },
  inputDate: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
  },
  botonDate: {
    backgroundColor: '#000',
    borderRadius: 5,
    padding: 10,
    width: '30%',
    height: '100%',
    marginLeft: 10,
  },
  textoDate: {
    borderColor: 'slategray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
  },
  botonEnviar: {
    backgroundColor: '#129BF4',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  textoBtnEnviar: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16,
  },
});

