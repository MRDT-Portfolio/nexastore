import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/lib/features/cart/cartSlice'
import { baseApi } from '@/services/api/baseApi';

export const makeStore = () => {
  return configureStore({
  reducer: {
    cart: cartReducer,

    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
