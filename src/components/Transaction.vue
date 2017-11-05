<template>
  <!--<v-tabs dark fixed centered>
    <v-toolbar extended color="light-green darken-1" dark>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-toolbar-title slot="extension" class="display-2">Account Summary</v-toolbar-title>
    </v-toolbar>
    <v-tabs-bar class="light-green darken-1">
      <v-tabs-slider class="white"></v-tabs-slider>
      <v-tabs-item
        v-for="i in items"
        :key="i"
        :href="'#tab-' + i"
      >
        {{ i }}
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-items>
      <v-tabs-content
        v-for="i in items"
        :key="i"
        :id="'tabs-' + i"
      >
        <v-card flat>
          <v-card-text>
          blah
          </v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>-->
  <div>
    <h1>Transactions</h1>
    <div id="app">
      <v-app id="inspire">
        <v-data-table
          :headers="headers"
          :items="items"
          hide-actions
          item-key="transaction_id">
          <template slot="items" scope="props">
            <tr @click="props.expanded = !props.expanded">
              <td>{{ props.item.transaction_id }}</td>
              <td class="text-xs-right">{{ props.item.merchant_name }}</td>
              <td class="text-xs-right">{{ props.item.amount }}</td>
              <td class="text-xs-right">{{ props.item.country }}</td>
              <td class="text-xs-right">{{ props.item.zipcode }}</td>
              <td class="text-xs-right">{{ props.item.month }}</td>
              <td class="text-xs-right">{{ props.item.day }}</td>
              <td class="text-xs-right">{{ props.item.year }}</td>
              <td class="text-xs-right">{{ props.item.rewards_earned }}</td>
            </tr>
          </template>
          <template slot="expand" scope="props">
            <v-card flat>
              <v-card-text>Potential savings: {{props.item.alternativePurchases[0].alternative }}</v-card-text>
            </v-card>
          </template>
        </v-data-table>
      </v-app>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CapitalOneApiResource from '../services/CapitalOneApiResource';

  export default {
    data () {
      this.headers = [
        {
          text: 'Transaction Id',
          align: 'left',
          sortable: false,
          value: 'transaction_id'
        },
        { text: 'Merchant', value: 'merchant_name', sortable: false, },
        { text: 'Amount', value: 'amount', sortable: false, },
        { text: 'Country', value: 'country', sortable: false,},
        { text: 'Zip Code', value: 'zipcode', sortable: false, },
        { text: 'Month', value: 'month', sortable: false, },
        { text: 'Day', value: 'day', sortable: false, },
        { text: 'Year', value: 'year', sortable: false, },
        { text: 'Rewards earned', value: 'rewards_earned', sortable: false, }
      ];
      this.items = [];

      return {
        posts: [],
        errors: [],
        headers: this.headers,
        items: this.items
      }
    },

  created () {
    var scope = this;
    const service = new CapitalOneApiResource();

    service.getTransactionsWithAlternates(function(transactions){
      //console.log(transactions[0].customers[0].transactions);
      var transactionarry = [];
      transactions.forEach(function(value) {
        value.value = false;
        transactionarry.push(value);
      });
      scope.items = transactionarry;
    });
  }
  }
</script>

<style>

</style>