import React, {useContext, useEffect, useState} from "react";
import UserContext from "../context/UserContext";
import {StyleSheet, Text, View} from "react-native";
import {getActiveChallengeId} from "../services/user.service";
import {StartNewChallenge} from "./StartNewChallenge";
import {ActiveChallenge} from "./ActiveChallenge";

export const Home = () => {
    const setToken = useContext(UserContext).setToken
    const token = useContext(UserContext).token || ''
    const [ activeChallengeId, setActiveChallengeId ] = useState('')
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        getActiveChallengeId(token)
            .then(({ activeChallenge }) => {
                setActiveChallengeId(activeChallenge)
                setLoading(false)
            })
    },[])

    return (
        <View style={styles.container}>
            <Text>
                Home
            </Text>
            {
                activeChallengeId && token
                    ? <ActiveChallenge challengeId={activeChallengeId} token={token}></ActiveChallenge>
                    : <StartNewChallenge token={token} setChallengeId={setActiveChallengeId}></StartNewChallenge>

            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginTop: 20
    },
});
