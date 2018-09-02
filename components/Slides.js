import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Slides extends Component {
  renderButton(button) {
    if (button) {
      return <Button title={button} raised buttonStyle={styles.buttonStyle} onPress={this.props.onComplete} />
    }
  }
  renderSlides() {
    return this.props.data.map((slide) => {
      return (
        <View key={slide.text} style={[styles.slideView, { backgroundColor: slide.bgColor }]}>
          <Text style={[styles.slideText, { color: slide.textColor }]}>{slide.text}</Text>
          {this.renderButton(slide.button)}
        </View>
      )
    });
  }
  render() {
    return (
      <ScrollView
        horizontal
        style={styles.scrollView}
        pagingEnabled
      >
        {this.renderSlides()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  slideText: {
    fontSize: 30,
    textAlign: 'center',
  },
  slideView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  buttonStyle: {
    backgroundColor: '#0288D1',
    marginTop: 15
  },
});
