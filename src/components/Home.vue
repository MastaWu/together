<template>
  <v-layout column>
    <v-flex xs12 sm8 offset-sm2>
      <v-toolbar color="light-green darken-4" dark>
        <v-toolbar-title>Bring the Family Closer</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container fluid grid-list-md class="grey lighten-4">
        <v-layout row wrap>
          <v-flex
            v-bind="{ [`xs${card.flex}`]: true }"
            v-for="card in cards"
            :key="card.title"
          >
            <v-card>
              <v-card-media
                :src="card.src"
                height="450px"
              >
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="headline" v-text="card.title"></span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>favorite</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>bookmark</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>share</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      cards: [
        { title: 'Activities', src: '../static/stock_family.jpg', flex: 12 },
        { title: 'Food Adventures', src: '../static/stock_cooking.jpg', flex: 6 },
        { title: 'Vacation', src: '../static/stock_vacation.jpg', flex: 6 }
      ]
    })
  }
</script>  

<style>
    .headline {
        color: white;
        text-shadow: 1px 1px 1px #f9f9f9;
    }
</style>