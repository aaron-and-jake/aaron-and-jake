<template>
  <b-jumbotron header="New Event">
    <b-row>
      <b-col cols="6">
        <b-form>
          <label>Event Name:</label>
          <b-form-input
            v-model="eventData.name"
            type="text"
            placeholder="Event Name"
          />
          <br>
          <label>Event Date:</label>
          <b-form-input
            v-model="eventData.date"
            type="date"
            placeholder="Event Time"
          />
          <br>
          <label>Event Time:</label>
          <b-form-input
            v-model="eventData.time"
            type="time"
            placeholder="Event Time"
          />
          <br>
          <label>Event Location:</label>
          <b-form-input
            v-model="eventData.location"
            type="text"
            placeholder="Event location"
          />
          <br>
          <label>Recipe lookup</label>
          <b-form-input
            v-model="food"
            type="text"
            placeholder="Recipe lookup"
          />
          <b-button @click.prevent="lookUp">Recipe lookUp</b-button>
          <b-button @click.prevent="create">Create Event</b-button>
        </b-form>
      </b-col>
      <b-col>
        <recipes
          v-if="populateList"
          :meals="meals"
          :populate-list="populateList"
          @hideList="hideList($event)"
        />
        <div v-if="showMeal">
          <p>Your meal: {{ showSelection.label }}</p>
          <img :src="showSelection.image">
        </div>
      </b-col>
    </b-row>
  <!-- <b-row>
    <recipes
      v-if="populateList"
      :meals="meals"
      :populateList="populateList"
      @hideList="hideList($event)"
    />
  </b-row> -->
  </b-jumbotron>
</template>
<script>
// Imports
import recipes from './recipes.vue';
import chat from './chatBox.vue';

export default {
  components: {
    recipes,
    chat,
  },
  data() {
    return {
      showMeal: false,
      showSelection: '',
      food: '',
      populateList: false,
      meals: [],
      showModal: false,
      eventData: {
        name: '',
        time: '',
        date: '',
        location: '',
        meal: '',
      },
    };
  },
  methods: {
    create() {
      this.$http.post('/create', this.eventData, {
        withCredentials: true,
      }).then((response) => {
        this.array = response.body;
        this.list = true;
        console.log(response.status);
        console.log(response);
      });
    },
    lookUp() {
      this.$http.get(
        'https://api.edamam.com/search?',
        {
          params: {
            q: this.food,
            app_id: 'b9d531b7',
            app_key: '4ce2f6ffaefc283787ab3b2c58b95f90',
          },
        },
      ).then((response) => {
        this.populateList = true;
        this.meals = response.body.hits;
      });
    },
    hideList(change) {
      this.showMeal = true;
      this.populateList = change[0];
      this.eventData.meal = change[1].uri.split('#')[1];
      this.food = change[1].label;
      this.showSelection = change[1];
    },
  },
};
</script>

<style>

</style>
