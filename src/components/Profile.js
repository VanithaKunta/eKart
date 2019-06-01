import React, { Component } from 'react';
import { Image,ActivityIndicator ,Text, StyleSheet, TouchableOpacity, View, FlatList, Dimensions, TextInput, Picker, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Product from './Product';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import { white } from 'ansi-colors';

var BUTTONCOLOR = '#0077B5';
var DEVICE_WIDTH = Dimensions.get('window').width;
var DEVICE_HEIGHT = Dimensions.get('window').height;
const FONT = 'serif';

export default class Profile extends Component{

constructor(props){
    super(props);
    this.state = {
        username: ' ',
        email: this.props.mail,
        password:'',
        contact:'',
        fetchingData: true,
    }
}

componentWillMount(){
    this.fetchData(this.state.email);
}

fetchData(email){
    var ind = email.indexOf('@')
    var e = email.slice(0,ind)
    firebase.database().ref('/users/'+ e).once('value',(snapshot) => {
    db = snapshot.val();
    this.setState({data:db});
    }).then(() =>{
    console.log("Successfully fetched data");
    console.log(this.state.data);
    this.setState({fetchingData : false})
    });
}

render() {
return (

    this.state.fetchingData ? 
            (<ActivityIndicator size="large" color={BUTTONCOLOR} style={styles.indicatorContainer}/>)          
            :
    <View style={styles.container}>
        <View style={styles.contactContainer}>
            <View style={styles.iconContainer}>
                <View style={styles.icon}>
                    <Icon name="user" size={80} color='white' />
                </View>
            </View>
            <View style={styles.textContainer}>            
                    <Text style={styles.nameContainer}>{this.state.data.username}</Text>
                    <Text style={styles.emailContainer} >{this.state.data.email}</Text>
                    <Text style={styles.mobileContainer}>{this.state.data.contact}</Text>
            </View>           
        </View>
    </View>
)
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFEFEF',
    },
    indicatorContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    contactContainer:{
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: DEVICE_HEIGHT,
        width: DEVICE_WIDTH,
    },
    iconContainer:{
        marginTop: DEVICE_HEIGHT/4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        backgroundColor: BUTTONCOLOR,
        borderRadius: 50,
    },
    textContainer:{
        marginTop: DEVICE_HEIGHT/15,
        width: DEVICE_WIDTH,
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    nameContainer:{
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30,
        color: 'black',
        fontFamily: FONT,
    },
    emailContainer:{
        marginTop: DEVICE_HEIGHT/30,
        textAlign: 'center',
        fontSize: 21,
        color: 'black',
        fontFamily: FONT,
        margin: 3,
    },
    mobileContainer:{
        marginTop: DEVICE_HEIGHT/60,
        fontSize: 20,
        textAlign: 'center',
        color: 'black',
        fontFamily: FONT
    },
});