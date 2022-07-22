import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// reducer import
import todoReducer from "./todoReducer";
import accountReducer from "./accountReducer";
import noteReducer from "./noteReducer";

//-----------------------|| COMBINE REDUCER ||-----------------------//

const reducer = combineReducers({
  account: persistReducer(
    {
      key: "account",
      storage,
      keyPrefix: "account-",
    },
    accountReducer
  ),
  todo: persistReducer(
    {
      key: "todo",
      storage,
      keyPrefix: "todo-",
    },
    todoReducer
  ),
  note: persistReducer(
    {
      key: "note",
      storage,
      keyPrefix: "note-",
    },
    noteReducer
  ),
});

export default reducer;
