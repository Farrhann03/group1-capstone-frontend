import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  RefreshControl,
  FlatList,
  Dimensions,
} from "react-native";
import COLORS from "../consts/colors";
import { ModalPicker } from "../consts/Modal/LocationFilter";
import { ModalPicker1 } from "../consts/Modal/CuisineFilter";
import { ModalPicker2 } from "../consts/Modal/PriceFilter";
import Icon from "react-native-vector-icons/MaterialIcons";
import API from "./Api";
import Button from "./SignInSignUp/components/Button";

const {width} = Dimensions.get('screen');


const FilterScreen = ({ navigation, route }) => {
  
  const [record, setRecord] = useState([]);
  const [chooseLoc, setchooseLoc] = useState("");
  const [chooseCui, setchooseCui] = useState("");
  const [choosePri, setchoosePri] = useState("");

  const [isLocModalVisible, setisLocModalVisible] = useState(false);
  const [isCuiModalVisible, setisCuiModalVisible] = useState(false);
  const [isPriModalVisible, setisPriModalVisible] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const place = route.params;


  const searchRecords = async () => {
    await API
    .get(`/public/location/${chooseLoc}/${chooseCui}/${choosePri}`)
      .then((res) => res.data)
      .then((data) => {
        setRefreshing(false);
        setRecord(data)});
        
  };
  
  const changeLocModalVisibility = (bool) => {
    setisLocModalVisible(bool);
  };

  const changeCuiModalVisibility = (bool) => {
    setisCuiModalVisible(bool);
  };
  const changePriModalVisibility = (bool) => {
    setisPriModalVisible(bool);
    
  };

  const setLocation = (option) => {
    setchooseLoc(option);
    
  };
  const setCuisine = (option) => {
    setchooseCui(option);
  };
  const setPrice = (option) => {
    setchoosePri(option);
    
  };

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false)
    }, 2000) 
  }
  
  console.log(record)

  const Card = ({record}) => {
    return (
        <TouchableOpacity activeOpacity={0.8}
         onPress={() => navigation.navigate("DetailsScreen", record)}>
        <ImageBackground
            style={style.cardImage}
            source={{uri:record.image}}
            imageStyle={{opacity: 0.7}}>
                <Text 
                    style={{
                        color: COLORS.white, 

                        fontSize: 20, 
                        fontWeight: 'bold',
                        marginTop: 10,
                    }}>
                    {record.name}
                </Text>
                <View style={{flexDirection: 'row'}}>
                                <Icon name='star' size={20} color={COLORS.white} />
                                <Text style={{marginLeft: 5, color:COLORS.white}}>
                                    {record.rating}
                                </Text>
                            </View>
                <View 
                    style={{
                        flex: 1, 
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'flex-end'
                        }}>
                            <View style={{flexDirection: 'row'}}>
                                <Icon name='place' size={20} color={COLORS.white} />
                                <Text style={{marginRight: 20, color:COLORS.white}}>
                                    {record.address}
                                </Text>
                            </View>
                        </View>
        </ImageBackground>
        </TouchableOpacity>
    )
 }

  return (
    <SafeAreaView style={style.container}>
      
      <ImageBackground
        style={{ flex: 1, backgroundColor: COLORS.primary2 }}
        source={require("../assets/wall.jpeg")}
        imageStyle={{ opacity: 0.2 }}
      >
        <Icon
          name="arrow-back-ios"
          size={28}
          color={COLORS.white}
          onPress={() => navigation.navigate("HomeScreen")}
          style={{ paddingLeft: 5, paddingTop: 10 }}
        />
        
        
        {/* ****************Location************************************** */}
        
        <TouchableOpacity
          onPress={() => changeLocModalVisibility(true)}
          style={style.touchableOpacity}
        >
          <Text style={style.text}>location : {chooseLoc}</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isLocModalVisible}
          nRequestClose={() => changeLocModalVisibility(false)}
        >
          <ModalPicker
            changeLocModalVisibility={changeLocModalVisibility}
            setLocation={setLocation}
          />
        </Modal>

        {/* ****************Cuisine************************************** */}
        <TouchableOpacity
          onPress={() => changeCuiModalVisibility(true)}
          style={style.touchableOpacity}
        >
          <Text style={style.text}>cuisine type : {chooseCui}</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isCuiModalVisible}
          nRequestClose={() => changeCuiModalVisibility(false)}
        >
          <ModalPicker1
            changeCuiModalVisibility={changeCuiModalVisibility}
            setCuisine={setCuisine}
          />
        </Modal>

        {/* ****************Price************************************** */}
        <TouchableOpacity
          onPress={() => changePriModalVisibility(true)}
          style={style.touchableOpacity}
        >
          <Text style={style.text}>price range : {choosePri}</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          animationType="fade"
          visible={isPriModalVisible}
          nRequestClose={() => changePriModalVisibility(false)}
        >
          <ModalPicker2
            changePriModalVisibility={changePriModalVisibility}
            setPrice={setPrice}
          />
        </Modal>

        {/* **************** Display the List after Filtering ************************************** */}
        
          <FlatList
            data={record}
            renderItem={({item}) => <Card record={item} />}
            refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => searchRecords()}
            />}
          />
          <View>
            <Button title="Search" onPress={searchRecords}/>
            <Text style={style.footer}>Pull down to see RefreshControl indicator</Text>
          </View>


        </ImageBackground>

      
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary2
  },
  text: {
    marginVertical: 20,
    fontSize: 19,
    color: COLORS.primary2,
    fontWeight: "bold",
  },
  touchableOpacity: {
    backgroundColor: COLORS.white,
    alignSelf: "stretch",
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 15,
    marginHorizontal: 20,
  },
  arrow: {
    fontSize: 23,
  },
  footer: {
    alignContent: "center",
    justifyContent: "center",
    color: COLORS.white,
    paddingBottom: 15,
    marginLeft: 15,
  },
  cardImage: {
    height: 140,
    width: width / 2.5,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: COLORS.dark
  },

});

export default FilterScreen;