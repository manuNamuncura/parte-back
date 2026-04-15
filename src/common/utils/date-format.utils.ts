import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

export class DateFormatUtils {
  static formatDate(date: Date | string, format: string = 'DD/MM/YYYY'): string {
    return dayjs(date).format(format);
  }

  static formatDateTime(date: Date | string, format: string = 'DD/MM/YYYY HH:mm'): string {
    return dayjs(date).format(format);
  }

  static getMonthName(date: Date | string): string {
    return dayjs(date).format('MMMM');
  }

  static getDayName(date: Date | string): string {
    return dayjs(date).format('dddd');
  }

  static differenceInDays(date1: Date | string, date2: Date | string): number {
    return dayjs(date1).diff(dayjs(date2), 'day');
  }
}