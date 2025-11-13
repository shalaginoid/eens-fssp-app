import moment from 'moment';
import 'moment/dist/locale/ru';

export default () => {
  const monthCurrent: any = moment().startOf('month').format('MM');
  const monthsQuantityOfYear = 24 - (12 - monthCurrent);
  const months = [];

  for (let i = 0; i < monthsQuantityOfYear; i++) {
    const title = moment().subtract(i, 'month').format('MMMM YYYY');
    const value = moment().subtract(i, 'month').format('YYYY-MM');

    const result = {
      label: title[0]?.toUpperCase() + title.substring(1),
      value,
    };

    months.push(result);
  }

  return months;
};
