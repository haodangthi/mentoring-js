import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import React from 'react'

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
