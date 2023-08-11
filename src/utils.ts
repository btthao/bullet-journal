export const months = ['', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

export const days = new Array(32).fill(0).map((_, idx) => idx);

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

export function randomColor() {
  const R = Math.floor(Math.random() * 127 + 127);
  const G = Math.floor(Math.random() * 127 + 127);
  const B = Math.floor(Math.random() * 127 + 127);

  const rgb = (R << 16) + (G << 8) + B;

  return `#${rgb.toString(16)}`;
}
