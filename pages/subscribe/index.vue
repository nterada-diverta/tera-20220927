<template>
    <div>
      <form>
      <h1>E-zine subscription</h1>
        <p v-if="resultMessage !== null">
          {{ resultMessage }}
        </p>
      <input v-model="emailEntered" name="email" type="email" placeholder="email">
      <button v-on:click.prevent="subscribeSubmit">Subscribe</button>    
      <button v-on:click.prevent="unsubscribeSubmit">Unsubscribe</button>
      <button v-on:click.prevent="sendTestMail">E-mail test</button>
     </form>
    </div>
  </template>
  
  <script>
  export default {
    data () {
      return {
        emailEntered: '',
        resultMessage: null,
        }
    },
    methods: {
      //When clicking "Subscribe" button
      async subscribeSubmit() {
        try {
          const payload = {
                      email: this.emailEntered
                  }
          // post data
          const response = await this.$axios.$post(
            `/rcms-api/12/magazine_subscribe/1`, payload)
            this.resultMessage = response.messages[0]
        } catch (error) {
           this.resultMessage = error.response.data.errors[0].message
        }
      },
      //When clicking "Unscribe" button 
      async unsubscribeSubmit() {
        try {
          const payload = {
                      email: this.emailEntered
                  }
          // post data
          const response = await this.$axios.$post(
            `/rcms-api/12/magazine_unsubscribe/1`, payload)
            this.resultMessage = response.messages[0]
        } catch (error) {
           this.resultMessage = error.response.data.errors[0].message
        }
      },
      //When clicking "E-mail test" button
      async sendTestMail() {
        try {
          const payload = {
                      mail_to: this.emailEntered
                  }
          // post data
          const response = await this.$axios.$post(
            `/rcms-api/12/magazine_sendMail`, payload)
            this.resultMessage = 'Test e-mail has been sent.'
        } catch (error) {
           this.resultMessage = error.response.data.errors[0].message
        }
      }
    }
  }
  </script>