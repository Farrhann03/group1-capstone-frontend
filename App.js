import 'react-native-gesture-handler';
import React, { useState, useMemo }from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnBoardScreen from './src/screens/OnBoardScreen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LogInScreen from './src/screens/SignInSignUp/LogInScreen';
import SignUpScreen from './src/screens/SignInSignUp/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import FilterScreen from './src/screens/FilterScreen';
import SubmitReviewScreen from './src/screens/SubmitReviewScreen';
import API from './src/screens/Api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './src/screens/Usercontext';

const Stack = createStackNavigator();

const App = () => {
  const [inputs, setInputs] = useState(null);
  const value = useMemo(()=> ({inputs, setInputs}), [inputs, setInputs])

  // const [userDetails, setUserDetails] = useState([]);

  // useEffect(() => {
  //     API.get(`/login/user`)
  //     .then((res) => res.data)
  //     .then((data) => setUserDetails(data));
  // }, []);

  //console.log(...userDetails)
  return (
    <UserContext.Provider value={value}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      
        
        <Stack.Screen name="OnBoard" component={OnBoardScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="LogInScreen" component={LogInScreen} />
        <Stack.Screen name="FilterScreen" component={FilterScreen} />
        <Stack.Screen name="SubmitReviewScreen" component={SubmitReviewScreen} />
      


      </Stack.Navigator>
    </NavigationContainer>
    </UserContext.Provider >
  )
}

export default App;

