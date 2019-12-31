import React, { Component } from "react";
import { view, text } from "react-native";
import { getMatricMetaData } from "../utils/helpers";

export default class Entry extends Component {
  render() {
    return (
      <div>
        <view>{getMatricMetaData("bike").getIcon()}</view>
      </div>
    );
  }
}
