import { createStore } from "redux";
import { persistStore } from "redux-persist";
import reducer from "./reducer";

//-----------------------|| REDUX - MAIN STORE ||-----------------------//

const store = createStore(reducer);
const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export { store, persister };
