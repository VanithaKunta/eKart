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
  ScrollView,
  AsyncStorage,
  Picker,
  Alert
} from 'react-native';
import Dimensions from 'Dimensions';
const FONT = 'serif';

import {Actions} from 'react-native-router-flux';
import firebase from 'react-native-firebase';

import ImagePicker from 'react-native-image-picker'
import uuid from 'uuid/v4'; // Import UUID to generate UUID

const DEVICE_WIDTH=Dimensions.get('window').width;
const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
const ImageRow = ({ image, windowWidth, popImage }) => (
  <View>
    <Image
      source={{ uri: image }}
      style={[styles.img, { width: windowWidth / 2 - 15 }]}
      onError={popImage}
    />
  </View>
);

export default class UploadForm extends Component {

  state = {
    imgSource: '',
    uploading: false,
    progress: 0,
    images: [],
    productName: '',
    price   : '',
    category: 'none',
    description: '',
    contact: '',
    image: '',  
    id:0,
    url:''
  };

  componentDidMount() {
    let images;
    AsyncStorage.getItem('images')
      .then(data => {
        images = JSON.parse(data) || [];
        this.setState({
          images: images
        });
      })
      .catch(error => {
      });
  }

  pickImage = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('You cancelled image picker');
      } else if (response.error) {
        alert('And error occured: ', response.error);
      } else {
        const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          imgSource: source,
          imageUri: response.uri
        });
        console.log(source);
      }
    });
  };

  getCurrentCount(){
  }

  uploadImage = () => {

    this.setState({ uploading: true });
    var c = 0;
    firebase.database().ref('/'+'products/').once('value',(snapshot) => {
      db = snapshot.val();
      console.log("count:" + db['count']['c']);
      c  = db['count']['c'];
    }).then(() => {

    const tid = c + 1;
    console.log("tid" + tid);
    firebase.database().ref('/products/p' + tid ).set({
      productName: this.state.productName,
      price   : this.state.price,
      category: this.state.category,
      description: this.state.description,
      image:this.state.imgSource.uri,
      contact:this.props.email,   
      id:tid,
    }).then(() => {
        console.log("Insertion Successful");
    })
    firebase.database().ref('/products/count').set({
        c : tid
    }).then(() => {
      console.log("Sucessfully Incremented Product Count");
    });
    this.setState({uploading: false})
    Actions.Account({mail:this.props.email});
    });  
  };


  render(){
    const { uploading, imgSource, progress, images } = this.state;
    const windowWidth = Dimensions.get('window').width;
    const disabledStyle = uploading ? styles.disabledBtn : {};
    const actionBtnStyles = [styles.btn, disabledStyle];
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Product name"
              placeholderTextColor="black"
              keyboardType="email-address"
              //underlineColorAndroid='transparent'
              onChangeText={(productName) => this.setState({productName})}/>
        </View>

        <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="Price"
              placeholderTextColor="black"
              keyboardType={'numeric'}
              underlineColorAndroid='transparent'
              onChangeText={(price) => this.setState({price})}/>
        </View>
        
        <View style={styles.formContainer}> 
          <Picker style={styles.picker}
         // style={{flex: 1,height: 35,  width: DEVICE_WIDTH - 90, color: 'black'}}
                selectedValue = {this.state.category}
                textStyle={{fontSize: 24}}
                
                onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
                <Picker.Item label="Select Category" value="none" />
                <Picker.Item label="Electronics" value="Electronics" />
                <Picker.Item label="Instruments" value="Instruments" />
                <Picker.Item label="Books" value="Books" />
                <Picker.Item label="Furniture" value="Furniture" />
                <Picker.Item label="Others" value="Others" />
          </Picker>
        </View>
        
        <View style={styles.descriptionContainer}>
            <TextInput style={styles.inputs}
              placeholder="Description"
              numberOfLines={3}
              multiline={true}
              placeholderTextColor="black"
              underlineColorAndroid='transparent'
              onChangeText={(description) => this.setState({description})}/>
        </View>

        <View style={styles.mainContainer}>
            <TouchableOpacity
              style={actionBtnStyles}
              onPress={this.pickImage}
              disabled={uploading}
            >
              <View>
                <Text style={styles.btnTxt}>Upload image</Text>
              </View>
            </TouchableOpacity>
            {/** Display selected image */}
            {imgSource !== '' && (
              <View>
                <Image source={imgSource} style={styles.image} />
                {uploading && (
                  <View
                    style={[styles.progressBar, { width: `${progress}%` }]}
                  />
                )}
                <TouchableOpacity
                  style={actionBtnStyles}
                  onPress={this.uploadImage}
                  disabled={uploading}
                >
                  <View>
                    {uploading ? (
                      <Text style={styles.btnTxt}>Uploading ...</Text>
                    ) : (
                      <Text style={styles.btnTxt}>Submit</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
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
     // borderBottomColor: '#303030',
      backgroundColor: '#fff',
      borderRadius:10,
      borderWidth:1,
      height:35,
      marginBottom:18,
      flexDirection: 'row',
      alignItems:'center',
      marginLeft:30,
      marginRight:30,
  },
  descriptionContainer: {
   // borderBottomColor: '#303030',
    backgroundColor: '#ffffff',
    borderRadius:10,
    borderWidth: 1,
    height:100,
    justifyContent:'flex-start',
    alignItems:'center',
    marginBottom:18,
    flexDirection: 'row',
    alignItems:'center',
    marginLeft:30,
    marginRight:30,
},
  inputs:{
      height:45,
      //marginLeft:30,
      //backgroundColor: '#fff',
      //marginRight:30,
      flex:1,
      fontSize:20,
      //width: 200,
      fontFamily: FONT
  },
  picker:{
    width: DEVICE_WIDTH - 90,
    alignItems:'center',
    height:35,
    transform: [
      { scale: 1.1}, { scaleY: 1 },
    ],
    color:'black',
    marginLeft:15,
    marginRight:15,
  },
  formContainer:{
    borderWidth: 1,
    borderRadius:10,
    marginBottom: 18,
    backgroundColor: '#fff',
    borderColor:'black',
  },
  buttonContainer: {
    height:35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    marginTop:10,
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
    fontFamily: FONT
  },
  btn: {
    borderRadius: 30,
    backgroundColor: '#0073b1',
    width:200,
    alignItems: 'center',
    justifyContent: 'center',
    height:35
  },
  disabledBtn: {
    backgroundColor: 'rgba(3,155,229,0.5)'
  },
  btnTxt: {
    color: '#fff',
    fontSize:20,
    fontFamily: FONT
  },
  image: {
    minWidth: 200,
    height: 200,
    resizeMode: 'contain',
  },
  img: {
    flex: 1,
    height: 100,
    margin: 5,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#eee',
  },
  progressBar: {
    backgroundColor: 'rgb(3, 154, 229)',
    height: 3,
    shadowColor: '#000',
  }
});