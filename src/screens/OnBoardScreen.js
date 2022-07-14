import React from 'react';
import {View, StyleSheet, ImageBackground, StatusBar, Text, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import COLORS from '../consts/colors';

const OnBoardScreen = ({navigation}) => {
    return (
    <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor={"rgba(0,0,0,0)"} />
        <ImageBackground
        style={{flex: 1, backgroundColor: COLORS.dark}}
        source={require('../assets/Brine_001.jpeg')}
        imageStyle={{opacity: 0.7}}>
            <View>
                <Image style={{width: 335, height: 250, marginLeft: 45, marginTop: 80}} source={require('../assets/Suppermakanapa-logo.png')}/>
            </View>
        <View style={style.details}>
            <Text style={{color: COLORS.white, fontSize: 35, fontWeight: 'bold'}}>
                Bring your palate 
            </Text>
            <Text style={{color: COLORS.white, fontSize: 35, fontWeight: 'bold'}}>
                on an exciting journey with us
            </Text>
            <Text style={style.desc}>
                Lorem ipsum crap that i'm lazy to even google at this point i'm seriously just questioning life.
            </Text>
            <TouchableOpacity activeOpacity={0.8} 
            onPress={()=>navigation.navigate("HomeScreen")}>
            <View style={style.btn}>
                <Text style={{fontWeight: 'bold'}}>Get Started</Text>
            </View>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    </View>
    )
};

const style = StyleSheet.create({
    details: {
        height: '50%',
        bottom: 0,
        position: 'absolute',
        paddingHorizontal: 40,
    }, 
    desc: {
        color: 'white',
        lineHeight: 25,
        marginTop: 15,
        backgroundColor: '#D95FAA'
    },
    btn: {
        height: 50,
        width: 120,
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
export default OnBoardScreen;