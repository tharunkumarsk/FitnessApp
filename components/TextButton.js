import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  View
} from "react-native";
import { purple, white } from "../utils/colors";

export default function TextButton({ children, onPress }) {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        style={
          Platform.OS === "ios" ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
        }
        onPress={onPress}
      >
        <Text style={styles.submitBtnText}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
}

TextButton.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  },
  btnContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    flex: 1,
    marginBottom: 36
  }
});
