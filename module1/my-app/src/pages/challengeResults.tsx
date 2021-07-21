import React, { useContext, useEffect, useState } from 'react'
import { getCompletedChallenges } from '../services/user.service'
import { IChallenge } from '../../../be/src/models'
import { BackToActiveChallengePageButton } from './activeChallenge'

interface ChallengeResultsProps {
    token: string;
}

export function ChallengeResults({ token }: ChallengeResultsProps) {
    const [ completedChallenges, setCompletedChallenges ] = useState<IChallenge[]>([])
    useEffect(() => {
        getCompletedChallenges(token)
            .then(setCompletedChallenges)
    }, [])
    
    return (
        <>
            <BackToActiveChallengePageButton></BackToActiveChallengePageButton>
            {completedChallenges.length
                ? <>
                    <h1>Your completed challenges</h1>
                    {completedChallenges.map(challenge => (
                        <div key={challenge._id}>
                            <span>{challenge.state}</span>
                            <span>Start date: {challenge.startDate}</span>
                        </div>
                    ))}
                    </>
                : <h1>Your have not completed any challenges yet</h1>
            }

        </>
    )
}
