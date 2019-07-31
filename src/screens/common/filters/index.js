export default class Filters {
    constructor(filter) {
        this.filter = filter;
        this.fields = ['product_id', 'picking_id', 'quantity', 'standard_price', 'create_date', 'state', 'barcode'];
        this.today = new Date();
        this.mm = String(this.today.getMonth() + 1).padStart(2, '0');
        this.dd = String(this.today.getDate()).padStart(2, '0');
        this.yyyy = this.today.getFullYear();
    }

    getInParam() {
        if (this.filter === "ALL") {
            const inParams = [];
            inParams.push([]);
          // inParams.push(this.fields);
            return inParams
        } else if (this.filter === "TODAY") {

            let today = this.mm + '/' + this.dd + '/' + this.yyyy;

            const inParams = [];
            inParams.push([['create_date', '<=', today], ['create_date', '>=', today]]);
          // inParams.push(this.fields);

            return inParams
        } else if (this.filter === "WEEK") {

            let day = this.today.getDay();

            // get first day of this week
            let Start_Week = new Date(new Date(this.today).setDate(this.today.getDate() - day + 1));
            let dd = String(Start_Week.getDate()).padStart(2, '0');
            let mm = String(Start_Week.getMonth() + 1).padStart(2, '0');
            let yyyy = Start_Week.getFullYear();
            let first_day_week = mm + '/' + dd + '/' + yyyy;

            // get last day of this week
            let End_Week = new Date(new Date(Start_Week).setDate(Start_Week.getDate() + 6));
            dd = String(End_Week.getDate()).padStart(2, '0');
            mm = String(End_Week.getMonth() + 1).padStart(2, '0');
            yyyy = End_Week.getFullYear();
            let last_day_week = mm + '/' + dd + '/' + yyyy;

            const inParams = [];
            inParams.push([['create_date', '<=', last_day_week], ['create_date', '>=', first_day_week]]);
          // inParams.push(this.fields);
            return inParams
        } else if (this.filter === "MONTH") {
            let first_day_month = this.mm + '/' + '1' + '/' + this.yyyy;
            let last_day_month = this.mm + '/' + '31' + '/' + this.yyyy;
            const inParams = [];
            inParams.push([['create_date', '<=', last_day_month], ['create_date', '>=', first_day_month]]);
          // inParams.push(this.fields);
            return inParams
        }
    }
}
