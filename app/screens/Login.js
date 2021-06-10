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

class Login extends React.Component{
constructor(props){
  super(props);
  this.state = {
    email: "",
    pass: ""
  };
  this.authenticateUser = this.authenticateUser.bind(this);
}
render(props) {

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <Image fadeDuration={3000} source={require("../assets/d.png")}></Image>
      </TouchableOpacity>
      <View style={styles.loginsignup}>
        <View>
            <TextInput placeholder="Email" name="email" onChangeText={data => this.setState({email:data})} />
            <TextInput placeholder="password" name="password" secureTextEntry={true} onChangeText={data => this.setState({pass: data})}/>
            <Button title="Log In" onPress={() => this.authenticateUser()}/>
        </View>
      </View>
    </SafeAreaView>
  );
}
authenticateUser(navigation){

console.log(this.state.pass)
console.log(this.state.email);
this.props.navigation.navigate('Profile');

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
    width: "25%",
    backgroundColor: "#a5c1e5",
  },
});
export default Login;
