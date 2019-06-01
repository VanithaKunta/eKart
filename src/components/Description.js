import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableHighlight, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Actions} from 'react-native-router-flux';
import firebase from 'react-native-firebase';

import Communications from 'react-native-communications';
//const BrowserHistory = require('react-router/lib/BrowserHistory').default;

var BUTTONCOLOR = '#0077B5' 
var DEVICE_WIDTH = Dimensions.get('window').width;
var DEVICE_HEIGHT = Dimensions.get('window').height ;
const FONT = 'serif';

export default class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            email:'',
            mobile:'',
            name:'',
            item:this.props.product,
        }
    }

    componentWillMount(){
        this.fetchData();
    }

    fetchData(){
        var ind = this.state.item.contact.indexOf('@')
        var e = this.state.item.contact.slice(0,ind)
        firebase.database().ref('/users/'+e).once('value',(snapshot) => {
            obj = snapshot.val();
            this.setState({email:obj.email})
            this.setState({mobile:obj.contact})
            this.setState({name:obj.username})
        }).then(() =>{
            console.log("Successfully fetched data");
        });
    }

    onCall(){
        Communications.phonecall(this.state.mobile, true);
    }

    onText(){
        Communications.text(this.state.mobile,"Hii there!! I would like to purchase the product "+this.state.item.productName)
    }

    onOrder(){
        Alert.alert("Product is added to cart")
        var ind = this.props.email.indexOf('@')
        var e = this.props.email.slice(0,ind)
        firebase.database().ref(`users/${e}/orders`).once("value", snapshot => { 
            if (snapshot.exists()){
                // console.log("exists!"); 
                 order = snapshot.val();
                 order.push(this.state.item.id);
                 firebase.database().ref('/users/' + e ).update({
                     orders: order
                 }).then(() => {
                     Actions.Home({mail:this.props.email});
                 }) 
            } 
            else{
                firebase.database().ref('/users/' + e ).update({
                    orders:[this.state.item.id]
                }).then(() => {
                    Actions.Home({mail:this.props.email});
                })
            }
        });
    }

    render() {
        const {goBack} = this.props.navigation;
        return ( 
            <View style={styles.container}>
                <View style={styles.navigationContainer}>
                    <TouchableHighlight style={styles.menuIconContainer} onPress={() => goBack()}>
                        <Icon name="arrowleft" size={35} color="#FFFFFF" />
                    </TouchableHighlight>
                    <View style={styles.searchBarContainer}>
                        <Text style={{color: 'white', fontSize: 20, marginRight: 10, fontWeight:'bold', fontFamily : FONT}}>{this.state.item.category}</Text>
                    </View>
                </View>
                    <View style={styles.imageContainer}>
                        <Image
                            style={{width: DEVICE_WIDTH, height: DEVICE_HEIGHT/2 - 50, resizeMode: 'contain'}}
                            source={{uri: this.state.item.image}}
                        />
                    </View>
                    <View style={styles.descriptionContainer}> 
                        <View style={styles.nameContainer}> 
                            <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold', fontFamily: FONT}}>{this.state.item.productName}</Text>
                        </View>
                        <View style={styles.priceContainer}> 
                            <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold', fontFamily: FONT}}>₹{this.state.item.price}</Text>
                        </View>
                            <ScrollView 
                            contentContainerStyle={styles.scrollViewContainer}>
                                <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold', fontFamily: FONT}}>
                                    Description:
                                </Text>
                                <Text style={{color: 'black', fontSize: 18, fontFamily: FONT}}>
                                    {this.state.item.description}
                                </Text>
                                <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold', fontFamily: FONT}}>
                                    Seller information:
                                </Text> 
                                <Text style={{color: 'black', fontSize: 18, fontFamily: FONT}}>
                                    Name: {this.state.name}    
                                </Text>
                                <Text style={{color: 'black', fontSize: 18, fontFamily: FONT}}>
                                    Email: {this.state.email}
                                </Text> 
                                <Text style={{color: 'black', fontSize: 18, fontFamily: FONT}}>
                                    Contact: {this.state.mobile}
                                </Text>       
                            </ScrollView>
                    </View>
                <View styles={styles.bottomContainer}>
                    <View style={styles.iconContainer}>
                        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onText()}>
                                <Icon name="message1" size={35} color='white' />
                        </TouchableHighlight> 
                        <TouchableHighlight style={styles.button1Container} onPress={() => this.onOrder()}>
                                <Icon name="shoppingcart" size={35} color='white'/>
                        </TouchableHighlight> 
                        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onCall()}>
                                <Icon name="phone" size={35} color='white' rotate={90}/>
                        </TouchableHighlight>  
                    </View>
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
        backgroundColor: '#FFFFFF',
    },
    navigationContainer:{
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: BUTTONCOLOR,
    },
    menuIconContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        backgroundColor: BUTTONCOLOR,
       // borderRightWidth: 1,
        borderColor: "#FFFFFF",  
    },
    searchBarContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: DEVICE_WIDTH - 50,
        marginRight: 20,
        height:40,
        backgroundColor: BUTTONCOLOR,
    },
    scrollViewContainer:{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 5,
        width: DEVICE_WIDTH,
        height: 300,
    },
    imageContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: DEVICE_HEIGHT/2 - 50,
        width: DEVICE_WIDTH,
        marginTop:10,
    },
    descriptionContainer:{
        flex: 1,
        flexDirection:'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        margin: 5,
        height:300,
    },
    nameContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        width: DEVICE_WIDTH,
    },
    priceContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        width: DEVICE_WIDTH,
        marginBottom: 10,
    },
    bottomContainer: {    
        flex:1,
        width:DEVICE_WIDTH,
        position:'absolute',
        bottom:0,
        justifyContent: 'center',
        alignItems: 'center',
        height:40,
        backgroundColor: BUTTONCOLOR,
    },
    iconContainer:{
        height:40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:DEVICE_WIDTH,
        backgroundColor: BUTTONCOLOR,
    },
    buttonContainer:{
        height:35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:DEVICE_WIDTH/3,
        backgroundColor: BUTTONCOLOR,
        //marginRight:50,
        //transform: [{ rotate: '90deg'}],
    },
    button1Container:{
        height:35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:DEVICE_WIDTH/3,
        backgroundColor: BUTTONCOLOR,
        borderColor:'#fff',
        borderRightWidth:2,
        borderLeftWidth:2,
    },
});