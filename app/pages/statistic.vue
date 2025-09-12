<template>
  <UContainer class="my-8">
    <UCard>
      <h1 class="mb-4 text-2xl font-bold">Статистика</h1>

      <p v-if="loading">Загрузка...</p>

      <UAlert
        v-if="errorMessage"
        :description="errorMessage"
        class="mb-4"
        color="error"
        variant="soft"
      ></UAlert>

      <GosuslugiBar :data="data" />
    </UCard>
  </UContainer>
</template>

<script lang="ts" setup>
import moment from 'moment';

definePageMeta({
  middleware: ['authenticated'],
});

useSeoMeta({
  title: 'Статистика',
});

const data = ref();

onMounted(async () => {
  await getStatistic();
});

type Statistic = {
  accepted: StatisticItem[];
  inProgress: StatisticItem[];
  completed: StatisticItem[];
};

type StatisticItem = {
  month: string;
  status: string;
  quantity: string;
};

const loading = ref(false);
const errorMessage = ref(null);

const getStatistic = async () => {
  try {
    loading.value = true;
    const response = await $fetch<Statistic>('/api/statistic');

    const accepted = response.accepted;
    const inProgress = response.inProgress;
    const complete = response.completed;
    const acceptedArray = [];
    const inProgressArray = [];
    const completeArray = [];

    for (let i = 0; i < 12; i++) {
      const month = moment().month(i).format('YYYY-MM');
      const find = accepted.find((item) => item.month == month);
      if (find) {
        acceptedArray.push(find.quantity);
      } else {
        acceptedArray.push('');
      }
    }

    for (let i = 0; i < 12; i++) {
      const month = moment().month(i).format('YYYY-MM');
      const find = inProgress.find((item) => item.month == month);
      if (find) {
        inProgressArray.push(find.quantity);
      } else {
        inProgressArray.push('');
      }
    }

    for (let i = 0; i < 12; i++) {
      const month = moment().month(i).format('YYYY-MM');
      const find = complete.find((item) => item.month == month);
      if (find) {
        completeArray.push(find.quantity);
      } else {
        completeArray.push('');
      }
    }

    data.value = {
      labels: moment.monthsShort(),
      datasets: [
        { label: 'Принято', data: acceptedArray, backgroundColor: '#9e9e9e' },
        {
          label: 'В работе',
          data: inProgressArray,
          backgroundColor: '#f78e1e',
        },
        { label: 'Завершено', data: completeArray, backgroundColor: '#4CAF50' },
      ],
    };
  } catch (error: any) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
};
</script>
