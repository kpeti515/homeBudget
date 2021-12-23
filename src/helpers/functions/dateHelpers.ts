// eslint-disable-next-line prettier/prettier
const displayWithTwoDigits = (digits: number) =>
  `${digits}`.length === 1 ? `0${digits}` : digits;
export const getToday = () => {
  const today = new Date();
  const dd = displayWithTwoDigits(today.getDate());
  const mm = displayWithTwoDigits(today.getMonth() + 1);
  const yyyy = displayWithTwoDigits(today.getFullYear());
  return `${yyyy}-${mm}-${dd}`;
};
