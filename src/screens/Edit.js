import React, { useState, useEffect } from "react";
import EditNote from "../components/EditNote/EditNote";
import { StyleSheet } from "react-native";

export default function Editar(props) {
  return (
    <EditNote {...props} />
  );
}