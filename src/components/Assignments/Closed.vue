<template>
  <!-- Header -->
  <header class="text-weight-bold q-pl-sm text-h5 text-primary">
    Closed Reports
  </header>

  <!-- Tools -->
  <div class="row q-mb-lg">
    <search />
    <sort />
  </div>

  <!-- Reports -->
  <q-scroll-area
    :thumb-style="thumbStyle"
    :content-style="contentStyle"
    :content-active-style="contentActiveStyle"
    style="height: 480px"
    class="bg-white"
  >  
    <q-list separator bordered v-if="Object.keys(assignmentsClosed).length">
      <closed-assignment
        v-for="(assignment, key) in assignmentsClosed"
        :key="key"
        :assignment="assignment"
        :id="key"
      ></closed-assignment>
    </q-list>

    <!--no assignments available icon-->
    <no-assignment
      v-if="!Object.keys(assignmentsClosed).length"
    ></no-assignment>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("assignments", ["assignmentsClosed"]),
  },

  components: {
    "closed-assignment":
      require("components/AssignedCompleted/Closed.vue").default,
    "no-assignment": require("components/Assignments/NoAssignment.vue").default,
    search: require("src/components/Tools/Search.vue").default,
    sort: require("src/components/Tools/Sort.vue").default,
  },

 setup() {
    return { 
       thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#f8c949",
        width: "5px",
        opacity: 0.5,
      },     
    }
  },  
};
</script>
