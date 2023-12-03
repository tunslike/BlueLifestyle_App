import React, { createContext, useState, useEffect} from 'react'
import { Alert, Keyboard } from 'react-native';
import axios from 'axios';
import { ValidateUserAuthentication } from '../services/LoginService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { updateFirstname, updateUserID, updateUserData, updateUserToken } from '../store/userSlice';
import * as RootNavigation from '../views/navigation/RootNavigation';

export const AuthContext = createContext();

export const AuthProvider = ({children, navigation}) => {

    const dispatch = useDispatch();

    // Loading state
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null);

    //User Details
    const [firstName, setFirstName] = useState(null)
    const [company, setCompany] = useState(null)
    const [department, setDepartment] = useState(null)
    const [userToken, setUserToken] = useState(null)
    const [loginToken, setLoginToken] = useState(null)
    const [userID, setUserID] = useState(null)

    
    // FUNCTION TO LOGIN USER
    const ValidateUserLogin = (usern, pwds) => {

        setErrorMessage(null)
        
        if(usern == '' || pwds == '') {
            setErrorMessage('Please enter your SAPID and Password to login!')
            return;
        }
        
        //DISMISS KEYBOARD
        Keyboard.dismiss();

        setIsLoading(true);

        const options = {
            headers: {
                'Content-Type' : 'application/json',
            }
          };

        const data = {
            username: usern,
            password: pwds
          };

        axios.post('https://webdev.stanbicibtcpension.com:7443/accounts/staff/login', data, options)
        .then(response => {

            setIsLoading(false);

            if(response.data.errorCode == '000') {

                console.log(response.data)

                 //set token
                 
                 setFirstName(response.data.userData.firstName)
                 setUserID(response.data.userData.userID)
                 setCompany(response.data.userData.company);
                 setDepartment(response.data.userData.department)

                 if(!company || !department) {

                    RootNavigation.navigate('UpdateProfile');
                    return;

                 }else{
                    //dispatch value
                    dispatch(updateUserData(response.data.userData))
                    dispatch(updateFirstname(response.data.userData.firstName))
                    dispatch(updateUserID(response.data.userData.userID))
                    setUserToken(response.data.jwt)
                 }

            }else {

                console.log(response.data.statusMessage)
                //show error message
                setErrorMessage(response.data.statusMessage);

                //set loading off
                setIsLoading(false)

                return;

            }
           

        })
        .catch(error => {
          console.log(error);
        });


        /*
        setUserToken('hdhdhjdhjhsjdhsdjsjhdhsdd')
        setFirstName('Babatunde')
        setUserID('A171207')
        */

        /*

        setErrorMessage(null)
        
        if(usern == '' || pwds == '') {
            setErrorMessage('Please enter your SAPID and Password to login!')
            return;
        }
        
        //DISMISS KEYBOARD
        Keyboard.dismiss();

        //SET LOADING TO TRUE
       // setIsLoading(true);


        // CALL FUNCTION
        ValidateUserAuthentication({
            username: "A171207",
            password: "Pension@Dmin123$"

        }).then((result) => {

            console.log('Request is back from the server')

            if(result.status == 200) {

                console.log(result)

                console.log('Request is back from the server')

                //get error code
                if(result.data.errorCode == '000') {

                    console.log('login was successful')

                    //set token
                    setFirstName(result.data.userData.firstName)
                    setUserID(result.data.userData.userID)
                    setUserToken(result.data.jwt)
                    

                    //store token
                    //AsyncStorage.setItem('tokenID', result.data.jwt);

                    //set loading off
                    setIsLoading(false)

                    return;

                }else {

                    console.log(result.data.statusMessage)
                    //show error message
                    setErrorMessage(result.data.statusMessage);

                    //set loading off
                    setIsLoading(false)

                    return;

                }
             
            }
        }).catch(err => {
            console.error(err);
        })
        */
    
    }
    // END OF FUNCTION 

    // FUNCTION TO LOGOUT USER
    const ExitAuthenticatedUser = () => {

        // disable tokens
        setUserToken(null)
        setIsLoading(false)

        //remove token 
        AsyncStorage.removeItem('tokenID');
        setIsLoading(false);

    }
    // END OF FUNCTION

    // FUNCTION TO CHECK LOGGED USER
     const ValidatedAuthenticatedUser = async () => {
        try {
            setIsLoading(true);
            
            let userToken = await AsyncStorage.getItem('tokenID');
            setUserToken(userToken)

            setIsLoading(false);
            
        } catch (e) {
          console.log(`isLogged in error ${e}`);
        }
     }
    // END OF FUNCTION

    // RUN EFFECT HOOK
     useEffect(() => {

        //log out user
        

     }, []);
    // END OF EFFECT HOOK

    return (
        <AuthContext.Provider value={{ValidateUserLogin, 
                                     ExitAuthenticatedUser, 
                                     isLoading, 
                                     errorMessage, 
                                     firstName, 
                                     userToken,
                                     company,
                                     department,
                                     userID,
                                     loginToken,
                                    }}>
            {children}
        </AuthContext.Provider>
    )
}