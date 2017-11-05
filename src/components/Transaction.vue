<template>
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

            <v-container fluid grid-list-md class="grey lighten-4">
            <v-layout row wrap>
              <v-flex
                v-bind="{ [`xs6`]: true }"
                v-for="prop in props.item.alternativePurchases"
                :key="prop.transaction_row_id"
              >

                <v-card v-if="prop.category === 'Travel'" img="http://content-thumbnail.cxpublic.com/content/dominantthumbnail/78e7928675d8eb1c30d38ed0fe49df217e51094c.jpg?59f0cdcd">
                  <v-card-media
                    :src="props.image"
                    height="200px"
                  >
                    <v-container fill-height fluid>
                      <v-layout fill-height>
                        <v-flex xs6 align-end flexbox>
                          <span class="headline black--text" v-text="prop.alternative"></span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-media>
                  <v-card-actions>
                    <span class="headline white--text" v-text="prop.amount"></span>
                    <span class="headline white--text">Points: 100</span>
                    </v-card-actions>
                </v-card>
                <v-card v-if="prop.category != 'Travel'" :img="prop.image">
                  <v-card-media
                    :src="props.image"
                    height="200px"
                  >
                    <v-container fill-height fluid>
                      <v-layout fill-height>
                        <v-flex xs6 align-end flexbox>
                          <span class="headline black--text" v-text="prop.alternative"></span>
                          <span class="headline black--text" v-text="prop.amount"></span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-media>
                  <v-card-actions>
                    Cost: <span class="headline white--text" v-text="prop.amount"></span>
                    <span class="headline white--text">Points: 100</span>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
            </v-container>

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
        items: this.items,
        image: 'http://content-thumbnail.cxpublic.com/content/dominantthumbnail/78e7928675d8eb1c30d38ed0fe49df217e51094c.jpg?59f0cdcd'
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
