import { combineReducers } from "redux";
import filterReducer from "./filterReducer";
import cardReducer from "./cardReducer";

export default combineReducers({
  filter: filterReducer,
  card: cardReducer,
});
