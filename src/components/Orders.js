import React, { Component } from 'react';
import { ActivityIndicator ,Text, StyleSheet, TouchableOpacity, View, FlatList, Dimensions, TextInput, Picker, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Product from './Product';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';

var BUTTONCOLOR = '#0077B5'; 
var DEVICE_WIDTH = Dimensions.get('window').width;
var DEVICE_HEIGHT = Dimensions.get('window').height;
const FONT = 'serif';

export default class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            searchText: ' ',
            data: [ ],
            category: 'none',
            email: this.props.mail,
            filterBy: '',
            menuPressed: false,
            fetchingData: true,
            orders:[ ],
        }
    }

    componentWillMount(){
        this.fetchData();
    }

    fetchData(){
        var ind = this.state.email.indexOf('@')
        var e = this.state.email.slice(0,ind)
        firebase.database().ref(`users/${e}/orders`).once("value", snapshot => { 
            if (snapshot.exists()){ 
                 order = snapshot.val();
                 this.setState({orders:order})
            } 
        });
        firebase.database().ref('/'+'products/').once('value',(snapshot) => {
            db = snapshot.val();
            dt = this.state.data;
            l = [ ];
            for(c=0;c<=this.state.orders.length;c++){
                a=this.state.orders[c];
                k = db['p' + a];
                //k['key'] = c+1;
                dt.push(k);
            }
            this.setState({fetchingData:false});
            this.setState({data:dt});
            this.setState({listData:dt});
          }).then(() =>{
            console.log("Successfully fetched data");
          });
    }

    filterData(cat){
        if(cat=='none'){
            this.setState({listData : this.state.data})
        }
        else{
            l = [ ]
            for(var c = 0 ; c < this.state.data.length ; c++){
                if(this.state.data[c]['category'] == cat){
                    l.push(this.state.data[c])
                }
            }
            this.setState({listData : l})
        }
        this.setState({category:cat})
    }

   _renderItem = ({item}) => {
        //console.log("filter:"+this.state.category,"item:"+item.category);
        return (<TouchableOpacity onPress={()=>{Actions.Description({product:item, email:this.props.mail})}}style={{ justifyContent:'flex-start',alignItems:'flex-start',height: (DEVICE_WIDTH / 2)*1.25,
            width: DEVICE_WIDTH / 2,}}>
            <Product
                     image={item.image} 
                     name={item.productName} 
                     price={item.price}
                     /> 
        </TouchableOpacity>);   
    }

    render() {
        //const {goBack} = this.props.navigation;
        return ( 
            <View style={styles.container}>
                { this.state.menuPressed ? ( 
                    <View style={styles.menuContainer}>
                        <View style={styles.imageContainer}>
                             <Icon name="idcard" size={60} color="#FFFFFF" />
                        </View>
                        <View style={styles.menuItemsContainer}>
                            <TouchableOpacity style={styles.menuItem} onPress={()=>{Actions.Home({mail:this.state.email})}}>
                                <Text style={styles.menuItemText}>Home</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuItem} onPress={()=>{Actions.Profile({mail:this.state.email})}}>
                                <Text style={styles.menuItemText}>Profile</Text>
                            </TouchableOpacity>    
                            <TouchableOpacity style={styles.menuItem} onPress={()=>{Actions.Account({mail:this.state.email})}}>
                                <Text style={styles.menuItemText}>Seller Account</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.closeIconContainer} onPress={()=>{this.setState({menuPressed: false})}}>
                            <Icon name="close" size={35} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                ) : null}
                <View style={styles.headerContainer}>
                    <View style={styles.navigationContainer}>
                        <TouchableOpacity style={styles.menuIconContainer} onPress={()=>{this.setState({menuPressed: true})}} >
                            <Icon name="bars" size={35} color='white'/>
                        </TouchableOpacity>
                        <View style={styles.searchBarContainer}>
                            <TextInput
                                style={styles.searchBar}
                                onChangeText={(searchText) => this.setState({searchText})}
                                placeholder="    Search for products"
                                placeholderTextColor= 'black'
                                placeholderTextAlignVertical='center'
                            />
                            <TouchableOpacity style={styles.searchIconContainer}>
                                <Icon name="search1" size={32} color='white' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.filtersContainer}>
                        <View style={styles.categoryContainer}>
                        <Picker
                            selectedValue={this.state.category}
                            style={{flex: 1,height: 35, width: DEVICE_WIDTH/2, color: 'white'}}
                            onValueChange={(itemValue, itemIndex) => this.filterData(itemValue)}
                            itemStyle={{width: DEVICE_WIDTH/2}}
                            mode={'dropdown'}
                            >
                            <Picker.Item label="Select Category" value="none" />
                            <Picker.Item  label="Electronics" value="Electronics" />
                            <Picker.Item  label="Instruments" value="Instruments"/>
                            <Picker.Item  label="Furniture" value="Furniture" />
                            <Picker.Item  label="Books" value="Books" />
                            <Picker.Item  label="Others" value="Others"/>
                        </Picker>
                        </View>
                        <View style={styles.sortByContainer}>
                            <Picker
                                selectedValue={this.state.filterBy}
                                style={{flex: 1,height: 35, width: DEVICE_WIDTH/3, color: 'white'}}
                                onValueChange={(itemValue, itemIndex) =>
                                this.setState({filterBy: itemValue})}
                                itemStyle={{width: DEVICE_WIDTH/2}}
                                mode={'dropdown'}
                                >
                                <Picker.Item  label="Sort by" value="none" />
                                <Picker.Item  label="Price" value="Price" />
                                <Picker.Item  label="Date" value="Date"/>
                                <Picker.Item  label="Rating" value="Rating" />
                                <Picker.Item  label="Popular" value="Popular"/>
                            </Picker>
                        </View>
                    </View> 
                </View>
                <View style={styles.productsContainer}>
                    
                    {
                        this.state.fetchingData ? 
                        (<ActivityIndicator size="large" color={BUTTONCOLOR} />)          
                        : 
                        (<FlatList
                            contentContainerStyle={{justifyContent: 'center',
                            alignItems: 'center',}}
                            numColumns={2}
                            data={this.state.listData}
                            extraData={this.state.category}
                            renderItem={({item})=>this._renderItem({item})}
                        />)
                    }
                    
                </View>
                <TouchableHighlight style={styles.buttonContainer} onPress={() => Actions.Home({mail:this.props.mail})}>
                        <Text style={styles.signUpText}>Place an order</Text>
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
        backgroundColor: '#FFFFFF',
    },
    menuContainer:{
        flex: 1,
        flexDirection: 'column',
        height: DEVICE_HEIGHT,
        width: DEVICE_WIDTH/2,
        position: 'absolute',
        zIndex: 10,
        left: 0,
        backgroundColor: "#fff"
    },
    imageContainer:{
        flex: 1,
        height: DEVICE_HEIGHT*0.25,
        width: DEVICE_WIDTH/2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BUTTONCOLOR,
        borderBottomWidth: 1.5,
        borderColor: 'white'
    },
    menuItemsContainer:{
        height: DEVICE_HEIGHT*0.55,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: BUTTONCOLOR,

    },
    menuItem:{
        height: 50,
        width: DEVICE_WIDTH/2 - 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderColor: 'white'
    },
    menuItemText:{
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        left: 10,
        fontFamily: FONT,
    },
    closeIconContainer:{
        height: DEVICE_HEIGHT*0.20,
        width: DEVICE_WIDTH/2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BUTTONCOLOR
    },
    headerContainer:{
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column', 
        backgroundColor: BUTTONCOLOR,
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
        height: 50,
        width: 50,
        marginRight: 5,
        marginTop:5,
    },
    searchBarContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: DEVICE_WIDTH - 50,
        color: 'black',
        textAlignVertical:'center',
        borderRadius: 5,
        height: 32,
        marginTop:2,
    },
    searchBar:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 32,
        width: DEVICE_WIDTH - 100,
        margin: 5,
        marginRight: 0,
        color: 'black',
        paddingVertical:2,
        textAlignVertical:'center',
        backgroundColor: "#fff",
        borderRadius: 20,
        fontSize:18,
        fontFamily: FONT
    },
    searchIconContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        borderRadius: 5,
        marginRight:1,
        marginBottom:2,
    },
    filtersContainer:{
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: BUTTONCOLOR,
    },
    categoryContainer:{
        flex:1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: FONT
    },
    sortByContainer:{
        flex:1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: FONT   
    },
    productsContainer:{
        flex: 1,
        height: DEVICE_HEIGHT - 100,
        width: DEVICE_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        height:35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:DEVICE_WIDTH,
        position:'absolute',
        bottom:0,
        backgroundColor: BUTTONCOLOR,
      },
      signUpText: {
        color: 'white',
        fontSize:20,
        fontFamily: FONT
      }
});