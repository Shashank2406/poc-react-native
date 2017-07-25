import React from 'react';
import {View,Text,Button} from 'react-native';


export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Admin',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Admin Page</Text>
        <Button
          onPress={() => navigate('Super')}
          title="Go to a photos screen"
        />  
      </View>
    );
  }
}

