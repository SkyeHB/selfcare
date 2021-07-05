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
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./Login";
import CreateAccount from "./CreateAcccount"

function Welcome({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <Image fadeDuration={3000} source={require("../assets/d.png")}></Image>
      </TouchableOpacity>
      <View style={styles.loginsignup}>
        <Button title="Log In" onPress={() => navigation.navigate('Login')}/>
        <Button title="Sign Up" onPress={() => navigation.navigate('CreateAccount')}/>
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
