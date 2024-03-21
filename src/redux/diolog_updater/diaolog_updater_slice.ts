import { todoType } from "@/types/data_types";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";



interface DialogState {
  show: boolean;
  isAdd: boolean;
  todo: todoType | null;
}

const initialState: DialogState = {
  show: false,
  isAdd: true,
  todo: null,
};

export const dialogSlice = createSlice({
  name: "dialog", 
  initialState,
  reducers: {
    update: (state, action: { payload: DialogState }) => {
      
      return { ...state, ...action.payload };
    },

  },
});

export const { update } = dialogSlice.actions;

