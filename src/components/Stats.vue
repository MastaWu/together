<template>
  <div style="width:100%">
  <div class="layout row wrap">
    <div class="flex xs6">
      <div class="card"style="height: auto;">
        <div class="card__text px-0">
          <div class="horizontal">
            <bar-chart v-bind:label="label"
              v-bind:data="values" :width="500" :height="500"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex xs6">
      <div class="card" style="height: auto;">
        <div class="card__text px-0">
          <div class="horizontal">
            <bar-chart v-bind:label="label"
              v-bind:data="values" v-bind:stackedlabel="stackedlabel"
              v-bind:stackedvalues="stackedvalues" :width="500" :height="500"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex xs4">
      <div class="card" style="height: 150px;">
        <div class="card__text px-0">
          <div style="display: inline; font-size: large;">Total Savings</div>
          <div class="iOdometer">
            <i-odometer
              class="iOdometer"
              :value="num" :formatFunction="format"
            ></i-odometer>
          </div>
          <div style="display: inline; font-size: large;">No investment</div>
        <div>
    </div></div>
      </div>
    </div>
    <div class="flex xs4">
      <div class="card" style="height: 150px;">
        <div class="card__text px-0">
          <div style="display: inline; font-size: large;">YTD Capital One Money Market: </div>
          <div class="iOdometer">
            <i-odometer
              class="iOdometer"
              :value="num" :formatFunction="format"
            ></i-odometer>
          </div>
          <div style="display: inline; font-size: large;"> at 1.30% APY</div>
        <div>
    </div></div>
      </div>
    </div>
    <div class="flex xs4">
      <div class="card" style="height: 150px;">
          <div class="card__text px-0">
          <div style="display: inline; font-size: large;">YTD return on S&P 500</div>
          <div class="iOdometer">
            <i-odometer
              class="iOdometer"
              :value="num" :formatFunction="format"
            ></i-odometer>
          </div>
          <div style="display: inline; font-size: large;"> at 16%</div>
          </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import CapitalOneApiResource from '../services/CapitalOneApiResource';
  import MonthlyBarChart from '@/components/MonthlyBarChart';
  import IOdometer from 'vue-odometer';

  export default {
    methods : {
      calculateMonthlyChart(year, transactions) {
        var scope = this;

        var mapping = {'January' : 0, 'February' : 1, 
          'March' : 2, 'April' : 3, 'May' : 4, 'June' : 5, 'July' : 6, 
          'August' : 7, 'September' : 8, 'October' : 9, 'November' : 10, 'December' : 11};
          
          var chartData = []
          var calcData = {};

          transactions.forEach(function(transaction) {
            if (!calcData[mapping[transaction.month]]) {
               calcData[mapping[transaction.month]] = 0;
            }
            if (transaction.year === year) {
              calcData[mapping[transaction.month]] += transaction.amount;
            }
          });
          for (var key in calcData) {
            chartData.push(calcData[key].toFixed(2));
          }
          scope.stackedvalues = [34,34,23,67,99,11,4,333,4,56,7];
          scope.values = chartData;
      }
    },
  	data() {
      var scope = this;

      const service = new CapitalOneApiResource();
      service.getTransactions(function(data) {
        var customerData = data[0].customers;
        scope.calculateMonthlyChart(2017, customerData[0].transactions);
      });

      var formatOdemeter = function(val, val2){
        return "$" + val + ".00";
      }

      this.values = [];
      this.stackedvalues = [];
      return {values : this.values, label : "Money Spent 2017", 
              num : 0, format : formatOdemeter, stackedlabel: "Savings",
              stackedvalues : this.stackedvalues};
    },
    mounted() {
      const that = this;
      setTimeout(function() {
        that.num = 321.00;
      }, 500);
    },
    components : {"bar-chart" : MonthlyBarChart, "i-odometer" : IOdometer}
  }
</script>

<style>
  .iOdometer {
    font-size: 2em;
    margin: 0;
  }
</style>