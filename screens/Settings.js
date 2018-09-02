import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
    tabBarIcon: ({ tintColor }) => <Icon name="settings" size={20} color={tintColor}/>
  }
  doLogout = () => {
    this.props.facebookLogout();
    this.props.navigation.navigate('welcome');
  }
  render() {
    return (
      <Card title="Settings" containerStyle={styles.container}>
        <View>
          <Button title="Log out" large icon={{name: 'close'}} backgroundColor="#CC4444" onPress={this.doLogout}/>
        </View>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginBottom: 10
  }
});

export default connect(null, actions)(SettingsScreen);
