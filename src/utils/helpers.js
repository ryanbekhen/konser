import { validationArrayFn } from '../utils/const'

export const moneyFormat = (number)=>{
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(number).split(',')[0];
}

export const validateFieldRequired = (obj) => {
  let errorMessage = []

  for(let i in obj) {
    let valueText = obj[i]
    if (!valueText) valueText = ""
    let validationArray = validationArrayFn(valueText,obj)
    validationArray.forEach((val)=>{
      if (i === val.type) {
        val.condition.forEach((valCondition,indexCondition)=>{
          if (valCondition) {
            errorMessage.push({ field : i , message : val.message[indexCondition]})
          }
        })
      }
    })
  }
  return errorMessage
}

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


export const dateFormatUS = (dateParams) => {
  // Create a new Date object for the desired date
  let date = new Date(dateParams); // Note: Months are 0-indexed, so January is 0

  // Define options for toLocaleDateString
  let options = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric',
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false // Use 24-hour time format
  };

  // Format the date
  let formattedDate = date.toLocaleDateString('id-ID', options);
  return formattedDate
  // Output the result
}