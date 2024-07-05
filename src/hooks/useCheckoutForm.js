import React , { useState } from "react";

function useCheckoutForm () {

  const [first_name,setFirstName] = useState(null)
  const [last_name,setLastName] = useState(null)
  // const [nik,setNik] = useState("1234567891234567")
  const [gender,setGender] = useState("Laki-laki")
  const [email,setEmail] = useState(null)
  const [phone_number,setPhoneNumber] = useState(null)

  return {
    getters : {
      first_name,
      last_name,
      // nik,
      gender,
      email,
      phone_number,
    },
    setters : {
      setFirstName,
      setLastName,
      // setNik,
      setGender,
      setEmail,
      setPhoneNumber
    }
  }

}

export default useCheckoutForm;