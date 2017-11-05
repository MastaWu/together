<template>
  <div style="width:100%">
    <h3>Alternative Purchase potential savings</h3>
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
              v-bind:data="values2" v-bind:stackedlabel="stackedlabel"
              v-bind:stackedvalues="stackedvalues" :width="500" :height="500"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex xs4">
      <div class="card" style="height: 150px;">
        <div class="card__text px-0">
          <div style="display: inline; font-size: large;">Potential Savings</div>
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
          <div style="display: inline; font-size: large;">Potential savings into Capital One Money Market: </div>
          <div class="iOdometer">
            <i-odometer
              class="iOdometer"
              :value="num2" :formatFunction="format"
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
          <div style="display: inline; font-size: large;">Potential savings into Capital One Investing S&P 500 index fund:</div>
          <div class="iOdometer">
            <i-odometer
              class="iOdometer"
              :value="num3" :formatFunction="format"
            ></i-odometer>
          </div>
          <div style="display: inline; font-size: large;"> at ~16%</div>
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
          
        var chartData = [];
        var chartDataMinusSavings = [];
        var chartSavingsData = [];

        var calcData = {};
        var calcDataMinusSavings = {};
        var savingsData = {};

        var totalSavings = 0;

        transactions.forEach(function(transaction) {
            if (!calcData[mapping[transaction.month]]) {
               calcData[mapping[transaction.month]] = 0;
            }
            if (!savingsData[mapping[transaction.month]]) {
               savingsData[mapping[transaction.month]] = 0;
            }
            if (!calcDataMinusSavings[mapping[transaction.month]]) {
               calcDataMinusSavings[mapping[transaction.month]] = 0;
            }

            if (transaction.year === year) {
              calcData[mapping[transaction.month]] += transaction.amount;

              var minAmount = transaction.amount;
              transaction.alternativePurchases.forEach(function(alt) {
                if (alt.amount < minAmount) {
                  minAmount = alt.amount;
                }
              });
              var savings = transaction.amount - minAmount;
              savingsData[mapping[transaction.month]] += savings;
              calcDataMinusSavings[mapping[transaction.month]] += minAmount;

              totalSavings += savings;
            }
          });

          for (var key in calcData) {
            chartData.push(calcData[key].toFixed(2));
          }
          for (var key in savingsData) {
            chartSavingsData.push(savingsData[key].toFixed(2));
          }
          for (var key in calcDataMinusSavings) {
            chartDataMinusSavings.push(calcDataMinusSavings[key].toFixed(2));
          }
          scope.stackedvalues = chartSavingsData;
          scope.values = chartData;
          scope.values2 = chartDataMinusSavings;
          scope.totalSavings = totalSavings;

          setTimeout(function() {
            scope.num = totalSavings;
            scope.num2 = totalSavings + totalSavings * .013;
            scope.num3 = totalSavings + totalSavings * .16;
          }, 500);
      }
    },
  	data() {
      var scope = this;

      const service = new CapitalOneApiResource();
      service.getTransactionsWithAlternates(function(transactions) {
        scope.calculateMonthlyChart(2017, transactions);
      });

      var formatOdemeter = function(val, val2){
        return "$" + val;
      }

      this.values = [];
      this.values2 = [];
      this.stackedvalues = [];
      return {values : this.values, values2 : this.values2, label : "Money Spent 2017", 
              num : 0, num2 : 0, num3 : 0, format : formatOdemeter, stackedlabel: "Potential savings",
              stackedvalues : this.stackedvalues};
    },
    mounted() {
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