import Session from './Session';

export default class CapitalOneApiResource {
	constructor() {
		this.session = new Session();
	    this.URL = "https://3hkaob4gkc.execute-api.us-east-1.amazonaws.com/prod/";
	}

	getAccount(callback) {
		var accountId = this.session.getAccountId();

		$.ajax({
		   url: this.URL + 'au-hackathon/accounts',
		   type: 'POST',
		   headers: {
		      'Content-Type':'application/x-www-form-urlencoded'
		   },
		   data: JSON.stringify({'account_id':accountId}),
		   success: function(data) {
		      callback(data);
		   }
		});
	}

	getCustomer(customerId, callback) {
		$.ajax({
		   url: this.URL + 'au-hackathon/customers',
		   type: 'POST',
		   headers: {
		      'Content-Type':'application/x-www-form-urlencoded'
		   },
		   data: JSON.stringify({'customer_id':customerId}),
		   success: function(data) {
		      callback(data);
		   }
		});
	}

	getTransactions(callback) {
		var accountId = this.session.getAccountId();

		$.ajax({
		   url: this.URL + 'au-hackathon/transactions',
		   type: 'POST',
		   headers: {
		      'Content-Type':'application/x-www-form-urlencoded'
		   },
		   data: JSON.stringify({'account_id':accountId}),
		   success: function(data) {
		      callback(data);
		   }
		});
	}

	getTransactionsWithAlternates(callback) {
		var accountId = this.session.getAccountId();

		$.ajax({
		   url: 'http://192.168.1.46:8080/api/transactions/getAllTransactions',
		   type: 'POST',
		   headers: {
		      'Content-Type':'application/x-www-form-urlencoded'
		   },
		   data: JSON.stringify(),
		   success: function(data) {
		      callback(data);
		   }
		});
	}

	getRewards() {
		var accountId = this.session.getAccountId();

		$.ajax({
		   url: this.URL + 'au-hackathon/rewards',
		   type: 'POST',
		   headers: {
		      'Content-Type':'application/x-www-form-urlencoded'
		   },
		   data: JSON.stringify({'account_id':accountId}),
		   success: function(data) {
		      console.log(data);
		   }
		});
	}

	getPayments() {
		var accountId = this.session.getAccountId();

		$.ajax({
		   url: this.URL + 'au-hackathon/payments',
		   type: 'POST',
		   headers: {
		      'Content-Type':'application/x-www-form-urlencoded'
		   },
		   data: JSON.stringify({'account_id':accountId}),
		   success: function(data) {
		      console.log(data);
		   }
		});
	}
}