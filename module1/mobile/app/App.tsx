import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {Login} from "./src/components/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "./src/context/UserContext";
import {Home} from "./src/components/Home";

export default function App() {
    const [ token, setToken ] = useState<string>('')

    const getToken = async (): Promise<string> => {
        try {
            const token = await AsyncStorage
                .getItem("@Token") || ''
            setToken(token)
            return token
        } catch (e) {
            return ''
        }
    }

    useEffect(() => {
        getToken().then(console.log)
    },[])

  return (
      <UserContext.Provider
        value={
            {
                token,
                setToken,
            }
        }
    >
        <View style={styles.container}>
            {
                token
                    ? <Home></Home>
                    : <Login token={token} setToken = {setToken}></Login>
            }
            <StatusBar style="auto" />
        </View>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});
