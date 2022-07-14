import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../consts/colors';

const Input = ({label, iconName,error,password,onFocus = () => {}, ...props}) => {

    const [isFocused, setIsFocused] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(password);
    return(
        <View style={{marginBottom: 20}}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.inputContainer, {borderColor: error ?COLORS.red:isFocused ? COLORS.primary2:COLORS.light},]}>
                <Icon name={iconName} style={styles.icon}/>
                <TextInput multiline={true} secureTextEntry={hidePassword} autoCorrect={false} onFocus={()=>{onFocus(); setIsFocused(true);}} onBlur={() => {setIsFocused(false);}} style={styles.textInput} {...props}/>
               {password && <Icon onPress={() => setHidePassword(!hidePassword)} style={styles.icon} name={hidePassword ? "eye-outline" : 'eye-off-outline'}/>}
               
            </View>
            {error && <Text style={styles.inputError}>{error}</Text>}
            
        </View>
    )
};

const styles = StyleSheet.create({
    label: {
        marginVertical: 5,
        fontSize: 14,
        color: COLORS.grey,
    },
    inputContainer: {
        height: 150,
        backgroundColor: COLORS.light,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingTop: 15,
        borderWidth: 0.5,
        alignItems: 'top',
    },
    icon: {
        fontSize: 22,
        color: COLORS.primary2,
        marginRight: 10,
        marginTop: 3,
    },
    textInput: {
        color: COLORS.primary2,
        flex: 1,
    },
    inputError: {
        color: COLORS.red,
        fontSize: 12,
        marginTop: 7,
    }
})

export default Input;