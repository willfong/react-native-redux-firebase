import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';
import { connect } from 'react-redux';
import * as actions from '../actions';
import firebase from 'firebase';

const SLIDE_DATA = [
  { text: 'Welcome to MyApp', bgColor: '#03A9F4', textColor: 'white' },
  { text: 'This is how you use it', bgColor: '#009688', textColor: 'white' },
  { text: "Let's get started!", bgColor: '#A3C904', textColor: 'white', button: "Let's go now!" },
];

class WelcomeScreen extends Component {
  state = { token: null }

  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
      this.props.navigation.navigate('main');
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }
  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }
  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }
    return (
      <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete}/>
    )
  }
}

export default connect(null, actions)(WelcomeScreen);
