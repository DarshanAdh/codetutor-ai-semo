import AsyncStorage from '@react-native-async-storage/async-storage';


export async function saveAsyncStorage(key, value){
    /*
    Look into secure storage for the important/sensitive items
  
    import * as SecureStore from "expo-secure-store";
  
    */
  
    // key = name 
    // value = data to store
    if(!value){
      return false;
    }
  
    try{
      AsyncStorage.setItem(key, value);
      console.log(` ${key} saved successfully!\n `, value);
      return true;
    } catch (err){
      console.error(`  Failed to save ${key}:`, err);
      return false;
    }
  }
  