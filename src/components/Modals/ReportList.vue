<template>
  <q-card-section>
    <!-- REPORT DETAILS -->
      <q-item v-for="report in reports" :key="report.id">
        <q-item-section>
          <!-- Date | Timestamp | Duration -->
          <q-item-label>
            <!-- date -->
            <div class="text-weight-bolder text-h5 q-pb-sm">
              {{ formatDate( report.startDateTime ) }} 
            </div>
            <!-- timestamp -->
            <div class="text-body2 q-pb-xs">
              {{ niceDate( report.startDateTime ) }} - {{ niceDate( report.endDateTime ) }} 
            </div>
            <!-- duration -->
            <p class="text-body2">Total Duration: {{ report.duration }} </p>
          </q-item-label>

          <q-separator spaced />

          <!-- name -->          
          <q-item-label class="q-pb-md">
            <div class="text-bold text-h6">Security Personnel: </div>
            <div class="text-body1"> {{ report.userName }} </div>
          </q-item-label>


          <q-separator spaced />

          <!-- starting -->
          <q-item-label class="q-pb-md">
            <div class="text-bold text-body1 q-pb-sm"> Starting Location: </div> 
            <div class="text-body1">{{ report.startLocation }} </div>
          </q-item-label>


          <q-separator spaced />

          <!-- ending -->
          <q-item-label class="q-pb-md">
            <div class="text-bold text-body1 q-pb-sm">Ending Location: </div>
            <div class="text-body1"> {{ report.endLocation }} </div>
          </q-item-label>


          <q-separator spaced />
          <div class="single">
            <div class="thumbnail">
              <img :src="report.anomalyUrl" />
            </div>
          </div>

          <q-separator spaced />

          <!-- remarks -->
          <q-item-label class="q-pb-md">
            <div class="text-bold text-body1 q-pb-sm"> Remarks: </div>
            <div class="text-body2"> {{ report.remarks }} </div>
          </q-item-label>

          <!-- feedback -->


        </q-item-section>
      </q-item>
  </q-card-section>
</template>

<script>
import { date } from "quasar";
import moment from "moment";
const { addToDate } = date;

export default {
  props: ["reports"],
   computed: {
    niceDate() {
      return (value) => {
        return moment(value).format('LTS'); // 2:24:57 pm
      };
    },
    formatDate() {
      return (value) => {
        return moment(value).format('LL'); // February 24th 2022
      };
    },

    assignmentTime() {
      return date.formatDate(
        this.assignment.date + " " + this.assignment.time,
        "h:mm A"
      );
    },
  },
};
</script>

<style>

.single {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background: white;
  margin: 16px 0;
  transition: all ease 0.2s;
}
.single:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
}
.thumbnail {
  max-width: 200px;
  max-height: 200px;
  overflow: hidden;
  border-radius: 10px;
}
img {
  max-width: 100%;
  max-height: 100%;
  display: block;
}
</style>
