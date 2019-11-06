import {SEARCH, SEARCH_SUCCESS, SEARCH_FAILED} from '~/constants';

const initialState = {
	isSearching: false,
	results: [],
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SEARCH:
			return {
				...state,
				isSearching: true,
			};
		case SEARCH_SUCCESS:
			return {
				...state,
				isSearching: false,
				results: action.payload,
			};
		case SEARCH_FAILED:
			return {
				...state,
				isSearching: false,
			};
		default:
			return state;
	}
}
