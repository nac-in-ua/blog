import { format, differenceInDays, formatDistance } from 'date-fns';
import { uk } from 'date-fns/locale';

export const formatDate = (date: string) => {
  const today = new Date();
  const target = new Date(date);
  if (differenceInDays(today, target) < 7) {
    return formatDistance(target, today, { locale: uk, addSuffix: true });
  }

  return format(target, 'dd MMMM yyyy HH:mm', { locale: uk });
};

export const getDividedCount = (count: number) => {
  if (count < 1000) return count;
  if (count < 1000000) return `${Math.round(count / 100) / 10}K`;
  return `${Math.round(count / 100000) / 10}M`;
};
