import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  getMatricMetaData,
  timeToString,
  getDailyReminderValue
} from "../utils/helpers";
import UnitSlider from "./slider";
import Stepper from "./stepper";
import Dateheader from "./Dateheader";
import { Ionicons } from "@expo/vector-icons";
import TextButton from "./TextButton";
import PropTypes from "prop-types";
import { submitEntry, removeEntry } from "../utils/api";
import { connect } from "react-redux";
import { addEntry } from "../actions";

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  );
}

class Entry extends Component {
  static propTypes = {
    alreadyLogged: PropTypes.bool,
    addEntry: PropTypes.func.isRequired
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

  reset = () => {
    const key = timeToString();
    this.props.addEntry({
      [key]: getDailyReminderValue()
    });
    removeEntry(key);
  };
  submit = () => {
    const key = timeToString();
    const entry = this.state;

    this.props.addEntry({
      [key]: entry
    });

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    });
  };

  render() {
    const metaInfo = getMatricMetaData();

    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons name="ios-happy" size={100} />
          <Text>You already logged your information for today.</Text>
          <TextButton onPress={this.reset}>Reset</TextButton>
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
        <SubmitBtn />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const key = timeToString();

  return {
    alreadyLogged: state[key] && typeof state[key].today === "undefined"
  };
}

export default connect(mapStateToProps, { addEntry })(Entry);
