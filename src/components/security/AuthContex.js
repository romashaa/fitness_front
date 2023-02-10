// Create a context
import {createContext, useContext, useState} from "react";



export const AuthContext = createContext();

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useAuth = () => useContext(AuthContext);

//Share the created context with other components
export default function AuthProvider({children}){
    //Put some state in the context
    const[number, setNumber] = useState(0);
    const[isAuthenticated, setIsAuthenticated] = useState(false)

    function login(username, password){
        if(username==='masha' && password==='110202'){
            setIsAuthenticated(true)
            return true
        }else {
            setIsAuthenticated(false)
            return false
        }
    }
    function logout(){
        setIsAuthenticated(false)
    }

    return(
        <AuthContext.Provider value={{number, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}



