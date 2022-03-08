<template>
  <div>
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="documents">
      <q-card rounded class="q-pa-md absolute fullscreen">
        <!-- header -->
        <q-card-section class="row">
          <!-- title -->
          <div class="col text-h5 text-primary text-bold">Report Details</div>
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

        <q-scroll-area
          :thumb-style="thumbStyle"
          :content-style="contentStyle"
          :content-active-style="contentActiveStyle"
          style="height: 600px"
          class="bg-white"
        >
          <report-list :reports="documents" />
        </q-scroll-area>

        <!-- Create Feedback -->
        <div class="absolute-bottom flex flex-center">
          <q-btn
            rounded
            unelevated
            no-caps
            size="lg"
            class="q-ma-lg bg-secondary text-center text-white"
            label="Show Feedback"
            @click="prompt = true"
          />
          <!-- Create Feedback Dialog -->
          <q-dialog v-model="prompt">
            <div class="q-pa-md">
              <show-feedback class="fullscreen" />

              <q-separator spaced="xl" class="q-pa-xs" />
            </div>
          </q-dialog>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import getCollection from "src/composables/getCollection";
export default {
  components: {
    "report-list": require("src/components/Modals/ReportList.vue").default,
    "show-feedback": require("components/Feedbacks/ShowFeedback.vue").default,
  },
  setup() {
    const { error, documents } = getCollection("reports");
    return {
      error,
      documents,
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#1a73e8",
        width: "5px",
        opacity: 0.3,
      },
    };
  },

  data() {
    return {
      prompt: false,
      close: false,
    };
  },
};
</script>
