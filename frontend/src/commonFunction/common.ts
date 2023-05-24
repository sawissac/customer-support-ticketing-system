import dayjs from "dayjs";

export function compareDate(first: any, second: any) {
  return dayjs(first).isSame(dayjs(second));
}
