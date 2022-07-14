import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,

} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import API from "./Api";

const DetailsScreen = ({ navigation, route }) => {
  const [reviews, setReviews] = useState("");

  useEffect(() => {
    API.get(`/public/review/${place.id}`)
      .then((res) => res.data)
      .then((data) => {
        setReviews(data);
      });
  }, []);

  const place = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{ flex: 0.7, backgroundColor: COLORS.dark }}
        source={{ uri: place.image }}
        imageStyle={{ opacity: 0.7 }}
      >
        <View style={style.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={COLORS.white}
            onPress={navigation.goBack}
          />
          <Icon name="more-vert" size={28} color={COLORS.white} />
        </View>
        <View style={style.imageDetails}>
          <Text
            style={{
              width: "70%",
              fontSize: 30,
              fontWeight: "bold",
              color: COLORS.white,
              marginBottom: 20,
            }}
          >
            {place.name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Icon name="star" size={35} color={COLORS.orange} />
            <Text
              style={{ color: COLORS.white, fontWeight: "bold", fontSize: 25 }}
            >
              {place.rating}
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View style={style.detailsContainer}>
        <View style={style.iconContainer}>
          <Icon name="favorite" color={COLORS.red} size={30} />
        </View>
        <View style={{ flexDirection: "row", marginTop: -80 }}>
          <Icon name="place" size={28} color={COLORS.primary2} />
          <Text
            style={{
              marginLeft: 5,
              fontSize: 18,
              fontWeight: "bold",
              color: COLORS.primary2,
            }}
          >
            {place.address}
          </Text>
        </View>
        <Text style={{ marginTop: 20, fontWeight: "bold", fontSize: 20 }}>
          Reviews
        </Text>
        <FlatList
          contentContainerStyle={{ paddingLeft: 20 }}
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={{ padding: 10 }}>-   {item.review}</Text>
          )}
        />
      </View>
      <View style={style.footer}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: COLORS.white,
            }}
          >
            Wallet damage: {place.priceId}
          </Text>
        </View>
        <TouchableOpacity
          style={style.reservationBtn}
          onPress={() => navigation.navigate("SubmitReviewScreen", place)}
        >
          <Text
            style={{
              color: COLORS.primary2,
              fontSize: 13,
              fontWeight: "bold",
            }}
          >
            Write a Review
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  iconContainer: {
    height: 60,
    width: 60,
    postion: "absolute",
    top: -70,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    left: 280,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  imageDetails: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 40,
  },
  detailsContainer: {
    top: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 0.3,
  },
  footer: {
    flexDirection: "row",
    backgroundColor: COLORS.primary2,
    height: 70,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  reservationBtn: {
    height: 50,
    width: 150,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DetailsScreen;
