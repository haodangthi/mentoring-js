import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import React from 'react'
import { TaskForToday } from '../../../../be/src/models'
import { makeStyles } from '@material-ui/core'

interface TodayTaskProps {
    currentTask: TaskForToday;
    completeTodayTask: any;
    challengeId: string;
}

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 20,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
})

export const TodayTask:React.FC<TodayTaskProps> = ({ currentTask , completeTodayTask, challengeId }: TodayTaskProps) => {
    const classes = useStyles()
    
    return (
        <Card key={currentTask.id} className={classes.root}>
            <div>
                <h3>{currentTask.description}</h3>
                <p>{currentTask.status?.state}</p>
            </div>

            <Button
                disabled={currentTask.status?.state === 'Success'}
                variant="contained"
                color="primary"
                onClick={() => completeTodayTask(currentTask, challengeId || '')}
            >
                Complete a task
            </Button>
        </Card>
    )
}
