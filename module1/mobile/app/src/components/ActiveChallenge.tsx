import React, { useEffect, useState} from "react";
import {Button, Vibration, View} from "react-native";
import {IChallenge, TaskForToday} from "../models";
import {getChallenge} from "../services/user.service";
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TodayTaskScreen} from "./TodayTask";
import SocketService from "../services/socket.service";
const Stack = createNativeStackNavigator();

interface ActiveChallengeProps{
    challengeId?: string;
    token?: string;
}

const Navigation = ({navigation}: any) => {
    return (
        <View>
            <Button
                title='Go to today task'
                onPress={() => navigation.navigate('TodayTaskPage', { name: 'Jane' })}
            />
        </View>
    )
}

export const ActiveChallenge = ({ challengeId, token }:ActiveChallengeProps) => {
    const [ activeChallenge, setActiveChallenge ] = useState<IChallenge>({} as any)
    const [ currentTask, setCurrentTask ] = useState<TaskForToday>({} as any)
    const [ socket, setSocket ] = useState(new SocketService(token || ''))

    const completeTodayTask = (task: TaskForToday, challengeId: string) => {
        socket.socketClient.emit('today-task-completed', {
            task,
            challengeId: challengeId,
        })
    }

    useEffect(() => {
        getChallenge(challengeId || '',token || '')
            .then((challenge) => {
                setActiveChallenge(challenge)
                setCurrentTask(challenge.currentTask)
            })
        socket.socketClient.on('completed-task', ({ completedTask }: any) => {
            console.log(completedTask)
            setCurrentTask(completedTask)

            Vibration.vibrate()
        })
    },[])

    return (
        <View>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Nav" component={Navigation}>
                    </Stack.Screen>
                    <Stack.Screen name="TodayTaskPage">
                        {props => <TodayTaskScreen {...props} currentTask={currentTask} completeTodayTask={completeTodayTask} challengeId={challengeId} token={token} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}
