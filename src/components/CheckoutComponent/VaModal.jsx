import React from 'react';
import Modal from 'react-modal';
import { PaymentListImage } from '../../utils/const';
import SmallPaymentList from './SmallPaymentList';
import { useSelector, useDispatch } from 'react-redux';
import {  setIsOpen, } from '../../features/Checkout/CheckoutSlice'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export default function ModalComponent ({fetchApiFee,dataDetail}) {

  const {
    selectedPayment,
    total,
    modalIsOpen,
    vaList
  } = useSelector((state)=>state.checkout)
  let subtitle;

  function openModal() {
    dispatch(setIsOpen(true))
  }

  const dispatch = useDispatch();


  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    dispatch(setIsOpen(false))
  }

  
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div ref={(_subtitle) => (subtitle = _subtitle)} className='w-[390px] h-[auto] flex flex-col'>
        {
          vaList && vaList.map((e,i)=>{
            return (
              <SmallPaymentList
                objData={e}
                image={PaymentListImage[i]}
                fetchApiFee={fetchApiFee}
              />
            )
          })
        }
      </div>
    </Modal>
  )

}