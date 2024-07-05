import { configureStore } from '@reduxjs/toolkit'
import  checkoutSlice  from '../features/Checkout/CheckoutSlice'

export const store = configureStore({
  reducer: {
    checkout : checkoutSlice
  },
})