<template>
  <b-container>
    <b-row>
      <div id="discover">
        <ul
          v-for="brite in eventbrite"
          id="event-list"
          :key="brite.id"
        >
          <div class="card-header">
            <img
              class="d-block"
              alt="pics"
              :src="brite.eImg"
              style="max-width: 80%; margin-left: auto; margin-right: auto;"
            >
            <h4>{{ brite.eName }}</h4>
            {{ 'Date: ' + brite.eDate }}
            <br>
            {{ 'Starts: ' + brite.eStart }}
            <br>
            {{ 'Ends: ' + brite.eEnd }}
            <br>
            <br>
            <h6> Event Description: </h6>
            {{ brite.eDescript + '...' }}
            <br>
            <strong>For more</strong>
            <a
              target="_blank"
              :href="brite.eUrl"
            >
              <strong>Click Here</strong>
            </a>
          </div>
        </ul>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      eventbrite: [],
    };
  },
  mounted() {
    this.$http.get('/discover')
      .then((response) => {
        response.body.forEach((element, i) => {
          const eventObj = {
            eName: response.body[i].name.text,
            eDescript: response.body[i].description.text.slice(0, 200),
            eUrl: response.body[i].url,
            eDate: moment(response.body[i].start.local).format('dddd, MMMM Do YYYY'),
            eStart: moment(response.body[i].start.local).format('h:mm a'),
            eEnd: moment(response.body[i].end.local).format('h:mm a'),
            eImg: response.body[i].logo.original.url,
          };
          if (this.eventbrite.length < 18) {
            this.eventbrite.push(eventObj);
          }
        });
      }, (err) => {
        console.log(err, 'error');
      });
  },
};

</script>

