import React from "react";
import { View } from "react-native";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { red } from "./colors";

export function isBetween(num, x, y) {
  if (num >= x && num <= y) {
    return true;
  }

  return false;
}

export function calculateDirection(heading) {
  let direction = "";

  if (isBetween(heading, 0, 22.5)) {
    direction = "North";
  } else if (isBetween(heading, 22.5, 67.5)) {
    direction = "North East";
  } else if (isBetween(heading, 67.5, 112.5)) {
    direction = "East";
  } else if (isBetween(heading, 112.5, 157.5)) {
    direction = "South East";
  } else if (isBetween(heading, 157.5, 202.5)) {
    direction = "South";
  } else if (isBetween(heading, 202.5, 247.5)) {
    direction = "South West";
  } else if (isBetween(heading, 247.5, 292.5)) {
    direction = "West";
  } else if (isBetween(heading, 292.5, 337.5)) {
    direction = "North West";
  } else if (isBetween(heading, 337.5, 360)) {
    direction = "North";
  } else {
    direction = "Calculating";
  }

  return direction;
}

export function timeToString(time = Date.now()) {
  const date = new Date(time);
  const todayUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return todayUTC.toISOString().split("T")[0];
}
export function getMatricMetaData(metric) {
  const info = {
    run: {
      displaName: "Run",
      max: 50,
      unit: "miles",
      step: 1,
      type: "steppers",
      getIcon() {
        return (
          <view>
            <MaterialIcons
              name="directions-run"
              color={"red"}
              size={35}
            ></MaterialIcons>
          </view>
        );
      }
    },
    bike: {
      displaName: "Bike",
      max: 100,
      unit: "miles",
      step: 1,
      type: "steppers",
      getIcon() {
        return (
          <view>
            <MaterialCommunityIcons
              name="bike"
              color={"black"}
              size={35}
            ></MaterialCommunityIcons>
          </view>
        );
      }
    },
    swim: {
      displaName: "Swim",
      max: 9900,
      unit: "meters",
      step: 100,
      type: "steppers",
      getIcon() {
        return (
          <view>
            <MaterialCommunityIcons
              name="swim"
              color={"red"}
              size={35}
            ></MaterialCommunityIcons>
          </view>
        );
      }
    },
    eat: {
      displaName: "Eat",
      max: 10,
      unit: "rating",
      step: 1,
      type: "slider",
      getIcon() {
        return (
          <view>
            <MaterialCommunityIcons
              name="food"
              color={"red"}
              size={35}
            ></MaterialCommunityIcons>
          </view>
        );
      }
    },
    sleep: {
      displaName: "Sleep",
      max: 24,
      unit: "hours",
      step: 1,
      type: "slider",
      getIcon() {
        return (
          <view>
            <FontAwesome name="bed" color={"red"} size={35}></FontAwesome>
          </view>
        );
      }
    }
  };
  return typeof metric === "undefined" ? info : info[metric];
}
