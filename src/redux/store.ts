import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "./storage";
import { couponMiddleware } from "./middlewares/coupon.middleware";

//! We will not do this
//! This is a global variable so we will avoid this
// const store = configureStore({});

const persistOptions = {
  key: "cart",
  storage,
};

const persistedCart = persistReducer(persistOptions, cartReducer);

// BECAUSE THE REDUX STORE IS SHARED ACROSS REQUESTS, IT SHOULD NOT BE DEFINED AS A GLOBAL VARIABLE. INSTEAD, THE STORE SHOULD BE CREATED PER REQUEST.
export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    // WITHOUT THIS WILL THROW SERIALIZABLE ERROR
    middleware: (getDefaultMiddlewares: any) =>
      getDefaultMiddlewares({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    // .concat(couponMiddleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
