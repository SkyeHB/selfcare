import 'react-native-gesture-handler';
import React, { Profiler } from "react";
import Welcome from "./app/screens/Welcome";
import Login from "./app/screens/Login";
import Profile from "./app/screens/Profile";
import CreateAcccount from './app/screens/CreateAcccount';
import MoodNotes from './app/screens/MoodNotes';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createAppContainer } from 'react-navigation';
import { Appbar, Menu } from 'react-native-paper';
import { Provider as PaperProvider} from 'react-native-paper'
import MoodEmotion from './app/screens/MoodEmotion';
import MoodScale from './app/screens/MoodScale';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />
          }}>
      <Stack.Screen name="Welcome" component={Welcome}/>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAcccount}/>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="MoodNotes" component={MoodNotes} />
      <Stack.Screen name="MoodEmotion" component={MoodEmotion} />
      <Stack.Screen name="MoodScale" component={MoodScale} />
    </Stack.Navigator>
  </NavigationContainer>
  </PaperProvider>
  );
}

function CustomNavigationBar({ navigation, previous }) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="SelfCare" />

        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="white" onPress={openMenu} />
          }>
          <Menu.Item onPress={() => {console.log('Option 1 was pressed')}} title="Option 1" />
          <Menu.Item onPress={() => {console.log('Option 2 was pressed')}} title="Option 2" />
          <Menu.Item onPress={() => {console.log('Option 3 was pressed')}} title="Option 3" disabled />
        </Menu>

    </Appbar.Header>
  );
}