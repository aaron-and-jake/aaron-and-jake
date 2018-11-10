<template>
  <b-container id="Event">
    <b-row>
      <b-col>
        <div
          id="app"
          cols="8"
        >
          <b-btn
            id="show-modal"
            @click="showModal = true"
          >
            Event Chat
          </b-btn>
          <chat
            v-if="showModal"
            :event="event"
            :name="name"
            @close="showModal = false"
          >
            <h3 slot="header">{{ event.Name }}</h3>
          </chat>
        </div>
        <p>Party Name: {{ event.Name }}</p>
        <p>Host: {{ event.Host }}</p>
        <p>Stars: {{ event.Rating }}</p>
        <p>Address: {{ event.Address }}</p>
        <p>Time: {{ event.Time }}</p>
        <p>Guests:</p>
        <ul v-if="event.Contributor_List">
          <li
            v-for="guest in event.Contributor_List.split(' ')"
            :key="guest"
          >
            {{ guest }}
          </li>
        </ul>
        <p>Recipe: {{ meal.label }}</p>
        <ul>
          <li
            v-for="Ingredient in meal.ingredientLines"
            :key="Ingredient.id"
          >
            {{ Ingredient }}
          </li>
        </ul>
      </b-col>
      <b-col>
        <template>
          <div
            :id="mapName"
            class="google-map"
          />
        </template>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// Imports
import chat from './chatBox.vue';
import mapMarkerData from './marker.vue';

export default {
  name: 'google-map',
  components: {
    chat,
    mapMarkerData,
  },
  props: ['event', 'name'],
  data() {
    return {
      meal: '',
      mapName: this.name + "-map",
      markerCoordinates: [{
        latitude: this.event.LocationLat,
        longitude: this.event.LocationLng,
      }],
      map: null,
      bounds: null,
      markers: [],
      showModal: false,
      data: {
        name: 'test Page',
      },
    };
  },
  mounted() {
    this.bounds = new google.maps.LatLngBounds();
    const element = document.getElementById(this.mapName);
    const mapCentre = this.markerCoordinates[0];
    const options = {
      center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude),
      maxZoom: 16,
    };
    this.map = new google.maps.Map(element, options);
    this.markerCoordinates.forEach((coord) => {
      console.log(coord);
      const position = new google.maps.LatLng(coord.latitude, coord.longitude);

      const contentString =
        '<div>' +
        '<h2>' + `${this.event.Name}` + '</h2>' +
        '<p>' + 'Host: ' + `${this.event.Host}` + '</p>' +
        '<p>' + 'Address: ' + `${this.event.Address}` + '</p>' +
        '</div>';

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });

      const marker = new google.maps.Marker({
        position,
        map: this.map,
        title: this.event.name,
      });
      marker.addListener('click', () => {
        infowindow.open(this.map, marker);
      });
      this.markers.push(marker);
      this.map.fitBounds(this.bounds.extend(position));
    });
  },
  created() {
    this.$http.get('http://www.edamam.com/ontologies/edamam.owl#' + this.event.RecipeID,
      {
        params: {
          // q: this.event.RecipeID,
          app_id: 'b9d531b7',
          app_key: '4ce2f6ffaefc283787ab3b2c58b95f90',
        },
      },
    ).then((response) => {
      console.log(response.body, 'body');
      this.meal = response.body[0]
    });
  },
  methods: {
  },
};
</script>

<style scoped>
.google-map {
  width: 500px;
  height: 400px;
  margin: 0 auto;
  background: gray;
}
</style>
