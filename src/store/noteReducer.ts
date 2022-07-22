// project imports

// action - state management
import { AnyAction } from "@reduxjs/toolkit";
import * as actionTypes from "./actions";

export type Action = AnyAction;

interface Data {
  id: string;
  title: string;
  description: string;
  created_at: Date;
}

interface State {
  data: Data[];
}
export const initialState = {
  data: [],
};

//-----------------------|| CUSTOMIZATION REDUCER ||-----------------------//

const noteReducer = (state: State = initialState, action: AnyAction): State => {
  switch (action.type) {
    case actionTypes.ADD_NOTE:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case actionTypes.DELETE_NOTE:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload.id),
      };
    case actionTypes.UPDATE_NOTE:
      const indexU = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      const updatedItem = { ...action.payload, id: state.data[indexU].id };
      return {
        ...state,
        data: [
          ...state.data.slice(0, indexU),
          updatedItem,
          ...state.data.slice(indexU + 1),
        ],
      };
    // case actionTypes.CHANGE_TODO_STATUS:
    //   return {
    //     ...state,
    //     textTypeFilter: action.textTypeFilter,
    //   };
    default:
      return state;
  }
};

export default noteReducer;
