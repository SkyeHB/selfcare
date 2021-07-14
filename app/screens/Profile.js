import React, { useState } from "react";
import { render } from "react-dom";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Button,
  TextInput
} from "react-native";

function Profile(props) {
    return (
        <SafeAreaView style={styles.container}>
            <Text>
              PLACEHOLDER FOR PROFILE PAGE
            </Text>
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

export default Profile;