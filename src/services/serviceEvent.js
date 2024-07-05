import axios from "axios";

export async function callApiEvent ({method,urlApi,data,useStaging}) {
  return new Promise((resolve,reject)=>{
    let url = process.env.REACT_APP_URL_SERVICE_MAIN + urlApi
    if (useStaging) url = process.env.REACT_APP_URL_SERVICE_STAGING + urlApi
    return axios({
      url,
      method,
      headers : {
        Accept : "*/*",
        'Content-Type': 'application/json',
      },
      data
    })
    .then(({data})=>{
      resolve(data)
    })
    .catch(err=>{
      console.log(err,'<<< ERROR')
      reject(err)
    })
  })
}