import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getMatricMetaData, timeToString } from "../utils/helpers";
import UnitSlider from "./slider";
import Stepper from "./stepper";
import Dateheader from "./Dateheader";
import { Ionicons } from "@expo/vector-icons";
import TextButton from "./TextButton";
import PropTypes from "prop-types";

export default class Entry extends Component {
  static propTypes = {
    alreadyLogged: PropTypes.bool
  };
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  };
  increment = metric => {
    const { max, step } = getMatricMetaData(metric);

    this.setState(state => {
      const count = state[metric] + step;

      return {
        ...state,
        [metric]: count > max ? max : count
      };
    });
  };

  decrement = metric => {
    this.setState(state => {
      const count = state[metric] - getMatricMetaData(metric).step;

      return {
        ...state,
        [metric]: count > 0 ? 0 : count
      };
    });
  };

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }));
  };

  submit = () => {
    this.setState(() => ({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 }));
  };

  render() {
    const metaInfo = getMatricMetaData();
    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons name="ios-happy" size={100} />
          <Text>You already logged your information for today.</Text>
          <TextButton onPress={this.submit}>Reset</TextButton>
        </View>
      );
    }
    return (
      <View>
        <Dateheader date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key}>
              {getIcon()}
              {type === "slider" ? (
                <UnitSlider
                  value={value}
                  onChange={value => this.slide(key, value)}
                  {...rest}
                />
              ) : (
                <Stepper
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  }
}
