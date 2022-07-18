import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Text, View, Alert, Keyboard } from "react-native";
import COLORS from '../../consts/colors';
import Input from '../SignInSignUp/components/Input';
import Button from '../SignInSignUp/components/Button';
import Loader from '../SignInSignUp/components/Loader';
import Icon from "react-native-vector-icons/MaterialIcons";
import API from '../Api';

const LogInScreen = ({navigation}) => {

    //inputs for fields
    const [inputs, setInputs] = React.useState({
        username: "",
        email: "",
        password: "",
    });

    //input errors
    const [errors, setErrors] = React.useState({});

    //handle loading 
    const [loading, setLoading] = React.useState(false);

    //To validate key fields
    const validate = () => {

        let valid = true;
        if(!inputs.username) {
            handleError("Please input username", "username");
            valid = false;
        }
        if(!inputs.password) {
            valid = false;
            handleError("Please input password", "password");
        } 

        if (valid) {
            logIn();
        }
    };

    // Local storage login testing
    // const logIn = () => {
    //     setLoading(true);
    //     setTimeout( async () => {
    //         setLoading(false);
    //         let userData = await AsyncStorage.getItem("user");
    //         if(userData) {
    //             userData = JSON.parse(userData);
    //             if(inputs.email == userData.email && inputs.password == userData.password){
    //                 AsyncStorage.setItem("user", JSON.stringify({...userData, loggedIn: true}),
    //                 );
    //                 navigation.navigate("HomeScreen");
    //             } else {
    //                 Alert.alert("Error", "Invalid input")
    //             }
    //         } else {
    //             Alert.alert("Error", "User does not exist!")
    //         }
    //     }, 1500);
    // };

    //logIn function
    const logIn = async () => {
        setLoading(true);
        
        try{
            const requestData = {
                username:inputs.username,
                password:inputs.password
            }
            const userData = await API.post("/login/signin", requestData);
            console.log(requestData)
            //pass requestData as props to homescreen
            navigation.navigate("HomeScreen", requestData);
            Alert.alert("Logged in successfully");
            console.log("Logged in successfully", JSON.stringify({...userData, loggedIn: true}));
            console.log(userData.data.id)
        }catch(e){
            Alert.alert("Logged in failed");
            console.error("Logged in failed", JSON.stringify(e, {...userData, loggedIn: false}));
        }
        setLoading(false);
        
    };

    //to handle change in input fields
    const handleOnChange = (text, input) => {
        setInputs((prevState) => ({...prevState, [input]: text}));
    };

    //to handle errors in input fields
    const handleError = (errorMessage, input,) => {
        setErrors((prevState) => ({...prevState, [input]: errorMessage}));
    };


    return (
    <SafeAreaView style={styles.container}>
        <Icon 
          name="arrow-back-ios" 
          size={28} 
          color={COLORS.primary2} 
          onPress={() => navigation.navigate("HomeScreen")}
          style={{paddingLeft: 10}}
        />
        <Loader  visible={loading}/>
        <ScrollView contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20,}}>
            <Text style={styles.textHeader}>Login</Text>
            <Text style={styles.textSubHeader}>Enter Login Details.</Text>
            <View style={{marginVertical: 20}}>
                <Input placeholder="Enter your username" iconName="account-outline" label="Username" error={errors.username} onFocus={() => { handleError(null, "username");}} onChangeText={(text) => handleOnChange(text, 'username')}/>
                <Input placeholder="Enter your password" iconName="lock-outline" label="Password" error={errors.password} onFocus={() => { handleError(null, "password");}} onChangeText={(text) => handleOnChange(text, 'password')} password />
                <Button  title="Login" onPress={validate} />
                <Text>
                    <Text style={styles.loginsubText}>Yet to create an account?</Text>
                    <Text onPress={() => navigation.navigate('SignUpScreen')} style={styles.loginText}>Sign Up</Text>
                </Text>
                <Text></Text>
            </View>
        </ScrollView>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
    textHeader: {
        color: COLORS.black,
        fontSize: 40,
        fontWeight: 'bold',
    },
    textSubHeader: {
        color: COLORS.grey,
        fontSize: 18,
        marginVertical: 10,
    },
    loginText: {
        color: COLORS.black,
        fontSize: 14,
        fontWeight: "bold",
    },
    loginsubText: {
        color: COLORS.black,
        fontSize: 12,
    }
});

export default LogInScreen;