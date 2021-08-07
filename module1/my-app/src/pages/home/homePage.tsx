import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ActiveChallenge from '../active-challenge/activeChallenge'
import StartNewChallenge from '../start-challenge/startChallenge'
import UserContext from '../../context/UserContext'
import { getActiveChallengeId } from '../../services/user.service'
import NavBar from '../components/navBar'
import CustomizedSnackbars from '../components/snackbar'

const HomePage = () => {
    const setToken = useContext(UserContext).setToken
    const token = useContext(UserContext).token || ''
    const [ activeChallengeId, setActiveChallengeId ] = useState('')
    const [ loading, setLoading ] = useState(true)
    console.log('homepage')

    useEffect(() => {
        getActiveChallengeId(token)
            .then(({ activeChallenge }) => {
                setActiveChallengeId(activeChallenge)
                setLoading(false)
            })
    },[])

    return (<>
        <NavBar currentRoute={ 'Home Page' }></NavBar>
        <CustomizedSnackbars></CustomizedSnackbars>
        {
            loading
                ? <h1>loading ...</h1>
                : <Router>
                    <Switch>
                        {
                            activeChallengeId && token
                                ? <Route path="/" render={() => <ActiveChallenge challengeId={activeChallengeId} token={token}/>}></Route>
                                : <Route path="/" render={() => <StartNewChallenge token={token} setChallengeId={setActiveChallengeId}/>}></Route>
                        }
                    </Switch>
                </Router>
        }
    </>)
}

export default HomePage
