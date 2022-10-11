<template>
<v-layout
    column
    align-center
    @keydown.enter.prevent
    @keyup.enter="sendMessage(currentMessage)"
  >
    <h1>Chat</h1>
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
    <v-container>
      <v-flex
        xs10
        class="elevated white pa-4 align-end"
      >
        <v-layout
          v-for="message in messages"
          :key="message.timestamp"
          row
        >
          <v-flex xs12>
            <v-chip
              v-if="message.uuid === uuid"
              text-color="white"
              color="primary"
              class="float-right"
              label>
                {{message.text}}
            </v-chip>

            <v-chip
              v-if="message.uuid !== uuid"
              text-color="primary"
              outlined
              color="primary"
              class="float-left"
              label>
                {{message.text}}
            </v-chip>
          </v-flex>
        </v-layout>
        <v-text-field
          label="New Message"
          v-model="currentMessage"
          class="mt-12"
        >
        </v-text-field>
        <v-btn
          @click="sendMessage(currentMessage)"
          @keydown.enter.prevent
          @keyup.enter="sendMessage(currentMessage)"
        >
          Send
        </v-btn>
      </v-flex>
    </v-container>
  </v-layout>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import * as axios from 'axios'
import { config } from '../config'

export default {
  data: () => ({
    snackbar: false,
    currentMessage: "",
    messages: [],
    totalChatHeight: 0,
    connection: {},
    errorMessage: "",
    uuid: "",
    backendHealthy: false
  }),

  created() {
    this.uuid = uuidv4()

    this.checkBackend()

    this.$socket.onmessage = (message) => {
      const data = JSON.parse(message.data)
      data.timestamp = Date.now()
      this.messages.push(data)
    }

    this.$socket.onopen = function() {
      console.log('successfully connected to the websocket server')
    }

  },

  methods: {
    sendMessage: function(text) {
      const message = JSON.stringify({
        text,
        uuid: this.uuid
      })
      this.$socket.send(message)
    },
    checkBackend: function() {
      axios.get(`${config.chatsvcTcpProtocol}${config.chatsvcHost}/health`)
        .then((res) => {
          if (res.status === 200 && res.data.ok === true) {
            console.log('chatsvc backend is healthy')
            this.backendHealthy = true
            this.errorMessage = ""
            this.snakbar = false
            return
          } else {
            console.error(`chatsvc backend check failed, response code was ${res.status}, data was ${res.data}`)
            this.errorMessage = "Chat service not available"
            this.snackbar = true
            setTimeout(() => this.checkBackend(), 10000)
          }
        })
        .catch((err) => {
          console.error(err)
          console.error("chatsvc backend not healthy yet, retrying")
          this.errorMessage = "Chat service not available"
          this.snackbar = true
          setTimeout(() => this.checkBackend(), 10000)
        })
    }
  }
}
</script>
