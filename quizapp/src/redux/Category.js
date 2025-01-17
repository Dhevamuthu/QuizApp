import { createSlice } from "@reduxjs/toolkit";
import { categories } from '../Datasets/categories';
const CategorySlice = createSlice({
  name: "category",
  initialState: {
    items:categories
  },
  reducers: {
    SearchCategory: (state, action) => {
        if(action.payload===""){
            state.items=categories;
        }
        else{
        state.items = categories.filter(product => 
            product.name.toLowerCase().includes(action.payload.toLowerCase())
          );   
        } 
  },
}});

export const {SearchCategory} = CategorySlice.actions;
export default CategorySlice.reducer;
