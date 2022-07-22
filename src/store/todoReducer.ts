// project imports

// action - state management
import { AnyAction } from "@reduxjs/toolkit";
import * as actionTypes from "./actions";

export type Action = AnyAction;

interface Data {
  _id: string;
  name: string;
  description: string;
  status: boolean;
}

interface State {
  data: Data[];
}
export const initialState = {
  data: [],
};

//-----------------------|| CUSTOMIZATION REDUCER ||-----------------------//

const todoReducer = (state: State = initialState, action: AnyAction): State => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case actionTypes.DELETE_TODO:
      return {
        ...state,
        data: state.data.filter((item) => item._id !== action.payload._id),
      };
    case actionTypes.CHANGE_TODO_STATUS:
      const indexU = state.data.findIndex(
        (item) => item._id === action.payload._id
      );
      const updatedItem = {
        ...state.data[indexU],
        status: !state.data[indexU].status,
      };
      console.log(updatedItem);
      return {
        ...state,
        data: [
          ...state.data.slice(0, indexU),
          updatedItem,
          ...state.data.slice(indexU + 1),
        ],
      };
    default:
      return state;
  }
};

export default todoReducer;
