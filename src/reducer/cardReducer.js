let initialState = {
  CardList: [],
  FilterCardList: [],
  isFilter: false,
};
export default function card(state = initialState, action) {
  switch (action.type) {
    case "ADD_CARD_DATA":
      return { ...state, CardList: action.payload, isFilter: false };
    case "FILTER_CARD_DATA":
      return { ...state, FilterCardList: action.payload, isFilter: true };
    default:
      return state;
  }
}
