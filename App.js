import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import WelcomeScreen from './screens/Welcome';
import AuthScreen from './screens/Auth';
import ReadScreen from './screens/Read';
import InsertScreen from './screens/Insert';
import SettingsScreen from './screens/Settings';
import { CONFIG_FIREBASE } from './config_variables';
import firebase from 'firebase';


export default class App extends React.Component {
  componentWillMount() {
    firebase.initializeApp(CONFIG_FIREBASE);
  }
  render() {
    const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));
    const MainNavigator = createBottomTabNavigator({
      welcome: WelcomeScreen,
      auth: AuthScreen,
      main: {
        screen: createBottomTabNavigator({
          read: ReadScreen,
          insert: InsertScreen,
          setting: SettingsScreen,
        })
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    });
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
