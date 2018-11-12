<template>
  <b-jumbotron header="Login Page">
    <form>
      <input
        v-model="loginData.email"
        type="text"
        placeholder="Email"
        required
      >
      <input
        v-model="loginData.password"
        type="password"
        placeholder="Password"
        required
      >
      <button @click.prevent="login">Login</button>
    </form>
    <router-link to="/signup">Create New Account</router-link>

  </b-jumbotron>
</template>

<script>
/* eslint no-console: "off" */
// Imports

export default {
  data() {
    return {
      styleObject: {
        color: 'Green',
      },
      loginData: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      this.$http.post('/login', {
        email: this.loginData.email,
        password: this.loginData.password,
      }, {
        withCredentials: true,
      }).then((data, status, response) => {
        console.log(response);
        console.log(data);
        this.loginData.email = '';
        this.loginData.password = '';
      });
    },
  },
};
</script>

<style scoped>

</style>
