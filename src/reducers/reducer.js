import * as actionTypes from "./actions";

const initialState = {
	names: []
};

const Reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SUCCESS:
			return {
				...state,
				names: action.payload
			};
		default:
			return state;
	}
};

export default Reducer;