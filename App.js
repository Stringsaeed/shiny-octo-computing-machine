import React from "react";
import { StatusBar } from "react-native";
import AppScreen from "./src/screens/common";
import { Container } from "native-base";
import { Provider } from "react-native-paper";

export default function App() {
  return (
    <Provider>
      <Container>
        <StatusBar animated />
        <AppScreen />
      </Container>
    </Provider>
  );
}
