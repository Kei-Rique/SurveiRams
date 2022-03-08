<template>
  <q-page>
    <!--header-->
    <div rounded size="1000px" class="z-absolute bg-primary">
      <navbar2 @home="goToHome()" />
    </div>

    <!-- charts -->
    <q-scroll-area style="height: 1080px; max-width: 500px">
      <chart-column />
      <chart-bar-floor />
      <chart-bar-guard />
      <chart-multi-series />
    </q-scroll-area>
  </q-page>
</template>

<script>
export default {
  components: {
    navbar2: require("components/Navbars/Navbar2.vue").default,
    "chart-column": require("src/components/Charts/ChartColumn.vue").default,
    "chart-bar-floor": require("src/components/Charts/ChartBarFloor.vue").default,
    "chart-bar-guard": require("src/components/Charts/ChartBarGuard.vue").default,
    "chart-multi-series": require("src/components/Charts/ChartMultiSeries.vue").default,
  },

  methods: {
    goToHome() {
      this.$router.push("/home");
    },
  },
};
</script>
