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
class MoodScale extends React.Component{
constructor(props){
  super(props);
  this.state = {
      value: 0
  };
  this.value = React.createRef();
}
render(props) {

  return (
    <SafeAreaView style={styles.container}>
      <View >
        <View>
          <Text>
            Enter a value of 0-100% representing your current mood intensity{"\n"}
          </Text>
          <TextInput placeholder="Enter 0-100%" ref={this.value} name="value" onChangeText={data => this.setState({value:data})} />
        </View>
        <View style={styles.nextButton}>
            <Button title="NextPage" onPress={() => this.validateData()}/>
        </View>
      </View>
    </SafeAreaView>
  );
}
validateData(navigation){
if(this.state.value > 100 || this.state.value < 0){
    this.value.current.clear();
  }
else{
  this.props.navigation.navigate('MoodEmotion');
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
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center"
  },
});

export default MoodScale;
