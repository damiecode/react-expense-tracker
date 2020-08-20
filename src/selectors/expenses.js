import moment from 'moment';

export default (expenses, {
  sortBy, startDate, endDate,
}) => expenses.filter(expense => {
  const createdAtMoment = moment(expense.createdAt);
  const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
  const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;

  return startDateMatch && endDateMatch;
}).sort((a, b) => {
  if (sortBy === 'date') {
    return a.createdAt < b.createdAt ? 1 : -1;
  }
  return a.amount < b.amount ? 1 : -1;
});
