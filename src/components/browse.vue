<template>
  <div
    :id="mapName"
    class="google-map"
  />
</template>
<script>
import axios from 'axios';
import chat from './chatBox.vue';
import mapMarkerData from './marker.vue';

export default {
/* eslint no-alert: "off" */
/* eslint no-console: "off" */

  name: 'google-map',
  components: {
    chat,
    mapMarkerData,
  },
  props: ['name'],
  data() {
    return {
      mapName: this.name + '-map',
      markerCoordinates: [{
        latitude: 29.9511,
        longitude: -90.0715,
      }],
      map: null,
      bounds: null,
      markers: [],
    };
  },

  mounted() {
    const socket = io.connect('http://localhost:3000');
    this.bounds = new google.maps.LatLngBounds();
    const element = document.getElementById(this.mapName);
    const mapCentre = this.markerCoordinates[0];
    const options = {
      center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
    };
    this.map = new google.maps.Map(element, options);
    const context = this;

    this.$http.get('/browse')
      .then((response) => {
        const arr = [];
        response.body.forEach((element) => {
          const tempLat = element.LocationLat;
          const tempLong = element.LocationLng;
          const eventInfo = element;
          arr.push({ latitude: tempLat, longitude: tempLong, event: eventInfo });
        });

        arr.forEach((coord) => {
          const position = new google.maps.LatLng(coord.latitude, coord.longitude);

          const infowindow = new google.maps.InfoWindow({
            content: ' ',
          });
          const marker = new google.maps.Marker({
            position,
            map: this.map,
            event: coord.event,
          });

          marker.addListener('click', function () {
            infowindow.setContent('<div>' +
              '<h2>' + `${coord.event.Name}` + '</h2>' +
              '<p>' + ' Host: ' + `${coord.event.Host}` + '</p>' +
              '<p>' + ' Stars: ' + `${coord.event.Rating}` + '</p>' +
              '<p>' + 'Address: ' + `${coord.event.Address}` + '</p>' +
              '<button onclick="window.clickOne()">Give 1 Star</button>' + 
              '<button onclick="window.clickTwo()">Give 2 Stars</button>' +
              '<button onclick="window.clickThree()">Give 3 Stars</button>' +
              '<button onclick="window.clickFour()">Give 4 Stars</button>' +
              '<button onclick="window.clickFive()">Give 5 Stars</button>' +
            '</div>');
            infowindow.open(this.map, marker);
            window.clickOne = () => {
              axios.post('/giveStar', {
                stars: 1,
                eventName: marker.event.Name,
                hostName: marker.event.Host,
              })
                .then((res) => {
                  console.log(res);
                })
                .catch((error) => {
                  console.log(error);
                });
              alert(`You gave ${marker.event.Name} 1 Star`);
            };
            window.clickTwo = () => {
              axios.post('/giveStar', {
                stars: 2,
                eventName: marker.event.Name,
                hostName: marker.event.Host,
              })
                .then((res) => {
                  console.log(res);
                })
                .catch((error) => {
                  console.log(error);
                });
              alert(`You gave ${marker.event.Name} 2 Stars`);
            };
            window.clickThree = () => {
              axios.post('/giveStar', {
                stars: 3,
                eventName: marker.event.Name,
                hostName: marker.event.Host,
              })
                .then((res) => {
                  console.log(res);
                })
                .catch((error) => {
                  console.log(error);
                });
              alert(`You gave ${marker.event.Name} 3 Stars`);
            };
            window.clickFour = () => {
              axios.post('/giveStar', {
                stars: 4,
                eventName: marker.event.Name,
                hostName: marker.event.Host,
              })
                .then((res) => {
                  console.log(res);
                })
                .catch((error) => {
                  console.log(error);
                });
              alert(`You gave ${marker.event.Name} 4 Stars`);
            };
            window.clickFive = () => {
              axios.post('/giveStar', {
                stars: 5,
                eventName: marker.event.Name,
                hostName: marker.event.Host,
              })
                .then((res) => {
                  console.log(res);
                })
                .catch((error) => {
                  console.log(error);
                });
              alert(`You gave ${marker.event.Name} 5 Stars`);
            };
          });
          this.markers.push(marker);
          this.map.fitBounds(this.bounds.extend(position));
        });
      });
  },
};

</script>
<style scoped>
.google-map {
    width: 800px;
    height: 600px;
    margin: 0 auto;
    background: gray;
}
</style>
