<template>
  <!--header-->
  <div rounded size="1000px" class="z-absolute bg-primary">
    <navbar2 @home="goToHome()" />
  </div>

  <form @submit.prevent="handleSubmit">
    <q-scroll-area style="height: 500px" class="bg-grey-3">
      <!-- card NAME -->
      <q-card bordered class="my-card q-ma-md" style="border-radius: 10px">
        <!--Name-->
        <div class="q-ma-md">
          <q-input v-model="name" class="col col-sm-6" label="Name" dense>
            <template v-slot:append>
              <q-btn round dense flat icon="account_circle" />
            </template>
          </q-input>
        </div>
      </q-card>
      <!-- end -->

      <!-- card START -->
      <q-card
        bordered
        class="my-card q-ma-md"
        style="border-radius: 10px; margin-top: 30px"
      >
        <!--Start Location-->
        <div class="q-ma-md">
          <q-input
            v-model="startLocation"
            :loading="startLocationLoading"
            class="col col-sm-6"
            label="Start Location"
            dense
            readonly
          >
            <template v-slot:append>
              <q-btn
                round
                dense
                flat
                icon="navigation"
                v-if="!startLocationLoading"
              />
            </template>
          </q-input>
        </div>

        <!--Start Date and Time-->
        <div class="q-ma-md">
          <q-input
            v-model="startDateTime"
            :loading="startLocationLoading"
            class="col col-sm-6"
            label="Start Timestamp"
            dense
          >
            <template v-slot:append>
              <q-btn
                round
                dense
                flat
                icon="event"
                v-if="!startLocationLoading"
              />
            </template>
          </q-input>
        </div>
      </q-card>
      <!-- end -->

      <!-- card END -->
      <q-card
        bordered
        class="my-card q-ma-md"
        style="border-radius: 10px; margin-top: 30px"
      >
        <!--End Location-->
        <div class="q-ma-md">
          <q-input
            v-model="endLocation"
            :loading="endLocationLoading"
            class="col col-sm-6"
            label="End Location"
            dense
            readonly
          >
            <template v-slot:append>
              <q-btn
                @click="getEndLocation"
                round
                dense
                flat
                icon="navigation"
                v-if="!endLocationLoading"
              />
            </template>
          </q-input>
        </div>

        <!--End Date Time-->
        <div class="q-ma-md">
          <q-input
            v-model="endDateTime"
            :loading="endLocationLoading"
            class="col col-sm-6"
            label="End Timestamp"
            dense
            readonly
          >
            <template v-slot:append>
              <q-icon
                round
                dense
                flat
                name="event"
                v-if="!endLocationLoading"
              />
            </template>
          </q-input>
        </div>
      </q-card>
      <!-- end -->

      <!-- card DURATION AND ANOMALY-->
      <q-card bordered class="my-card q-ma-md" style="border-radius: 10px">
        <!--Duration-->
        <div class="q-ma-md">
          <q-input
            v-model="duration"
            :loading="durationLoading"
            class="col col-sm-6"
            label="Duration"
            dense
            readonly
          >
            <template v-slot:append>
              <q-btn round dense flat icon="timer" v-if="!durationLoading" />
            </template>
          </q-input>
        </div>

        <!-- ANOMALY -->
        <!--attach image-->
        <div class="q-ma-md">
          <label>Upload Anomaly if Applicable</label>
          <input type="file" accept="image/*" @change="handleChange" />
          <div class="error">{{ fileError }}</div>
        </div>
        <!--Remarks-->
        <div class="q-ma-md">
          <q-input v-model="remarks" class="col col-sm-6" label="Remarks" dense>
            <template v-slot:append>
              <q-btn round dense flat icon="notes" />
            </template>
          </q-input>
        </div>
      </q-card>
    </q-scroll-area>
    <!-- scroll area end -->

    <!--submit-->
    <q-footer class="bg-white">
      <div class="q-px-md q-pb-lg q-pt-md">
        <div class="q-pa-md">
          <q-btn
            no-caps
            rounded
            class="fit q-pa-md bg-primary text-white text-h7"
            label="Submit"
            type="submit"
            v-if="!isPending"
          />
          <q-btn
            no-caps
            rounded
            class="fit q-pa-md bg-positive text-white text-h7"
            label="Saving"
            v-if="isPending"
            disabled
          />
        </div>
      </div>
    </q-footer>
    <!-- end button-->
  </form>
</template>

<script>
import { ref } from "vue";
import useStorage from "src/composables/useStorage";
import getUser from "src/composables/getUser";
import useCollection from "src/composables/useCollection";
import { timestamp } from "src/boot/firebase";
import { useQuasar, Notify } from "quasar";
import { mapActions } from "vuex";
import { useRouter } from "vue-router";
import moment from "moment";

export default {
  props: ["assignment", "id"],

  components: {
    navbar2: require("components/Navbars/Navbar2.vue").default,
  },

  setup() {
    const router = useRouter();
    const { filePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useCollection("reports");
    const { user } = getUser();

    const startDurationTime = ref(""); // added for format in duration
    const endDurationTime = ref(""); // added for format in duration

    const name = ref("");
    const startLocation = ref("");
    const startDateTime = ref("");
    const endLocation = ref("");
    const endDateTime = ref("");
    const file = ref(null);
    const duration = ref("");
    const remarks = ref("");
    const fileError = ref(null);
    const isPending = ref(false);

    const $q = useQuasar();
    const startLocationLoading = ref(false);
    const endLocationLoading = ref(false);
    const durationLoading = ref(false);
    const imageLoading = ref(false);
    const imageCaptured = ref(false);
    const hasCameraSupport = ref(true);
    const imageUpload = [];

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        // Notify User
        const notif = $q.notify({
          type: "ongoing",
          position: "top",
          group: false, // required to be updatable
          timeout: 0, // we want to be in control when it gets dismissed
          spinner: true,
          message: "Uploading file...",
          caption: "0%",
        });
        // we simulate some progress here...
        let percentage = 0;
        //   Saving Data
        await uploadImage(file.value);
        await addDoc({
          name: name.value,
          startLocation: startLocation.value,
          startDateTime: startDurationTime.value, // change from startDateTime
          endLocation: endLocation.value,
          endDateTime: endDurationTime.value, // change from endDateTime
          userId: user.value.uid,
          duration: duration.value,
          remarks: remarks.value,
          userName: user.value.displayName,
          anomalyUrl: url.value,
          filePath: filePath.value,
          createdAt: timestamp(),
        });
        const interval = setInterval(() => {
          percentage = Math.min(
            100,
            percentage + Math.floor(Math.random() * 22)
          );
          // we update the dialog
          notif({
            caption: `${percentage}%`,
          });

          // if we are done...
          if (percentage === 100) {
            notif({
              type: "positive",
              icon: "done", // we add an icon
              spinner: false, // we reset the spinner setting so the icon can be displayed
              message: "Report successfully added!",
              timeout: 2000, // we will timeout it in 2s
            });
            // End
            if (!error.value) {
              isPending.value = false;
              console.log("Report successfully added.");
              clearInterval(interval);
              router.push({ path: "/summary" });
            }
          }
        }, 500);
    } else{
      isPending.value = true;
        // Notify User
        const notif = $q.notify({
          type: "ongoing",
          position: "top",
          group: false, // required to be updatable
          timeout: 0, // we want to be in control when it gets dismissed
          spinner: true,
          message: "Saving Report...",
          caption: "0%",
        });
        // we simulate some progress here...
        let percentage = 0;
        //   Saving Data
        await addDoc({
          name: name.value,
          startLocation: startLocation.value,
          startDateTime: startDurationTime.value, // change from startDateTime
          endLocation: endLocation.value,
          endDateTime: endDurationTime.value, // change from endDateTime
          userId: user.value.uid,
          duration: duration.value,
          remarks: remarks.value,
          userName: user.value.displayName,
          createdAt: timestamp(),
        });
        const interval = setInterval(() => {
          percentage = Math.min(
            100,
            percentage + Math.floor(Math.random() * 22)
          );
          // we update the dialog
          notif({
            caption: `${percentage}%`,
          });

          // if we are done...
          if (percentage === 100) {
            notif({
              type: "positive",
              icon: "done", // we add an icon
              spinner: false, // we reset the spinner setting so the icon can be displayed
              message: "Report successfully added!",
              timeout: 2000, // we will timeout it in 2s
            });
            // End
            if (!error.value) {
              isPending.value = false;
              console.log("Report successfully added.");
              clearInterval(interval);
              router.push({ path: "/summary" });
            }
          }
        }, 500);
    }
    };

    //allowed file types
    const types = ["image/png", "image/jpeg"];

    const handleChange = (e) => {
      let selected = e.target.files[0];
      console.log(selected);

      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select an image file (png or jpg)";
      }
    };

    const getName = () => {
      name.value = "Pam Ram";
    };
    // Start Location
    const getStartLocation = () => {
      startLocationLoading.value = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getStartAddress(position);
          getStartDateTime(position);
        },
        (err) => {
          locationError();
        },
        { timeout: 1000 }
      );
    };
    const getStartAddress = (position) => {
      const axios = require("axios");
      let apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
      axios
        .get(apiUrl)
        .then((result) => {
          startLocation.value = result.data.display_name;
          startLocationLoading.value = false;
        })
        .catch((err) => {
          locationError();
        });
    };
    const getStartDateTime = (position) => {
      let startTimestamp = position.timestamp;
      startDateTime.value = moment(startTimestamp).format("LTS"); // masked value
      startDurationTime.value = startTimestamp; // true value
    };
    const locationError = () => {
      $q.dialog({
        title: "Error",
        message: "Could not find your location",
      });
      startLocationLoading = false;
      endLocationLoading = false;
    };
    // End Location
    const getEndLocation = () => {
      endLocationLoading.value = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getEndAddress(position);
          getEndDateTime(position);
        },
        (err) => {
          locationError();
        },
        { timeout: 1000 }
      );
    };
    const getEndAddress = (position) => {
      const axios = require("axios");
      let apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
      axios
        .get(apiUrl)
        .then((result) => {
          endLocation.value = result.data.display_name;
          endLocationLoading.value = false;
        })
        .catch((err) => {
          locationError();
        });
    };
    const getEndDateTime = (position) => {
      let endTimestamp = position.timestamp;
      endDateTime.value = moment(endTimestamp).format("LTS"); // masked value
      endDurationTime.value = endTimestamp; // true value
      getDuration();
    };
    // DURATION
    const getDuration = () => {
      // used the true value instead of masked value
      var diff = Math.abs(
        new Date(endDurationTime.value) - new Date(startDurationTime.value)
      );
      var minutes = Math.round(diff / 1000 / 60);
      var seconds = Math.round(diff / 1000);
      duration.value = minutes + " minutes and " + seconds + " seconds";
    };

    return {
      name,
      startLocation,
      startDateTime,
      endLocation,
      endDateTime,
      duration,
      remarks,
      handleSubmit,
      handleChange,
      fileError,
      isPending,
      getName,
      getStartLocation,
      getEndLocation,
      getEndAddress,
      getEndDateTime,
      getDuration,
      startLocationLoading,
      endLocationLoading,
      durationLoading,
      imageLoading,
      imageCaptured,
      imageUpload,
      hasCameraSupport,
    };
  },

  mounted() {
    this.getName();
    this.getStartLocation();
  },

  methods: {
    ...mapActions("assignments", ["updateAssignment"]),
    goToHome() {
      this.$router.push("/home");
    },
  },
};
</script>
