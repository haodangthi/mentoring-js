import { useContext } from 'react'
import React from 'react'
import UserContext from '../context/UserContext'
import {
    Switch,
    Route,
    Link
} from 'react-router-dom'
import HomePage from '../pages/homePage'
import LoginPage from '../pages/loginPage'

const Routes = () => {
    const isAuthenticated = useContext(UserContext).isAuthenticated

    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/" component={HomePage}>
                </Route>
            </Switch>
        )
    } else return (
            <Switch>
                <Route path="/" component={LoginPage} />
            </Switch>
        )
    
}

export default Routes
