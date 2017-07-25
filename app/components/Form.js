import React from 'react';
import {View,Text,ScrollView,Button,Icon} from 'react-native';
import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';



export default class customForm extends React.Component {
  static navigationOptions = {
    title: 'Register',
  };
  constructor(){
    super()
    this.state = {
      formData:{}
    }
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
    this.props.onFormChange && this.props.onFormChange(formData);
    // console.log(this.state.formData)
  }
  handleFormFocus(e, component){
    //console.log(e, component);
  }
  data() {
    console.log(this.state.formData)
    fetch('https://192.168.21.129:2001/api/user/verify', {
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
        console.log("inside responsejson");
        console.log('response object:', responseData)

      })
  }
  validator(value){
      if (value == '')
          return "Required"
      if (!value) return true;
      // Check if First Name Contains Numbers
      var matches = value.match(/\d+/g);
      if (matches != null) {
          return "First Name can't contain numbers";
      }

      return true;
  }
  render() {
    return (
    <ScrollView keyboardShouldPersistTaps="always" style={{paddingLeft:0,paddingRight:0, height:200}}>
        <Form
        ref='registrationForm'
        onFocus={this.handleFormFocus.bind(this)}
        onChange={(this.handleFormChange.bind(this))}
        label="Personal Information">
        <Separator label="Personal Information"/>
         <InputField ref='first_name'  validationFunction={(value)=>this.validator(value)} placeholder='First Name'/> 
         <InputField ref='last_name'  placeholder='Last Name'/> 
         <InputField ref='Password' secureTextEntry={true}  placeholder='Password'/> 
         <InputField ref='email'  placeholder='Email'/> 
         <PickerField ref='gender'
          label='Gender'
          options={{
            male: 'Male',
            female: 'Female'
          }}/>
          <Button title="Register" onPress={()=>this.data()}></Button>
        </Form>
    </ScrollView>
    );
  }
}
