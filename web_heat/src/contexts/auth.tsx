import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";


type User = {
    id: string,
    name: string,
    avatar_url: string,
    login: string
}



type TypeProps = {
    children: ReactNode
}

type AuthResponde = {
    token: string,
    user:{
        id: string,
        avatar_url: string,
        name: string,
        login: string
    }
}

type AuthContextData = {
    user: User | null,
    signInUrl: string,
    signOut: () => void

}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider(props: TypeProps){

    const [user, setUser] = useState<User | null>(null)

    const signInUrl = `http://github.com/login/oauth/authorize?scope=user&client_id=${'04a063920570f09cf6ef'}`


    function signOut(){
        setUser(null)
        localStorage.removeItem('@dowhile:token')
    }

    async function signin(githubCode: string){
        const responde = await api.post<AuthResponde>('authenticate',{
            code: githubCode
        })

        const {token, user} = responde.data

        localStorage.setItem('@dowhile:token', token)

        api.defaults.headers.common.authorization = `Bearer ${token}`

        setUser(user)
    }

    useEffect(()=>{
        const url = window.location.href;
        const hasCodeGithub = url.includes('?code=')

        if(hasCodeGithub){
            const  [urlWithoutCode, githubCode] = url.split('?code=')

            window.history.pushState({}, '', urlWithoutCode)
            
            signin(githubCode)
        }

    },[])

    useEffect(() =>{

         const token = localStorage.getItem('@dowhile:token')
        

        if(token){
             api.defaults.headers.common.authorization = `Bearer ${token}`

            api.get<User>('profile').then(response =>{
                setUser(response.data)
            })
        }

    },[])

    return(
        <AuthContext.Provider value={{signInUrl,user, signOut }}>
            {props.children}
        </AuthContext.Provider>
    )
}
