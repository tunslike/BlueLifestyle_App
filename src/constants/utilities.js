const formatToCurency = (value) => {
    if(value != '') {
        return (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }else{
        return value;
    }
}

const removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);
       }
    }
    return arr;
}

const formatDateInMinutes = (date) => {
    var date = new Date(date);
    var dateStr =
  ("00" + date.getDate()).slice(-2) + "/" +
  ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
  date.getFullYear() + " " +
  ("00" + date.getHours()).slice(-2) + ":" +
  ("00" + date.getMinutes()).slice(-2);

  return dateStr;
}

const transformDate = (date, day) => {
    const offset = date.getDay() - day
    
    const d = new Date(date)
    d.setDate(d.getDate() - offset)
    return d
  }

const convertToUpperCase = (value) => {
    return str2 = value.charAt(0).toUpperCase() + value.slice(1);
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

const FoodImageMatchAlgorithm = (foodName) => {

    if(foodName == '') 
        return;

    //match rice picture
    if(foodName.toLowerCase().indexOf("rice") > -1) {

        return require("../assets/images/moimoi_rice.jpeg");

    }else if(foodName.toLowerCase().indexOf("amala") > -1) {

        return require("../assets/images/amala.jpeg");

    }else if(foodName.toLowerCase().indexOf("spaghetti") > -1) {

        return require("../assets/images/noodles.jpg");
    }
    else if(foodName.toLowerCase().indexOf("Ofada") > -1) {

        return require("../assets/images/ofada_rice.jpeg");
    }
    else if(foodName.toLowerCase().indexOf("yam") > -1) {

        return require("../assets/images/yam_egg.jpeg");

    } else if(foodName.toLowerCase().indexOf("bean") > -1) {

        return require("../assets/images/bean_image.jpeg");

    }else if(foodName.toLowerCase().indexOf("semo") > -1) {

        return require("../assets/images/semo_food.jpeg");
    }
    else if(foodName.toLowerCase().indexOf("white") > -1) {

        return require("../assets/images/white_rice.jpeg");
    }
    else if(foodName.toLowerCase().indexOf("salad") > -1) {

        return require("../assets/images/salad.jpeg");
    }
    else{

        return require("../assets/images/blank_food.png");
    }

}

export default {
    formatToCurency,
    getCurrentDateMMDDYYYY,
    formatDateInMinutes,
    FoodImageMatchAlgorithm,
}