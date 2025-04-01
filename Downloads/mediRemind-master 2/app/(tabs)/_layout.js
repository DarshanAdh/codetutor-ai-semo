import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import LoginScreen from "../loginScreen";


// export const UserContext = createContext(undefined);

export default function TabLayout() {

  const [user, setUser] = useState(null);

  const func = (username) => {
    console.log("Pressed", username);
    setUser(username)
  }

  if(!user){
    // return(
    //   <View>
    //     <Text>
    //         Future Login screen

    //         <Button
    //            title= "Fake Login Button"
    //            onPress={()=>{setUser("blank user")}}
    //         />
            
    //     </Text>
    //   </View>
    // )
    return(
        <LoginScreen setUserId={func}/>
    )
  }



  return (
    // <UserContext.Provider value={{user, setUser}}>
      <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
        <Tabs.Screen
          name="screens/calendarScreen"
          options={{
            title: "Reminders",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="calendar" color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="index" 
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="home" color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="screens/newReminderScreen" 
          options={{
            title: "New", // make new reminder
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="plus-circle" color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="screens/profileScreen" 
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="user-circle" color={color} />
            ),
            headerShown: false,
          }}
        />

      </Tabs>
    // </UserContext.Provider>

  );
}
