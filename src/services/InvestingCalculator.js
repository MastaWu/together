export default class CapitalOneApiResource {
	constructor() {
		this.mapping = {0 : 1.91, 1 : 3.71, 2 : 0.07, 
			            3 : 1.05, 4 : 1.01, 5: 0.92, 
			            6 : 1.87, 7 : 0.15, 8 : 2.45
			            9 : 2.16, 10 : 4.44, 11 : 1.92};
	}

	getMontlyInvestmentReturn(month, money) {
		return money * (this.mapping[month]/100);
	}

	getYearlyInvestmentReturn(money) {
		return money * (16.77/100);
	}

	getMontlyMoneyMarketReturn(month, money) {
		return money * ((1.3/100)/12);
	}

	getYearlyMoneyMarketReturn(money) {
		return money * (1.3/100);
	}
}