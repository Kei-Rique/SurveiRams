<template>
  <header class="text-center text-weight-bold q-pl-md text-h5 text-primary">
    Number of Patrols per Guard
  </header>

  <apexchart
    type="bar"
    height="350"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script>
export default {
  data() {
    return {
      series: [
        {
          data: [6, 4, 7, 8, 10, 2, 5, 11],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            "Guard 1",
            "Guard 2",
            "Guard 3",
            "Guard 4",
            "Guard 5",
            "Guard 6",
            "Guard 7",
          ],
        },
      },
    };
  },
};
</script>
