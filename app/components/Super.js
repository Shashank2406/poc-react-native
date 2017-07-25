import React from 'react';
import {View,Text} from 'react-native';


export default class Super extends React.Component {
  static navigationOptions = {
    title: 'SuperAdmin',
  };
  constructor(){
    super()
  }
  render() {
    this.eventEmitter.emit('edit-habit');
    return (
      <View>
        <Text>SuperAdmin Page</Text>
        <Greeting name='Rexxar' />
        <Greeting name='Jaina' />
        <Greeting name='Valeera' />
      </View>
    );
  }
}

class Greeting extends React.Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}
