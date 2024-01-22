import React from "react";
import { Image, View, Dimensions, Text, TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as NavigationBar from 'expo-navigation-bar';

const windowHeight = Dimensions.get('window').height;

export default class Home extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
            email: ""
        };
    }
    handleLogin = () => {
      this.props.navigation.navigate("Login")
    }
    async componentDidMount(){
        NavigationBar.setBackgroundColorAsync("black");
        NavigationBar.setButtonStyleAsync("light");
    }
    render(){
        return(
            <View style={{flex: 1, backgroundColor:"black", marginTop: Constants.statusBarHeight, height: windowHeight}}>
                <StatusBar backgroundColor={"black"} style="light" />
                <View style={{margin:"7%", marginTop:"20%"}}>
                    <Image source={require("../../assets/logo.jpg")} style={{height: 75, width: 75, marginLeft: -10}}/>
                    <Text style={{fontSize: 40, color:"white"}}>Trading</Text>
                    <Text style={{fontSize: 40, fontWeight:"bold", color:"white"}}>made simple.</Text>
                    <View style={{marginTop: 20, flexDirection:"row", alignItems:"center"}}>
                        <AntDesign name="adduser" size={25} color="black" style={{padding: 10, backgroundColor:"#F4F7FF", borderRadius: 100}}/>
                        <Text style={{marginLeft: 10, color:"white", fontSize: 15, fontFamily:"Lato-Regular"}}>Free Demate account opening</Text>
                    </View>
                    <View style={{marginTop: 10, flexDirection:"row", alignItems:"center"}}>
                        <AntDesign name="filetext1" size={25} color="black" style={{padding: 10, backgroundColor:"#F4F7FF", borderRadius: 100}}/>
                        <Text style={{marginLeft: 10, color:"white", fontSize: 15, fontFamily:"Lato-Regular"}}>100% Paperless</Text>
                    </View>
                    <View style={{marginTop: 10, flexDirection:"row", alignItems:"center"}}>
                        <MaterialIcons name="exposure-zero" size={30} color="black" style={{padding: 7, backgroundColor:"#F4F7FF", borderRadius: 100}}/>
                        <Text style={{marginLeft: 10, color:"white", fontSize: 15, fontFamily:"Lato-Regular"}}>Zero hidden charges</Text>
                    </View>
                    <View style={{marginTop: "7%", flexDirection:"row", justifyContent:"space-between", marginLeft:"4%", marginRight:"5%"}}>
                        <View
                            style={{height: 95, backgroundColor:"transparent", alignItems:"center", justifyContent:"center",}}>
                            <Image source={require("../../assets/mutualfund.png")} style={{height: 40, width: 40, marginTop: -4}}/>
                            <Text style={{color:"white", marginTop: 8, fontSize: 16, fontFamily:"Lato-Bold"}}>Funds</Text>
                        </View>
                        <View
                            style={{height: 95, backgroundColor:"transparent", alignItems:"center", justifyContent:"center",}}>
                            <Image source={require("../../assets/stock.png")} style={{height: 37, width: 37}}/>
                            <Text style={{fontFamily:"Lato-Bold", color:"white", marginTop: 8, fontSize: 16}}>Stocks</Text>
                        </View>
                        <View
                            style={{height: 95, backgroundColor:"transparent", alignItems:"center", justifyContent:"center"}}>
                            <Image source={require("../../assets/intraday.png")} style={{height: 37, width: 37}}/>
                            <Text style={{ fontFamily:"Lato-Bold", color:"white", marginTop: 8, fontSize: 16}}>Intraday</Text>
                        </View>
                    </View>
                    
                </View>
                <View style={{bottom: 10, justifyContent:"center", alignSelf:"center"}}>
                    <View>
                        <TouchableOpacity onPress={this.handleLogin} style={{borderRadius: 8,  height: 52, backgroundColor: "red", width: "600", justifyContent:"center", alignItems:"center", alignSelf:"center"}}>
                            <Text style={{color: "#fff", fontSize: 17.5, marginTop: -1, marginLeft: 50, marginRight: 50, fontFamily:"Lato-Bold"}}>Get started</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        );
    }
}