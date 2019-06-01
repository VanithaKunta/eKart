import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import firebase from 'react-native-firebase';

export default class SignUpView extends Component {

  constructor(props) {
    super(props);
    state = {
      username: '',
      email   : '',
      password: '',
      contact: '',
     // items:[ ],
    }
  }
    onRegister(){
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
          .then(()=>{
              var ind = this.state.email.indexOf('@')
              var e = this.state.email.slice(0,ind)
              orders=[]
              firebase.database().ref('/users/' + e ).set({
                username: this.state.username,
                email   : this.state.email,
                password: this.state.password,
                contact: this.state.contact,
                orders: [0],
              }).then(() => {
                  console.log("Insertion Successful");
              })
              Actions.Login();
            })
          .catch((error)=>{
            console.log(error)
          }); 
      }  

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  decapitalise(em){
   em = em.toLowerCase();
   this.setState({email:em}); 
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="User name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(username) => this.setState({username})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.decapitalise(email)}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/mobile/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Contact"
              keyboardType={'numeric'}
              underlineColorAndroid='transparent'
              onChangeText={(contact) => this.setState({contact})}/>
        </View>

         <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onRegister()}>
        {/*<TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => Actions.Login()}>*/}
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  inputContainer: {
      borderBottomColor: '#303030',
      backgroundColor: '#ffffff',
      borderRadius:30,
      borderBottomWidth: 1,
      height:45,
      marginBottom:18,
      flexDirection: 'row',
      alignItems:'center',
      marginLeft:30,
      marginRight:30,
  },
  inputs:{
      height:45,
      marginLeft:30,
      marginRight:30,
      flex:1,
      fontSize:20,
      width: 200,
  },
  inputIcon:{
    width:20,
    height:20,
    marginLeft:15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height:40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:200,
    borderRadius:30,
    marginLeft:15,
  },
  signupButton: {
    backgroundColor: '#0073b1',
  },
  signUpText: {
    color: 'white',
    fontSize:20,
  }
});