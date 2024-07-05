import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  paymentList: null,
  vaList: null,
  selectedPayment: "",
  fee: 0,
  total: 0,
  modalIsOpen: false,
  isSelectVa: false,
  selectedVa: ""
}

export const checkoutSlice = createSlice({
  name : "checkout",
  initialState,
  reducers: {
    setPaymentList(state, action) {
      state.paymentList = action.payload;
    },
    setVaList(state, action) {
      state.vaList = action.payload;
    },
    setSelectedPayment(state, action) {
      state.selectedPayment = action.payload;
    },
    setFee(state, action) {
      state.fee = action.payload;
    },
    setTotal(state, action) {
      state.total = action.payload;
    },
    setIsOpen(state, action) {
      state.modalIsOpen = action.payload;
    },
    setIsSelectVa(state, action) {
      state.isSelectVa = action.payload;
    },
    setSelectedVa(state, action) {
      state.selectedVa = action.payload;
    }
  }
})

export const {   
  setPaymentList,
  setVaList,
  setSelectedPayment,
  setFee,
  setTotal,
  setIsOpen,
  setIsSelectVa,
  setSelectedVa } = checkoutSlice.actions

export default checkoutSlice.reducer