import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import COLORS from "../colors";

const LOCATION = ["North", "South", "East", "West", "Central"];
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ModalPicker = (props) => {
  const onPressItem = (location) => {
    props.changeLocModalVisibility(false);
    props.setLocation(location);
  };

  const location = LOCATION.map((item, index) => {
    return (
      <TouchableOpacity
        style={style.option}
        key={index}
        onPress={() => onPressItem(item)}
      >
        <Text style={style.text}>{item}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => props.changeLocModalVisibility(false)}
        style={style.container}
      >
        <View style={[style.modal, { marginTop: 60, width: WIDTH - 20, height: HEIGHT / 2 }]}>
          <ScrollView>
            <View>{location}</View>
          </ScrollView>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  option: {
    alignItems: "flex-start",
  },
  text: {
    margin: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary2,
  },
});

export { ModalPicker };