export default class Session {
	constructor() {
	    this.account_id = 100200000;
	}

	getAccountId() {
		return this.account_id;
	}

	setAccountId(id) {
		this.account_id = id;
	}
}