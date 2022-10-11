<template>
<v-layout
    column
    align-left
    ma-8
  >
  <h1 mt-8>
    Users
  </h1>
  <v-snackbar
      :timeout="6000"
      multi-line
      top
      v-model="snackbar"
      color="error"
    >
      {{ errorMessage }}
      <v-btn color="secondary" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  <v-simple-table>
    <thead>
        <tr>
            <th class="text-left">
                Username
            </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="user in users" :key="user.username">
            <td>{{ user.username }}</td>
        </tr>
    </tbody>
  </v-simple-table>
</v-layout>
</template>

<script>
import axios from 'axios'
import { config } from '../config'

export default {
    data: () => ({
        users: [],
        snackbar: false,
        errorMessage: ""
    }),
    mounted() {
        this.checkBackend()
    },
    methods: {
        getUsers: function() {
            axios.get(`${config.usersvcTcpProtocol}${config.usersvcHost}/users`)
                .then((res) => {
                    this.users = res.data.users
                })
                .catch((err) => {
                    console.error(err)
                })
        },
        checkBackend: function() {
            axios.get(`${config.usersvcTcpProtocol}${config.usersvcHost}/health`)
                .then((res) => {
                    if (res.status === 200 && res.data.ok === true) {
                        console.log('usersvc backend is healthy')
                        this.backendHealthy = true
                        this.snackbar = false
                        this.errorMessage = ""
                        this.getUsers()
                        return
                    } else {
                        console.error(`usersvc backend check failed, response code was ${res.status}, data was ${res.data}`)
                        this.snackbar = true
                        this.errorMessage = "User service not available"
                        setTimeout(() => this.checkBackend(), 10000)
                    }
                })
                .catch((err) => {
                    console.error(err)
                    console.error("backend not healthy yet, retrying")
                    this.snackbar = true
                    this.errorMessage = "User service not available"
                    setTimeout(() => this.checkBackend(), 10000)
                })
        }
    }
}
</script>