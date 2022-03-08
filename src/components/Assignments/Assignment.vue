<template>
  <header class="text-weight-bold q-pl-md text-h5 text-primary">
    Assignments
  </header>

  <!-- Tools -->
  <div class="row q-mb-lg">
    <search />
    <sort />
  </div>

  <q-page>
    <q-list separator bordered v-if="Object.keys(assignmentsAssigned).length">
      <assigned
        v-for="(assignment, key) in assignmentsAssigned"
        :key="key"
        :assignment="assignment"
        :id="key"
      ></assigned>
    </q-list>

    <!--no assignments available icon-->
    <no-assignment
      v-if="!Object.keys(assignmentsAssigned).length"
    ></no-assignment>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("assignments", ["assignmentsAssigned"]),
  },

  components: {
    assigned: require("src/components/AssignedCompleted/Assigned.vue").default,
    "no-assignment": require("components/Assignments/NoAssignment.vue").default,
    search: require("src/components/Tools/Search.vue").default,
    sort: require("src/components/Tools/Sort.vue").default,
  },
};
</script>
