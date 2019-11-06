export class Filters {
	constructor(filter) {
		this.filter = filter;
		this.fields = [
			'product_id',
			'picking_id',
			'quantity',
			'standard_price',
			'create_date',
			'state',
			'barcode',
		];
		this.today = new Date();
		this.mm = String(this.today.getMonth() + 1).padStart(2, '0');
		this.dd = String(this.today.getDate()).padStart(2, '0');
		this.yyyy = this.today.getFullYear();
	}

	getInParam() {
		if (this.filter === 'ALL') {
			const inParams = [];
			inParams.push([]);
			// inParams.push(this.fields);
			return inParams;
		}
		if (this.filter === 'TODAY') {
			const today = `${this.mm}/${this.dd}/${this.yyyy}`;

			const inParams = [];
			inParams.push([
				['create_date', '<=', today],
				['create_date', '>=', today],
			]);
			// inParams.push(this.fields);

			return inParams;
		}
		if (this.filter === 'WEEK') {
			const thisDay = this.today.getDay();
			const day = thisDay === 0 ? 1 : thisDay;

			// get first day of this week
			const startWeek = new Date(
				new Date(this.today).setDate(this.today.getDate() - day + 1),
			);
			let dd = String(startWeek.getDate()).padStart(2, '0');
			let mm = String(startWeek.getMonth() + 1).padStart(2, '0');
			let yyyy = startWeek.getFullYear();
			const firstDayWeek = `${mm}/${dd}/${yyyy}`;

			// get last day of this week
			const endWeek = new Date(
				new Date(startWeek).setDate(startWeek.getDate() + 6),
			);
			dd = String(endWeek.getDate()).padStart(2, '0');
			mm = String(endWeek.getMonth() + 1).padStart(2, '0');
			yyyy = endWeek.getFullYear();
			const lastDayWeek = `${mm}/${dd}/${yyyy}`;
			const inParams = [];
			inParams.push([
				['create_date', '<=', lastDayWeek],
				['create_date', '>=', firstDayWeek],
			]);
			return inParams;
		}
		if (this.filter === 'MONTH') {
			const firstDayMonth = `${this.mm}/1/${this.yyyy}`;
			const lastDayMonth = `${this.mm}/31/${this.yyyy}`;
			const inParams = [];
			inParams.push([
				['create_date', '<=', lastDayMonth],
				['create_date', '>=', firstDayMonth],
			]);
			// inParams.push(this.fields);
			return inParams;
		}
	}
}
