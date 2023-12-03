import React, {useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

import { NewLoader } from '../components';
import { AuthContext } from '../../context/AuthContext';

const Router = () => {

  const {userToken} = useContext(AuthContext);

  return (
    <NavigationContainer ref={navigationRef}>
      {userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default Router;
