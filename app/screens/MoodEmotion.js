import React from "react";
import { render } from "react-dom";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class MoodEmotion extends React.Component{
constructor(props){
  super(props);
  this.state = {
    notes: "",
  };

}
render(props) {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginsignup}>
        <View>
            <Button title="Depressed" onPress={() => this.validateData()}/>
            <Button title="Sad" onPress={() => this.validateData()}/>
            <Button title="Anxious" onPress={() => this.validateData()}/>
            <Button title="Neutral" onPress={() => this.validateData()}/>
            <Button title="Sad" onPress={() => this.validateData()}/>
            <Button title="Angry" onPress={() => this.validateData()}/>
        </View>
      </View>
    </SafeAreaView>
    
  );
}
validateData(navigation){
    this.props.navigation.navigate('MoodNotes');
}

next(){
    this.props.navigation.navigate('login');
}

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginsignup: {
    width: "75%",
    backgroundColor: "#a5c1e5",
  },
  nextButton: {
      backgroundColor: "#fff",
  }
});
export default MoodEmotion;
