import { combineReducers } from "redux";
import { errandsReducer } from "./errands/errandsSlice";
import { usersReducer } from "./users/usersSlice";

const rootReducer = combineReducers({
    users: usersReducer,
    errands: errandsReducer
});

export { rootReducer }