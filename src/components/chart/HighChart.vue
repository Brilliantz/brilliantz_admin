<template>
  <div>
    <highcharts
        class="hc wrapper"
        :options="chartOptions"
        :updateArgs="[true, false]"
        ref="highCharts"
    ></highcharts>
  </div>
</template>

<script>
export default {
  name: "Chart",
  props: ['data', 'paramId'],
  data: () => ({
    chartOptions: {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      plotOptions: {
        series: {
          color: '#00BFA5'
        }
      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45,
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'View Rate (link clicked)'
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: 'Traffic User: <b>{point.y:.1f} link clicked</b>'
      },
      series: [{
        name: 'View Rate',
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y:.1f}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      }]
    }
  }),
  mounted() {
    this.load()
  },
  watch: {
    data() {
      this.load()
    }
  },
  methods: {
    load() {
      const series = this.$children[0].chart.series[0];
      series.setData(this.data)
    }
  }
}
</script>

<style scoped>

</style>
