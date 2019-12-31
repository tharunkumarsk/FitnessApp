import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello app!!</Text>
      <Ionicons name="ios-add" color="red" size={100}></Ionicons>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
