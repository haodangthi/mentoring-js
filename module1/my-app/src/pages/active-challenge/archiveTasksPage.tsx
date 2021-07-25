import React, { useEffect, useState } from 'react'
import { ActualAchievement, ArchiveItem } from '../../../../be/src/models'
import { getTasksArchive } from '../../services/user.service'
import Card from '@material-ui/core/Card'
import { BackToActiveChallengePageButton } from '../components/backButton'

interface ArchiveItemsProps {
    classes: any;
    challengeId: string;
    token: string;
}

export function ArchiveItems({ classes, challengeId, token }:ArchiveItemsProps) {
    const [ archiveItems, setArchiveItems ] = useState<ArchiveItem[]>([])

    useEffect(() => {
        getTasksArchive(challengeId, token)
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
