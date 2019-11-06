import {dashboardFilters} from '../constants';

export const parameters = filter => {
	let inParams = [];
	inParams.push([['filter_name', '=', filter]]);
	inParams.push(dashboardFilters);
	return inParams;
};
