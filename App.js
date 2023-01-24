import { NavigationContainer } from '@react-navigation/native'; 
import { useEffect, useState } from 'react';
import { auth } from './config';
import Tabs from './navigation/tabs';
import { UserContext } from './UserContext';

export default function App(){
  const [authContext, setAuthContext] = useState(false)

  return (
    <NavigationContainer>
      <UserContext.Provider value={{authContext, setAuthContext}} >
        <Tabs/>
      </UserContext.Provider>
    </NavigationContainer>
  )
}