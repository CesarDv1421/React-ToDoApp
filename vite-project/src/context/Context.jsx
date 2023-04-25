import { useContext } from 'react'
const UserContext = useContext();

const Context = ({children}) => {

  return (
    <UserContext.Provider value={{user: 'Cesar', username:'CesarDv1321'}}>
        {children}
    </UserContext.Provider>
  )
}

export default Context