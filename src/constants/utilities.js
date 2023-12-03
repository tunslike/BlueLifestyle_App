const formatToCurency = (value) => {
    if(value != '') {
        return (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }else{
        return value;
    }
}

const getCurrentDateMMDDYYYY = () => {

    let today = new Date();

    let dd = today.getDate();
    let mm = today.getMonth() + 1;
     
    let yyyy = today.getFullYear();
     
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = mm + '-' + dd + '-' + yyyy;
    
    return today;
}

export default {
    formatToCurency,
    getCurrentDateMMDDYYYY
}