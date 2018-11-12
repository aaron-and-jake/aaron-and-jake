<template>
  <div id="calendar">
    <div class="calendar-parent">
      <calendar-view
        :events="events"
        :show-date="showDate"
        :time-format-options="{hour: 'numeric', minute:'2-digit'}"
        :enable-drag-drop="true"
        :disable-past="disablePast"
        :disable-future="disableFuture"
        :show-event-times="showEventTimes"
        :display-period-uom="displayPeriodUom"
        :display-period-count="displayPeriodCount"
        :starting-day-of-week="startingDayOfWeek"
        :class="themeClasses"
        :period-changed-callback="periodChanged"
        class="cv-event"
        @click-event="onClickEvent"
        @click.stop="onClickEvent(e)"
      >
        <calendar-view-header
          slot="header"
          slot-scope="t"
          :header-props="t.headerProps"
          @input="setShowDate"
        />
      </calendar-view>
    </div>
  </div>
</template>
<script>

import CalendarView from "./calendarview.vue"
import CalendarViewHeader from "./calendarviewheader.vue"
import axios from 'axios';
import CalendarMathMixin from "./calendarmathmixin.js"


export default {
  name: "Calendar",
  components: {
    CalendarView,
    CalendarViewHeader,
  },
  mixins: [CalendarMathMixin],
  data() {
    return {
      /* Show the current month, and give it some fake events to show */
      t: {
        headerProps: {
          periodLabel: this.monthNames(new Date().getMonth()) + ' ' + new Date().getFullYear(),
        },
      },
      showDate: this.thisMonth(1),
      message: '',
      startingDayOfWeek: 0,
      disablePast: false,
      disableFuture: false,
      displayPeriodUom: 'month',
      displayPeriodCount: 1,
      showEventTimes: true,
      newEventTitle: '',
      newEventStartDate: '',
      newEventEndDate: '',
      useDefaultTheme: true,
      useHolidayTheme: true,
      events: this.getEvents(),
    };
  },
  computed: {
    userLocale() {
      return this.getDefaultBrowserLocale;
    },
    dayNames() {
      return this.getFormattedWeekdayNames(this.userLocale, "long", 0);
    },
    themeClasses() {
      return {
        "theme-default": this.useDefaultTheme,
      };
    },
  },

  methods: {
    periodChanged(range, eventSource) {
      // Demo does nothing with this information, just including the method to demonstrate how
      // you can listen for changes to the displayed range and react to them (by loading events, etc.)
      // range.displayFirstDate = new Date();
      // range.displayLastDate = "Sun Dec 02 2018 00:00:00 GMT-0600";
      // range.periodEnd = "Fri Nov 30 2018 00:00:00 GMT-0600";
      // range.periodStart = "Thu Nov 01 2018 00:00:00 GMT-0500";
      console.log(eventSource);
      console.log(range);
    },
    thisMonth(d, h, m) {
      const t = new Date();
      return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0);
    },
    onClickEvent(e) {
      console.log(e);
      alert("Title: " + e.originalEvent.title + "\nDate: " + e.originalEvent.date + "\nTime: " + e.originalEvent.time + "\nAddress: " + e.originalEvent.address);
    },
    setShowDate(d) {
      if (d === 'previousPeriod') {
        this.showDate = new Date(2018, 10);
        this.t.headerProps.periodLabel = "November 2018";
      }
      if (d === 'nextPeriod') {
        this.t.headerProps.periodLabel = "December 2018";
        this.showDate = new Date(2018, 11);
      }
      if (d === 'previousYear') {
        this.t.headerProps.periodLabel = "November 2017";
        this.showDate = new Date(2017, 11);
      }
      if (d === 'nextYear') {
        this.t.headerProps.periodLabel = "November 2019";
        this.showDate = new Date(2019, 11);
      }
    },
    monthNames(num) {
      const names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return names[num];
    },
    getEvents() {
      axios.get('/events').then((eventList) => {
        const mappedList = eventList.data.map((event, i) => {
          const newObj = {};
          newObj.id = `e${eventList.data[i].id}`;
          newObj.startDate = eventList.data[i].Date;
          newObj.title = eventList.data[i].Name;
          newObj.address = eventList.data[i].Address;
          newObj.time = eventList.data[i].Time;
          newObj.host = eventList.data[i].Host;
          return (newObj);
        });
        this.events = mappedList;
      });
    },
  },
};
</script>

<style>
html,
body {
height: 100%;
margin: 0;
background-color: #f7fcff;
}

#calendar {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    height: 67vh;
    width: 90vw;
    margin-left: auto;
    margin-right: auto;

}

.calendar-parent {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: hidden;
  max-height: 80vh;
  background-color: white;
}

/* For long calendars, ensure each week gets sufficient height.
The body of the calendar will scroll if needed */
.cv-wrapper.period-month.periodCount-2 .cv-week,
.cv-wrapper.period-month.periodCount-3 .cv-week,
.cv-wrapper.period-year .cv-week {
  min-height: 6rem;
}

/* These styles are optional, to illustrate the flexbility
of styling the calendar purely with CSS. */

/* Add some styling for events tagged with the "birthday" class */


</style>
