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
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';
import PhoneInput from "react-native-phone-number-input";
import database from '@react-native-firebase/database';

const CreateEvent = ({navigation, route}) => {

    const {
        image, title, price, category, description, status, phoneNumber, street, city, state, zipcode, country, uniqueID, itemOwner, ownerEmail, index} = route.params;

    //product details
    const [itemImage, setImage] = useState(image);
    const [itemTitle, setTitle] = useState(title); 
    const [itemPrice, setPrice] = useState(price); 
    const [itemCategory, setCategory] = useState(category); 
    const [itemDescription, setDescription] = useState(description); 
    const [itemStatus, setStatus] = useState(status); 

    // used for phone number
    const [itemPhoneNumber, setPhoneNumber] = useState(phoneNumber);
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const aceEditorRef = useRef();

    //address
    const [itemStreet, setStreet] = useState(street); 
    const [itemState, setState] = useState(state); 
    const [itemCity, setCity] = useState(city); 
    const [itemZipcode, setZipcode] = useState(zipcode); 
    const [itemCountry, setCountry] = useState(country); 

    //user related
    const [itemUser, setUser] = useState(itemOwner); 
    const [itemUserEmail, setEmail] = useState(ownerEmail); 

    async function updateItemInDB(){

        if(itemTitle == '' || itemPrice == '' || itemCategory == '' ||itemDescription == '' || itemStatus == '' || itemStreet == '' || itemState == '' || itemCity == '' || itemZipcode == '' || itemCountry == '' || itemPhoneNumber == ''){
            alert("Please fill out all form fields.");
            return;
        }

        await database()
        .ref('/posts')
        .child(uniqueID).set({
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
            user: itemUser,
            email: itemUserEmail,
            uuid: uniqueID,
        })
        .then(() => console.log('Data Updated Successfully.')); 

        navigation.navigate("Home", 
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
            uuid: uniqueID,
            user: itemUser,
            email: itemUserEmail,
            index: index
        })
    }

    return(
        <SafeAreaView style={{backgroundColor:"white"}}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >
                <View style={{padding: 10, paddingTop:50, paddingBottom:50, flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {/* selecting the image section */}
                    <Text style={{fontSize:25,marginBottom:10}}>Product Image</Text>
                    <View style={styles.sectionArea1}>
                        <Text style={{color:"white", fontSize:20, alignSelf:"flex-start", paddingTop:10, paddingBottom:10}}>Main Image</Text>
                        <ImageBackground style={styles.titleImage} source={
                            {uri: itemImage}
                        }>
                            
                        </ImageBackground>
                    </View>


                    {/* filling in the product details section */}
                    <Text style={{fontSize:25,marginBottom:10}}>Product Details</Text>
                    <View style={styles.sectionArea2}>
                        {/* <Text>test{uniqueID}</Text> */}
                        {/* title */}
                        <Text style = {styles.miniTitle}>Title</Text>
                        <TextInput
                            style={styles.input} placeholder = "Add Title for Item"
                            value={ itemTitle}
                            onChangeText={(value) => setTitle(value)}
                        />

                        {/* price */}
                        <Text style = {styles.miniTitle}>Price</Text>
                        <TextInput
                            style={styles.input} placeholder = "Add Price for Item"
                            keyboardType="numeric"
                            value={ itemPrice}
                            onChangeText={(value) => setPrice(value)}
                        />

                        {/* category */}
                        <Text style = {styles.miniTitle}>Category</Text>
                        <ModalDropdown style={styles.option}
                            options={['Clothes', 'Electronics', 'Furniture', 'Kitchen', 'School Items', 'Textbooks']}
                            defaultValue={itemCategory}
                            onSelect={(idx, value)=>setCategory(value)}
                        />

                        {/* Description */}
                        <Text style = {styles.miniTitle}>Description</Text>
                        <TextInput 
                            style={styles.inputArea}
                            multiline = {true}
                            numberOfLines = {4}
                            value={ itemDescription}
                            onChangeText={(value) => setDescription(value)}
                        ></TextInput>

                        {/* status */}
                        <Text style = {styles.miniTitle}>Status</Text>    
                        <ModalDropdown style={styles.option}
                        options={['Available', 'Sold']}
                        defaultValue={itemStatus}
                        onSelect={(idx, value)=>setStatus(value)}/>

                        {/* phone number */}
                        <Text style = {styles.miniTitle}>Phone Number</Text>
                        <PhoneInput
                            style={{backgroundColor:"steelblue"}}
                            ref={aceEditorRef}
                            defaultValue={itemPhoneNumber}
                            defaultCode="IN"
                            onChangeFormattedText={(text) => {
                                setPhoneNumber(text);
                            }}

                            containerStyle={{borderRadius:10,borderWidth: 2, borderColor:"gray",width:"97%"}}
                            // textInputStyle={{color:"#ffffff"}} //for text color
                            // codeTextStyle={{color:"#ffffff"}} //for the plus 1 color
                            // flagButtonStyle={{color:"#ffffff"}} //for the flag button
                            textContainerStyle={{borderRadius:10,color:"#ffffff"}}
                            // placeholder="Numéro de téléphone"
                            // phoneInputContainer={true}
                            // textInputProps={{placeholderTextColor:"#ffffff"}}

                            withDarkTheme
                            withShadow
                            // autoFocus
                        />
                    </View> 

                    {/* product address view */}
                    <Text style={{fontSize:25,marginBottom:10}}>Product Location</Text>
                    <View style={styles.sectionArea3}>
                        {/* street */}
                        <Text style = {styles.miniTitle}>Steet</Text>
                        <TextInput
                            style={styles.input} placeholder = "Street Address"
                            value={ itemStreet}
                            onChangeText={(value) => setStreet(value)}
                        />

                        {/* city */}
                        <Text style = {styles.miniTitle}>City</Text>
                        <TextInput
                            style={styles.input} placeholder = "City"
                            value={ itemCity}
                            onChangeText={(value) => setCity(value)}
                        />

                        {/* state */}
                        <Text style = {styles.miniTitle}>State</Text>
                        <TextInput
                            style={styles.input} placeholder = "State"
                            value={ itemState}
                            onChangeText={(value) => setState(value)}
                        />

                        {/* zipcode */}
                        <Text style = {styles.miniTitle}>ZipCode</Text>
                        <TextInput
                            style={styles.input} placeholder = "Zipcode"
                            keyboardType="numeric"
                            value={ itemZipcode}
                            onChangeText={(value) => setZipcode(value)}
                        />

                         {/* country */}
                        <Text style = {styles.miniTitle}>Country</Text>
                        <TextInput
                            style={styles.input} placeholder = "Country"
                            value={ itemCountry}
                            onChangeText={(value) => setCountry(value)}
                        />
                    </View>
                    
                    {/* submit button */}
                    {/* style={{padding:10, paddingRight:20, paddingLeft:20, backgroundColor:"#62c799", color:"white", borderWidth:1,borderRadius:20, marginTop:20}} */}
                    <View >
                        <Button
                            title = "Update Item"
                            onPress = {() => updateItemInDB()}
                        />
                    </View>
                    
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
        padding: 20,
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
        backgroundColor:"#86b9ce",
        borderRadius:25,
        borderWidth:1,
        overflow:"hidden",
        marginBottom:25
    },
    sectionArea3:{
        width: '80%',
        // backgroundColor:"#734967",
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        padding: 20,
        backgroundColor:"#7772e2",
        borderRadius:25,
        borderWidth:1,
        overflow:"hidden",
        marginBottom:25
    },
    titleImage:{
        borderRadius:25,
        borderWidth:1,
        width: '100%',
        height:200,
        backgroundColor:"white"
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