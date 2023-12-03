import axios from "axios";
import { APIBaseUrl } from "../constants";

// FUNCTION TO AUTHENTICATE USER
export const ValidateUserAuthentication = (usern, passw) => {

    console.log('Making API request to the server....' + usern, passw)

    try {
        
        const data = {
            username: usern,
            password: passw
        };

        axios.post(APIBaseUrl.developmentUrl + 'accounts/staff/login', data)
        .then(response => {
            console.log('API request is back from server....')
            return response.data;
        })
        .catch(error => {
          console.log(error);
        });
        
    } catch (error) {
        console.log(error)
    }   
}