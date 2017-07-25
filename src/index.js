import React, { Component } from 'react';
import {
  // AppRegistry,
  StyleSheet,
  // Text,
  // View,
  // Button
  StaticContainer,
  TextInput,
  NativeEventEmitter
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from '../app/components/Login'
import Super from '../app/components/Super'
// import Form from '../app/components/Form'
import customList from '../app/components/List'

import {
  Image,
  ListView,
  Tile,
  Title,
  Subtitle,
  TouchableOpacity,
  Screen,
  Divider,
  Row,
  Text,
  // TextInput,
  Button,
  View,
  ScrollView
} from '@shoutem/ui';

import {
  NavigationBar,
} from '@shoutem/ui/navigation';
import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';


class comicapp extends React.Component {
  static navigationOptions = {
    title: 'Comic App',
  };
  static event = new NativeEventEmitter("Hello");
  constructor(){
    super()
    this.state = {
      formData:{},
      role:false
    }
  }
  data() {
    console.log(this.state.formData)
    fetch('http://192.168.21.129:2001/api/user/verify', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.formData.username,
        password: this.state.formData.password,
      })
    }).then((response) => response.json())
      .then((responseData) => {
        console.warn(responseData.respData.data)
        this.setState({role:responseData.respData.data})
      })
  }
  handleFormChange(formData){
    /*
    formData will contain all the values of the form,
    in this example.

    formData = {
    first_name:"",
    last_name:"",
    gender: '',
    birthday: Date,
    has_accepted_conditions: bool
    }
    */

    this.setState({formData:formData})
    console.log(formData)
    this.props.onFormChange && this.props.onFormChange(formData);
    // console.log(this.state.formData)
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      // <View>
      //   <Text>Hello, Chat App!</Text>
      //   <Button
      //     onPress={() => navigate('Super')}
      //     title="Login"
      //   />
      //   <Button
      //     onPress={() => navigate('Form')}
      //     title="Register"
      //   />
      // </View>
    <Screen>
    <ScrollView>  
      
       {/* <NavigationBar title="Comic App"/>  */}
      <View style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
      }}> 
        <Image
          styleName="medium-avatar"
          source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png' }}
        />
       </View> 
       <Form
        ref='registrationForm'
        onChange={(this.handleFormChange.bind(this))}
        label="Personal Information">
         {/* <View style={{
          flex: 1,
          flexDirection: 'column',

          alignItems: 'center',
        }}>  */}
         {/* <TextInput
         ref='username'
          placeholder={'username'}
        />
        <TextInput
         ref='password'
          placeholder={'Password'}
          secureTextEntry
        />  */}
         <InputField style={styles.in} ref='username'  placeholder='username'/>  
         {/* <TextInput style={styles.in} onChangeText={(text) => this.setState({text})} value={this.state.text} placeholder="username"/> */}
         <InputField style={styles.in} ref='password'  placeholder='password'/>   
         <Button styleName="clear" onPress={() => navigate('List',{ role: this.state.role })} >
          <Text>Login</Text>
        </Button>
        <Button styleName="clear" onPress={()=>this.data()}>
          <Text>Login With Facebook</Text>
        </Button>
        <Button styleName="clear" onPress={() => navigate('Super')}>
          <Text>Login With Google</Text>
        </Button> 
         {/* </View>   */}
        </Form>
       </ScrollView> 
       </Screen>
    );
  }
}

export default comicapp = StackNavigator({
  Home: { screen: comicapp },
  Chat: { screen: Login },
  Super: { screen: Super },
  // Form: { screen: Form},
  List: {screen: customList}
});


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
  in: {
    fontFamily: 'Rubik-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 15,
    color: '#666666',
    height: 40, 
    borderColor: 'white', 
    borderWidth: 0, 
    backgroundColor: 'white'
    // borderBottomColor: '#000000'
  }
});

