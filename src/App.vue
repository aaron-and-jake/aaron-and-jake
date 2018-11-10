<template>
  <div id="app">
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import navBar from './components/navBar.vue';
import footer from './components/footer.vue';

Vue.use(BootstrapVue);

export default {
  components: {
    navBar,
    'app-footer': footer,
  },
  data() {
    return {
    };
  },
};
</script>
<style scoped>

</style>
