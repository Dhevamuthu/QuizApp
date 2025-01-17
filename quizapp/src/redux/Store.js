import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./Category"
import AttemptLaterslice from "./AttemptLaterslice";

const store= configureStore({
    reducer:{
        category:CategorySlice,
        cart:AttemptLaterslice,
    }
})

export default store