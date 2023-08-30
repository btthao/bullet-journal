export type Date = {
  date: number;
  month: number;
  year: number;
};

export const months = ['', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

export const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const days = new Array(32).fill(0).map((_, idx) => idx);

export const currentYear = new Date().getFullYear();
export const currentMonth = new Date().getMonth() + 1;
export const currentDate = new Date().getDate();

export const createUniqueId = () => {
  return Date.now() + Math.random();
};

export const getDayOfWeek = ({ date, month, year }: Date) => {
  const dayIdx = new Date(year, month - 1, date).getDay();
  return daysOfWeek[dayIdx];
};

export const isItToday = ({ date, month, year }: Date) => {
  return year == currentYear && month == currentMonth && date == currentDate;
};

export function getTotalDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export function initEmptyLog(year: number) {
  const data = [];

  for (let month = 0; month <= 12; month++) {
    const totalDays = month ? getTotalDaysInMonth(year, month) : -1;
    const days = [];
    for (let i = 0; i < 32; i++) {
      days.push(i > 0 && i <= totalDays ? 0 : null);
    }
    data.push(days);
  }

  return data;
}

export function randomColor() {
  const R = Math.floor(Math.random() * 127 + 127);
  const G = Math.floor(Math.random() * 127 + 127);
  const B = Math.floor(Math.random() * 127 + 127);

  const rgb = (R << 16) + (G << 8) + B;

  return `#${rgb.toString(16)}`;
}
