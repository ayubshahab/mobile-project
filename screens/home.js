import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  StyleSheet,
  View,
  Button,
  Alert,
  Text,
  Switch,
  TouchableOpacity,
  LogBox,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';

LogBox.ignoreAllLogs();

// import uuid from 'react-native-uuid';
import { Card } from '@rneui/base';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';
// import firebase from 'firebase';

// let saleItems = [
//     {
//         image : null,
//         title : "Northface Backpack",
//         price : "20",
//         category: "School Item",
//         description: "Northface Backpack that holds a laptop, slightly used, willing to negotiate price",
//         phoneNumber: "571-260-7426",
//         status: "Available",
//         image: "",
//         street: "14897 cherrydale Dr",
//         city:"woodbridge",
//         state:'virginia',
//         country:"US",
//         zipcode:'22193',
//         user: 'Admin',
//         email: 'admin@virginia.edu',
//         uuid: uuid.v4()
//     },
//     {
//         image : null,
//         title : "Black Jacket",
//         price : "10",
//         category: "Clothes",
//         description: "Brand new Black leather jacket that will keep you warm during the winter",
//         phoneNumber: "571-260-3833",
//         status: "Sold",
//         image: "",
//         street: "14897 cherrydale Dr",
//         city:"woodbridge",
//         state:'virginia',
//         country:"US",
//         zipcode:'22193',
//         user: 'Admin',
//         email: 'admin@virginia.edu',
//         uuid: uuid.v4()
//     },
//     {
//         image : null,
//         title : "Northface Hoodie",
//         price : "35",
//         category: "Clothes",
//         description: "Northface Hoodie that will keep you warm during the winter months.",
//         phoneNumber: "571-260-7426",
//         status: "Sold",
//         image: "",
//         street: "14897 cherrydale Dr",
//         city:"woodbridge",
//         state:'virginia',
//         country:"US",
//         zipcode:'22193',
//         user: 'Admin',
//         email: 'admin@virginia.edu',
//         uuid: uuid.v4()
//     },
//     {
//         image : null,
//         title : "Table set with 6 chairs",
//         price : "100",
//         category: "Furniture",
//         description: "Table set with 6 chairs from ikea. Almost like brand new with minor scratches",
//         phoneNumber: "571-260-7426",
//         status: "Available",
//         image: "",
//         street: "14897 cherrydale Dr",
//         city:"woodbridge",
//         state:'virginia',
//         country:"US",
//         zipcode:'22193',
//         user: 'Admin',
//         email: 'admin@virginia.edu',
//         uuid: uuid.v4()
//     }
// ]
        
const Home = ({navigation, route}) => {

    //
    //------------------ Passing Data when routing ---------------
    //
    // if(route.params != null){
    //     //if the item is getting deleted
    //     if(route.params.index != null && route.params.delete != null){
    //         saleItems.splice(route.params.index,1);
    //         route.params = null;
    //     }
    //     //if the item is getting updated
    //     else if(route.params.index != null){ //if the item is found, it is at index i
    //         saleItems[route.params.index].image = route.params.image;
    //         saleItems[route.params.index].title = route.params.title;
    //         saleItems[route.params.index].price = route.params.price;
    //         saleItems[route.params.index].category = route.params.category;
    //         saleItems[route.params.index].description = route.params.description;
    //         saleItems[route.params.index].status = route.params.status;
    //         saleItems[route.params.index].phoneNumber = route.params.phoneNumber;
    //         saleItems[route.params.index].street = route.params.street;
    //         saleItems[route.params.index].city = route.params.city;
    //         saleItems[route.params.index].state = route.params.state;
    //         saleItems[route.params.index].zipcode = route.params.zipcode;
    //         saleItems[route.params.index].country = route.params.country;
    //         saleItems[route.params.index].user = route.params.user;
    //         saleItems[route.params.index].email = route.params.email;
    //         saleItems[route.params.index].uuid = route.params.uuid;
    //         route.params = null;
    //     }else if(route.params.title != null & route.params.price != null){ //otherwise add a new item
    //         saleItems.push(route.params);
    //         route.params = null;
    //     }
    // }
    

    //
    //------------------- Database stuff -------------------------
    //
    const [itemsArray, setItemsArray] = useState([]); 
    //read item data
    function readItemData(){
        database()
        .ref('/posts')
        .on('value', snapshot => {
            if (snapshot.exists()) {
                const items = Object.values(snapshot.val());
                const tempListItems = [];

                items.map((element,index)=>{
                    tempListItems.push(element);
                })
                setItemsArray(tempListItems);
            } else {
                console.log("No data available");
            }
        });
    }
    
    //
    //----------------------------Google OAuth stuff----------------------
    //

    GoogleSignin.configure({
        webClientId: '517548213988-0qmc9ebmvk1oclo9j52gaa9qli1056g4.apps.googleusercontent.com',
    });

    const [user, setUser] = useState();

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        readItemData();
        // if (initializing) setInitializing(false);
    }

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            auth()
            .signOut()
            .then(() => console.log('Signed out.'));
        } catch (error) {
          console.error(error);
        }
    };

    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }

    //
    //---------------------- Renderaing the front end --------------
    //

    // console.log(user);
    if(user == null){
        return(
            <SafeAreaView style={{backgroundColor:"white", height: "100%"}}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                >
                    <View style={{padding: 10, paddingTop:50, paddingBottom:50, flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{fontSize:25,marginBottom:10}}>Login with your UVA id</Text>
                        <View style={{marginBottom:50}}>
                            <Button
                                title="Google Sign-In"
                                onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }else{
        return(
            // yellow
            <SafeAreaView style={{
                backgroundColor: "white",
                display: 'flex', flexGrow: 1, position:"relative"}}> 
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    {/* pink */}
                    <View style={styles.container}>
                        <View>
                            {itemsArray.map((element,index)=>{
                                return <TouchableOpacity key={index} onPress = {() => navigation.navigate("Show", 
                                    {
                                        image: element.image,
                                        title : element.title,
                                        price: element.price,
                                        category: element.category,
                                        description: element.description,
                                        status: element.status,
                                        phoneNumber: element.phoneNumber,
                                        street: element.street,
                                        city: element.city,
                                        state: element.state,
                                        zipcode: element.zipcode,
                                        country: element.country,
                                        user: element.user,
                                        email: element.email,
                                        uuid: element.uuid,
                                        itemIndex: index,
                                        loggedInEmail: user.email
                                    })}
                                    >
                                    <Card >
                                        <View style={styles.insideCardContainer}>
                                            {/* this is for the card main image on the left */}
                                            <View style={styles.imageColumn}>
                                                <ImageBackground style={styles.cardImageView} source={{
                                                        uri: element.image
                                                    }}>
                                                    {element.status == "Sold" && <View style={{position:"absolute", width: 15, height:15, backgroundColor:"red", right: 10, top: 10, borderWidth:2, borderColor:"white", borderRadius:100}}></View>}
                                                    {element.status == "Available" && <View style={{position:"absolute", width: 15, height:15, backgroundColor:"green", right: 10, top: 10, borderWidth:2, borderColor:"white", borderRadius:100}}></View>}
                                                </ImageBackground>
                                                <Text style={{fontSize:18, fontWeight:'bold', paddingTop:5}}>${element.price}</Text>
                                            </View>
                                            <View style={{width: '67%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                                                <View style={styles.cardDetails}>
                                                    {/* this is the title for the item */}
                                                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{element.title}</Text>
                                                    <Text numberOfLines={2} ellipsizeMode='tail' style={{fontSize: 14
                                                        // ,paddingTop:5, paddingBottom: 5
                                                    }}>{element.description}</Text>
                                                    <Text style={{ fontSize:18, textTransform:'capitalize'}}>{element.city}, {element.state}</Text>
                                                </View>
                                                <Text style={styles.category}>
                                                    {element.category}
                                                </Text>
                                            </View>
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            })}
                        </View>
                    </View>
                </ScrollView>
                          
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={() => navigation.navigate("Create", {
                        loggedInUser: user.displayName,
                        loggedInEmail: user.email
                    })}>
                        <Text style={styles.text}>List Item</Text>
                    </Pressable>
                </View>
                {user != null && 
                    <View style={styles.banner}>
                        {/* display the current user logged in */}
                        <Text style={{padding: 10, color:"white", fontSize:20, textTransform:"capitalize", fontWeight:"bold"}}>{user.displayName} </Text>

                        {/* <Button 
                            title="signout"
                            onPress={this.signOut}
                        /> */}
                        {/* button to log out */}
                        <Pressable style={styles.button} onPress={this.signOut}>
                            <Text style={styles.text}>Logout</Text>
                        </Pressable>
                    </View>
                }
            </SafeAreaView>
        );
    }
};


const styles = StyleSheet.create({
    // the main view container, this holds all the cards
    container:{
        flexGrow: 1,
        display: 'flex',
        alignSelf:"stretch",
        flexDirection:"column",
        backgroundColor: 'white', //pink 
        paddingBottom:100

    },
    //inside the card view
    insideCardContainer:{
        display:"flex",
        flexDirection:"row",
        padding: 0,
        // paddingTop: '10%',
        // backgroundColor:"#f5dd4b" //light orange
    },
    imageColumn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    cardImageView:{
        resizeMode: "cover",
        width: 100,
        height: 100,
        backgroundColor:"#f5dd4b", //light orange
        alignItems: "center",
        borderStyle: 'solid',
        borderColor:"black",
        marginRight:10
    },

    // this is for each card details, displaying all the properties
    cardDetails:{
        display:'flex',
        textAlign: "left",
        justifyContent:"space-evenly",
        // backgroundColor:"#f5dd4b",
        height: 100
    },

    category:{
        borderRadius:20,
        borderWidth:1,
        borderStyle: 'solid',
        borderColor:"steelblue",
        fontSize: 16,
        // backgroundColor: 'steelb?lue',
        // alignSelf: 'flex-start',
        color:"steelblue",
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 20,
        paddingLeft: 20,
        marginTop:5,
    },
    miniTitle:{
        fontSize: 18,
        padding: 0,
        fontWeight: 'bold',
    },
    buttonContainer:{
        position: 'absolute',
        right: 10,
        bottom:55,
    },
    banner:{
        position:"absolute",
        bottom: 0,
        width:"100%", 
        alignItems:"center",
        justifyContent: "space-evenly",
        // alignSelf:"center", 
        // backgroundColor:"#86b9ce",
        backgroundColor:"black",
        display:"flex",
        flexDirection:"row"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width:100,
        height: 35,
        // justifyContent:"flex-start",
        // paddingVertical: 4,
        // paddingHorizontal: 32,
        borderRadius: 4,
        // elevation: 3,
        backgroundColor: '#86b9ce',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    // strike:{
    //     textDecorationLine: 'line-through', 
    //     textDecorationStyle: 'solid'
    // },
    // completed:{
    //     // backgroundColor:"#f5dd4b",
    //     textAlign: "center",
    //     color: "green",
    //     marginTop: 5,
    // }
    //  flex: 1, flexDirection: 'column', alignItems: 'center' , alignSelf:'stretch', width: "100%"
})
export default Home;