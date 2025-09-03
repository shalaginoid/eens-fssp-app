<template>
  <Bar v-if="data" :data="props.data" :options="options" />
</template>

<script setup>
import 'moment/dist/locale/ru';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

const props = defineProps({
  data: Object,
});

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const options = {
  responsive: true,
  maintainAspectRatio: true,
};
</script>
