<template>
  <header class="text-center text-weight-bold q-pl-md text-h5 text-primary">
    Guard Patrols
  </header>

  <apexchart
    type="rangeBar"
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
          name: "Guard 1",
          data: [
            {
              x: "Basement 1",
              y: [
                new Date("2019-03-05").getTime(),
                new Date("2019-03-08").getTime(),
              ],
            },
            {
              x: "1st FLoor",
              y: [
                new Date("2019-03-08").getTime(),
                new Date("2019-03-11").getTime(),
              ],
            },
            {
              x: "12th Floor",
              y: [
                new Date("2019-03-11").getTime(),
                new Date("2019-03-16").getTime(),
              ],
            },
          ],
        },
        {
          name: "Guard 2",
          data: [
            {
              x: "5th FLoor",
              y: [
                new Date("2019-03-02").getTime(),
                new Date("2019-03-05").getTime(),
              ],
            },
            {
              x: "2nd Floor",
              y: [
                new Date("2019-03-06").getTime(),
                new Date("2019-03-09").getTime(),
              ],
            },
            {
              x: "3rd FLoor",
              y: [
                new Date("2019-03-10").getTime(),
                new Date("2019-03-19").getTime(),
              ],
            },
          ],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "rangeBar",
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "vertical",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100],
          },
        },
        xaxis: {
          type: "datetime",
        },
        legend: {
          position: "top",
        },
      },
    };
  },
};
</script>
