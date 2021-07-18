import React, { useContext, useState } from 'react'
import Button from '@material-ui/core/Button'
import { startNewChallenge } from '../services/user.service'

interface StartNewChallengeProps {
    token: string;
    setChallengeId: any;
}

const StartNewChallenge:React.FC<StartNewChallengeProps> = ({ token, setChallengeId }: StartNewChallengeProps) => {
    const handleStartClick = () => {
        startNewChallenge(token)
            .then(({ challengeId }) => {
                setChallengeId(challengeId)
            })
    }
    return (<>
        <h1>Start New Challenge</h1>
        <Button
            variant="contained"
            color="primary"
            onClick={handleStartClick}
        >
            Start new challenge
        </Button>
    </>)
}

export default StartNewChallenge
