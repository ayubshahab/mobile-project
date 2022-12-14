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

import { GoogleSignin } from '@react-native-google-signin/google-signin';

const CreateEvent = ({navigation}) => {

    //the user that is logged in
    const [userName, setUserName] = useState(''); 
    const [user, setUser] = useState();

    GoogleSignin.configure({
        webClientId: '517548213988-0qmc9ebmvk1oclo9j52gaa9qli1056g4.apps.googleusercontent.com',
    });

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        // if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

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

    return(
        <SafeAreaView style={{backgroundColor:"white", height: "100%"}}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            >
                <View style={{padding: 10, paddingTop:50, paddingBottom:50, flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{fontSize:25,marginBottom:10}}>Login with your UVA id</Text>

                    
                    {/* submit button */}
                    {/* style={{padding:10, paddingRight:20, paddingLeft:20, backgroundColor:"#62c799", color:"white", borderWidth:1,borderRadius:20, marginTop:20, marginBottom:50}} */}
                    <View style={{marginBottom:50}}>
                        <Button
                            title="Google Sign-In"
                            onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                        />

                        {/* <Button 
                            title = "Login"
                            style={{ width: "100%"}}
                            onPress = {() => navigation.navigate("Home", 
                             {
                                // title : itemTitle,
                                // uniqueID: uuid.v4(),
                                // dueDate: itemDueDate,
                                // isCompleted: itemIsCompleted,
                                // dateCompleted: itemCompletedDate
                            })}
                        /> */}

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CreateEvent;