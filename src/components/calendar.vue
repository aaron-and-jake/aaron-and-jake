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
        @show-date-change="setShowDate"
        @click-date="onClickDay"
        @click-event="onClickEvent"
        @click.stop="onClickEvent(e)"
      >
        <calendar-view-header slot="header" slot-scope="t" :header-props="t.headerProps" @input="setShowDate('hey')" />
      </calendar-view>
    </div>
  </div>
</template>
<script>

import axios from 'axios';
import CalendarView from "./calendarview.vue"
import CalendarViewHeader from "./calendarviewheader.vue"
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
        // previousYear: new Date(),
        // previousMonth: thePreviousMonth,
        // nextYear: new Date(),
        // nextMonth: new Date(),
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
    theNextYear() {

    },
    theNextMonth() {

    },
    thePreviousYear() {

    },
    thePreviousMonth() {
      this.showDate = this.thisMonth(-1);
    },
    periodChanged(range, eventSource) {
      // Demo does nothing with this information, just including the method to demonstrate how
      // you can listen for changes to the displayed range and react (by loading events, etc.)
      console.log(eventSource);
      console.log(range);
    },
    thisMonth(d, h, m) {
      const t = new Date();
      return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0);
    },
    // onClickDay(d) {
    //   this.message = `You clicked: ${d.toLocaleDateString()}`
    // },
    onClickEvent(e) {
      console.log(e);
      alert("Title: " + e.originalEvent.title + "\nDate: " + e.originalEvent.date + "\nTime: " + e.originalEvent.time + "\nAddress: " + e.originalEvent.address)
    },
    setShowDate(d) {
      // FIGURE OUT WHY D IS UNDEFINED HERE!!!!!!!!!!!!!!!!!!
      console.log(this, 'THIS IS THIS');
      console.log(d, 'THIS IS D');
      // this works to go to the previous month
      // this.showDate = new Date().setMonth(new Date().getMonth() - 1);
      // this changes the calendar no matter which button u press
      this.showDate = this.thisMonth(-1);
      console.log(this.showDate);
      // if class is ____ , call function corresponding to that
      const narrowDown = document.getElementsByClassName('cv-header-nav');
      if (d === narrowDown[0].children[0]) {
        console.log('HELLO');
      }
    },
    monthNames(num) {
      let names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
