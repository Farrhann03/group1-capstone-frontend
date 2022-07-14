import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import COLORS from "../../../consts/colors";

const Button = ({title, onPress = () => {}}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.container} >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        height: 55,
        width: '100%',
        backgroundColor: COLORS.primary2,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    text: {
        color: COLORS.white,
        fontWeight: "bold",
        fontSize: 18,
    }
})
export default Button;