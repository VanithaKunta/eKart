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
import Dimensions from 'Dimensions';
import firebase from 'react-native-firebase';
import {Actions} from 'react-native-router-flux';

export default class Login extends Component {

  constructor(props) {
    super(props);
    state = {
      email   : '',
      password: '',
    }
    }
    onLogin(){
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
        Actions.Home({mail:this.state.email});
      }).catch(error => this.setState({ errorMessage: error.message }))
    }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  decapitalise(em){
    em = em.toLowerCase();
    this.setState({email:em}); 
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.decapitalise(email)}/>
        </View>
         <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onLogin()}>
          <Text style={styles.signUpText}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.signupLink]} onPress={() => Actions.SignUp()}>
          <Text style={styles.signUpText1}>SignUp</Text>
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
      borderBottomColor: '#FFFFFF',
      flex:1,
      color : 'black',
      fontSize:20,
      width: 200,
      shadowColor:'#505050',
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
    borderRadius:20,
    //marginLeft:15,
  },
  signupButton: {
    backgroundColor: '#0073b1',
  },
  signUpText: {
    color: 'white',
    fontSize:20,
  },
  signUpText1: {
    color: 'black',
    fontSize:18,
    textDecorationLine: 'underline',
  }
});
