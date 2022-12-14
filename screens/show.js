import React, {useEffect, useState, useRef } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Button,
  Alert,
  Text,
  TextInput,
  ImageBackground,
  Pressable
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';
import PhoneInput from "react-native-phone-number-input";
import database from '@react-native-firebase/database';
import openMap from 'react-native-open-maps'; 
import { createOpenLink } from 'react-native-open-maps';

const CreateEvent = ({navigation, route}) => {

    const {
        image, title, price, category, description, status, phoneNumber, street, city, state, zipcode, country, user, email, uuid, itemIndex, loggedInEmail
    } = route.params;

    //product details
    const [itemImage, setImage] = useState(image);
    const [itemTitle, setTitle] = useState(title); 
    const [itemPrice, setPrice] = useState(price); 
    const [itemCategory, setCategory] = useState(category); 
    const [itemDescription, setDescription] = useState(description); 
    const [itemStatus, setStatus] = useState(status); 

    // used for phone number
    const [itemPhoneNumber, setPhoneNumber] = useState(phoneNumber);

    //address
    const [itemStreet, setStreet] = useState(street); 
    const [itemState, setState] = useState(state); 
    const [itemCity, setCity] = useState(city); 
    const [itemZipcode, setZipcode] = useState(zipcode); 
    const [itemCountry, setCountry] = useState(country); 

    //user related
    const [itemUser, setUser] = useState(user); 
    const [itemUserEmail, setEmail] = useState(email); 


    async function deleteFromDB(){
        await database()
        .ref('/posts')
        .child(uuid).set(null)
        .then(() => console.log('Item Deleted.')); 
        navigation.navigate("Home",{
            delete: true,
            index : itemIndex
        })
    }

    const yosemite = { provider: 'google', end: (itemStreet + " " + itemCity + " " + itemState + " " + itemZipcode) , travelType: 'drive' };
    const openYosemite = createOpenLink(yosemite);

    return(
        <SafeAreaView style={{backgroundColor:"white"}}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >
                <View style={{padding: 10, paddingTop:50, paddingBottom:50, flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {/* selecting the image section */}
                    <Text style={{fontSize:25,marginBottom:10}}>Product Image</Text>
                    <View style={styles.sectionArea1}>
                        <ImageBackground style={styles.titleImage} source={{
                                                        uri: itemImage
                                                    }}>
                            {itemStatus == "Sold" && <View style={{position:"absolute", width: 20, height:20, backgroundColor:"red", right: 10, top: 10, borderWidth:2, borderColor:"white", borderRadius:100}}></View>}
                            {itemStatus == "Available" && <View style={{position:"absolute", width: 20, height:20, backgroundColor:"green", right: 10, top: 10, borderWidth:2, borderColor:"white", borderRadius:100}}></View>}
                        </ImageBackground>
                    </View>


                    {/* filling in the product details section */}
                    <Text style={{fontSize:25,marginBottom:10}}>Product Details</Text>
                    <View style={styles.sectionArea2}>
                        {/* <Text>{uuid}</Text> */}
                        {/* product information */}
                        <Text style={{fontSize:20, fontWeight:"bold", paddingBottom:10}}>{itemTitle}</Text>
                        <Text>{itemDescription}</Text>
                        <Text style={{fontSize:30, paddingTop:20, paddingBottom:10, fontWeight:"bold"}}>${itemPrice}</Text>

                        <Text style={styles.category}>{itemCategory}</Text>
                       {/* user information */}
                        <Text style={{fontSize:15, fontWeight:"bold", padding: 10}}>Seller Information</Text>
                        <Text>{itemUser}</Text>
                        <Text>{itemUserEmail}</Text>
                        <Text>{itemPhoneNumber}</Text>

                        {/* Address */}
                        <Text style={{fontSize:15, fontWeight:"bold", padding: 10}}>Product Address</Text>
                        <Text style={{textTransform:'capitalize'}}>{itemStreet}, {itemCity}, {itemState} {itemZipcode}, {itemCountry}</Text>
                        <Pressable style={styles.openGoogleMaps} onPress={openYosemite}>
                            <Text style={{color:"white", fontSize:15}}>Open Google Maps</Text>
                        </Pressable>
                    </View> 

                    
                    
                    {/* submit button */}
                    {/* style={{padding:10, paddingRight:20, paddingLeft:20, backgroundColor:"#62c799", color:"white", borderWidth:1,borderRadius:20, marginTop:20}} */}
                    {loggedInEmail == email &&
                        <View style={{display:"flex", flexDirection:"row", backgroundColor:"white", width:"80%", justifyContent:"space-evenly", padding:10}} >
                            <Button
                                title="Delete Item"
                                onPress={() => deleteFromDB()}
                            />
                            
                            <Button
                                title = "Edit Item"
                                onPress = {() => navigation.navigate("Edit", 
                                {
                                    image: itemImage,
                                    title : itemTitle,
                                    price: itemPrice,
                                    category: itemCategory,
                                    description: itemDescription,
                                    status: itemStatus,
                                    phoneNumber: itemPhoneNumber,
                                    street: itemStreet,
                                    city: itemCity,
                                    state: itemState,
                                    zipcode: itemZipcode,
                                    country: itemCountry,
                                    uniqueID: uuid,
                                    itemOwner: itemUser,
                                    ownerEmail: itemUserEmail,
                                    index: itemIndex
                                })}
                            />
                        </View>
                    }
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionArea1:{
        width: '80%',
        // backgroundColor:"#734967",
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        padding: 10,
        backgroundColor:"#4274fd",
        borderRadius:25,
        borderWidth:1,
        overflow:"hidden",
        marginBottom:25
    },
    sectionArea2:{
        width: '80%',
        // backgroundColor:"#734967",
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        padding: 20,
        // backgroundColor:"#86b9ce",
        borderRadius:25,
        borderWidth:1,
        overflow:"hidden",
        marginBottom:25
    },
    titleImage:{
        borderRadius:25,
        borderWidth:1,
        width: '100%',
        height:250,
        backgroundColor:"white"
    },
    category:{
        borderRadius:20,
        borderWidth:1,
        borderStyle: 'solid',
        borderColor:"black",
        fontSize: 16,
        // backgroundColor: 'steelb?lue',
        // alignSelf: 'flex-start',
        color:"black",
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 20,
        paddingLeft: 20,
        marginTop:5,
    },
    openGoogleMaps:{
        marginTop: 10,
        borderRadius:20,
        borderWidth:1,
        borderStyle: 'solid',
        borderColor:"black",
        // alignSelf: 'flex-start',
        backgroundColor:"#4274fd",
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 20,
        paddingLeft: 20,
    },
    miniTitle:{
        height:20,
        fontSize: 18,
        // margin: 10,
        color:"white",
        marginBottom:5,
        fontWeight: 'bold',
        alignSelf:'flex-start'
    },
    input:{
        backgroundColor: "white",
        borderColor: "gray",
        width: "100%",
        height: 40,
        padding: 10,
        fontSize:14,
        borderRadius: 10,
        borderWidth: 2,
        marginBottom: 10
    },
    inputArea:{
        backgroundColor: "white",
        borderColor: "gray",
        width: "100%",
        height:150,
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        marginBottom: 10,
        fontSize:14
    },    
    option:{
        padding:10,
        borderRadius:10,
        width:"100%",
        borderWidth:2,
        marginBottom:10,
        borderColor:"gray",
        backgroundColor:"white",
        fontSize:14
    }
    // checkboxContainer: {
    //     flexDirection: "row",
    //     marginBottom: 20,
    //     alignItems: "center",
    //     marginTop: 10
    // }
});

export default CreateEvent;