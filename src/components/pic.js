import React, {Component} from 'react';
import {
  AppRegistry,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Dimensions from 'Dimensions';
import firebase from 'react-native-firebase';
const DEVICE_WIDTH=Dimensions.get('window').width;

export default class pic extends Component {
  state = {
    avatarSource: null,
    arr: [],
  };

  constructor(props) {
    super(props);
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };
        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  onUpload(){
    var pic = {
      photo: this.state.avatarSource,
    };
      firebase.database().ref('/category/Books/count').once('value',(snapshot) => {
          id = snapshot.val();
          tid = id.b + 1;
          firebase.database().ref('/category/Books/count').set({
          b : tid
            });
            firebase.database().ref('/category/Books/b' + tid ).set({
              pic
            }).then(() => {
                //this.retrieve();
                console.log("Insertion Successful");
            })
      }).catch((error)=>{
          console.log(error)
        });
      }

      /*retrieve(){
        var a=new Array();
        var data = firebase.database().ref('/category/Books/').once('value', (snapshot) => {
            var stores = snapshot.val();
            console.log(stores['count']['b']);
            for(var i=8; i < stores['count']['b'];i++){
                picture = stores['b' + i ]['pic']['photo']['uri']
                if(picture){
                    a.push(picture);
                   // markArray.push(<Marker coordinate = {loc} image={p50} key={i}/>);
                }
                else{
                    console.log("fail");
                    //markArray.push(<Marker coordinate = {loc} image={s50} key={i}/>);
                }
            }
            this.setState({arr:a});
        })
      }*/

  render() {
    return (
      <View style={[styles.container,{fontSize: 50},]}>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View
            style={[
              styles.avatar,
              styles.avatarContainer,
              { marginBottom: 20 },
              {fontSize: 50},
            ]}
          >
            {this.state.avatarSource === null ? (
              <Text>Select a Photo</Text>
            ) : (
              <Image style={styles.avatar} source={this.state.avatarSource} />
            )}
          </View>
        </TouchableOpacity>
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => {this.onUpload()}}>
          <Text style={styles.signUpText}>Upload</Text>
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
    fontSize:20,
    backgroundColor: '#ffffff',
  },
  avatarContainer: {
    borderColor: '#303030',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: DEVICE_WIDTH - 90,
    height: 150,
  },
  buttonContainer: {
    height:45,
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
  },
});