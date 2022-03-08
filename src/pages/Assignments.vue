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
        <q-tab no-caps name="addAssignments" label="Add Assignments" />
        <q-tab no-caps name="assignments" label="Assignments" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <!-- add assignments -->
        <q-tab-panel name="addAssignments">
          <div class="q-px-md q-py-md" style="max-width: 1080px absolute-top">
            <add-assignment />
          </div>
        </q-tab-panel>

        <!-- assignments -->
        <q-tab-panel name="assignments">
          <div class="q-px-md q-py-md" style="max-width: 1080px absolute-top">
            <assignment />
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
  name: "Assignments",

  components: {
    navbar2: require("components/Navbars/Navbar2.vue").default,
    "add-assignment": require("components/Assignments/AddAssignment.vue")
      .default,
    assignment: require("components/Assignments/Assignment.vue").default,
  },

  methods: {
    goToHome() {
      this.$router.push("/home");
    },
  },

  data() {
    return {
      tab: ("assignments", "addAssignments"),
    };
  },
};
</script>
