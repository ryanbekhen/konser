import React from 'react';
import { moneyFormat } from '../../utils/helpers';

function AmountFeeDetail (props) {

  const {
    fee,total
  } = props.data

  return (
    <div className='w-full h-[50px] mt-[27px] flex flex-col items-center'>
      <div className='font-semibold w-full flex justify-between'>
        <div>
          Total
        </div>
        <div>
          {moneyFormat(total)}
        </div>
      </div>
      <div className='font-semibold w-full flex justify-between mt-4'>
        <div>
          Fee
        </div>
        <div>
          {moneyFormat(fee)}
        </div>
      </div>
      <div className='font-semibold w-full flex justify-between mt-4'>
        <div>
          Total Amount
        </div>
        <div>
        {moneyFormat(total+fee)}
        </div>
      </div>
    </div>
  )

}

export default AmountFeeDetail;