import moment from 'moment';

export const dateFormatter = (formatDate, date, monthFormat = 'long') => formatDate(moment(date).toDate(), {
  year: 'numeric',
  month: monthFormat,
  day: 'numeric',
});

export default dateFormatter;
