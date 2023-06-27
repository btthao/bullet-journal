export const currentYear = new Date().getFullYear();

export const createUniqueId = () => {
  return Date.now() + Math.random();
};

export function getTotalDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export function initEmptyLog(year: number) {
  const data = [];

  for (let month = 1; month <= 12; month++) {
    const totalDays = getTotalDaysInMonth(year, month);
    const days = [];
    for (let i = 0; i < 31; i++) {
      days.push(i < totalDays ? 0 : null);
    }
    data.push(days);
  }

  return data;
}
