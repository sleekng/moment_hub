<template>
  <div class="flex flex-col  p-4 sm:p-6 bg-white rounded-lg border border-[#f0f0f0] gap-4">
    <div class="flex items-start justify-start self-start place-content-start">
      <h2 class="text-lg sm:text-xl font-semibold text-[#121212]">Audience</h2>
    </div>
    <div class="flex h-full flex-col sm:flex-row justify-center items-center gap-4">
      <!-- Male Stats -->
      <div class="flex items-center gap-2">
        <div class="w-1 h-10 bg-[#47e3e8] rounded"></div>
        <div class="flex flex-col">
          <span class="text-sm font-medium text-[#575757]">Male</span>
          <span class="text-lg font-semibold text-[#121212]">{{ malePercentage }}%</span>
        </div>
      </div>

      <!-- Pie Chart -->
      <div class="w-48 h-48">
        <canvas ref="audienceChart"></canvas>
      </div>

      <!-- Female Stats -->
      <div class="flex items-center gap-2">
        <div class="w-1 h-10 bg-[#e567f8] rounded"></div>
        <div class="flex flex-col">
          <span class="text-sm font-medium text-[#575757]">Female</span>
          <span class="text-lg font-semibold text-[#121212]">{{ femalePercentage }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'AudiencePieChart',
  props: {
    audienceData: {
      type: Object,
      required: true,
      default: () => ({
        male: 40,
        female: 90
      })
    }
  },
  computed: {
    total() {
      return this.audienceData.male + this.audienceData.female;
    },
    malePercentage() {
      return this.total > 0 ? ((this.audienceData.male / this.total) * 100).toFixed(1) : 0;
    },
    femalePercentage() {
      return this.total > 0 ? ((this.audienceData.female / this.total) * 100).toFixed(1) : 0;
    }
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.audienceChart.getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Male', 'Female'],
          datasets: [{
            data: [this.audienceData.male, this.audienceData.female],
            backgroundColor: ['#47e3e8', '#e567f8'],
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }
  }
}
</script>
