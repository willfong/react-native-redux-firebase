import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ReadScreen extends Component {
  static navigationOptions = {
    title: 'Read',
    tabBarIcon: ({ tintColor }) => <Icon name="list" size={20} color={tintColor}/>
  }
  componentWillMount(){
    this.props.listMessages();
    //this.createDataSource(this.props);
  }
  componentWillReceiveProps(nextProps) {
    //this.createDataSource(nextProps);
  }
  createDataSource({listData}) {
    //const ds = new ListView.DataSource({
    //  rowHasChanged: (r1, r2) => r1 !== r2
    //});
    //this.dataSource = ds.cloneWithRows(listData);
  }

  renderRow({item}) {
    return (
      <View style={styles.itemView}>
        <Text style={styles.itemMessage}>{item.message}</Text>
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
    )
  }

  render() {
    return (
      <Card title="Message Board" containerStyle={styles.container}>
        <View style={styles.listStyle}>
          <FlatList
            data={this.props.listData}
            renderItem={this.renderRow}
            keyExtractor={item => item.uid}
          />
        </View>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  const listData = _.map(state.database, (val, uid) => {
    return { ...val, uid };
  });
  return { listData }
};

const styles = StyleSheet.create({
    listStyle: {
      marginBottom: 100
    },
    itemView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
      marginTop: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#AAAAAA',
      padding: 10
    },
    itemMessage: {
      fontSize: 20
    },
    itemName: {
      fontSize: 14,
      color: '#AAAAAA'
    },
    container: {
      flex: 1,
      marginTop: 30,
      marginBottom: 10
    }
});

export default connect(mapStateToProps, actions)(ReadScreen);
