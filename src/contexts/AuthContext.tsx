import { auth, firebase } from '../sevices/firebase';
import { createContext, useState, useEffect, ReactNode } from 'react'

type User = {
    id: string,
    name: string,
    avatar: string
}
  
type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode
}
  
export const AuthContext = createContext({} as AuthContextType)



export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>()

  function setUserHook(user: firebase.User | null) {
    if (user) {
      const { displayName, photoURL, uid} = user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  useEffect(()  => {
    auth.onAuthStateChanged(user => {
        setUserHook(user)
    })
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    setUserHook(result.user)
  }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle}}>
          {props.children}
        </AuthContext.Provider>

    );
}