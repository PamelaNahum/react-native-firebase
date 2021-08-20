import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default ({
  children,
  onPress = () => null,
  disabled = false,
  style = null,
}) => {
  const [pressed, setPressed] = useState(false);

  const handlePress = async () => {
    setPressed(true);

    // setTimeout(async () => {
    // }, 1500);

    await onPress();
    setPressed(false);
  };

  return (
    <View style={styles.wrapper}>
      {pressed ? (
        <ActivityIndicator size="large" color="#009fe5" />
      ) : (
        <TouchableOpacity
          onPress={handlePress}
          style={style ? style : styles.button}
          disabled={disabled}
        >
          <Text style={styles.label}>{children}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 42,
    justifyContent: "center",
  },
  button: {
    borderRadius: 30,
    backgroundColor: "#03B581",
    paddingHorizontal: 40,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 42,
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
  },
});
