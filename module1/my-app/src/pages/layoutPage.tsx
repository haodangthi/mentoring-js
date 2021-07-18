import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import io from 'socket.io-client'

import UserContext from '../context/UserContext'
import Routes from '../routes/Routes'
import { SERVER_URL } from '../constants/constants'
import SocketService from '../services/socket.service'

const LayoutPage = () => {
    const [ token, setToken ] = useState(getTokenFromLocalStorage() || '')
    const [ isAuthenticated, setIsAuthenticated ] = useState(Boolean(token))
    const [ socket, setSocket ] = useState(new SocketService(token))

    return (
        <UserContext.Provider value={
            {
                token,
                isAuthenticated,
                setToken,
                setIsAuthenticated,
                socket,
                setSocket
            }
        }>
        <Router>
            <Routes></Routes>
        </Router>
    </UserContext.Provider>)
}

export default LayoutPage

function getTokenFromLocalStorage() {
    return localStorage.getItem('token')
}
