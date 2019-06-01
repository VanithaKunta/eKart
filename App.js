import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {YellowBox} from 'react-native';
import { Router, Scene } from 'react-native-router-flux'

import Main from './src/components/Main';
import SignUp from './src/components/SignUp';
import Login from './src/components/Login';
import Product from './src/components/Product';
import Home from './src/components/Home'
import Description from './src/components/Description';
import UploadForm from './src/components/UploadForm';
import pic from './src/components/pic';
import picture from './src/components/picture';
import Account from './src/components/Account';
import Orders from './src/components/Orders';
import Profile from './src/components/Profile';

type Props = {};
export default class App extends Component<Props> {
  render() {
    console.disableYellowBox = true;
    YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);  // <- insert the warning text here you wish to hide. 
    YellowBox.ignoreWarnings(['Warning: VirtualizedList: missing keys for items, make sure to specify a key property on each item or provide a custom keyExtractor.']);
    return (

      <Router>
        <Scene key="root">
          <Scene key="Main"
            component={Main}
            title="Main"
            hideNavBar={true}
            //initial
          />
          <Scene key="Login"
            component={Login}
            title="Login"
            hideNavBar={true}
            initial
          />         
          <Scene key="SignUp"
            component={SignUp}
            title="SignUp"
            hideNavBar={true}
            //initial
          />
          <Scene key="Orders"
            component={Orders}
            title="Orders"
            hideNavBar={true}
            //initial
          />
          <Scene key="UploadForm"
            component={UploadForm}
            title="UploadForm"
            hideNavBar={true}
            //initial
          /> 
          <Scene key="pic"
            component={pic}
            title="pic"
            hideNavBar={true}
            //initial
          /> 
          <Scene key="picture"
            component={picture}
            title="picture"
            hideNavBar={true}
            //initial
          /> 
          <Scene key="Product"
            component={Product}
            title="Product"
            hideNavBar={true}
            //initial
          />
          <Scene key="Home"
            component={Home}
            title="Home"  
            hideNavBar={true}
            //initial
          />
          <Scene key="Account"
            component={Account}
            title="Account"  
            hideNavBar={true}
            //initial
          />
          <Scene key="Description"
            component={Description}
            title="Description"
            hideNavBar={true}
            //initial
          />
          <Scene key="Profile"
            component={Profile}
            title="Profile"
            hideNavBar={true}
            //initial
          />   
        </Scene>
      </Router>
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
});

