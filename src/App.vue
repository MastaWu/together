<template>
  <div class="text-xs-center">
  <v-app id="inspire">
    <v-navigation-drawer
      light
      persistent
      v-model="drawer"
      enable-resize-watcher
      clipped
      app
    >
    <div id="navbar">
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">Menu</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense class="pt-0">
        <v-list-tile v-for="item in items" :key="item.title" @click="" :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
    </v-navigation-drawer>
  
    <v-toolbar
      color="green lighten-2"
      dark
      fixed
      app
      clipped-right
    >
      <v-toolbar-side-icon @click.stop="drawer =  !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Greetings!</v-toolbar-title>
      <v-spacer></v-spacer>
        <div class="text-xs-center">
          <v-badge overlay left color="green accent-1" overlap>
            <v-icon
                large
                color="white"
              >
                account_circle
              </v-icon>
          </v-badge>
        </div>
    </v-menu>
    </v-toolbar>
    
    <main>
      <v-content>
        <v-container fluid fill-height>
          <v-layout justify-center>
          <router-view></router-view>
          </v-layout>
        </v-container>
      </v-content>
    </main>
    <v-footer color="green lighten-2" class="white--text" app>
      <span>Together</span>
      <v-spacer></v-spacer>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        drawer: null,
        items: [
          { title: 'Home', icon: 'dashboard', path: '/' },
          { title: 'Transaction', icon: 'credit_card', path: '/transaction' },
          { title: 'Contact', icon: 'question_answer', path: '/contact' },
          { title: 'Stats', icon: 'pie_chart', path: '/stats' }
        ],
        right: null
      }
    }
  }
</script>

<style scoped>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height:100%;
  margin:0;
}

</style>