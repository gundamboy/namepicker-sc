import * as actionTypes from "./actions";

const initialState = {
	names: [],
	winners: []
};

const Reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SUCCESS:
			return {
				...state,
				names: action.payload
			};
		case actionTypes.WINNER:
			return {
				...state,
				winners: [...state.winners, action.payload]
			};
		default:
			return state;
	}
};

export default Reducer;