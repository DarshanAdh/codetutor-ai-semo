import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { saveAsyncStorage } from "./connect/utils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ResponseError } from "expo-auth-session";


const userAccountIdTokenName = "userAccountIdToken";
const userAccountRefreshTokenName = "userAccountRefreshToken";
const userAccountIdName = "userAccountId";

/*
my email, myPassword
*/

// const userAccountIdTokenName = "userAccountIdToken";
// const userAccountRefreshTokenName = "userAccountRefreshToken";
// const userAccountIdName = "userAccountId";



export default function LoginScreen({setUserId}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const [password, setPassword] = useState("");

  const auth = FIREBASE_AUTH;

  const  saveLoginCredentials = async (responseData) => {

        /*
        Tokens to save:
        idToken, refreshToken, uid
    */


    const idToken = responseData._tokenResponse.idToken;
    const refreshToken = responseData._tokenResponse.refreshToken;
    const userId = responseData.user.uid;

    console.log(responseData)

    if(!idToken){console.error("IdToken missing from data"); return false;}
    if(!refreshToken){console.error("refreshToken missing from data"); return false;}
    if(!userId){console.error("uid missing from data"); return false;}

    const a = await saveAsyncStorage(userAccountIdTokenName,idToken);
    const b = await saveAsyncStorage(userAccountRefreshTokenName,refreshToken);
    const c = await saveAsyncStorage(userAccountIdName,userId);

    if(!(a&&b&&c)){
        console.error("Error saving Tokens");
        return false;
    }

    return true;
    }

  const checkForLoginCredentials = async()=>{

    console.log("in")

    const a = await AsyncStorage.getItem(userAccountIdTokenName);
    const b = await AsyncStorage.getItem(userAccountRefreshTokenName);
    const c = await AsyncStorage.getItem(userAccountIdName);

    console.log("here:",a,b,c)

    if(!(a&&b&&c)){
        console.error("Error saving Tokens");
        return false;
    }

    return {
        userAccountIdTokenName: a,
        userAccountRefreshTokenName: b,
        userAccountIdName: c,
    };

    }


  useEffect(() => {
    console.log("Checking for credentials")
    const checkCredentials = async() => {
      const hasCredentials = await checkForLoginCredentials();
    
      if(hasCredentials){
        setUserId(hasCredentials.userAccountIdName);
      }
      setLoading(false);
    }
    checkCredentials();
  },[]);

  
  const signIn = async () => {
    console.log("Attemtping login")
    try{
      const response = await signInWithEmailAndPassword(auth, email,password);

      let savedTokens = saveLoginCredentials(response);
      if(savedTokens){
        setUserId(response.user.uid)
      }else{
        console.error("Error saving tokens");
      }

    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }
  }
  const signUp = async () => {
    console.log("Signing Up")
    try{
      const response = await createUserWithEmailAndPassword(auth, email,password);
      console.log(response);
      alert('Check your emails!')
      
      let savedTokens = saveLoginCredentials(response);
      if(savedTokens){
        setUserId(response.user.uid)
      }else{
        console.error("Error saving tokens");
      }

    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  if(loading){
    return(<View><Text>Checking for user credentials...</Text></View>)
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={() => {signIn()}}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {signUp()}}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {signUp()}}>
        <Text style={styles.buttonText}>Skip Login (Debug)</Text>
      </TouchableOpacity>
      {/* <Text> (just press login for now, the backend isnt set up yet)</Text> */}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
