import React, { useContext, useEffect, useState } from 'react'

import { BrowserRouter as Router, Route, Switch, Redirect, NavLink, useHistory } from 'react-router-dom'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { TodayTask } from './todayTask'
import { ActualAchievement, ArchiveItem, IChallenge, TaskForToday } from '../../../be/src/models'
import UserContext from '../context/UserContext'
import { getActualAchievements, getChallenge, getTasksArchive, getTodayTask } from '../services/user.service'
import Card from '@material-ui/core/Card'
import { Button } from '@material-ui/core'
import { ChallengeResults } from './challengeResults'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}))

interface ActiveChallengeProps{
    challengeId?: string;
    token?: string;
}

export default function ActiveChallenge({ challengeId, token }:ActiveChallengeProps) {
    const [ activeChallenge, setActiveChallenge ] = useState<IChallenge>({} as any)
    const [ currentTask, setCurrentTask ] = useState<TaskForToday>({} as any)
    const { socketClient } = useContext(UserContext).socket
    const classes = useStyles()
    
    const completeTodayTask = (task: TaskForToday, challengeId: string) => {
        socketClient.emit('today-task-completed', {
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
        socketClient.on('completed-task', ({ completedTask }: any) => {
            setCurrentTask(completedTask)
        })
    },[])

    const getNewTaskForToday = () => {
        return getTodayTask(challengeId || '', token || '')
            .then(setCurrentTask)
    }

    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/active-challenge-page" />
                    </Route>
                    <Route path="/active-challenge-page">
                        <ul>
                            <li>
                                <NavLink to="/today-task">{ActiveChallengePages.todayTask}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/achievements">{ActiveChallengePages.achievements}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/archive-tasks">{ActiveChallengePages.archiveTasks}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/completed-challenges">{ActiveChallengePages.completedChallenges}</NavLink>
                            </li>
                        </ul>
                    </Route>
                    <Route path="/today-task">
                        <TodayTaskPage currentTask={currentTask} completeTodayTask={completeTodayTask} challengeId={challengeId} token={token}/>
                    </Route>
                    <Route path="/achievements">
                        <ActualAchievements classes={classes} activeChallenge={activeChallenge} token={token|| ''}></ActualAchievements>
                    </Route>
                    <Route path="/archive-tasks">
                        <ArchiveItems classes={classes} activeChallenge={activeChallenge} token={token || ''}></ArchiveItems>
                    </Route>
                    <Route path="/completed-challenges">
                        <ChallengeResults token={token || ''}></ChallengeResults>
                    </Route>
                </Switch>
            </Router>
        </>
    )
}


enum ActiveChallengePages {
    todayTask = 'Today\'s task',
    achievements = 'Actual achievements',
    archiveTasks = 'Archive Tasks',
    completedChallenges = 'Completed challenges',
}

interface TodayTaskPageProps {
    currentTask?: any;
    completeTodayTask?: any;
    challengeId?: string;
    token?: string;
}

function TodayTaskPage({ currentTask, challengeId, completeTodayTask }: TodayTaskPageProps) {
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

interface ActualAchievementsProps {
    classes: any;
    activeChallenge: any;
    token: string;
}

function ActualAchievements({ classes, activeChallenge, token }:ActualAchievementsProps) {
    const [ actualAchievements, setActualAchievements ] = useState<ActualAchievement[]>([])

    useEffect(() => {
        getActualAchievements(activeChallenge._id, token)
            .then(setActualAchievements)
    },[])

    return (
       <>
           <BackToActiveChallengePageButton></BackToActiveChallengePageButton>
           {actualAchievements?.map((item: ActualAchievement) => {
               return (
                   <Card key={item.id} className={classes.root}>
                       <div>
                           <h3>{item.description}</h3>
                           <p>{item.status.state}</p>
                       </div>
                   </Card>
               )
           })}</>
    )
}

interface ArchiveItemsProps {
    classes: any;
    activeChallenge: any;
    token: string;
}

function ArchiveItems({ classes, activeChallenge, token }:ArchiveItemsProps) {
    const [ archiveItems, setArchiveItems ] = useState<ArchiveItem[]>([])

    useEffect(() => {
        getTasksArchive(activeChallenge._id, token)
            .then(setArchiveItems)
    },[])

    return (
        <>
            <BackToActiveChallengePageButton></BackToActiveChallengePageButton>

            { archiveItems.length
                ? archiveItems?.map((item: ActualAchievement) => {
                    return (
                        <Card key={item.id} className={classes.root}>
                            <div>
                                <h3>{item.description}</h3>
                                <p>{item.status.state}</p>
                            </div>
                        </Card>
                    )
                })
                : <h2>You have not completed any tasks yet</h2>
            }</>
    )
}

export function BackToActiveChallengePageButton() {
    let history = useHistory()

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={() => { history.replace('/active-challenge-page')}}
        >
            Back to active challenge page
        </Button>
    )
}
