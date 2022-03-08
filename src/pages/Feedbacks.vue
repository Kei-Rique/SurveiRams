<template>
  <q-page>
    <!--header-->
    <div rounded size="1000px" class="z-absolute bg-primary">
      <navbar2 @home="goToHome()" />
    </div>

    <!-- body -->
    <q-card scoped>
      <q-tabs
        v-model="tab"
        class="text-white bg-primary"
        active-color="secondary"
        indicator-color="secondary"
        align="justify"
        narrow-indicator
      >
        <q-tab no-caps name="pendingReports" label="Pending" />
        <q-tab no-caps name="closedReports" label="Closed" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <!-- Pending Reports -->
        <q-tab-panel name="pendingReports">
          <div class="q-px-md q-py-md" style="absolute-top">
            <report-details />
          </div>
        </q-tab-panel>

        <!-- Closed Reports -->
        <q-tab-panel name="closedReports">
          <div class="q-px-md q-py-md" style="absolute-top">
            <closed />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<!--script-->
<script>
import { mapActions, mapGetters } from "vuex";
import { firebaseAuth } from "src/boot/firebase";
import { ref, onBeforeMount } from "vue";

export default {
  name: "Feedbacks",

  components: {
    navbar2: require("components/Navbars/Navbar2.vue").default,
    "report-details": require("components/Assignments/ReportDetails.vue")
      .default,
    closed: require("components/Assignments/Closed.vue").default,
  },

  methods: {
    goToHome() {
      this.$router.push("/home");
    },
  },

  data() {
    return {
      tab: ("closedReports", "pendingReports"),
    };
  },
};
</script>
