import React from "react";
import { View } from "react-native";
import Entry from "./components/Entry";
export default function App() {
  return (
    <View>
      <Entry alreadyLogged={false} />
    </View>
  );
}
