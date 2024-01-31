import React, { createContext, useState, useEffect} from 'react'
import { Alert, Keyboard } from 'react-native';
import axios from 'axios';
import { ValidateUserAuthentication } from '../services/LoginService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { updateFirstname, updateUserID, updateUserData, updateToken, updateIdtkn } from '../store/userSlice';
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

        //**************************************** DUMMY ADDRESS **********************/

        /*
        if(usern == 'User01' && pwds == '1234') {

            setFirstName('Test User')
            setUserID('A00000')
            setCompany('Pensions');
            setDepartment('Information Technology')
    
            //dispatch value
            dispatch(updateUserData({
                "firstName": "Test",
                "lastName": "User 01",
                "userID": "A00000",
                "email": "test.test01@stanbicibtc.com",
                "phone": "09012309330",
                "company": "Pensions",
                "department": "Information Technology",
            }))
            dispatch(updateFirstname('Test User'))
            dispatch(updateUserID('A00000'))
            AsyncStorage.setItem('tokenID', '3889-8383-0393-03033');
            AsyncStorage.setItem('userLogged', 'A00000');
            setUserToken('3889-8383-0393-03033')
    
            return;

        }else {

             //show error message
             setErrorMessage('Username or password is incorrect!');

             //set loading off
             setIsLoading(false)

             return;

        }
        */
        //**************************************** DUMMY ADDRESS **********************/

        /*
        if(usern != 'User01' && pwds != '1234') {
        
            //show error message
            setErrorMessage('Username or password is incorrect!');

            //set loading off
            setIsLoading(false)

            return;

        }*/

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

                 
                 //store token in device
                 AsyncStorage.setItem('tokenID', response.data.jwt);
                 AsyncStorage.setItem('userLogged', response.data.userData.userID);

                 setFirstName(response.data.userData.firstName)
                 setUserID(response.data.userData.userID)
                 setCompany(response.data.userData.company);
                 setDepartment(response.data.userData.department)

                 //dispatch value
                 dispatch(updateUserData(response.data.userData))
                 dispatch(updateFirstname(response.data.userData.firstName))
                 dispatch(updateUserID(response.data.userData.userID))

                 /* ------------- COMMENT THIS SECTION OUT FOR PRODUCTION ----------------- */
                 /*
                    setFirstName('Test User')
                    setUserID(response.data.userData.userID)
                    setCompany('Pensions');
                    setDepartment('Information Technology')
            
                    //dispatch value
                    dispatch(updateUserData({
                        "firstName": "Test",
                        "lastName": "User 01",
                        "userID": response.data.userData.userID,
                        "email": "test.test01@stanbicibtc.com",
                        "phone": "09012309330",
                        "company": "Pensions",
                        "department": "Information Technology",
                    }))
                    dispatch(updateFirstname('Test User'))
                    dispatch(updateUserID(response.data.userData.userID))
                    AsyncStorage.setItem('tokenID', '3889-8383-0393-03033');
                    AsyncStorage.setItem('userLogged', response.data.userData.userID);
                    */
                /* ------------- COMMENT THIS SECTION OUT FOR PRODUCTION ----------------- */

                 dispatch(updateIdtkn(response.data.jwt))
                 setUserToken(response.data.jwt)
                 
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

            setIsLoading(false);
            setErrorMessage('Service is unavailable, please retry!')

            console.log(error);
        });
    
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
                                     setErrorMessage
                                    }}>
            {children}
        </AuthContext.Provider>
    )
}