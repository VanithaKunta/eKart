import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image} from 'react-native';

var BUTTONCOLOR = '#0077B5' 
var DEVICE_WIDTH = Dimensions.get('window').width;
var DEVICE_HEIGHT = Dimensions.get('window').height;
const FONT = 'serif';


export default class Product extends Component {

    constructor(){
        super();
    }

    render() {
        return ( 
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: (DEVICE_WIDTH / 2)*1.25,
                    width: DEVICE_WIDTH / 2,
                    }}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={{width: DEVICE_WIDTH / 2 - 10, height: ((DEVICE_WIDTH / 2)*1.25)*0.75 - 10, resizeMode: 'stretch'}}
                            source={{uri: this.props.image}}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{color: 'black', fontSize: 16, fontFamily: FONT, fontWeight: 'bold'}}> {this.props.name}</Text>
                        <Text style={{color: 'black', fontSize: 14, fontFamily: FONT, fontWeight: 'bold'}}> ₹{this.props.price}</Text>
                    </View>            
                </View>
        );
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        height : ((DEVICE_WIDTH / 2)*1.25)*0.75,
        width: DEVICE_WIDTH / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: 'white',
    },
    textContainer: {
        height: ((DEVICE_WIDTH / 2)*1.25)*0.25,
        width: DEVICE_WIDTH / 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'white'
    }
});