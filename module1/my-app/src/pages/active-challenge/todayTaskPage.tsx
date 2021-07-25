import { TodayTask } from '../components/todayTask'
import { Button } from '@material-ui/core'
import React from 'react'
import { BackToActiveChallengePageButton } from '../components/backButton'

interface TodayTaskPageProps {
    currentTask?: any;
    completeTodayTask?: any;
    challengeId?: string;
    token?: string;
}

export function TodayTaskPage({ currentTask, challengeId, completeTodayTask }: TodayTaskPageProps) {
    return (
        <>
            <BackToActiveChallengePageButton></BackToActiveChallengePageButton>
            <h2>Today`s task</h2>
            {
                currentTask
                    ? <TodayTask challengeId={challengeId || ''} completeTodayTask={completeTodayTask} currentTask={currentTask}></TodayTask>
                    : <Button
                        variant="contained"
                        color="primary"
                    >
                        Get task for today
                    </Button>
            }
        </>
    )
}
