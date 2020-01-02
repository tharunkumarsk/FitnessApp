// UdaciStepper.js
import React from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Stepper({ unit, value, onIncrement, onDecrement }) {
  return (
    <View>
      <View>
        <TouchableOpacity onPress={onDecrement}>
          <FontAwesome name="minus" size={30} color={"black"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onIncrement}>
          <FontAwesome name="plus" size={30} color={"black"} />
        </TouchableOpacity>
      </View>
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  );
}

Stepper.propTypes = {
  max: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
};
