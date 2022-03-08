<template>
  <div>
    <q-card rounded class="q-pa-md absolute fullscreen">
      <!-- header -->
      <q-card-section class="row">
        <!-- title -->
        <div class="col text-h6 text-primary text-bold">Assignment Details</div>
        <div class="col-10" />
        <!-- back -->
        <q-btn
          v-close-popup
          flat
          round
          dense
          icon="fas fa-times-circle"
          size="lg"
          class="col text-negative"
        />
      </q-card-section>
      <!-- endheader -->
      
      <!--content-->
      <q-card-section class="text-grey-9">
        <!-- DATE | TIME -->
        <q-item v-ripple>
          <q-item-label class="inputStyle">
            <div class="text-weight-bolder text-h5 q-pb-sm">
              {{ niceDate(assignment.date) }}
              <q-icon name="event" />
            </div>
            <!--time-->
            <div class="text-body1 q-pb-xs">
              Start at: {{ assignmentTime }}
              <q-icon name="schedule" />
            </div>
          </q-item-label>
        </q-item>

        <q-separator spaced />

        <!-- NAME -->
        <q-item v-ripple>
          <q-item-label class="inputStyle">
            <div class="text-bold text-h6">
              Security Personnel <q-icon name="account_circle" /> 
            </div>
            <div class="text-body1"> 
              {{ assignment.name }} 
            </div>
          </q-item-label>
        </q-item>

        <q-separator spaced />

        <!-- POST -->
        <q-item v-ripple>
          <q-item-label class="inputStyle">
            <div class="text-bold text-h6">
              Assigned Location <q-icon name="place" />
            </div>
            <div class="text-body1"> 
              {{ assignment.post }}
            </div>           
          </q-item-label>
        </q-item>
      </q-card-section>
      <!--endContent-->
      <q-separator spaced />   
      <!--footer-->
      <q-card-actions class="q-pt-xl">
        <q-btn
          rounded
          unelevated
          no-caps
          size="lg"
          class="fit bg-secondary text-white q-mt-xl"
          label="Begin Patrol"
          @click="prompt = true"
        />

        <q-separator spaced />   

        <!-- Confirmation Dialog -->
        <q-dialog v-model="prompt" class="q-pa-md" persistent>
          <q-card rounded class="q-pa-sm">
            <q-card-section>
              <div class="col q-pa-md">
                <p class="text-h4 text-weight-bold text-warning">Hold on! Pam Ram </p>
                <p class="text-body1">
                  Be sure you are all geared up and ready to go!
                </p>
              </div>
            </q-card-section>
            <!-- body -->
            <q-card-section>
              <div class="row q-px-xl q-pt-md q-pb-sm">
                <q-avatar size="150px" class="col vertical-center">
                  <img src="~assets/pamtheram.png" />
                </q-avatar>         
              </div>
            </q-card-section>
            <!-- endBody -->
            <!-- Footer -->
            <q-card-actions class="q-pb-xl">
              <q-btn
                unelevated
                exact
                no-caps
                rounded
                outline
                color="primary"
                label="Proceed"
                class="fit q-pa-sm text-h6 text-weight-bold q-ma-sm"
                to="/report"
              />
              <q-btn
                unelevated
                exact
                no-caps
                rounded
                color="primary"
                label="Cancel"
                class="fit q-pb-sm text-h6 q-ma-sm"
                v-close-popup
              />              
            </q-card-actions>
            <!-- endFooter -->
          </q-card>
        </q-dialog>
      </q-card-actions>
      <!-- endFooter -->
    </q-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ref, onBeforeMount } from "vue";
import { date } from "quasar";
const { addToDate } = date;

export default {
  props: ["assignment", "id"],

  setup() {
    return {
      alert: ref(false),
      confirm: ref(false),
      prompt: ref(false),
    }
  },
  computed: {
    ...mapActions("assignment", ["updateAssignment", "deleteAssignment"]),
    niceDate() {
      return (value) => {
        return date.formatDate(value, "MMMM DD, YYYY");
      };
    },

    assignmentTime() {
      return date.formatDate(
        this.assignment.date + " " + this.assignment.time,
        "h:mm A"
      );
    },
  },
    //maximaze fullscreen
  data: function () {
    return {
      maximizedToggle: true,
    };
  },
};
</script>

<style>
.inputStyle {
  min-width: 250px;
  max-width: 1080px;
  max-height: 120px;
  padding: 15px;
  font-size: 20px;
}
</style>
