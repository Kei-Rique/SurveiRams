<template>
  <header class="text-center text-weight-bold q-pl-md text-h5 text-primary">
    Number of Patrols per Floor
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
          data: [10, 20, 15, 8, 7, 13, 12, 11, 9, 16],
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
            "Basement 1",
            "Basement 2",
            "Basement 3",
            "1st Floor",
            "2nd Floor",
            "3rd Floor",
            "5th Floor",
            "7th Floor",
            "8th Floor",
            "9th Floor",
            "10th Floor",
            "11th Floor",
            "12th Floor",
          ],
        },
      },
    };
  },
};
</script>
