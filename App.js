import React from "react";
import { View, Platform, StatusBar } from "react-native";
import AddEntry from "./components/Entry";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import History from "./components/History";
import { purple, white, red } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation-tabs";
import Constants from "expo-constants";

const _TabNavigator =
  Platform.OS === "ios"
    ? createBottomTabNavigator
    : createMaterialTopTabNavigator;

const TabNavigator = _TabNavigator(
  {
    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: "History",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        )
      }
    },

    AddEntry: {
      screen: AddEntry,
      navigationOptions: {
        tabBarLabel: "Add Entry",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : purple,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigation = createStackNavigator({
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    }
  }
});

const Navigation = createAppContainer(MainNavigation);
// This constant is used because when false I want to show some other examples
//  shown on the course like "React Native Components" or "Native Features" that
// aren't used on this appp

const SHOW_UDACIFITNESS = true;
export default class App extends React.Component {
  componentDidMount() {
    //setLocalNotification();
  }
  render() {
    if (SHOW_UDACIFITNESS) {
      return (
        <Provider store={createStore(reducer)}>
          <View style={{ flex: 1 }}>
            <Navigation />
          </View>
        </Provider>
      );
    } else {
      return (
        // <ScrollViewExample />
        <FormExample />
      );
    }
  }
}
