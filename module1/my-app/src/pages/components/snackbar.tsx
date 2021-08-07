import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { makeStyles, Theme } from '@material-ui/core/styles'

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}))

export default function CustomizedSnackbars() {
    const classes = useStyles()
    const [ open, setOpen ] = React.useState(false)
    const [ isOnline, setIsOnline ] = useState(false)
    window.addEventListener('online', () => {
        console.log('online')
        setIsOnline(true)
        setOpen(true)
    })
    window.addEventListener('offline', () => {
        setIsOnline(false)
        setOpen(true)
    })
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    return (
        <div className={classes.root}>
            {
                isOnline 
                    ? <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            Connection restored!
                        </Alert>
                    </Snackbar> 
                    : <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                            Connection lost!
                        </Alert>
                    </Snackbar>
            }
        </div>
    )
}
