import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, RefreshControl, StyleSheet, View, ScrollView, Button, Text, ImageBackground, FlatList, TextInput, Dimensions, Animated, Image } from "react-native";
import API from "./Api";


let userDetailContext = React.createContext();

export default UserDetailsComponent = () => {
    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
        API.get(`/login/user`)
        .then((res) => res.data)
        .then((data) => setUserDetails(data));

    }, []);

    console.log(userDetails)
    

    return(
        <userDetailContext.Provider value={userDetails}>
            <Text>
                This is the Parent Component
            </Text>
            <HomeScreen userDetails={userDetails} />
        </userDetailContext.Provider >
    )
}