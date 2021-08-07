import { createContext } from 'react'
export interface IUserContext {
    isAuthenticated?: boolean;
    token?: string;
    setIsAuthenticated?: any;
    setToken?: any;
    socket?: any,
    setSocket?: any;
}

const UserContext=createContext<IUserContext>({ isAuthenticated: false })

export default UserContext
