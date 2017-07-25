/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  ActivityIndicator,Button
} from 'react-native';
import {View,Text} from '@shoutem/ui'

export default class customList extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            isLoading: true
        }

    }
    static navigationOptions = {
    title: 'List',
  };

componentDidMount() {
  return fetch('http://192.168.21.129:2001/api/user')
    .then((response) => response.json())
    .then((responseJson) => {
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(responseJson.respData.data),
      }, function() {
        // do something with new state
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

render() {
  const { params } = this.props.navigation.state;  //From index component 
  if (this.state.isLoading) {
    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={{flex: 1, paddingTop: 20}}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
          <View style={styles.row}>
          <Text style={styles.rowText}>
          {rowData.username},
          {params.role}
         {/* {rowData.password}, */}
         {rowData.role}

         </Text>
         </View>
       }
       />
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
    },
    rowText:{
      flex:1,
      fontSize:20
    },

    row:{flexDirection: 'row',
    justifyContent: 'flex-end',padding: 10,
    backgroundColor: '#f4f4f4',marginBottom: 3,},
});
