import {Button, StyleSheet, Text, View} from "react-native";
import {TaskForToday} from "../models";
import React from "react";

interface TodayTaskPageProps {
    currentTask?: any;
    completeTodayTask?: any;
    challengeId?: string;
    token?: string;
}

interface TodayTaskProps {
    currentTask: TaskForToday;
    completeTodayTask: any;
    challengeId: string;
}

const TodayTask:React.FC<TodayTaskProps> = ({ currentTask , completeTodayTask, challengeId }: TodayTaskProps) => {

    return (
        <View style={styles.taskCard}>
            <Text>Task</Text>
            <Text>{currentTask.description}</Text>
            <Text>{currentTask.status?.state}</Text>
            <Button
                title = 'Complete a task'
                onPress={() => completeTodayTask(currentTask, challengeId || '')}
            />
        </View>
    )
}

export function TodayTaskScreen({ currentTask, challengeId, completeTodayTask }: TodayTaskPageProps) {
    return (
        <View>
            <Text>Hello, my  friend! Your Today`s task is</Text>
            {
                currentTask
                    ? <TodayTask challengeId={challengeId || ''} completeTodayTask={completeTodayTask} currentTask={currentTask}></TodayTask>
                    : <Text>No task</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    taskCard: {
        height: 100,
        backgroundColor: 'pink',
        marginHorizontal: 16,
    },
});
