import React, { useContext, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { SERVER_URL } from '../constants/constants'
import UserContext from '../context/UserContext'
import SocketService from '../services/socket.service'

const LoginPage: React.FC = () => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const setToken = useContext(UserContext).setToken
    const setSocket = useContext(UserContext).setSocket
    const setIsAuthenticated = useContext(UserContext).setIsAuthenticated

    const handleClick = () => {
        onLogin(username, password)
            .then(data => data.json())
            .then(data => {
                saveTokenToLocalStorage(data.token)
                setToken(data.token)
                setIsAuthenticated(Boolean(data.token))
                setSocket(new SocketService(data.token))
            })
    }
    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value)
    }

    return (
        <>
            <div className="login">
                <h1>Login Page</h1>
                <TextField
                    className="login__field"
                    id="outlined-basic"
                    label="username"
                    variant="outlined"
                    onChange={(e) => handleUsernameChange(e)}
                />
                <TextField
                    className="login__field"
                    id="outlined-basic"
                    label="password"
                    variant="outlined"
                    onChange={(e) => handlePasswordChange(e)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                >
                    Login
                </Button>
            </div>
        </>
    )
}

export default LoginPage

function onLogin(username:string, password:string) {
    const url = `${SERVER_URL}/login`
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ username, password })
    })
}

function saveTokenToLocalStorage(token: string): void {
    localStorage.setItem('token', token)
}

