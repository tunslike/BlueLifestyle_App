import ApiManager from "../constants/api";

// FUNCTION TO FETCH FACILITIES
export const FetchServiceFacilities = async data => {
    try {
        
        const response = await ApiManager('/services/Facilities/FetchFacilities', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            data: data,
        });

        return response;
        
    } catch (error) {
        return error.reponse.data
    }   
}

// FUNCTION TO FETCH PROVIDERS
export const FetchResturantProviders = async data => {
    try {
        
        const response = await ApiManager('services/providers/FetchProviders', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            data: data,
        });

        return response;
        
    } catch (error) {
        return error.reponse.data
    }   
}