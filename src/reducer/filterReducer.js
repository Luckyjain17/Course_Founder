let initialState = {
  course: "",
  childSubject: "",
  date: "",
  selfPaced: false,
};
export default function filter(state = initialState, action) {
  switch (action.type) {
    case "ADD_FILTER_DATA":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
