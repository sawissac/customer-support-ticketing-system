import dayjs from "dayjs";

export function compareDate(first: any, second: any) {
  return dayjs(first).isSame(dayjs(second));
}

export const formatDateTime = (date: any) => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};

export const textLimiter = (limit: number, text: string) => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};
