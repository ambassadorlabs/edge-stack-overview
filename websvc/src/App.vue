<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.upchieve.org/docs/logo.svg"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <Chat/>
      <Users/>
    </v-main>
  </v-app>
</template>

<script>
import Chat from './components/Chat'
import Users from './components/Users'

export default {
  name: 'App',

  components: {
    Chat,
    Users,
  },

  data: () => ({
    //
  }),
};
</script>
