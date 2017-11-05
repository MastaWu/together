// MonthlyIncome.vue
import { Bar, mixins} from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['data', 'options', 'label', 'stackedvalues', 'stackedlabel'],

  mounted () {
  	var scope = this;

    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: scope.label,
          backgroundColor: '#f87979',
          data: scope.data
        }
      ]
    }, {responsive: true, maintainAspectRatio: false});
  },
  watch: {
    data: function (val) {
	  	var scope = this;

	  	var datasets = [];
	  	datasets.push({
	          	label: scope.label,
	          	backgroundColor: '#f87979',
	        	data: val
	        });
	  	if (this.stackedvalues) {
	  		datasets.push({
	          	label: scope.stackedlabel,
	          	backgroundColor: '#85bb65',
	        	data: scope.stackedvalues
	        });
	  	}

	    // Overwriting base render method with actual data.
	    this.renderChart({
	      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	      datasets: datasets
	    },{
	      responsive: true, 
	      maintainAspectRatio: false,
	      scales: {
	        xAxes: [{
	          stacked: true,
	          categoryPercentage: 0.5,
	          barPercentage: 1
	        }],
	        yAxes: [{
	          stacked: true,
	          ticks: {
	            beginAtZero: true,
	            callback: function(value, index, values) {
	              if (parseInt(value) >= 1000) {
	                return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	              } else {
	                return '$' + value;
	              }
	            }
	          }
	        }]
	      }
	    });
    }
  }
}