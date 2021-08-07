import { TodayTask } from '../components/todayTask'
import { Button } from '@material-ui/core'
import React from 'react'
import { BackToActiveChallengePageButton } from '../components/backButton'
import { getOS } from '../../utils/get-os'

interface TodayTaskPageProps {
    currentTask?: any;
    completeTodayTask?: any;
    challengeId?: string;
    token?: string;
}

export function TodayTaskPage({ currentTask, challengeId, completeTodayTask }: TodayTaskPageProps) {
    const os = getOS()
    return (
        <>
            <BackToActiveChallengePageButton></BackToActiveChallengePageButton>
            <h2>Hello, my {os} friend! Your Today`s task is</h2>
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
