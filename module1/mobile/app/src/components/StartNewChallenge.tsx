import {Button, Text, View} from "react-native";
import React from "react";
import {startNewChallenge} from "../services/user.service";

interface StartNewChallengeProps {
    token: string;
    setChallengeId: any;
}

export const StartNewChallenge:React.FC<StartNewChallengeProps> = ({ token, setChallengeId }: StartNewChallengeProps) => {
    const handleStartClick = () => {
        startNewChallenge(token)
            .then(({ challengeId }) => {
                setChallengeId(challengeId)
            })
    }
    return (
        <View>
            <Text>Start New Challenge</Text>
            <Button
                title="Start new challenge"
                onPress={handleStartClick}
            />
            <Text>See your previous challenges</Text>
        </View>
    )
}
