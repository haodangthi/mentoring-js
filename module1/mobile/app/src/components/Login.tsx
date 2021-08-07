import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from "react";
import {SERVER_URL} from "../constants/constants";
interface loginProps {
    token?: string;
    setToken?: any;
    navigation?: any;
}
export const Login: React.FC<loginProps> = ({navigation, token, setToken}) => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleLoginClick = () => {
        onLogin(username, password)
            .then(data => data.json())
            .then(data => {
                setToken(data.token)
                return AsyncStorage
                    .setItem("@Token", data.token)
            })
            .then(data => {
            })
    }

    const handleUsernameChange = (text: string) => {
        setUsername(text)
    }
    const handlePasswordChange = (text: string) => {
        setPassword(text)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Username
            </Text>
            <TextInput
                onChangeText={text => handleUsernameChange(text)}
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1
                }}
            />
            <Text style={styles.title}>
                Password
            </Text>
            <TextInput
                onChangeText={text => handlePasswordChange(text)}
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1
                }}
            />
            <Button
                title="login"
                onPress={() => handleLoginClick()}
            />
        </View>
    );
}

function onLogin(username:string, password:string) {
    const url = `${SERVER_URL}/login`
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ username, password })
    })
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
        marginBottom: 10,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        resizeMode: "cover",
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
