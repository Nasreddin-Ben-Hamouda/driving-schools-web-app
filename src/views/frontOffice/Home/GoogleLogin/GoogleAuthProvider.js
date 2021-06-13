import React from 'react'
import { useGoogleLogin } from 'react-use-googlelogin'

const GoogleAuthContext = React.createContext();

export const GoogleAuthProvider = ({ children }) => {
    const googleAuth = useGoogleLogin({
        clientId: "155611293360-cgna98el94kb85d5sdopi6ofs2d520ma.apps.googleusercontent.com", // Your clientID from Google.
    })

    return (
        <GoogleAuthContext.Provider value={googleAuth}>
            {children}
        </GoogleAuthContext.Provider>
    )
}

export const useGoogleAuth = () => React.useContext(GoogleAuthContext)
