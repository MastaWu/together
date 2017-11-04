<template>
  <v-tabs dark fixed centered>
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
          <v-card-text>blah</v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import axios from 'axios';

  export default {
    data () {
      return {
        items: ['Users', 'Rewards', 'Payments'],
        posts: [],
        errors: []
      }
    },

  created () {
    axios.post('https://3hkaob4gkc.execute-api.us-east-1.amazonaws.com/prod/au-hackathon/transactions', {
        "account_id": 100300000
    })
    .then(response => {
      console.log(JSON.stringify(response));
      this.posts = response.data
    })
    .catch (e => {
      this.errors.push(e)
    })
  }
  }
</script>

<style>

</style>