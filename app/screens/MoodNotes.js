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

class MoodNotes extends React.Component{
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
            <TextInput placeholder="Notes"  name="notes" multiline numberOfLines={5} onChangeText={data => this.setState({notes:data})} />
            <Text>{"\n"}{"\n"}</Text>
        </View>
        <View style={styles.nextButton}>
            <Button title="NextPage" onPress={() => this.validateData()}/>
        </View>
      </View>
    </SafeAreaView>
    
  );
}
validateData(navigation){

if(this.state.rePass === this.state.pass){
    console.log(this.state.rePass);
    console.log(this.state.pass);
    this.props.navigation.navigate('Profile');
}
else{
    console.log(this.state.rePass);
    console.log(this.state.pass);
    this.passInput.current.clear();
    this.rePassInput.current.clear();
}

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
export default MoodNotes;
