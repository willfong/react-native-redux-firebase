import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage, TextInput, ActivityIndicator } from 'react-native';
import { Icon, Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import firebase from 'firebase';

class InsertScreen extends Component {
  static navigationOptions = {
    title: 'Insert',
    tabBarIcon: ({ tintColor }) => <Icon name="edit" size={20} color={tintColor}/>
  }
  state = { token: null }
  async componentWillMount() {
    // TODO: Check to see if the token already exists, then don't need to
    // auth against Firebase
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      let firebaseUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      this.props.saveName(firebaseUser.additionalUserInfo.profile.name);
      this.setState({ token });
    } else {
      this.setState({ token: false });
      this.props.navigation.navigate('auth');
    }
  }

  postMessage = () => {
      const { name, form } = this.props;
      this.props.postMessage({ name, form });
      this.props.navigation.navigate('read');
  }

  render() {
    if (_.isNull(this.state.token)) {
      return (
        <View style={styles.loadingView}>
          <ActivityIndicator size="large" color="#0000EA" />
        </View>
      )
    }
    return (
      <Card title="Say something!" containerStyle={styles.container}>
        <View>
          <Text>Display Name: {this.props.name}</Text>
          <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>Message</Text>
            <TextInput
              placeholder="what's up???"
              autoCorrect={false}
              style={styles.inputStyle}
              value={this.props.form}
              onChangeText={text => this.props.messageUpdate(text)}
            />
          </View>
        </View>
        <Button title="Post Message!" large icon={{name: 'record-voice-over'}} containerStyle={styles.buttonView} backgroundColor="#007bff" onPress={this.postMessage}/>
      </Card>

    )
  }
}


function mapStateToProps(state) {
  return {
    name: state.auth.name,
    form: state.form
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginBottom: 10
  },
  loadingView: {
    flex: 1,
		justifyContent: 'center'
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonView: {
    flex: 1,
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
  }
});

export default connect(mapStateToProps, actions)(InsertScreen);
