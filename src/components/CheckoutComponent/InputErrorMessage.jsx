import React from "react";

function InputErrorMessage ({requiredArr,field}) {
  let messageList = requiredArr.filter(e=>e.field === field)
  if (messageList.length === 0) return <></>
  return (
    <div className='w-[85%] text-[red] font-semibold mt-1'>
      {messageList[0].message}
    </div>
  )
}

export default InputErrorMessage;