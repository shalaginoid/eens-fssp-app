<template>
  <JsonExcel
    :data="data"
    :name="`${moment().format('YYYYMMDDHHmmss')}.xlsx`"
    :fields="{
      Исполнитель: 'executor',
      'Дата уведомления': 'notifyDate',
      'Тип должника': 'fssp:DebtorType',
      'Наименование должника': 'fssp:DbtrName',
      'Наименование документа': 'fssp:DocName',
      'Номер исп. производства': 'fssp:IpNo',
      'Дата документа': 'fssp:DocDate',
      Сумма: 'fssp:TotalArrestDebtSum',
      'Сумма (по сводному производству)': 'fssp:IdDebtSum',
      'Номер исп. листа': 'fssp:IdDocNo',
      'Дата исп. листа': 'fssp:IdDocDate',
      'Номер дела': 'fssp:IdDeloNo',
      'Дата дела': 'fssp:IdDeloDate',
      'ФИО пристава': 'fssp:Spi',
      Взыскатель: 'fssp:IdCrdrName',
    }"
    type="xlsx"
    worksheet="Выгрузка"
    class="w-full"
  >
    <UButton
      :label="'Выгрузить ' + data.length"
      icon="i-lucide-table"
      color="neutral"
      variant="outline"
      class="w-full"
    />
  </JsonExcel>
</template>

<script lang="ts" setup>
import moment from 'moment';
import JsonExcel from 'vue-json-excel3';

defineProps<{
  data: Message[];
}>();
</script>
