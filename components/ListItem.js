import React, { Component } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Card } from 'react-native-elements';


class ListItem extends Component {
  onRowPress = () => {
    console.log('beep');
  }
  render() {
    const { name, message } = this.props.itemdata;
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress}>
        <View>
          <Card>
            <Text style={styles.titleStyle}>{ name }</Text>
            <Text>{ message }</Text>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    );
  };
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
})

export default ListItem;
