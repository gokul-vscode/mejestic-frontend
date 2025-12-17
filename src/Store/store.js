import{configureStore} from "@reduxjs/toolkit"
import cartreducer from "../CartSlice/CartSlice"


const store = configureStore({
    reducer:{
        cart:cartreducer
    },
});

export default store;