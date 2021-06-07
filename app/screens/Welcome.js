import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";

function Welcome(props) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <Image fadeDuration={3000} source={require("../assets/d.png")}></Image>
      </TouchableOpacity>
      <View style={styles.loginsignup}>
        <Button title="Log In" />
        <Button title="Sign Up" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginsignup: {
    width: "25%",
    backgroundColor: "#a5c1e5",
  },
});

export default Welcome;
