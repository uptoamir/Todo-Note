// action - state management
import {
  ACCOUNT_INITIALIZE,
  ACCOUNT_UPDATE_INFORMATION,
  ACCOUNT_UPDATE_PASSWORD,
  ACCOUNT_UPDATE_AVATAR,
  LOGIN,
  LOGOUT,
} from "./actions";
import { AnyAction } from "@reduxjs/toolkit";

interface UserInfo {
  id?: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
}

interface State {
  isLoggedIn: boolean;
  isInitialized: boolean;
  user: UserInfo;
  allUsers: UserInfo[];
}

export const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: {},
  allUsers: [],
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const accountReducer = (
  state: State = initialState,
  action: AnyAction
): State => {
  switch (action.type) {
    case ACCOUNT_INITIALIZE: {
      const { isLoggedIn, user } = action.payload;
      return {
        ...state,
        isLoggedIn,
        isInitialized: true,
        user,
        allUsers: [...state.allUsers, user],
      };
    }
    case ACCOUNT_UPDATE_INFORMATION: {
      const { user } = action.payload;
      console.log(user, user.firstName, state.user);
      const indexU = state.allUsers.findIndex((item) => item.id === user.id);
      const updatedItem = {
        ...state.user,
        id: state.allUsers[indexU].id,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      console.log(indexU, updatedItem);
      return {
        ...state,
        user: updatedItem,
        allUsers: [
          ...state.allUsers.slice(0, indexU),
          updatedItem,
          ...state.allUsers.slice(indexU + 1),
        ],
      };
    }
    case ACCOUNT_UPDATE_PASSWORD: {
      const { user } = action.payload;
      console.log(user, state.user);
      const indexU = state.allUsers.findIndex((item) => item.id === user.id);
      const updatedItem = {
        ...state.user,
        id: state.allUsers[indexU].id,
        password: user.password,
      };
      console.log(indexU, updatedItem);
      return {
        ...state,
        user: updatedItem,
        allUsers: [
          ...state.allUsers.slice(0, indexU),
          updatedItem,
          ...state.allUsers.slice(indexU + 1),
        ],
      };
    }
    case ACCOUNT_UPDATE_AVATAR: {
      const { user } = action.payload;
      console.log(user, state.user);
      const indexU = state.allUsers.findIndex((item) => item.id === user.id);
      const updatedItem = {
        ...state.user,
        id: state.allUsers[indexU].id,
      };
      console.log(user.avatar);
      updatedItem.avatar = user.avatar;
      console.log(indexU, updatedItem);
      return {
        ...state,
        user: updatedItem,
        allUsers: [
          ...state.allUsers.slice(0, indexU),
          updatedItem,
          ...state.allUsers.slice(indexU + 1),
        ],
      };
    }
    case LOGIN: {
      const { user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        user,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        // user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default accountReducer;
