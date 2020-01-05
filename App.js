import React from "react";
import { View } from "react-native";
import Entry from "./components/Entry";
import History from "./components/History";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        {/* <Entry alreadyLogged={false} /> */}
        <History></History>
      </View>
    </Provider>
  );
}
