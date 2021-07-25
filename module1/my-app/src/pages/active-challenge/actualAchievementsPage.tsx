import React, { useEffect, useState } from 'react'
import { ActualAchievement } from '../../../../be/src/models'
import { getActualAchievements } from '../../services/user.service'
import Card from '@material-ui/core/Card'
import { BackToActiveChallengePageButton } from '../components/backButton'

interface ActualAchievementsProps {
    classes: any;
    challengeId: any;
    token: string;
}

export function ActualAchievements({ classes, challengeId, token }:ActualAchievementsProps) {
    const [ actualAchievements, setActualAchievements ] = useState<ActualAchievement[]>([])

    useEffect(() => {
        debugger
        getActualAchievements(challengeId, token)
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
