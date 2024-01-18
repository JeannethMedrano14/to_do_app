import React from 'react';
import CreateNote from '../components/CreateNote/CreateNote.js';
import { StyleSheet } from 'react-native';

export default function Crear(props) {
  return (
    <CreateNote {...props} />
  );
}