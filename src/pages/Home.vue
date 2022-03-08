<template>
  <q-page>
    <!--header-->
    <div rounded size="1000px" class="z-absolute bg-primary">
      <navbar @logout="goToAuth()" />
    </div>
    <q-list separator>
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
          <q-tab no-caps name="assigned" label="Assigned" />
          <q-tab no-caps name="completed" label="Completed" />
          <q-tab no-caps name="closed" label="Closed" />
        </q-tabs>

        <q-separator />
        <q-tab-panels v-model="tab" animated>
          

          <!-- assigned -->
          <q-tab-panel name="assigned">
            <q-scroll-area
              :thumb-style="thumbStyle"
              :content-style="contentStyle"
              :content-active-style="contentActiveStyle"
              style="height: 500px"
              class="bg-white"
            >
              <div
                class="q-px-md q-py-md"
                style="max-width: 1080px absolute-top"
              >
              <!-- Tools -->
          <div class="row q-mb-lg">
            <search />
            <sort />
          </div>
                <assignment
                  v-for="(assignment, key) in assignmentsAssigned"
                  :key="key"
                  :assignment="assignment"
                  :id="key"
                ></assignment>
                <!--no assignments available icon-->
                <no-assignment
                  v-if="!Object.keys(assignmentsAssigned).length"
                ></no-assignment>
              </div>
            </q-scroll-area>
          </q-tab-panel>
          <!-- endAssigned -->

          <!-- completed -->
          <q-tab-panel name="completed">
            <q-scroll-area
              :thumb-style="thumbStyle"
              :content-style="contentStyle"
              :content-active-style="contentActiveStyle"
              style="height: 500px"
              class="bg-white"
            >
              <div
                class="q-px-md q-py-md"
                style="max-width: 1080px absolute-top"
              >
              <!-- Tools -->
          <div class="row q-mb-lg">
            <search />
            <sort />
          </div>
                <q-list separator>
                  <assignment
                    v-for="(assignment, key) in assignmentsCompleted"
                    :key="key"
                    :assignment="assignment"
                    :id="key"
                  ></assignment>
                  <!--no reports available icon-->
                  <no-report
                    v-if="!Object.keys(assignmentsCompleted).length"
                  ></no-report>
                </q-list>
              </div>
            </q-scroll-area>
          </q-tab-panel>
          <!-- endCompleted -->

           <!-- closed -->
          <q-tab-panel name="closed">
            <q-scroll-area
              :thumb-style="thumbStyle"
              :content-style="contentStyle"
              :content-active-style="contentActiveStyle"
              style="height: 500px"
              class="bg-white"
            >
              <div
                class="q-px-md q-py-md"
                style="max-width: 1080px absolute-top"
              >
              <!-- Tools -->
          <div class="row q-mb-lg">
            <search />
            <sort />
          </div>
                <q-list separator>
                  <assignment
                    v-for="(assignment, key) in assignmentsClosed"
                    :key="key"
                    :assignment="assignment"
                    :id="key"
                  ></assignment>
                  <!--no reports available icon-->
                  <no-report
                    v-if="!Object.keys(assignmentsClosed).length"
                  ></no-report>
                </q-list>
              </div>
            </q-scroll-area>
          </q-tab-panel>
          <!-- endClosed -->
        </q-tab-panels>
      </q-card>
    </q-list>

    <q-page-sticky position="bottom-left" :offset="[18, 10]">
      <morphStep />
    </q-page-sticky>
  </q-page>
</template>

<!--script-->
<script>
import { mapGetters } from "vuex";

export default {
  name: "PageHome",

  computed: {
    ...mapGetters("assignments", [
      "assignmentsAssigned",
      "assignmentsCompleted",
      "assignmentsClosed"
    ]),
  },
  components: {
    navbar: require("components/Navbars/Navbar.vue").default,
    assignment: require("components/Assignments/Assignment.vue").default,
    "no-assignment": require("components/Assignments/NoAssignment.vue").default,
    "no-report": require("components/Assignments/NoReport.vue").default,
    morphStep: require("src/components/Morph/morphStep.vue").default,
    search: require("src/components/Tools/Search.vue").default,
    sort: require("src/components/Tools/Sort.vue").default,
  },
  data() {
    return {
      tab: ("completed", "assigned"),
    };
  },
  methods: {
    goToAuth() {
      this.$router.push("/");
    },
  },

  setup() {
    return {
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#1a73e8",
        width: "5px",
        opacity: 0.3,
      },
    };
  },
};
</script>
