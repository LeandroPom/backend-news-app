// utils/dateUtils.js
module.exports = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + Number(days));
  return date;
};
