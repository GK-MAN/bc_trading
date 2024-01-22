import React from "react";
import { Image, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import Modal from "react-native-modal";
import Toast from 'react-native-toast-message';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-paper';
import { getAuth, initializeAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getApp, getApps, initializeApp } from "firebase/app";
import * as NavigationBar from 'expo-navigation-bar';

const firebaseConfig = {
    apiKey: "AIzaSyBuA591Sg_dv0RKLXbcD-H5ADZbFmridSE",
    authDomain: "bc-trading-6ac92.firebaseapp.com",
    databaseURL: "https://bc-trading-6ac92-default-rtdb.firebaseio.com",
    projectId: "bc-trading-6ac92",
    storageBucket: "bc-trading-6ac92.appspot.com",
    messagingSenderId: "562200664168",
    appId: "1:562200664168:web:2e95d81a9e5f57ddff83dd",
    measurementId: "G-K9N4051ZS2"
};

let app;
let auth;
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
  auth = getAuth();
}

export { app, auth };

export default class Login extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
            email: "",
            password: "",
            showData: true,
            secureTextEntry: true,
            errors: {},
            isSnackVisible: false,
            snackMessage: "Incorrect Email/Password",
            loadingModal: false,
            inputEmailFocus: false,
            inputPasswordFocus: false
        };
    }
    onSubmit = () => {
        let errors = {};
        ["email", "password"].forEach((name) => {
          let value = this.state[name];
          if (!value) {
            errors[name] = "Should not be empty";
          }
        });
        this.setState({ errors });
        if (Object.keys(errors).length == 0) {
            this.handleLogin();
        }
    };
    storeData = async (userData) => {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        this.props.navigation.navigate('Dashboard')
    };
    onFocus = (type) => {
        let errors = {};
        this.setState({ errors: errors });
        if(type==="Email"){
            this.setState({
                inputEmailFocus: !this.state.inputEmailFocus,
                inputPasswordFocus: false
            })
        }
        if(type==="Password"){
            this.setState({
                inputEmailFocus: false,
                inputPasswordFocus: !this.state.inputPasswordFocus
            })
        }
    }
    handleLogin = async () => {
        const { email, password } = this.state;
        if (!email || !password) {
            alert('Please fill up all the fields')
        } else {
            return signInWithEmailAndPassword(auth, email, password)
            .then(credentials => {
                const user = credentials.user;
                if (user.email === email) {
                    console.log('Welcome', user.email);
                    this.props.navigation.navigate("Tabs")
                }
            })
            .catch((error) => {
                console.log("Error IS ====>", error);
                Toast.show({
                    type: 'error',
                    text1: 'Signed in unsuccessfully',
                    text2: 'Please enter correct credentials'
                });
            })
        }
    }
    handleGoogleLogin = async => {
        alert("Google SignIn to be added later.")
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const googleProvider = new GoogleAuthProvider();
    
        signInWithPopup(auth, googleProvider)
          .then((credentials) => {
            console.log("Signed In With FIREBASE")
            const user = credentials.user;
            console.log(user);
            this.storeData(user);
          })
          .catch((error) => {
            console.log("Error IS ====>", error);
            Toast.show({
                type: 'error',
                text1: 'Authentication Failed',
                text2: 'Incorrect Email/Password'
            });
          })
    }
    handleRegister = async () => {
        const { email, password } = this.state;
        if (!email || !password) {
            Toast.show({
                type: 'error',
                text1: 'Signed up unsuccessfully',
                text2: 'Please fill up all the fields'
            });
        } else {
            return createUserWithEmailAndPassword(auth, email, password)
            .then(credentials => {
                const user = credentials.user;
                console.log('Signed up successfully as:', user.email);
            })
            .catch((error) => {
                console.log("Error IS ====>", error);
                Toast.show({
                    type: 'error',
                    text1: 'Signed up unsuccessfully',
                    text2: 'Error has occurred'
                });
            })
        }
    }
    componentDidMount(){
        NavigationBar.setBackgroundColorAsync("black");
        NavigationBar.setButtonStyleAsync("light");
    }
    render(){
        return(
            <View style={{flex: 1, alignItems: "center", backgroundColor:"black", marginTop: Constants.statusBarHeight,}}>
                <StatusBar backgroundColor={"black"} style="light" />
                <Modal isVisible={this.state.loadingModal} style={{height:160, width: 160, justifyContent:"center", alignSelf:"center"}}  useNativeDriver={true}>
                    <View style={{height:160, width: 160, backgroundColor: 'transparent', justifyContent:"center", alignItems:"center", alignSelf:"center"}}>
                        <ActivityIndicator size="large" color="white" />
                    </View>
                </Modal>
                <View behavior="padding">
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View >
                                <View style={{
                                    marginTop: "1%",
                                    padding: "5.5%",
                                    flexDirection:"row",
                                    justifyContent:"space-between",
                                    alignItems:"center"
                                }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                        <Image source={require("../../assets/arrow-return.jpg")} style={{height: 30, width: 30}}/>
                                    </TouchableOpacity>
                                    <Image source={require("../../assets/logo.jpg")} style={{height: 45, width: 45,}}/>
                                </View>
                                <View
                                    style={{
                                            marginTop: "4%",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            width: "100%",
                                            padding: "5%",                                       
                                    }}>
                                    <View style={{width: "100%", padding: 16}}>
                                        <Text style={{ color:"white", fontSize: 32, fontWeight: "bold", marginBottom: "7%"}}>Login</Text>
                                        <TextInput
                                            label="Email"
                                            mode="outlined"
                                            outlineColor="gray"
                                            style={{backgroundColor:"white", height: 53}}
                                            activeOutlineColor="red"
                                            value={this.state.email}
                                            returnKeyType="next"
                                            onChangeText={(text) =>  this.setState({email: text})}
                                            onFocus={() => this.onFocus("Email")}
                                            onBlur={() => this.onFocus("Email")}
                                        />
                                        { 
                                            this.state.errors.email ?
                                            <Text style={{ color: "red", marginLeft: 7, marginTop: 8, fontFamily:"Lato-Regular" }}>Invalid Email</Text>
                                            :
                                            <View></View>
                                        }
                                        <TextInput
                                            label="Password"
                                            mode="outlined"
                                            outlineColor="gray"
                                            style={{backgroundColor:"white", height: 53, marginTop:22}}
                                            activeOutlineColor="red"
                                            value={this.state.password}
                                            returnKeyType="done"
                                            secureTextEntry={this.state.secureTextEntry}
                                            onChangeText={(text) =>  this.setState({password: text})}
                                            onFocus={() => this.onFocus("Password")}
                                            onBlur={() => this.onFocus("Password")}
                                            right={<TextInput.Icon icon={this.state.secureTextEntry?"eye" : "eye-off"} style={{marginTop: 15}} onPress={() => this.setState({secureTextEntry: !this.state.secureTextEntry})} />}
                                        />
                                        { 
                                            this.state.errors.password ?
                                            <Text style={{ marginTop: 8, color: "red", marginLeft: 7, fontFamily:"Lato-Regular"}}>Invalid Password</Text>
                                            :
                                            <View></View>
                                        }
                                        <View style={{ alignItems: "flex-end", marginTop: 8, marginRight:"2%" }}>
                                            <TouchableOpacity>
                                            <Text
                                                style={{ color: "white", fontFamily:"Lato-Regular"}}
                                            >
                                                Forgot Password?
                                            </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ marginTop: 30, flexDirection: "row", justifyContent:"space-between"}}>
                                            <TouchableOpacity onPress={this.handleRegister} style={{borderRadius: 8,  height: 48, backgroundColor: "white", borderColor:"gray", borderWidth: 1.1, width: "45%", justifyContent:"center", alignItems:"center", alignSelf:"center"}}>
                                                <Text style={{color: "black", fontSize: 17, marginTop: -2, fontFamily:"Lato-Bold"}}>Sign Up</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={this.onSubmit} style={{borderRadius: 8,  height: 47, backgroundColor: "red", width: "45%", justifyContent:"center", alignItems:"center", alignSelf:"center"}}>
                                                <Text style={{fontFamily:"Lato-Bold", color: "white", fontSize: 17, marginTop: -2,}}>Sign In</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: "1.5%",marginRight:"1.5%", marginTop:"7%"}}>
                                            <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
                                            <View>
                                                <Text style={{width: 40, textAlign: 'center', color:"white"}}>Or</Text>
                                            </View>
                                            <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
                                        </View>
                                        <TouchableOpacity onPress={this.handleGoogleLogin}>
                                            <View style={{height: 55, width:"100%", backgroundColor:"white", borderWidth: 0.8, borderColor:"gray", borderRadius: 8, marginTop:"7%", flexDirection:"row", paddingLeft: 20, alignItems:"center"}}>
                                                <Image source={require("../../assets/google.png")} style={{height: 25, width:25}} />
                                                <Text style={{fontSize: 17, fontFamily:"Lato-Bold", marginLeft: 20, color:"black"}}>Continue with Google</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <Toast position="bottom" visibilityTime={3500} />
            </View>
        );
    }
}