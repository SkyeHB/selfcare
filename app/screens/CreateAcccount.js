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

class CreateAcccount extends React.Component{
constructor(props){
  super(props);
  this.state = {
    email: "",
    pass: "",
    rePass: ""
  };
  this.passInput = React.createRef();
  this.rePassInput = React.createRef();
  this.validateData = this.validateData.bind(this);
}
render(props) {

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <Image fadeDuration={3000} source={require("../assets/d.png")}></Image>
      </TouchableOpacity>
      <View style={styles.loginsignup}>
        <View>
            <TextInput placeholder="Email"  name="email" onChangeText={data => this.setState({email:data})} />
            <TextInput placeholder="password" ref={this.passInput} name="password" secureTextEntry={true} onChangeText={data => this.setState({pass: data})}/>
            <TextInput placeholder="retype password" ref={this.rePassInput} name="repassword" secureTextEntry={true} onChangeText={data => this.setState({rePass: data})}/>
            <Button title="Log In" onPress={() => this.validateData()}/>
        </View>
      </View>
    </SafeAreaView>
  );
}
validateData(navigation){

if(this.state.rePass === this.state.pass){
    console.log(this.state.rePass);
    console.log(this.state.pass);
    this.props.navigation.navigate('Login');
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
    width: "25%",
    backgroundColor: "#a5c1e5",
  },
});
export default CreateAcccount;
