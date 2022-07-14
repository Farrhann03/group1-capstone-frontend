import axios from 'axios';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet, ScrollView, Text, View, Alert, InputAccessoryView } from "react-native";
import COLORS from '../../consts/colors';
import Input from '../SignInSignUp/components/Input';
import Button from '../SignInSignUp/components/Button';
import Loader from '../SignInSignUp/components/Loader';
import Icon from "react-native-vector-icons/MaterialIcons";
import API from '../Api';

const SignUpScreen = ({navigation}) => {
    
    //inputs for fields
    const [inputs, setInputs] = React.useState({
        username: "",
        email: "",
        password: "",
    });

    //input for username, email and password
    // const [username, setUsername] = React.useState("");
    // const [email, setEmail] = React.useState("");
    // const [password, setPassword] = React.useState("");

    //function for username, email and password
    // const onChangeInputHandler = (username, email, password) => {
    //     setUsername(username);
    //     setEmail(email);
    //     setPassword(password);
    // }

    //input errors
    const [errors, setErrors] = React.useState({});

    //handle loading 
    const [loading, setLoading] = React.useState(false);

    //handle onChange for inputs to setInputs
    // const onChangeInputHandler = (inputs) => {
    //     setInputs(inputs);
    // };

    //To validate key fields
    const validate = () => {

        let valid = true;
        if(!inputs.email) {
            handleError("Please input email", "email");
            valid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError("Please input valid email", "email");
            valid = false;
        }
        if(!inputs.username) {
            handleError("Please input username", "username");
            valid = false;
        }
        if(!inputs.password) {
            handleError("Please input password", "password");
            valid = false;
        } else if (inputs.password.length < 5) {
            handleError("Minimum password length of 5", "password");
            valid = false;
        }

        if (valid) {
            signUp();
        }
    };

    //Validation of email password and username
    // const validate = () => {

    //     let valid = true;
    //     if(!email) {
    //         handleError("Please input email", "email");
    //         valid = false;
    //     } else if (!email.match(/\S+@\S+\.\S+/)) {
    //         handleError("Please input valid email", "email");
    //         valid = false;
    //     }
    //     if(!username) {
    //         handleError("Please input username", "username");
    //         valid = false;
    //     }
    //     if(!password) {
    //         handleError("Please input password", "password");
    //         valid = false;
    //     } else if (password.length < 5) {
    //         handleError("Minimum password length of 5", "password");
    //         valid = false;
    //     }

    //     if (valid) {
    //         signUp();
    //     }
    // };

    //Local storage test code
    // const signUp = () => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);

    //         try {
    //             AsyncStorage.setItem("user", JSON.stringify(inputs))
    //             navigation.navigate("LogInScreen");
    //         } catch (error){
    //             Alert.alert("Error", "Something went wrong")
    //         }
    //     }, 1500);
    // }



    const signUp = async () => {
        setLoading(true);

            try {
                await API.post("/login/signup",{
                   username: inputs.username,
                   email: inputs.email,
                   password: inputs.password,
                });
                AsyncStorage.setItem("user", JSON.stringify(inputs));
                navigation.navigate("LogInScreen");
            } catch(error) {
                Alert.alert("Error", "Something went wrong")
            } 
            setLoading(false);
    }

    //to handle change in input fields
    const handleOnChange = (text, input) => {
        setInputs((prevState) => ({...prevState, [input]: text}));
    };

    //to handle errors in input fields
    const handleError = (errorMessage, input) => {
        setErrors((prevState) => ({...prevState, [input]: errorMessage}));
    };

    return (
    <SafeAreaView style={styles.container}>
        <Icon 
          name="arrow-back-ios" 
          size={28} 
          color={COLORS.primary2} 
          onPress={navigation.goBack}
          style={{paddingLeft: 10}}
         />           
        <Loader  visible={loading}/>
        <ScrollView contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20,}}>
            <Text style={styles.textHeader}>Sign Up</Text>
            <Text style={styles.textSubHeader}>Enter Details to Sign Up.</Text>
            <View style={{marginVertical: 20}}>
                <Input placeholder="Enter your email address" iconName="email-outline" label="Email" error={errors.email} onFocus={() => { handleError(null, "email");}} onChangeText={(text) => handleOnChange(text, 'email')}/>
                <Input placeholder="Enter your username" iconName="account-outline" label="Username" error={errors.username} onFocus={() => { handleError(null, "username");}} onChangeText={(text) => handleOnChange(text, 'username')}/>
                <Input placeholder="Enter your password" iconName="lock-outline" label="Password" error={errors.password} onFocus={() => { handleError(null, "password");}} onChangeText={(text) => handleOnChange(text, 'password')} password />
                {/* <Input placeholder="Enter your email address" iconName="email-outline" label="Email" error={email} onChangeText={(text) => onChangeInputHandler(email)}/>
                <Input placeholder="Enter your username" iconName="account-outline" label="Username" error={username} onChangeText={(text) => onChangeInputHandler(username)}/>
                <Input placeholder="Enter your password" iconName="lock-outline" label="Password" error={password}  onChangeText={(text) => onChangeInputHandler(password)} password /> */}
                <Button  title="Sign Up" onPress={validate} />
                <Text>                
                    <Text style={styles.loginsubText}>Already have an account?</Text>
                    <Text onPress={() => navigation.navigate('LogInScreen')} style={styles.loginText}>Log in</Text>
                </Text>
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

export default SignUpScreen;


